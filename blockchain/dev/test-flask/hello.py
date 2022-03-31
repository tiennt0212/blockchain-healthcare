from flask import Flask
from MetaHealthClient import MetaHealthClient

app = Flask(__name__)
client = MetaHealthClient(baseUrl='http://172.18.0.5:8008', keyFile='')

@app.route('/register')
def hello():
    return 'ABC'
