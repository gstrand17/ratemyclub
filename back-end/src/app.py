from flask import Flask
from models import db  # Import db from models.py
from routes import main

app = Flask(__name__)

app.config['SECRET_KEY'] = 'hello'  # Use a secure random string
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(main)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
