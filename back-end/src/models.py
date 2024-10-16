from app import app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, Boolean
import os

# Set up the path for the database
basedir = os.path.abspath(os.path.dirname(__file__))  # Path for the application itself
db_dir = os.path.join(basedir, '../Databases')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(db_dir, 'ratemyclub-db.sqlite')  # Join is an os-specific library

# Initialize the database with the app
db = SQLAlchemy(app)  # Initializes the database with a constructor

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

# Define CLI commands
@app.cli.command('db_create')  # Command line word to do something
def db_create():
    db.create_all()  # Create all tables in the database
    print('Database created!')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()  # Method from SQLAlchemy
    print('Database dropped!')


@app.cli.command('db_seed')  # Starter data
def db_seed():
    test_user = User(email='julioarboleda@ufl.edu', username='julio', password='coding123',
                     first_name='Julio', last_name='Arboleda', student=True, club_exec=False, admin=False,
                     clubs='', passkey=0)
    db.session.add(test_user)
    db.session.commit()  # Don't forget to commit to save the user


@app.cli.command('db_show_tables')  # CLI command to show tables
def db_show_tables():
    """List all tables in the database."""
    tables = db.metadata.tables.keys()  # Get the names of the tables
    if tables:
        print("Tables in the database:")
        for table in tables:
            print(f"- {table}")
    else:
        print("No tables found in the database.")


@app.cli.command('db_show_users')  # CLI command to show users
def db_show_users():
    """List all users in the User table."""
    users = User.query.all()  # Query all User records
    if users:
        print("Users in the User table:")
        for user in users:
            print(f"- Email: {user.email}, Username: {user.username}, First Name: {user.first_name}, Last Name: {user.last_name}")
    else:
        print("No users found in the User table.")
