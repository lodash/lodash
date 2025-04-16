@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  Hvigor startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

set WRAPPER_MODULE_PATH=%APP_HOME%\hvigor\hvigor-wrapper.js
set NODE_EXE=node.exe

goto start

:start
@rem Find node.exe
if defined NODE_HOME goto findNodeFromNodeHome

%NODE_EXE% --version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto execute

echo.
echo ERROR: NODE_HOME is not set and no 'node' command could be found in your PATH.
echo.
echo Please set the NODE_HOME variable in your environment to match the
echo location of your NodeJs installation.

goto fail

:findNodeFromNodeHome
set NODE_HOME=%NODE_HOME:"=%
set NODE_EXE_PATH=%NODE_HOME%/%NODE_EXE%

if exist "%NODE_EXE_PATH%" goto execute
echo.
echo ERROR: NODE_HOME is not set and no 'node' command could be found in your PATH.
echo.
echo Please set the NODE_HOME variable in your environment to match the
echo location of your NodeJs installation.

goto fail

:execute
@rem Execute hvigor
"%NODE_EXE%" "%WRAPPER_MODULE_PATH%" %*

if "%ERRORLEVEL%" == "0" goto hvigorwEnd

:fail
exit /b 1

:hvigorwEnd
if "%OS%" == "Windows_NT" endlocal

:end
