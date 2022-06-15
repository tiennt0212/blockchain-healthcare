import ipfshttpclient
import json
# IPFS0 = '/ipv4/172.22.0.12/tcp/5001'
IPFS0 = '/dns/172.22.0.12/tcp/5001/http'
client0 = ipfshttpclient.connect(IPFS0)


# res = client0.add('testPlaintext.txt')
data = {"profile": "Co len Thanh Tien", "metadata": "13/06/2022"}
print(len(data))
res = client0.add_json(data)
# return_hash = res['Hash']

print('Block {}'.format(res))

getdata = client0.cat(res).decode()

print(type(getdata))
print(getdata)
print(len(getdata))

getdata = json.loads(getdata)

print(type(getdata))
print(getdata)
print(len(getdata))
