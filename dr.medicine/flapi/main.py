from flask_cors import CORS
from flask import Flask,request
import pandas as pd
from fuzzywuzzy import process
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
load_dotenv()
import os
  

app = Flask(__name__)
CORS(app)


@app.route("/",methods=["POST"])
def result():
    output = request.get_json()
    rand = output['name']
    if rand == "":
        cal = {}
        cal ['name'] = ""
        cal ['conf'] = ""
        cal ['summary'] = ""
        return cal
    print(rand)
    
    df1 = pd.read_csv('dataset.csv')

    def prediction(rand):
        l1 = df1['DrugName'].to_list()
        rander = process.extract(rand, l1, limit = 1)
        # print(rander)
        return  rander

    strs = prediction(rand)
    name = strs[0][0]
    conf = strs[0][1]


    def get_drug_info(drug_name):
        location = "chromedriver\chromedriver.exe"
        service = Service(location)

        # Configure Chrome options
        chrome_options = Options()

        # Run Chrome in headless mode
        chrome_options.add_argument("--headless")  

        driver = webdriver.Chrome(service=service, options=chrome_options)

        driver.get("https://go.drugbank.com/")

        search_input = driver.find_element(By.ID, "query")
        search_input.send_keys(drug_name)
        search_input.submit()

        elements = driver.find_elements(By.CSS_SELECTOR, ".col-xl-10.col-md-9.col-sm-8 p")
        if len(elements) > 1:
            summary_element = elements[1] 
            summary = summary_element.text.strip()
        else:
            summary = "No summary found"

        driver.quit()

        return summary

    drug_info = get_drug_info(name) 

    cal = {}

    cal['name'] = name 
    cal['conf'] = conf

    if drug_info:
        cal['summary'] = drug_info
    
    return (cal)

if __name__ == '__main__':
    from waitress import serve
    app.run(debug=False, host = '0.0.0.0', port=0)

    