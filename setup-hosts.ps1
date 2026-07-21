# Script to map local domain to 127.0.0.1 for quinlan decision tree project

$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$domain = "hoigiang2026.caothang.local"
$entry = "127.0.0.1 $domain"

# Check if already exists
$content = Get-Content $hostsPath
if ($content -contains $entry -or $content -match "127.0.0.1\s+$domain") {
    Write-Host "Domain $domain is already mapped in hosts file." -ForegroundColor Green
} else {
    Write-Host "Attempting to add mapping for $domain to hosts file..." -ForegroundColor Yellow
    
    # Try to write
    try {
        Add-Content -Path $hostsPath -Value "`n$entry" -ErrorAction Stop
        Write-Host "Successfully added mapping!" -ForegroundColor Green
    } catch {
        Write-Host "Permission Denied. Relaunching this script as Administrator..." -ForegroundColor Yellow
        Start-Sleep -Seconds 1
        Start-Process powershell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    }
}

Write-Host "Press any key to exit..."
$null = [System.Console]::ReadKey()
