from flask import Flask
from flask_restful import Resource, Api
from resources.user import Register, Login, UpdateProfile, Delete, MakePrediction, GetAllUsers, GetAllUserResults, UploadFile
from flask_cors import CORS
from db import UPLOAD_FOLDER

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 166 * 1024 * 1024

app.secret_key = 'jose'
CORS(app)

api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(Register, '/productCategory/register')
api.add_resource(GetAllUserResults, '/productCategory/userresults/<int:id>')
api.add_resource(GetAllUsers, '/productCategory/alluser')
api.add_resource(Login, '/productCategory/login')
api.add_resource(UpdateProfile, '/productCategory/update')
api.add_resource(Delete, '/productCategory/delete')
api.add_resource(UploadFile, '/productCategory/upload')
api.add_resource(MakePrediction, '/productCategory/prediction')

if __name__ == '__main__':
    from db import db, UPLOAD_FOLDER
    db.init_app(app)
    app.run(port=5000, debug=True)