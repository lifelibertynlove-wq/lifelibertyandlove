@echo off
setlocal
title Life, Liberty ^& Love - Servidor local (portable)
chcp 65001 >nul

:: Ir a la carpeta donde esta este .bat (raiz del proyecto)
cd /d "%~dp0"

echo ============================================================
echo   Life, Liberty ^& Love - Vista previa local (PORTABLE)
echo   No requiere instalar nada: Node y las dependencias
echo   ya vienen incluidos en esta carpeta.
echo ============================================================
echo.

:: 1) Comprobaciones
if not exist "tools\node\node.exe" (
    echo [ERROR] No se encuentra tools\node\node.exe
    echo Asegurate de haber descomprimido el zip COMPLETO y de ejecutar
    echo este .bat desde la raiz del proyecto.
    pause
    exit /b 1
)
if not exist "node_modules\@11ty\eleventy\cmd.js" (
    echo [ERROR] Falta la carpeta node_modules incluida en el zip.
    echo Vuelve a descomprimir el paquete completo.
    pause
    exit /b 1
)

:: 2) Usar el Node incluido (sin tocar el PATH del sistema)
set "PATH=%~dp0tools\node;%PATH%"
for /f "delims=" %%v in ('"%~dp0tools\node\node.exe" --version') do set NODEVER=%%v
echo [OK] Usando Node portable incluido: %NODEVER%
echo.

:: 3) Abrir el navegador y arrancar el servidor
echo Arrancando el servidor local...
echo.
echo   El sitio se abrira en:  http://localhost:8080
echo.
echo   - Los cambios en src/ se recargan solos en el navegador.
echo   - Para DETENER el servidor: pulsa Ctrl+C o cierra esta ventana.
echo ============================================================
echo.

start "" cmd /c "timeout /t 4 >nul & start http://localhost:8080"

"%~dp0tools\node\node.exe" "%~dp0node_modules\@11ty\eleventy\cmd.js" --serve --port=8080

echo.
echo Servidor detenido.
pause
endlocal
