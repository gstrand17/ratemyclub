@echo off

REM Installation for Flask backend and React frontend

echo Starting Flask backend installation
cd back-end
python -m venv .venv
.venv\Scripts\activate
pip install Flask Flask-Cors Flask-Script Flask-Session Flask-SQLAlchemy SQLAlchemy
cd src
Flask db_create
Flask db_seed
cd ..
deactivate
cd ..

echo Starting React frontend installation
cd front-end
npm install
cd ..

REM Installation Script finished
echo Installation completed. Press any key to exit the console.
pause >nul
exit
