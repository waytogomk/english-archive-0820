@echo off
setlocal
cd /d "%~dp0"

where cloudflared >nul 2>nul
if errorlevel 1 (
  echo [준비 필요] Cloudflare Tunnel 프로그램이 설치되어 있지 않습니다.
  echo 다음 명령으로 한 번만 설치한 뒤 이 파일을 다시 실행하세요:
  echo winget install --id Cloudflare.cloudflared
  pause
  exit /b 1
)

set /p "MK_TEST_PASSWORD=테스트 관리자 비밀번호를 입력하세요: "
if "%MK_TEST_PASSWORD%"=="" (
  echo 비밀번호를 입력해야 테스트 사이트를 열 수 있습니다.
  pause
  exit /b 1
)

set "ADMIN_PASSWORD=%MK_TEST_PASSWORD%"
set "PORT=4174"
set "MK_PYTHON=C:\Users\bmk12\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if exist "%MK_PYTHON%" (
  start "MK ENGLISH ARCHIVE TEST SERVER" /min "%MK_PYTHON%" server.py
) else (
  start "MK ENGLISH ARCHIVE TEST SERVER" /min py server.py
)

echo.
echo 잠시 후 표시되는 https:// 로 시작하는 주소를 학생에게 보내세요.
echo 학생 화면: 표시된 주소/index.html
echo 관리자 화면: 표시된 주소/admin.html
echo 이 창을 닫으면 외부 테스트 주소도 종료됩니다.
echo.
cloudflared tunnel --url http://127.0.0.1:4174
endlocal
