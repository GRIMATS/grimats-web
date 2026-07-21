# ==========================================================
# GRIMATS - Servidor local de desarrollo
# ==========================================================

$ErrorActionPreference = "Stop"

# Evita caracteres dañados en la terminal
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

$Port = 5500
$HostAddress = "127.0.0.1"
$Url = "http://localhost:$Port/"

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

# Verificar index.html
$IndexPath = Join-Path $ProjectRoot "index.html"

if (-not (Test-Path $IndexPath)) {
    Write-Host "ERROR: No se encontro index.html." -ForegroundColor Red
    Write-Host "Ruta revisada:" -ForegroundColor Yellow
    Write-Host $IndexPath
    exit 1
}

Write-Host "index.html encontrado correctamente." -ForegroundColor Green
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
Write-Host "Servidor: $Url" -ForegroundColor Green
Write-Host ""
Write-Host "Para detener el servidor, presiona Ctrl + C." -ForegroundColor Yellow
Write-Host ""

# Abrir el navegador un segundo después
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