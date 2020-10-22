from db import db
import re
from werkzeug.routing import BaseConverter
import pickle

class UserModel(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    fullName = db.Column(db.String(80))
    gender = db.Column(db.String(80))
    country = db.Column(db.String(80))
    email = db.Column(db.String(80))
    password = db.Column(db.String(80))
    date = db.Column(db.String(80))
    confirmEmail = db.Column(db.Boolean, default=False)

    prediction = db.relationship('PredictionModel', lazy='dynamic', backref = 'user', cascade = 'all, delete-orphan')

    user_result = db.relationship('ResultsModel', lazy='dynamic', backref = 'user', cascade = 'all, delete-orphan')

   # regex = ' ^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$ '
    r = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"

    # store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))
    # store = db.relationship('StoreModel')

    def __init__(self, fullName, gender, email, password, cpassword, country):
        self.fullName = fullName
        self.gender = gender
        self.email = email
        self.password = password
        self.country = country


    def json(self):
        return {
            'fullName': self.fullName,
            'email': self.email,
            'country': self.country,
            'gender': self.gender,
            'date': self.date,
            'id': self.id
        }
    
    @classmethod
    def check(cls, email):
        #if (re.search(r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b', email)):
        if re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return True
        else:
            return False


    @classmethod
    def find_by_name(cls, fullName):
        return cls.query.filter_by(fullName=fullName).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()



        