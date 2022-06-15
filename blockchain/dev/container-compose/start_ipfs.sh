compose_ipfs="./ipfs.yaml"
data_ipfs="./compose"
ipfs_image="ipfs/go-ipfs:v0.7.0"
cluster_image="ipfs/ipfs-cluster:latest"
cluster_secret="NEITHNAHT"
########## STEP 1 ###############
####### Make docker-compose file #########
echo "STEP 1 - Make docker-compose file"
sleep 0.5

####### Compose IPFS 0
echo $compose_ipfs
echo "services:
  ################################################
  ## Cluster PEER 0 ##############################
  ################################################

  ipfs0:
    container_name: ipfs0
    image: $ipfs_image
    #   ports:
    #     - \"4001:4001\" # ipfs swarm - expose if needed/wanted
    #     - \"5001:5001\" # ipfs api - expose if needed/wanted
    #     - \"8080:8080\" # ipfs gateway - expose if needed/wanted
    volumes:
      - $data_ipfs/ipfs0:/data/ipfs

  cluster0:
    container_name: cluster0
    image: $cluster_image
    depends_on:
      - ipfs0
    environment:
      CLUSTER_PEERNAME: cluster0
      CLUSTER_SECRET: $cluster_secret # From shell variable if set
      CLUSTER_IPFSHTTP_NODEMULTIADDRESS: /dns4/ipfs0/tcp/5001
      CLUSTER_CRDT_TRUSTEDPEERS: \"*\" # Trust all peers in Cluster
      CLUSTER_RESTAPI_HTTPLISTENMULTIADDRESS: /ip4/0.0.0.0/tcp/9094 # Expose API
      CLUSTER_MONITORPINGINTERVAL: 2s # Speed up peer discovery
    ports:
      # Open API port (allows ipfs-cluster-ctl usage on host)
      - \"127.0.0.1:9094:9094\"
      # The cluster swarm port would need  to be exposed if this container
      # was to connect to cluster peers on other hosts.
      # But this is just a testing cluster.
      # - \"9096:9096\" # Cluster IPFS Proxy endpoint
    volumes:
      - $data_ipfs/cluster0:/data/ipfs-cluster" >$compose_ipfs

read -p ">>> How many IPFS node? " limit
number=1

####### Compose IPFS 1 -> n-1
while true; do
  if [ $number -lt $limit ]; then
    echo "  #######################################################
  ## Cluster PEER $number ####################################
  #######################################################

  ipfs$number:
    container_name: ipfs$number
    image: $ipfs_image
    volumes:
      - $data_ipfs/ipfs$number:/data/ipfs

  cluster$number:
    container_name: cluster$number
    image: $cluster_image
    depends_on:
      - ipfs$number
    environment:
      CLUSTER_PEERNAME: cluster$number
      CLUSTER_SECRET: $cluster_secret
      CLUSTER_IPFSHTTP_NODEMULTIADDRESS: /dns4/ipfs$number/tcp/5001
      CLUSTER_CRDT_TRUSTEDPEERS: \"*\"
      CLUSTER_MONITORPINGINTERVAL: 2s # Speed up peer discovery
    volumes:
      - $data_ipfs/cluster$number:/data/ipfs-cluster" >>$compose_ipfs
  else
    break
  fi
  number=$(($number + 1))
done
sleep 0.5
echo ">>> Done"
sleep 0.5

########## STEP 2 ###############
echo "STEP 2 - Temporary run up this docker-compose file"
sleep 0.5
number=0

####### Remove old container ########
while true; do
  read -p ">>> Do you want to remove all of old container? (y/n)" yn2
  if [ "$yn2" = "y" ]; then
    while true; do
      if [ $number -lt $limit ]; then
        docker stop cluster$number >/dev/null 2>&1
        docker stop ipfs$number >/dev/null 2>&1
        docker rm cluster$number >/dev/null 2>&1
        docker rm ipfs$number >/dev/null 2>&1
      else
        break
      fi
      number=$(($number + 1))
    done
    sudo rm -rf $data_ipfs
    echo ">>> Remove complete!"
    break
  else
    if [ "$yn2" = "n" ]; then
      break
    else
      echo "Please input y/n"
      continue
    fi
  fi
done

sleep 0.5

read -p ">>> Press enter to continue if you want start now..." enter

####### Run up docker compose file
echo ">>> Running docker-compose, shouldn't stop program..."
gnome-terminal -x docker-compose -f $compose_ipfs up

echo ">>> Wait a minute to complete start the IPFS"
read -p ">>> Press enter to continue..." enter
####### Config CORS for each IPFS node
echo ">>> Config CORS for IPFS"
number=0
while true; do
  if [ $number -lt $limit ]; then
    docker exec ipfs$number ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
    docker exec ipfs$number ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
    docker exec ipfs$number ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
    docker exec ipfs$number ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
    docker exec ipfs$number ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
    echo ">>>>>> Configured for the IPFS node $number"
  else
    break
  fi
  number=$(($number + 1))
done
sleep 0.5

echo ">>> Restart container, don't stop it..."
number=0
while true; do
  if [ $number -lt $limit ]; then
    docker container restart ipfs$number cluster$number >/dev/null
    echo ">>>>>> Restarted container ipfs$number & cluster$number"
  else
    break
  fi
  number=$(($number + 1))
done
echo ">>> Complete script! You can locate to Web UI of IPFS"
