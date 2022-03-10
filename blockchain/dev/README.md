- `sawtooth-default-sample.yaml` is sample file, it have a validator, rest-api and some transaction processor, such as: intkey, xo, setting...
- `sawtooth-default-dev.yaml ` is a dev blockchain, it have validator, rest-api, setting-tp

## Start Blockchain for testing

```
docker-compose -f sawtooth-default-sample.yaml up
```

## Start Blockchain for dev-mode

```
docker-compose -f sawtooth-default-dev.yaml up
```

## Start Python venv for Blockchain

Install python3-venv

```
sudo apt-get install python-virtualenv

```

Create virtualenv

```
virtualenv -p python3 blockchain_venv_3.5
```

Install some packages

```
sudo apt-get install build-essential libssl-dev libffi-dev python-dev
pip3 install sawtooth_sdk

```

```
╭─thanhtien@ubuntu ~/blockchain-healthcare ‹canary●›
╰─$ cd blockchain/dev
╭─thanhtien@ubuntu ~/blockchain-healthcare/blockchain/dev ‹canary●›
╰─$ source ./blockchain_venv_3.5/bin/activate
(blockchain_venv_3.5) ╭─thanhtien@ubuntu ~/blockchain-healthcare/blockchain/dev ‹canary●›
╰─$
```

## Install Sawtooth

Ref: https://sawtooth.hyperledger.org/docs/1.2/app_developers_guide/installing_sawtooth.html#step-1-install-sawtooth
