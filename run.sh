#!/bin/bash

# Function to start React frontend and Flask backend
start_project() {
    echo "Starting React frontend..."
    cd front-end
    npm start &  # Run React frontend in background

    echo "Starting Flask backend..."

    cd ../back-end
    # Attempt to activate Windows virtual environment, if it fails, fallback to Linux
    .venv/Scripts/activate 2>/dev/null || source .venv/bin/activate
    cd src
    python app.py
}

# Check if the platform is Linux or Windows (via WSL or Cygwin)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux commands
    echo "Starting React frontend and Flask backend on Linux..."
    start_project

elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]]; then
    # Windows commands (WSL or Cygwin)
    echo "Starting React frontend and Flask backend on Windows..."
    start_project

else
    echo "Unsupported OS"
fi
