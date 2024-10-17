from app import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, Boolean
from flask_session import Session
import os

# Set up the path for the database
basedir = os.path.abspath(os.path.dirname(__file__))  # Path for the application itself
db_dir = os.path.join(basedir, '../Databases')
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(db_dir, 'ratemyclub-db.sqlite')  # Join is an os-specific library
app.config['SESSION_TYPE'] = 'sqlalchemy'

# Initialize the database with the app
db = SQLAlchemy(app)  # Initializes the database with a constructor

app.config['SESSION_SQLALCHEMY'] = db

server_session = Session(app)

# Define the User model
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
    clubs = Column(String)  # for club exec
    passkey = Column(Integer)  # for admin

# Define the ClubDirectory model
class ClubDirectory(db.Model):
    __tablename__ = 'club_directory'
    ID = Column(Integer, primary_key=True)  # This needs to be the hash value
    club_name = Column(String)
    tags = Column(String)  # Use a String or JSON type if needed
    avg_overall_rating = Column(Float)
    avg_soc_rating = Column(Float)
    avg_acad_rating = Column(Float)
    avg_exec_rating = Column(Float)
    avg_comlev = Column(Float)
    active_mem = Column(Integer)
    description = Column(String)
    link = Column(String)

# Define the ClubReviews model
class ClubReviews(db.Model):  # There will be lots of instances of this class
    __tablename__ = 'club_reviews'
    user = Column(String, primary_key=True)
    date = Column(String)  # Date format?
    overall_rating = Column(Float)
    soc_rating = Column(Float)
    acad_rating = Column(Float)
    exec_rating = Column(Float)
    comlev = Column(Float)
    current_mem = Column(Boolean)
    time_mem = Column(String)  # Date format?
    paid = Column(Boolean)

