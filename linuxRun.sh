#!/bin/bash

# Function to start React frontend and Flask backend
start_project() {
    echo "Starting React frontend..."
    cd front-end
    npm start &  # Run React frontend in the background

    echo "Starting Flask backend..."
    cd ../back-end
    # Activate the virtual environment (Linux-specific)
    source .venv/bin/activate
    cd src
    python app.py
}

# Check if the platform is Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Starting React frontend and Flask backend on Linux..."
    start_project
else
    echo "This script is intended to run only on Linux systems."
    exit 1
fi