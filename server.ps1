# PowerShell скрипт для запуска локального сервера

Write-Host "===== FindHoliday - Веб Сервер =====" -ForegroundColor Cyan
Write-Host ""

# Проверяем Python
$pythonExists = $null -ne (Get-Command python -ErrorAction SilentlyContinue)

if ($pythonExists) {
    Write-Host "Запуск сервера через Python..." -ForegroundColor Green
    Write-Host "Открыть браузер: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "Нажмите Ctrl+C для остановки сервера" -ForegroundColor Yellow
    Write-Host ""
    
    python -m http.server 8000
} else {
    # Пробуем Node.js
    $nodeExists = $null -ne (Get-Command node -ErrorAction SilentlyContinue)
    
    if ($nodeExists) {
        Write-Host "Запуск сервера через Node.js (http-server)..." -ForegroundColor Green
        Write-Host "Убедитесь, что http-server установлен: npm install -g http-server" -ForegroundColor Yellow
        Write-Host ""
        
        npx http-server
    } else {
        Write-Host "Ошибка: Python или Node.js не установлены!" -ForegroundColor Red
        Write-Host "Пожалуйста, установите Python или Node.js" -ForegroundColor Red
        Read-Host "Нажмите Enter для выхода"
    }
}
