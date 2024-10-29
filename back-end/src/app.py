from flask import Flask
import os


app = Flask(__name__) #__name__ means name of app takes name from script

from routes import *  # Import after app is initialized
from models import *
from command import *

if __name__ == '__main__':
    app.run(debug=True)