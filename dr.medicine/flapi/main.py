from flask import Flask,request
import pip
import pandas as pd
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/",methods=["POST"])
def result():
    output = request.get_json()
    rand = output["name"]
    print(rand)
    
    df1 = pd.read_csv('dataset.csv')

    def prediction(rand):
        l1 = df1['DrugName'].to_list()
        rander = process.extract(rand, l1, limit = 1)
        print(rander)
        return  rander

    strs = prediction(rand)
    name = strs[0][0]
    conf = strs[0][1]
    # print(name)
    # print(conf)
    cal = {}

    cal['name'] = name 
    cal['conf'] = conf
    # print('hello')

    return (cal)



if __name__ == '__main__':
    app.run(debug=True,port=2000)