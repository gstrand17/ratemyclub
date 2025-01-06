@echo off

echo Starting Vite frontend...
cd front-end
npm install 
npm run dev 

echo Starting Flask backend...
cd ..\back-end
venv\Scripts\activate
cd src
python app.py
