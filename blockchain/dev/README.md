- `sawtooth-default-sample.yaml` is sample file, it have a validator, rest-api and some transaction processor, such as: intkey, xo, setting...
- `sawtooth-default-dev.yaml ` is a dev blockchain, it have validator, rest-api, setting-tp
### Start Blockchain for testing
```
docker-compose -f sawtooth-default-sample.yaml up
```


### Start Blockchain for dev-mode
```
docker-compose -f sawtooth-default-dev.yaml up
```