sudo apt-get update
sudo apt-get install -y -q curl gnupg
curl -sSL 'http://p80.pool.sks-keyservers.net/pks/lookup?op=get&search=0x8AA7AF1F1091A5FD' | sudo apt-key add -
echo 'deb [arch=amd64] http://repo.sawtooth.me/ubuntu/chime/stable bionic universe' >>/etc/apt/sources.list
sudo apt-get update
sudo apt-get install -y -q \
  apt-transport-https \
  build-essential \
  ca-certificates \
  # python3-sawtooth-sdk \
  python3-protobuf \
  python3-pandas
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
