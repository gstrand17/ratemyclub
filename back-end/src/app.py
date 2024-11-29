from flask import Flask
from flask_cors import CORS
import os


app = Flask(__name__) #__name__ means name of app takes name from script
CORS(app, supports_credentials=True)

from routes import *  # Import after app is initialized
from models import *
from command import *

if __name__ == '__main__':
    app.run(debug=True)

