@echo off
cd /d "%~dp0"
if not exist node_modules call npm install
start "Servidor Conexao Solidaria" /min cmd /c "npm run dev"
timeout /t 2 /nobreak > nul
start "" "http://localhost:4180/#inicio"
