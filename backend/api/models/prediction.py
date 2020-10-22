import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import StratifiedKFold

# metrics
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# models
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

import warnings

warnings.filterwarnings('ignore')
from tqdm import tqdm
import re
import pickle

data = pickle.load( open( "modelData.pkl", "rb" ) )

model = data['model']
data_train = data['train_Data']
stopwords = data['stopwords']

def cleanDescription(df):
    processed_text = []
    for sentence in tqdm(df):
        sentence = re.sub("\S*\d\S*", "", sentence).strip()
        sentence = re.sub('[^A-Za-z]+', ' ', sentence)
        sentence = ''.join(e.lower() for e in sentence.split() if e.lower() not in list(stopwords))
        processed_text.append(sentence.strip())
        
    return processed_text

class Transform:
    
    def __init__(self, columns=None):
        self.columns = columns # array of column names to encode


    def fit(self, X, y=None):
        self.encoders = {}
        columns = X.columns if self.columns is None else self.columns
        for col in columns:
            self.encoders[col] = LabelEncoder().fit(X[col])
        return self


    def transform(self, X):
        output = X.copy()
        columns = X.columns if self.columns is None else self.columns
        for col in columns:
            output[col] = self.encoders[col].transform(X[col])
        return output


    def fit_transform(self, X, y=None):
        return self.fit(X,y).transform(X)


    def inverse_transform(self, X):
        output = X.copy()
        columns = X.columns if self.columns is None else self.columns
        for col in columns:
            output[col] = self.encoders[col].inverse_transform(X[col])
        return output

def inverse(data, x):
    tr = Transform(columns=['Vendor_Code','GL_Code','Product_Category', 'Item_Description'])
    transformed_data = tr.fit_transform(data_train)

    body = pd.DataFrame(data=data,    # values
              index=data,    # 1st column as index
           columns=['predicted'])


    x.insert(0, 'Product_Category', body.values)

    invers = tr.inverse_transform(transformed_data)

    print(invers, transformed_data)

def makePrediction(datas):
        data = datas
        data['Item_Description']=cleanDescription(data['Item_Description'].values)
        tr = Transform(columns=['Vendor_Code','GL_Code', 'Item_Description'])
        transformed_data = tr.fit_transform(data)
        transformed_data.drop('Inv_Id',axis=1,inplace=True)
        d = datas.drop('Inv_Id',axis=1,inplace=True)
        y = model.predict(transformed_data)

        # # ydata = tr.inverse_transform(model.predict(transformed_data))

        # print(inverse(y, datas))

        return {'X':datas,
                'Y': y}
