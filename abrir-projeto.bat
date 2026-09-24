@echo off
cd /d "%~dp0"
start "Servidor Conexao Solidaria" /min python -m http.server 4180
timeout /t 2 /nobreak > nul
start "" "http://localhost:4180/html/index.html#inicio"
