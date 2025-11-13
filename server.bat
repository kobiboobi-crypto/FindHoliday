@echo off
REM Простой скрипт для запуска локального сервера на Windows

echo.
echo ===== FindHoliday - Веб Сервер =====
echo.

REM Проверяем наличие Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Запуск сервера через Python...
    echo Открыть браузер: http://localhost:8000
    echo Нажмите Ctrl+C для остановки сервера
    echo.
    python -m http.server 8000
) else (
    REM Пробуем Node.js
    where node >nul 2>&1
    if %errorlevel% equ 0 (
        echo Запуск сервера через Node.js (http-server)...
        echo Установите http-server: npm install -g http-server
        echo.
        npx http-server
    ) else (
        echo Ошибка: Python или Node.js не установлены!
        echo Пожалуйста, установите Python или Node.js
        pause
    )
)
