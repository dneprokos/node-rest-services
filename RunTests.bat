@echo off
echo Running Jest tests...

rem Run Jest tests
npx jest --config=jest.config.js

rem Check if tests completed successfully
if %errorlevel% equ 0 (
    echo Opening HTML report...
    start "" "test-reports\test-report.html"
) else (
    echo Tests failed.
)

echo Done