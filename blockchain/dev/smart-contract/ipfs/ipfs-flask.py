from flask import Flask, request, jsonify
from operator import itemgetter
import ipfshttpclient
import json

# CORE API: https: // github.com/ipfs/js-ipfs/tree/master/docs/core-api
# FILE API: https: // github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md

# IPFS0 = '/ipv4/172.22.0.12/tcp/5001'
IPFS_ENDPOINT = '/dns/172.22.0.5/tcp/5001/http'
client = ipfshttpclient.connect(IPFS_ENDPOINT)

app = Flask(__name__)


@app.route('/store/json', methods=['POST'])
def storeJSON():
    data = json.loads(request.data.decode())

    # dataToStore is dictionary (object) type
    dataToStore = itemgetter('dataToStore')(data)

    # Store file to IPFS, return CID
    CID = client.add_json(dataToStore)
    print('Request STORE json at {}'.format(CID))
    return CID


@app.route('/store/string', methods=['POST'])
def storeString():
    data = json.loads(request.data.decode())

    # dataToStore is dictionary (object) type
    dataToStore = itemgetter('dataToStore')(data)

    # Store file to IPFS, return CID
    CID = client.add_str(dataToStore)
    print('Request STORE string at {}'.format(CID))
    return CID


@app.route('/get/json', methods=['GET', 'POST'])
def getJSON():
    data = json.loads(request.data.decode())

    # CID is string type
    CID = itemgetter('CID')(data)
    print('Request GET json from {}'.format(CID))

    return json.loads(client.cat(CID).decode())


@app.route('/get/string', methods=['GET', 'POST'])
def getString():
    data = json.loads(request.data.decode())

    # CID is string type
    CID = itemgetter('CID')(data)
    print('Request GET string from {}'.format(CID))

    return client.cat(CID).decode()


if __name__ == '__main__':

    # run() method of Flask class runs the application
    # on the local development server.
    app.run(host="0.0.0.0", port="5001")
