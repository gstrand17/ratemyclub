from flask import jsonify, request, session, redirect, url_for
from pyexpat.errors import messages
from app import app
from models import *

app.secret_key = "hello"


@app.route('/create-account', methods=['POST']) # Route to create account page
def createUser():
    data = request.get_json() # Pulls json data from front-end input
    if not data: # Catches case where they submit an empty form or connection faulty
        return jsonify(message='No input data provided'), 401

    # Temporary variables used to store json data
    username = data.get('user_name')
    email = data.get('email')
    password = data.get('password')
    firstName = data.get('first_name')
    lastName = data.get('last_name')
    role = data.get('role')
    clubs = data.get('clubs', '')  # Default to empty string if not provided, used for club owners

    # Check if the username or email is taken
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify(message='User already exists!'), 401

    passkey = data.get('passkey') if role == 'admin' else None # Additional variable for admin

    # Create new object based on User model
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
    db.session.commit() # Adds a row in our user table with the input information

    # Cookies created based on current user's information
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


@app.route('/login', methods=['POST']) # Route to login page
def login():
    data = request.get_json()
    if not data:
        return jsonify(message='No Input Provided!'), 401

    # Could either input username or email
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    # Check if either the username or email matches an entry in the user table
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()

    # Sees if user exists!
    if existing_user:
        if existing_user.password == password: # Validate password
            # Create cookies
            session['logged_in'] = True
            session['username'] = existing_user.username
            session['email'] = existing_user.email
            # Checks if the role is admin then leads to a condition to check if they have proper passkey for admin privleges
            if role == 'admin':
                if existing_user.admin:
                    try:
                        passkey = int(data.get('passkey', ''))
                    except ValueError:
                        return jsonify(message='Invalid passkey format!'), 401
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


@app.route('/front-page', methods=['GET']) # Route to main page where club directory is visualized
def front_page():
    if 'logged_in' in session:
        existing_user = User.query.filter((User.username == session['username']) | (User.email == session['email'])).first()
        # Returns first/last name of current user based on cookies
        return jsonify(
            message="Data has been fetched!",
            firstName=existing_user.first_name,
            lastName=existing_user.last_name
        ), 200
    return jsonify(message='You are not logged in!'), 401


@app.route('/profile', methods=['GET', 'PUT']) # Route to profile page
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

        if request.method == 'GET': # Method for displaying current user information
            if existing_user:
                # Returns user data based on cookies
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

        elif request.method == 'PUT': # Method for editing current user information
            data = request.get_json() # Fetches front-end input on profile form
            if not data:
                return jsonify(message='No Input Provided!'), 401

            if existing_user:
                # Updates all cells of current user's row in User table based on fetched json data
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
                # Updates the front end to detail the user information based on the recent changes
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
    # Terminates all Cookies
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('email', None)
    session.pop('admin', None)
    session.pop('club_exec', None)
    session.pop('student', None)
    session.clear()
    return jsonify(message='Successful Logout!'), 200


# Fetches the list of clubs from the database to display on front page
# Display the rest of the info on specific club landing pages?
@app.route('/api/clubs', methods=['GET'])
def get_clubs():
    clubs = ClubDirectory.query.all()
    clubs_data = []
    for club in clubs:
        club.calculate_avg_ratings()
        clubs_data.append({
            'name': club.club_name,
            "description": club.description,
            'tags': club.tags,
            'avg_overall_rating': club.avg_overall_rating,
            'social_rating': club.avg_soc_rating,
            'academic_rating': club.avg_acad_rating,
            'exec_rating': club.avg_exec_rating,
            'comlev': club.avg_comlev,
            'active_mem_rating': club.active_mem,
            'link': club.link
        })
    return jsonify(clubs_data)


@app.route('/api/club-page/<string:name>', methods=['GET']) # Route to individual club landing pages, based on name
def get_club(name: str):
    club = ClubDirectory.query.filter_by(club_name=name).first() # Searches ClubDirectory table to find matching entry
    reviews = ClubReviews.query.filter_by(club_name=name).all() # Searches ClubReviews table to find entries for the club

    reviews_data=[]
    for review in reviews:
        # For every review of the club, an object containing every column value is added to an array to be jsonified
        reviews_data.append({
            'review_num': review.review_num,
            'user_email': review.user_email,
            'club_name': review.club_name,
            'date': review.date,
            'review_text': review.review_text,
            'overall_rating': review.overall_rating,
            'soc_rating':  review.soc_rating,
            'acad_rating': review.acad_rating,
            'exec_rating': review.exec_rating,
            'comlev': review.comlev,
            'current_mem': review.current_mem,
            'time_mem': review.time_mem,
            'paid': review.paid,
            'thumbs': review.thumbs,
            'flagged': review.flagged
    })

    if club:
        # Average ratings calculated before jsonified so front-page is up-to-date, reflecting on ClubReviews table
        club.calculate_avg_ratings()

        return jsonify(
            message="Data has been fetched!",
            reviews=reviews_data, # array of review objects
            name= club.club_name,
            description= club.description,
            tags = club.tags,
            avg_overall_rating=club.avg_overall_rating,
            avg_soc_rating=club.avg_soc_rating,
            avg_acad_rating=club.avg_acad_rating,
            avg_exec_rating=club.avg_exec_rating,
            active_mem_count =club.active_mem,
            avg_comlev=club.avg_comlev,
            link = club.link
        )
    else:
        return jsonify(message='Club not found'), 401


