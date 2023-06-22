@echo off
REM Run CreateZip.cmd
CALL CreateZip.cmd release

dotnet pack Imageshop.Optimizely.Plugin.csproj -p Configuration=Release
pause