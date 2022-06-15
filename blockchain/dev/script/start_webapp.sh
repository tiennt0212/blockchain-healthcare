# Start with checking and setting enviroment variable

# REST_API_IS_RUNNING=$(docker inspect --format '{{json .State.Running}}' rest-api)
# declare -p $REST_API_IS_RUNNING
if [[$(docker inspect --format '{{json .State.Running}}' rest-api)]]; then
  echo "Yes, it's running."
else
  echo "No, it's not running."
  # yarn start
fi

