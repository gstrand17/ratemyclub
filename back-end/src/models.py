from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Initialize db here

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