@app.route('/YourReviews', methods=['GET', 'DELETE', 'PUT']) # Route to YourReviews page
def your_reviews():
    if 'logged_in' in session:

        existing_user = User.query.filter((User.username == session['username']) | (User.email == session['email'])).first()
        if not existing_user:
            return jsonify(message='User does not exist!'), 401
        else:
            role = None
            if existing_user.student:
                role = 'student'
            elif existing_user.club_exec:
                role = 'club_exec'
            elif existing_user.admin:
                role = 'admin'

        if request.method == 'GET': # Method responsible for returning all the review data displayed
            # Searches ClubReviews table to find entries written by the current user
            reviews = ClubReviews.query.filter_by(user_email=existing_user.email).all()

            reviews_data = []
            for review in reviews:
                # For every review written by the user, an object containing every column value is added to an array to be jsonified
                reviews_data.append({
                    'review_num': review.review_num,
                    'user_email': review.user_email,
                    'club_name': review.club_name,
                    'date': review.date,
                    'review_text': review.review_text,
                    'overall_rating': review.overall_rating,
                    'soc_rating': review.soc_rating,
                    'acad_rating': review.acad_rating,
                    'exec_rating': review.exec_rating,
                    'comlev': review.comlev,
                    'current_mem': review.current_mem,
                    'time_mem': review.time_mem,
                    'paid': review.paid,
                    'thumbs': review.thumbs,
                    'flagged': review.flagged
                })

            return jsonify(
                message="Data has been fetched!",
                reviews=reviews_data
            )

        elif request.method == 'DELETE': # Method responsible for deleting a desired row in the ClubReviews table
            data = request.get_json()
            review_id = data.get('review_id')

            if not review_id:
                return jsonify(message='Review ID is required!'), 400

            # Desired review in ClubReviews table located by review ID and user email
            delete_review = ClubReviews.query.filter_by(review_num=review_id, user_email=existing_user.email).first()

            if not delete_review:
                return jsonify(message='Review not found!'), 400

            db.session.delete(delete_review) # Row is deleted
            db.session.commit()

            return jsonify(message='Review has been deleted!'), 200
        elif request.method == 'PUT':  # Method for changing reviews on review page
            data = request.get_json()
            review_id = data.get('review_num')  # Ensure this matches the front-end field name

            if not review_id:
                return jsonify(message='Review ID is required!'), 400

            # Desired review in ClubReviews table located by review ID and user email
            edit_review = ClubReviews.query.filter_by(review_num=review_id, user_email=existing_user.email).first()

            if not edit_review:
                return jsonify(message='Review not found!'), 400

            # Update each field only if the new value is provided in the request
            for field in ['soc_rating', 'acad_rating', 'exec_rating', 'review_text', 'comlev', 'current_mem', 'time_mem', 'paid']:
                if field in data:
                    setattr(edit_review, field, data[field])

            db.session.commit()  # Save changes to the database
            return jsonify(message='Review updated successfully!'), 200

    else:
        return jsonify(message='You are not logged in!'), 401


@app.route('/ReviewForm/<string:name>', methods=['GET', 'POST']) # Route to page for submitting new reviews
def write_review(name: str):
    if 'logged_in' in session:

        existing_user = User.query.filter(
            (User.username == session['username']) | (User.email == session['email'])).first()
        club = ClubDirectory.query.filter_by(club_name=name).first()
        if not existing_user:
            return jsonify(message='User does not exist!'), 401
        elif not club:
            return jsonify(message='Club not found!'), 401

        else:
            if request.method == 'GET': # Method for displaying user email and club name in the form
                return jsonify(
                    message="Data has been fetched!",
                    user_email = existing_user.email,
                    club_name = name
                )

            elif request.method == 'POST': # Method called after submit button pressed
                data = request.get_json() # Reads user input

                if not data:
                    return jsonify(message='No Input Provided!'), 401
                else:
                    # A new instances of the ClubReviews model created from front-end input
                    new_review = ClubReviews(review_num=db.session.query(ClubReviews).count() + 1,
                                            # Unique key value generated by quantifying current reviews and adding 1
                                             user_email=existing_user.email,
                                             club_name=name,
                                             date=data.get('date'),
                                             review_text=data.get('review_text'),
                                             overall_rating=data.get('overall_rating', 1), # Values after the comma = default
                                             soc_rating=data.get('soc_rating', 1),
                                             acad_rating=data.get('acad_rating', 1),
                                             exec_rating=data.get('exec_rating', 1),
                                             comlev=data.get('comlev', 1),
                                             current_mem=data.get('current_mem', False),
                                             time_mem=data.get('time_mem'),
                                             paid=data.get('paid', False),
                                             thumbs=0,
                                             flagged=False
                                             )
                    db.session.add(new_review) # New row is added to the table
                    db.session.commit()
                return jsonify(
                    message="Review created!"
                ), 201


