from flask import jsonify, request, session, redirect, url_for
from pyexpat.errors import messages
from app import app
from models import *

app.secret_key = "hello"


@app.route('/')  # decorator here defines route for our endpoint (URL)
def hello_world():  # function
    return 'Hello World!!' # make sure there are two empty lines between functions


@app.route('/sign-up', methods=['POST'])
def createUser():
    data = request.get_json()
    if not data:
        return jsonify(message='No input data provided'), 401

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    student = data.get('student', False)  # Default to False if not provided
    admin = data.get('admin', False)  # Default to False if not provided
    club_exec = data.get('club_exec', False)  # Default to False if not provided
    clubs = data.get('clubs', '')  # Default to empty string if not provided
    passkey = data.get('passkey', 0)  # Default to 0 if not provided

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify(message='User already exists'), 401

    new_user = User(
        username=username,
        email=email,
        password=password,  # Consider hashing the password before storing it
        first_name=first_name,
        last_name=last_name,
        student=student,
        admin=admin,
        club_exec=club_exec,
        clubs=clubs,
        passkey=passkey
        )

    db.session.add(new_user)
    db.session.commit()

    return jsonify(message='User created'), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify(message='No input data provided'), 401

    # Could either input username or email
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()

    if existing_user:
        if existing_user.password == password:
            session['logged_in'] = True
            session['username'] = existing_user.username
            session['email'] = existing_user.email
            session['admin'] = existing_user.admin
            session['club_exec'] = existing_user.club_exec
            session['student'] = existing_user.student
        else:
            return jsonify(message='Incorrect password'), 401

    return jsonify(message='Logged in!'), 200


@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('email', None)
    session.pop('admin', None)
    session.pop('club_exec', None)
    session.pop('student', None)
    return redirect(url_for('login'))


@app.route('/log-in/<string:username>/<string:password>') # var types comes before
def url_variables(username: str, password: int): # var type comes after
    if password != '1234':
        return jsonify(message='Incorrect password'), 401
    else:
        return jsonify(message='Welcome ' + username), 200

    # basic idea of one way we can do login with routes, of course the database would need to be involved


