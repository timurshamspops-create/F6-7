@echo off
echo ============================================
echo   F6-7 League — установка
echo ============================================
echo.
echo Устанавливаю зависимости клиента...
cd client
call npm install
if errorlevel 1 goto :error
echo.
echo Собираю сайт...
call npm run build
if errorlevel 1 goto :error
cd ..

echo.
echo Устанавливаю зависимости сервера...
cd server
call npm install
if errorlevel 1 goto :error
cd ..

echo.
echo ============================================
echo   Готово! Теперь запустите start.bat
echo ============================================
pause
exit /b 0

:error
echo.
echo Что-то пошло не так. Проверьте, что установлен Node.js (nodejs.org).
pause
exit /b 1
