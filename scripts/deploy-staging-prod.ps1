param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$CommitMessage
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$GitArguments
    )

    Write-Host ""
    Write-Host "> git $($GitArguments -join ' ')" -ForegroundColor Cyan

    & git @GitArguments

    if ($LASTEXITCODE -ne 0) {
        throw "Falló el comando: git $($GitArguments -join ' ')"
    }
}

function Get-GitOutput {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$GitArguments
    )

    $output = & git @GitArguments 2>&1

    if ($LASTEXITCODE -ne 0) {
        throw "Falló el comando: git $($GitArguments -join ' ')"
    }

    return (($output -join "`n").Trim())
}

try {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor DarkCyan
    Write-Host " DESPLIEGUE: STAGING -> MAIN" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor DarkCyan

    # Validar que Git esté instalado.
    & git --version

    if ($LASTEXITCODE -ne 0) {
        throw "Git no está instalado o no está disponible en el PATH."
    }

    # Validar que la terminal esté dentro de un repositorio Git.
    $repoCheck = & git rev-parse --is-inside-work-tree 2>$null
    $repoCheckText = (($repoCheck -join "").Trim())

    if ($LASTEXITCODE -ne 0 -or $repoCheckText -ne "true") {
        throw "La carpeta actual no es un repositorio Git."
    }

    # Evitar mover cambios sin confirmar desde otra rama hacia staging.
    $currentBranch = ((& git branch --show-current) -join "").Trim()
    $pendingChanges = @(& git status --porcelain)

    if (
        $currentBranch -ne "staging" -and
        $pendingChanges.Count -gt 0
    ) {
        throw @"
Hay cambios pendientes en la rama '$currentBranch'.

Cambia primero a staging o guarda/confirma esos cambios antes de ejecutar
el despliegue. Esto evita llevar cambios accidentalmente desde otra rama.
"@
    }

    Write-Host ""
    Write-Host "Comentario: $CommitMessage" -ForegroundColor Yellow

    # 1. Actualizar staging.
    Invoke-Git -GitArguments @("checkout", "staging")
    Invoke-Git -GitArguments @("pull", "--ff-only", "origin", "staging")

    # 2. Preparar todos los cambios.
    Invoke-Git -GitArguments @("add", "--all")

    # 3. Crear el commit solamente si existen cambios preparados.
    & git diff --cached --quiet
    $stagedDiffExitCode = $LASTEXITCODE

    if ($stagedDiffExitCode -eq 1) {
        Invoke-Git -GitArguments @(
            "commit",
            "-m",
            $CommitMessage
        )
    }
    elseif ($stagedDiffExitCode -eq 0) {
        Write-Host ""
        Write-Host "No hay cambios nuevos para crear un commit." -ForegroundColor Yellow
        Write-Host "Se continuará con la sincronización de las ramas." -ForegroundColor Yellow
    }
    else {
        throw "No se pudo comprobar si existen cambios preparados."
    }

    # 4. Publicar staging.
    Invoke-Git -GitArguments @("push", "origin", "staging")

    # 5. Actualizar main y mezclar staging.
    Invoke-Git -GitArguments @("checkout", "main")
    Invoke-Git -GitArguments @("pull", "--ff-only", "origin", "main")
    Invoke-Git -GitArguments @("merge", "--no-edit", "staging")
    Invoke-Git -GitArguments @("push", "origin", "main")

    # 6. Regresar a staging y sincronizarla con main.
    Invoke-Git -GitArguments @("checkout", "staging")
    Invoke-Git -GitArguments @("merge", "--ff-only", "main")
    Invoke-Git -GitArguments @("push", "origin", "staging")

    # 7. Mostrar diferencias de contenido.
    Write-Host ""
    Write-Host "Comparando main y staging..." -ForegroundColor Cyan
    Invoke-Git -GitArguments @("diff", "main", "staging")

    # 8. Verificar también que las ramas tengan el mismo historial.
    $branchDifference = Get-GitOutput -GitArguments @(
        "rev-list",
        "--left-right",
        "--count",
        "main...staging"
    )

    $differenceParts = $branchDifference -split "\s+"

    if (
        $differenceParts.Count -lt 2 -or
        $differenceParts[0] -ne "0" -or
        $differenceParts[1] -ne "0"
    ) {
        throw "Main y staging todavía tienen diferencias de historial: $branchDifference"
    }

    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host " DESPLIEGUE COMPLETADO CORRECTAMENTE" -ForegroundColor Green
    Write-Host " Main y staging están sincronizadas." -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host " EL DESPLIEGUE SE DETUVO" -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Revisa el error antes de volver a ejecutarlo." -ForegroundColor Yellow

    exit 1
}