compose_blockchain="./blockchain/dev/sawtooth-dev.yaml"
compose_processor="./blockchain/dev/sawtooth-simplewallet/compose-processor.yml"
compose_webapp="./blockchain/dev/sawtooth-simplewallet/compose-webapp.yml"

echo "START BLOCKCHAIN..."
gnome-terminal -x docker-compose -f $compose_blockchain up

echo "START PROCESSOR..."
gnome-terminal -x docker-compose -f $compose_processor up

echo "START WEBAPP..."
gnome-terminal -x docker-compose -f $compose_webapp up