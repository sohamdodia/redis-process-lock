const Redis = require('ioredis');
const redis = new Redis(6379, 'localhost');
const { beginAndLockProcess, unLockProcess } = require('./index');


const sleep = (time = 1000) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  });
}



const testFunc = async ({ number }) => {
  try {
    console.log(`Blocking the process via ${number} function`);
    //Block the process
    await beginAndLockProcess({ redis, process_type: 'simple', process_id: 1 })

    console.log(`Doing some heavy work via ${number} function`);
    //Sleep for 2 seconds
    await sleep(2000);

    //Unlock the process
    await unLockProcess({ redis, process_type: 'simple', process_id: 1 })
    console.log(`Unblocking the process via ${number} function`);
  } catch (error) {
    console.log(`error when function ${number} was called`);
    console.log('error', error);
  }
}

//Calling the testFunc first time
testFunc({ number: 1 });

//Calling the testFunc second time
testFunc({ number: 2 });