@app.route('/api/review/<int:review_id>/thumbs-up', methods=['POST'])
def thumbs_up(review_id):
    if 'email' not in session:
        return jsonify(message="User not logged in"), 401

    user_email = session['email']
    review = ClubReviews.query.get(review_id)
    if not review:
        return jsonify(message="Review not found"), 404

    liked_by = review.liked_by or []

    if user_email in liked_by:
        return jsonify(message="User already liked this review"), 400

    review.thumbs += 1
    liked_by.append(user_email)
    review.liked_by = liked_by
    db.session.commit()

    return jsonify(message="Thumbs up updated", thumbs=review.thumbs), 200



@app.route('/api/liked-reviews', methods=['GET']) # Route to fetch reviews liked by curr user
def get_liked_reviews():
    if 'email' not in session:
        return jsonify(message="User not logged in"), 401

    user_email = session['email']
    #liked_reviews = ClubReviews.query.filter(ClubReviews.liked_by.contains([user_email])).all()
    liked_reviews = ClubReviews.query.filter(ClubReviews.liked_by.like(f'%{user_email}%')).all()
    liked_review_ids = [review.review_num for review in liked_reviews]

    return jsonify(liked_reviews=liked_review_ids), 200

#route for flag functionality
@app.route('/api/review/<int:review_id>/flag', methods=['POST'])
def flag_review(review_id):
    review = ClubReviews.query.get(review_id)
    if not review:
        return jsonify(message="Review not found"), 404
    review.flagged = True
    db.session.commit()
    return jsonify(message="Review flagged"), 200

#return the logged-in user's role and assoc club
@app.route('/api/user-role', methods=['GET'])
def get_user_role():
    if 'logged_in' not in session or 'email' not in session:
        return jsonify(message='Unauthorized'), 401

    user_email = session.get('email')
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify(message='User not found'), 404

    if user.admin:
        role = 'admin'
    elif user.club_exec:
        role = 'club_exec'
    else:
        role = 'student'


    return jsonify({
        'role': role,
        'clubs': user.clubs,
        'user_email': user_email
    }), 200

#handle put request for when club owners edit club page
@app.route('/api/club-page/<string:club_name>', methods=['PUT'])
def update_club(club_name):
    if 'logged_in' not in session:
        return jsonify(message='Unauthorized'), 401

    user_email = session.get('email')
    user = User.query.filter_by(email=user_email).first()  # Fetch user details

    if not user:
        return jsonify(message='User not found'), 402
    if not user.club_exec:
        return jsonify(message='Unauthorized - Not a club executive'), 403
    if user.clubs != club_name:
        return jsonify(message=f'Unauthorized - User does not belong to {club_name}'), 404

    data = request.get_json()
    club = ClubDirectory.query.filter_by(club_name=club_name).first()

    if not club:
        return jsonify(message='Club not found'), 405

    club.description = data.get('description', club.description)
    club.link = data.get('link', club.link)

    db.session.commit()

    return jsonify(message='Club updated successfully'), 200

#route for admin to delete student reviews from database
@app.route('/api/review/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    if 'admin' not in session:
        return jsonify(message='Unauthorized'), 401

    review = ClubReviews.query.get(review_id)
    if not review:
        return jsonify(message='Review not found'), 404

    db.session.delete(review)
    db.session.commit()
    return jsonify(message='Review deleted successfully'), 200

#route for admin to un-flag a review
@app.route('/api/review/<int:review_id>/unflag', methods=['POST'])
def unflag_review(review_id):
    if 'admin' not in session:
        return jsonify(message='Unauthorized'), 401

    review = ClubReviews.query.get(review_id)
    if not review:
        return jsonify(message='Review not found'), 404

    review.flagged = False
    db.session.commit()
    return jsonify(message='Review unflagged'), 200