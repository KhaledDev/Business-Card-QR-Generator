@echo off

REM Open a new Command Prompt window and run RouteNgrok.bat
start "Ngrok Window" cmd /c "call ./RouteNgrok.bat"

REM Start the backend by calling StartBackend.bat
call ./StartBackend.bat