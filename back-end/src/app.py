from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float
import os


app = Flask(__name__) #__name__ means name of app takes name from script

if __name__ == '__main__':
    app.run()