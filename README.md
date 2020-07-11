# redis-process-lock

A NPM module that will lock the process.

## What this does

JavaScript is single-threaded, and if there is any requirement for locking some process/resource, it will be complex to do that. But with the help of the Redis, we can achieve it. Since Redis always works in sync fashion (meaning only one operation is allowed at a time), we can store the process id with process type in Redis and when some other process/function tries to access it, Redis will give an error. This module can be used for multiple purposes like blocking resources, function, database tables, etc.


### Installation

```sh
$ npm install redis-process-lock
```

### Documentation

`beginAndLockProcess({ redis, process_type, process_id })`

| Parameter | Type | Description
| ------ | ------ | ------ |
| redis | object | Redis instance
| process_type | string | Process Type
| process_id | integer | Process Id

`unLockProcess({ redis, process_type, process_id })`

| Parameter | Type | Description
| ------ | ------ | ------ |
| redis | object | Redis instance
| process_type | string | Process Type
| process_id | integer | Process Id

### Example

```javascript
const { beginAndLockProcess, unLockProcess } = require('redis-process-lock');

//Lock the process
await beginAndLockProcess({ process_type: 'simple', process_id: '1'})

//Do some heavy work with the locked resource

//Unlock the process
await unLockProcess({ redis, process_type: 'simple', process_id: '1'})
```

License
----
MIT