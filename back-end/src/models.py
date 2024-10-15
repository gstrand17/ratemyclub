from app import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float
import os
from xmlrpc.client import Boolean

basedir = os.path.abspath(os.path.dirname(__file__)) # path for the application itself
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join('C:/Users/graci', basedir, 'planets.db') # join is an os specific library

db = SQLAlchemy(app) # initializes database with a constructor



@app.cli.command('db_create') #command line word to do something
def db_create():
    db.create_all()
    print('Database created!')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all() #method from sqlalchemy
    print('Database dropped!')


@app.cli.command('db_seed') # starter data
def db_seed():
    test_user = User(email = 'gstrand@ufl.edu', username = 'gstrand17', password = 'coding123',
                     first_name='Graciela', last_name='Strand', student=True, club_exec=False, admin=False,
                     clubs='', passkey=0)
    db.session.add(test_user)


# ORM's work by taking objects/classes and converting them to SQL behind the scenes
#database models
class User(db.Model):
    __tablename__ = 'users'
    email = Column(String, primary_key=True, unique=True)
    username = Column(String, unique=True)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    student = Column(Boolean)
    admin = Column(Boolean)
    club_exec = Column(Boolean)
    clubs = Column(String) #for club exec
    passkey = Column(Integer) #for admin

