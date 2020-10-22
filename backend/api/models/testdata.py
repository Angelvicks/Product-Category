from db import db
from models.user import UserModel
import numpy as np
from werkzeug.routing import BaseConverter
import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text
from sqlalchemy.orm import relationship

class PredictionModel(db.Model):
    __tablename__ = 'prediction'

    pre_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Gl_Code = db.Column(db.String(80))
    Vendor_Code = db.Column(db.String(80))
    Inv_Amt = db.Column(db.Integer)
    Item_Description = db.Column(db.String(300))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    prediction_result = db.relationship('ResultsModel', lazy='dynamic', backref = 'prediction', cascade = 'all, delete-orphan')

    def __init__ (self, Gl_Code, Vendor_Code, Inv_Amt, Item_Description, user_id):

        self.Gl_Code = str(Gl_Code)
        self.Vendor_Code = str(Vendor_Code)
        self.Inv_Amt = Inv_Amt
        self.Item_Description = str(Item_Description)
        self.user_id = user_id
        
    def json(self):
        return {

            'Gl_Code': self.Gl_Code,
            'Vendor_Code': self.Vendor_Code,
            'Inv_Amt': self.Inv_Amt,
            'Item_Description': self.Item_Description, 
            'pre_id': self.pre_id,
            'prediction_result': self.prediction_result,    
            'user_id': self.user_id    
        }

        
    def cleanData(self):
        data_list = [int(self.Vendor_Code), int(self.Gl_Code), self.Inv_Amt, int(self.Item_Description)]
        data_npArry = np.array(data_list)
        return data_npArry.reshape(-1,4)

    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()
    
    
    def save_to_db(self):
            db.session.add(self)
            db.session.commit()

    def delete_from_db(self):
            db.session.delete(self)
            db.session.commit()

class ResultsModel(db.Model):

    __tablename__ = 'results'

    result_id = db.Column(db.Integer, primary_key=True, autoincrement= True)
    result_date = db.Column(db.String(80))
    result = db.Column(db.String(80))

    pre_result_id = db.Column(db.Integer, db.ForeignKey('prediction.pre_id'), nullable=False, unique=True)
    user_result_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    

    def __init__(self, result):
        self.result = result

    def json(self):
        return {
            'result_date': self.result_date,
            'result': int(self.result),
            'pre_result_id': self.pre_result_id,
            'result_id': self.result_id
        }

    @classmethod
    def find_by_user_id(cls, user_result_id):
        return cls.query.filter_by(user_result_id=user_result_id).all()
    
    
    @classmethod
    def find_by_pre_id(cls, pre_result_id):
        return cls.query.filter_by(pre_result_id=pre_result_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

      
