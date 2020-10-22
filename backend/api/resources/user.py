from flask import request, session, flash, request, redirect, url_for
from flask_restful import Resource, reqparse
import os
from werkzeug.utils import secure_filename
# from flask_jwt_extended import jwt_required, get_jwt_claims, jwt_optional, get_jwt_identity
import re
from models.user import UserModel
from datetime import date
import time
from datetime import datetime
from models.testdata import PredictionModel, ResultsModel
from db import UPLOAD_FOLDER 
from models.prediction import makePrediction
import pandas as pd
import numpy as np

import pickle

ALLOWED_EXTENSIONS = {'csv'}
LABELS = ['Inv_Id', 'Vendor_Code', 'GL_Code', 'Inv_Amt', 'Item_Description', 'Product_Category']

def allowed_file(filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def respond(data='', message='Data not found', code=200):
    if(code == 200 or code == 201):
        return {
            "success": True,
            "message": message,
            "response": data
        }
    elif(code == 400 or code == 401 or code == 400):
        return {
            "success": False,
            "message": message
        }
    else:
        return {
            'success': False,
            'message': 'Server Error'
        }

class Register(Resource):
    def post(self):

        data =  request.get_json()
        if not data:
            return respond(message="No Request Body", code=400), 200

        if(data['password'] != data['cpassword']):
            return respond(message='Password Does Not Correspond', code=400), 200
        
        if(not UserModel.check(email=data['email'])):
            return respond(message='Invalid Email', code=400), 200

        if(UserModel.find_by_email(data['email'])):
            return respond(message='Email Already Exist', code=400), 200

        user = UserModel(**data)
        user.date = str(datetime.now())
        user.save_to_db()
        return respond(user.json(), 'Welcome to you account '+ user.fullName, 201), 201

class GetAllUsers(Resource):
    def get(self):
        list_users = UserModel.find_all()
        user_list = [user.json() for user in list_users]

        return respond(user_list, 'success', code=200),200

class Login(Resource):
    def post(self):
        data =  request.get_json()
        user = UserModel.find_by_email(data['email'])
        if not user:
            return respond(message='User does not exist', code=400),200 #not found
            #session['logged_in'] = True
        
        if user.password != data['password']:
            return respond(message='Incorrect password', code=400), 200 #can't allow access, bad request
        else:
            return respond(user.json(), message='Welcome back, {}'.format(user.fullName), code=200), 200


class UpdateProfile(Resource):
    def post(self):
        data = request.get_json()
        user = UserModel.find_by_email(data['email'])
        if not user:
            return respond(message='User does not exist, Please create an account', code=400),200
        else:
            user.fullName = data['fullName']
            user.gender = data['gender']
            user.country = data['country']
            user.email = data['email']
            user.password = data['password']

            user.save_to_db()
            return respond(user.json(), 'User succesfully updated', code=201),201

class Delete(Resource):
    def delete(self):
        data = request.get_json()
        user = UserModel.find_by_email(data['email'])
        if user:
            user.delete_from_db()
            return respond(message='Successfully deleted', code=200)
        return respond(message='User not registered', code=400), 200

class MakePrediction(Resource):
    def post(self):
        data = request.get_json()

        if (not UserModel.find_by_id(data['user_id'])):
            return respond(message='No user found with that Id', code=400),200

        dataset = pd.read_csv(data['filepath'])
        heads = list(dataset)
        body = makePrediction(dataset)
        
        body['Y'] = pd.DataFrame(data=body['Y'],    # values
              index=body['Y'],    # 1st column as index
           columns=['predicted'])


        body['X'].insert(0, 'Predicted', body['Y'].values) 


        
        return respond({
                    'head':list(dict(body)['X']),
                    'body': body['X'].values.tolist()
                }, 'success')

class GetAllUserResults(Resource):
    def get(self, id):
        if (not UserModel.find_by_id(id)):
            return respond(message='No user found with that Id', code=400),200

        user_predictions = [prediction.json() for prediction in PredictionModel.find_by_user_id(id)]
        user_results = [result.json() for result in ResultsModel.find_by_user_id(id)]

        for user_prediction in user_predictions:
            user_prediction.pop('prediction_result')

        response = [dict(predictions, **results) for predictions, results in zip(user_predictions,user_results)]

        return respond(response, "Success")


class UploadFile(Resource):
    def post(self):
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return respond(None, code=400)
            file = request.files['file']
            # if user does not select file, browser also
            # submit an empty part without filename
            if file.filename == '':
                flash('No selected file')
                return respond(None, code=400)
            if file and allowed_file(file.filename):

                filename = secure_filename(file.filename)
                filesplit = filename.split(".")
                filename = '.'.join(filesplit[:len(filesplit)-1]) + str(time.time()) + "." +filesplit[-1]
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)

                dataset = pd.read_csv(filepath)
                heads = list(dataset)
                body = np.array(dataset).tolist()[:25]

                body = [body[:3], body[3:6], body[6:9], body[9:12], body[12:15], body[15:18], body[18:21], body[21:24]][0]+[body[:3], body[3:6], body[6:9], body[9:12], body[12:15], body[15:18], body[18:21], body[21:24]][1]+ [body[:3], body[3:6], body[6:9], body[9:12], body[12:15], body[15:18], body[18:21], body[21:24]][2] 
                for head in heads: 
                    if head not in LABELS:
                        return respond(message='File does not match model labels', code=400)

                return respond({
                    'filename': filepath,
                    'head':heads,
                    'body': body
                }, 'success')
        return respond(message='No File found', code=400)