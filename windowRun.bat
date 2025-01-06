@echo off

REM Function to start Vite frontend and Flask backend
call :start_project

goto :eof

:start_project
echo Starting Vite frontend...
cd front-end
REM Ensure dependencies are installed and start Vite
npm install REM Install dependencies if necessary
start npm run dev REM Run Vite server in a new window

echo Starting Flask backend...
cd ..\back-end
REM Activate the virtual environment (Windows-specific)
call venv\Scripts\activate.bat
cd src
python app.py
goto :eof