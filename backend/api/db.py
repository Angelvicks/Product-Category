from flask_sqlalchemy import SQLAlchemy
import os

fullPath = os.path.abspath(os.getcwd())

db = SQLAlchemy()

UPLOAD_FOLDER = os.path.join(fullPath, 'uploads')