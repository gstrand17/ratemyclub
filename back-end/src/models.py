from multiprocessing import Array

from app import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float
import os
from xmlrpc.client import Boolean

basedir = os.path.abspath(os.path.dirname(__file__)) # path for the application itself
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join('C:/Users/graci', basedir, 'planets.db') # join is an os specific library

db = SQLAlchemy(app) # initializes database with a constructor

# ORM's work by taking objects/classes and converting them to SQL behind the scenes
#database models
class User(db.Model): # there will be one instance of this class
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


class ClubDirectory(db.Model): # there will be one instance of this class
    __tablename__ = 'club_directory'
    ID = Column(Integer, primary_key=True) #this needs to be the hash value
    club_name = Column(String)
    tags = Column(Array(String))
    avg_overall_rating = Column(Float)
    avg_soc_rating = Column(Float)
    avg_acad_rating = Column(Float)
    avg_exec_rating = Column(Float)
    avg_comlev = Column(Float)
    active_mem = Column(Integer)
    description = Column(String)
    link = Column(String)


class ClubReviews(db.Model): # there will be lots of instances of this class
     # somehow the name of an instance needs to correspond with the hashed ID
    __tablename__ = 'club_reviews'
    user = Column(String, primary_key=True)
    date = Column(String) # date format?
    overall_rating = Column(Float)
    soc_rating = Column(Float)
    acad_rating = Column(Float)
    exec_rating = Column(Float)
    comlev = Column(Float)
    current_mem = Column(Boolean)
    time_mem = Column(String) # date format?
    paid = Column(Boolean)

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
class User(db.Model): # there will be one instance of this class
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


class ClubDirectory(db.Model): # there will be one instance of this class
    __tablename__ = 'club_directory'
    ID = Column(Integer, primary_key=True) #this needs to be the hash value
    club_name = Column(String)
    tags = Column(Array(String))
    avg_overall_rating = Column(Float)
    avg_soc_rating = Column(Float)
    avg_acad_rating = Column(Float)
    avg_exec_rating = Column(Float)
    avg_comlev = Column(Float)
    active_mem = Column(Integer)
    description = Column(String)
    link = Column(String)


class ClubReviews(db.Model): # there will be lots of instances of this class
     # somehow the name of an instance needs to correspond with the hashed ID
    __tablename__ = 'club_reviews'
    user = Column(String, primary_key=True)
    date = Column(String) # date format?
    overall_rating = Column(Float)
    soc_rating = Column(Float)
    acad_rating = Column(Float)
    exec_rating = Column(Float)
    comlev = Column(Float)
    current_mem = Column(Boolean)
    time_mem = Column(String) # date format?
    paid = Column(Boolean)

