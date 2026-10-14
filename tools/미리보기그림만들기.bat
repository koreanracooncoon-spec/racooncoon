@echo off
chcp 65001 >nul
rem 미리보기그림.html 을 1200x630 으로 찍어서 ..\og-image.png 로 저장 (Microsoft Edge 필요, 인터넷 연결 시 폰트 적용)
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
"%EDGE%" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size=1200,630 --screenshot="%~dp0..\og-image.png" "file:///%~dp0미리보기그림.html"
echo 완료: og-image.png
pause
