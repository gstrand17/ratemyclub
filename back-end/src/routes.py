from flask import Blueprint, render_template, request, redirect, url_for, flash
from models import User, db  # Import db from models.py

main = Blueprint('main', __name__)

@main.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form.get('username')
        id = request.form.get('id')

        if username and id:
            new_user = User(username=username, id=id)
            db.session.add(new_user)
            db.session.commit()
            flash('Your account has been created!')
            return redirect(url_for('main.index'))
        else:
            flash('Please fill all the fields')

    users = User.query.all()
    return render_template("index.html", users=users)
