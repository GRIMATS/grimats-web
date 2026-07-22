# ==========================================================
# GRIMATS - Servidor local de desarrollo
# Permite elegir desde qué página HTML abrir la prueba
# ==========================================================

$ErrorActionPreference = "Stop"

# Evita caracteres dañados en la terminal
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

$Port = 5500
$HostAddress = "127.0.0.1"

# El script está dentro de /scripts.
# Esta línea sube un nivel hasta grimats-web.
$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

Clear-Host

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " GRIMATS - SERVIDOR LOCAL" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Carpeta del script:" -ForegroundColor DarkGray
Write-Host $PSScriptRoot
Write-Host ""

Write-Host "Raiz del proyecto:" -ForegroundColor Yellow
Write-Host $ProjectRoot
Write-Host ""

# Entrar a la raíz real del proyecto
Set-Location $ProjectRoot

# Buscar páginas HTML existentes
$HtmlFiles = Get-ChildItem -Path $ProjectRoot -Filter "*.html" -Recurse |
    Where-Object {
        $_.FullName -notmatch "\\node_modules\\" -and
        $_.FullName -notmatch "\\.git\\"
    } |
    Sort-Object FullName

if (-not $HtmlFiles -or $HtmlFiles.Count -eq 0) {
    Write-Host "ERROR: No se encontraron archivos .html en el proyecto." -ForegroundColor Red
    Write-Host "Ruta revisada:" -ForegroundColor Yellow
    Write-Host $ProjectRoot
    exit 1
}

Write-Host "Paginas HTML disponibles:" -ForegroundColor Cyan
Write-Host ""

for ($i = 0; $i -lt $HtmlFiles.Count; $i++) {
    $RelativePath = $HtmlFiles[$i].FullName.Replace($ProjectRoot, "").TrimStart("\")
    Write-Host ("[{0}] {1}" -f ($i + 1), $RelativePath) -ForegroundColor White
}

Write-Host ""
Write-Host "Selecciona el numero de la pagina que quieres abrir." -ForegroundColor Yellow
Write-Host "Presiona ENTER para abrir la primera pagina de la lista." -ForegroundColor DarkGray
Write-Host ""

$Selection = Read-Host "Numero"

if ([string]::IsNullOrWhiteSpace($Selection)) {
    $SelectedIndex = 0
}
elseif ($Selection -match "^\d+$" -and [int]$Selection -ge 1 -and [int]$Selection -le $HtmlFiles.Count) {
    $SelectedIndex = [int]$Selection - 1
}
else {
    Write-Host ""
    Write-Host "ERROR: Seleccion invalida." -ForegroundColor Red
    exit 1
}

$SelectedFile = $HtmlFiles[$SelectedIndex]
$SelectedRelativePath = $SelectedFile.FullName.Replace($ProjectRoot, "").TrimStart("\")

# Convertir ruta Windows a URL
$SelectedUrlPath = $SelectedRelativePath -replace "\\", "/"
$Url = "http://localhost:$Port/$SelectedUrlPath"

Write-Host ""
Write-Host "Pagina seleccionada:" -ForegroundColor Green
Write-Host $SelectedRelativePath
Write-Host ""

# Verificar si el puerto ya está ocupado
$ExistingConnection = Get-NetTCPConnection `
    -LocalPort $Port `
    -State Listen `
    -ErrorAction SilentlyContinue

if ($ExistingConnection) {
    Write-Host "El servidor ya esta activo en el puerto $Port." -ForegroundColor Yellow
    Write-Host "Abriendo: $Url" -ForegroundColor Green

    Start-Process $Url
    exit 0
}

# Detectar Python
if (Get-Command "py" -ErrorAction SilentlyContinue) {
    $PythonCommand = "py"
}
elseif (Get-Command "python" -ErrorAction SilentlyContinue) {
    $PythonCommand = "python"
}
else {
    Write-Host "ERROR: Python no esta disponible." -ForegroundColor Red
    Write-Host "Verifica que Python este instalado y agregado al PATH." -ForegroundColor Yellow
    exit 1
}

Write-Host "Python encontrado: $PythonCommand" -ForegroundColor Green
Write-Host "Servidor: http://localhost:$Port/" -ForegroundColor Green
Write-Host "Abriendo: $Url" -ForegroundColor Green
Write-Host ""
Write-Host "Para detener el servidor, presiona Ctrl + C." -ForegroundColor Yellow
Write-Host ""

# Abrir el navegador un segundo después en la página elegida
$BrowserCommand = "Start-Sleep -Seconds 1; Start-Process '$Url'"

Start-Process `
    -FilePath "powershell.exe" `
    -WindowStyle Hidden `
    -ArgumentList "-NoProfile", "-Command", $BrowserCommand

# Iniciar servidor en la raíz del proyecto
if ($PythonCommand -eq "py") {
    & py -m http.server $Port --bind $HostAddress
}
else {
    & python -m http.server $Port --bind $HostAddress
}