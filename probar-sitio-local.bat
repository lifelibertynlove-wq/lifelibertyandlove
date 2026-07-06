@echo off
setlocal
title Life, Liberty ^& Love - Servidor local
chcp 65001 >nul

:: Ir a la carpeta donde esta este .bat (raiz del proyecto)
cd /d "%~dp0"

echo ============================================================
echo   Life, Liberty ^& Love - Vista previa local del sitio
echo ============================================================
echo.

:: 1) Comprobar que estamos en la carpeta correcta
if not exist "package.json" (
    echo [ERROR] No se encuentra package.json en esta carpeta.
    echo Coloca este .bat en la RAIZ del proyecto ^(la carpeta "site",
    echo donde estan package.json y la carpeta src^) y vuelve a ejecutarlo.
    echo.
    pause
    exit /b 1
)

:: 2) Comprobar que Node.js esta instalado
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH.
    echo.
    echo Descargalo gratis desde:  https://nodejs.org  ^(version LTS^)
    echo Instalalo con las opciones por defecto y vuelve a ejecutar este .bat.
    echo.
    pause
    exit /b 1
)

for /f "delims=" %%v in ('node --version') do set NODEVER=%%v
echo [OK] Node.js detectado: %NODEVER%
echo.

:: 3) Instalar dependencias solo la primera vez
if not exist "node_modules\" (
    echo [1/2] Primera ejecucion: instalando dependencias...
    echo       ^(solo tarda 1-2 minutos y solo ocurre una vez^)
    echo.
    call npm install --no-audit --no-fund
    if errorlevel 1 (
        echo.
        echo [ERROR] Fallo la instalacion de dependencias.
        echo Comprueba tu conexion a internet y vuelve a intentarlo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas.
    echo.
) else (
    echo [OK] Dependencias ya instaladas.
    echo.
)

:: 4) Abrir el navegador y arrancar el servidor
echo [2/2] Arrancando el servidor local...
echo.
echo   El sitio se abrira en:  http://localhost:8080
echo.
echo   - Los cambios en src/ se recargan solos en el navegador.
echo   - Para DETENER el servidor: pulsa Ctrl+C en esta ventana
echo     ^(o simplemente cierra la ventana^).
echo ============================================================
echo.

:: Abrir el navegador tras una pequena espera para dar tiempo al servidor
start "" cmd /c "timeout /t 4 >nul & start http://localhost:8080"

call npm start

echo.
echo Servidor detenido.
pause
endlocal
