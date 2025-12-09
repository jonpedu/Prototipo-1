<#
start.ps1

Script PowerShell para iniciar automaticamente o frontend e o backend
do Prototipo-1 em janelas separadas.

Uso:
  - Abra PowerShell na pasta Prototipo-1 e rode: .\start.ps1
  - Para ignorar o backend: .\start.ps1 -OpenBackend:$false
  - Para ignorar o frontend: .\start.ps1 -OpenFrontend:$false

Obs.: Se sua política de execução bloquear scripts, rode antes:
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#>

param(
    [switch]$OpenFrontend = $true,
    [switch]$OpenBackend = $true
)

$root = $PSScriptRoot

function Start-Frontend {
    Write-Host "Abrindo frontend em nova janela..."
    $cmd = "Set-Location -LiteralPath '$root'; npm run dev"
    Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", $cmd
}

function Start-Backend {
    Write-Host "Abrindo backend em nova janela..."
    $serverPath = Join-Path $root "server"
    $cmd = "Set-Location -LiteralPath '$serverPath'; py app.py"
    Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", $cmd
}

if ($OpenFrontend) { Start-Frontend }
if ($OpenBackend) { Start-Backend }

Write-Host "Comandos iniciados. Verifique as janelas abertas para logs." -ForegroundColor Green
