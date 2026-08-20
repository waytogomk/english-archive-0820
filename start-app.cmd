@echo off
cd /d "%~dp0"
start "MK ENGLISH ARCHIVE" http://127.0.0.1:4173/index.html
set "MK_PYTHON=C:\Users\bmk12\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%MK_PYTHON%" (
  "%MK_PYTHON%" server.py
) else (
  py server.py
)
