from models import *
from app import app

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