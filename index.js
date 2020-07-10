/**
 * 
 * @param data object
 * @returns message string
 * 
 * Function will validate all the keys which has been passed as arguments. 
 */

const validateInputs = ({ ...data }) => {
  let message = '';
  let keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    if (!data[keys[i]]) {
      message = `${keys[i]} is required`;
      break;
    }
  }
  return message;
};


/**
 * 
 * @param redis object
 * @param process_type string
 * @param process_id integer
 * @returns Promise
 * 
 * Function to lock the process
 * Function will increment they key value in redis
 * If value is not 1, it will throw an error
 */

exports.beginAndLockProcess = async ({redis, process_type, process_id}) => {
  let message = validateInputs({ redis, process_type, process_id});
  if (message) {
    return Promise.reject(message) 
  }

  const response = await redis.incr(`${process_type}_${process_id}`);

  if(response !== 1) return Promise.reject(`Process Type: ${process_type}, Process Id: ${process_id} is already in process`);

  return Promise.resolve();
};

/**
 * 
 * @param redis object
 * @param process_type string
 * @param process_id integer
 * @returns Promise
 * 
 * Function to unlock the process
 * Function will delete the key from redis
 */

exports.unLockProcess = async ({redis, process_type, process_id}) => {
  let message = validateInputs({ redis, process_type, process_id});
  if (message) {
    return Promise.reject(message) 
  }
  return redis.del(`${process_type}_${process_id}`);
};