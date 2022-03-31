import ipfshttpclient

IPFS0 = '/ipv4/172.18.0.3/tcp/5001'
client0 = ipfshttpclient.connect(IPFS0)

print('Add README.md to IPFS0')
res = client0.add('/README.md')
return_hash = res['Hash']

print('=============================')
print('Get README.md from IPFS0')
print('Block {}'.format(return_hash))

client0.block.get(return_hash)