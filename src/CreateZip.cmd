@echo off
setlocal enabledelayedexpansion

set "action=%1"

if not "%action%" == "release" (
    echo "---------------------------------"
    echo "Please run 'Release.cmd' instead."
    echo "---------------------------------"
    pause
    exit /b 1
)

rem -- Get the version of the plugin from the nuspec file --
set "nuspecFile=%~dp0Imageshop.Optimizely.Plugin.nuspec"
set "sedPath=%~dp0PackingTools/sed.exe"

set "version="
for /f %%v in ('type "%nuspecFile%" ^| "%sedPath%" -nE "s/.*<version>(.*)<\/version>.*/\1/p"') do (
    set "version=%%v"
)

echo "---------------------------------------------------"
echo "-- Packing Imageshop.Optimizely.Plugin into .zip --"
echo "--     Plugin version %version%     --"
echo "---------------------------------------------------"

set "CD=%~dp0"  rem Current directory
set "DD=%CD%\ZippedFiles"  rem Destination directory
set "zipFileName=Imageshop.Optimizely.Plugin.zip"  rem Name of the zip file

rem -- Copying files to the Zippedfiles directory. --
echo "Copying tinymce editor files:"
set "destinationPath=%DD%\content\%version%\ClientResources\tinymce\"
xcopy "%CD%\TinyMce\ClientResources\editor\*" "%destinationPath%\" /S /I /Y

echo "Copying tinymce view files:"
set "destinationPath=%DD%\content\%version%\Views\Imageshop\"
xcopy "%CD%\TinyMce\ClientResources\ViewFiles\*" "%destinationPath%\" /S /I /Y

echo "Copying property view files:"
set "destinationPath=%DD%\content\%version%\Views\Shared\DisplayTemplates\"
xcopy "%CD%\PropertyViewFiles\*" "%destinationPath%\" /S /I /Y

echo "Copying scripts:"
set "destinationPath=%DD%\content\%version%\scripts"
xcopy "%CD%\scripts\*" "%destinationPath%\" /S /I /Y

echo "Copying module.config:"
set "destinationPath=%DD%\content\"
copy "module.config" "%destinationPath%\" /Y

rem Create the zip file
set "zipFile=%DD%\%zipFileName%"
rem Delete the existing zip file if it exists
if exist "%zipFile%" (
    del "%zipFile%"
)
powershell -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [System.IO.Compression.ZipFile]::CreateFromDirectory('%DD%\content', '%zipFile%'); }"

echo Zip file created: %zipFile%

endlocal