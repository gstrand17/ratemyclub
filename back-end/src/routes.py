from flask import jsonify, request, session, redirect, url_for
from pyexpat.errors import messages
from app import app
from models import *

app.secret_key = "hello"


@app.route('/')  # decorator here defines route for our endpoint (URL)
def hello_world():  # function
    return 'Hello World!!' # make sure there are two empty lines between functions


@app.route('/create-account', methods=['POST'])
def createUser():
    data = request.get_json()
    if not data:
        return jsonify(message='No input data provided'), 401

    username = data.get('user_name')
    email = data.get('email')
    password = data.get('password')
    firstName = data.get('first_name')
    lastName = data.get('last_name')
    role = data.get('role')
    clubs = data.get('clubs', '')  # Default to empty string if not provided

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify(message='User already exists!'), 401

    passkey = data.get('passkey') if role == 'admin' else None

    new_user = User(
        username=username,
        email=email,
        password=password,
        first_name=firstName,
        last_name=lastName,
        student=role == 'student',
        admin=role == 'admin',
        club_exec=role == 'club_exec',
        clubs=clubs,
        passkey=passkey
        )

    db.session.add(new_user)
    db.session.commit()

    session['logged_in'] = True
    session['username'] = new_user.username
    session['email'] = new_user.email
    if role == 'admin':
        session['admin'] = True
    # Checks if the role is club_exec then creates a cookie to provide club_exec privileges
    if role == 'club_exec':
        session['club_exec'] = True
    # If the roles were not admin and club_execs from previous if conditions then it results to default student
    session['student'] = True

    return jsonify(message='User created!'), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify(message='No Input Provided!'), 401

    # Could either input username or email
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()

    # Sees if user exists!
    if existing_user:
        if existing_user.password == password:
            session['logged_in'] = True
            session['username'] = existing_user.username
            session['email'] = existing_user.email
            # Checks if the role is admin then leads to a condition to check if they have proper passkey for admin privleges
            if role == 'admin':
                if existing_user.admin:
                    passkey = data.get('passkey')
                    if passkey == existing_user.passkey:
                        session['admin'] = True
                    else:
                        return jsonify(message='Passkey Incorrect!'), 401
                else:
                    return jsonify(message='Not an Admin!'), 401
            # Checks if the role is club_exec then creates a cookie to provide club_exec privileges
            if role == 'club_exec':
                if existing_user.club_exec:
                    session['club_exec'] = True
                else:
                    return jsonify(message='Not an Club Executive!'), 401
            # If the roles were not admin and club_execs from previous if conditions then it results to default student
            session['student'] = True
        else:
            # This means that the password is incorrect
            return jsonify(message='Incorrect Password!'), 401
    else:
        # User does not exist!
        return jsonify(message='User not found!'), 401
    # Login is successful and cookies have been established
    print("Session Variables Set:", session)
    return jsonify(message='Successful Login!'), 200


@app.route('/front-page', methods=['GET'])
def front_page():
    if 'logged_in' in session:
        existing_user = User.query.filter((User.username == session['username']) | (User.email == session['email'])).first()
        return jsonify(
            message="Data has been fetched!",
            firstName=existing_user.first_name,
            lastName=existing_user.last_name
        ), 200
    return jsonify(message='You are not logged in!'), 401


@app.route('/profile', methods=['GET', 'PUT'])
def profile():
    if 'logged_in' in session:
        existing_user = User.query.filter((User.username == session['username']) | (User.email == session['email'])).first()
        if existing_user:
            role = None
            if existing_user.student:
                role = 'student'
            elif existing_user.club_exec:
                role = 'club_exec'
            elif existing_user.admin:
                role = 'admin'
        else:
            return jsonify(message='User does not exist!'), 401
        if request.method == 'GET':
            if existing_user:
                return jsonify(
                    message = "Data has been fetched!",
                    first_name = existing_user.first_name,
                    last_name = existing_user.last_name,
                    username = existing_user.username,
                    email = existing_user.email,
                    password = existing_user.password,
                    role = role
                )
            else:
                return jsonify(message='User does not exist!'), 401
        elif request.method == 'PUT':
            data = request.get_json()
            if not data:
                return jsonify(message='No Input Provided!'), 401

            if existing_user:
                existing_user.first_name = data.get('first_name', existing_user.first_name)
                existing_user.last_name = data.get('last_name', existing_user.last_name)
                existing_user.email = data.get('email', existing_user.email)
                existing_user.username = data.get('username', existing_user.username)
                existing_user.password = data.get('password', existing_user.password)
                existing_user.clubs = data.get('clubs', existing_user.clubs)
                db.session.commit()
            else:
                return jsonify(message='User does not exist!'), 401
            return jsonify(
                message="Data has been fetched!",
                firstName= existing_user.first_name,
                lastName= existing_user.last_name,
                userName = existing_user.username,
                email= existing_user.email,
                password = existing_user.password,
                role = role
            )
    else:
        return jsonify(message='You are not logged in!'), 401


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('email', None)
    session.pop('admin', None)
    session.pop('club_exec', None)
    session.pop('student', None)
    session.clear()
    return jsonify(message='Successful Logout!'), 200


@app.route('/log-in/<string:username>/<string:password>') # var types comes before
def url_variables(username: str, password: int): # var type comes after
    if password != '1234':
        return jsonify(message='Incorrect password'), 401
    else:
        return jsonify(message='Welcome ' + username), 200

    # basic idea of one way we can do login with routes, of course the database would need to be involved


