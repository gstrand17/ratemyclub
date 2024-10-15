from app import app
from flask import Flask, jsonify, request

valid_password = "123456"

@app.route('/')  # decorator here defines route for our endpoint (URL)
def hello_world():  # function
    return 'Hello World!!' # make sure there are two empty lines between functions


@app.route('/log-in/<string:username>/<string:password>') # var types comes before
def url_variables(username: str, password: int): # var type comes after
    if password != valid_password:
        return jsonify(message='Incorrect password'), 401
    else:
        return jsonify(message='Welcome ' + username), 200

    #basic idea of one way we can do login with routes, of course the database would need to be involved