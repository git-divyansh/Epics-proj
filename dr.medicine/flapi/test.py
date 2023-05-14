
import pandas as pd
from fuzzywuzzy import process

df1 = pd.read_csv('dataset.csv')

mat1 = []
def prediction(rand):
    l1 = df1['DrugName'].to_list()
    rand = process.extract(rand, l1, limit = 1)
    return  rand

strs = prediction('dllo is the best med')
name = strs[0][0]
conf = strs[0][1]
print(name)
print(conf)