# async-recurse
Usage: `asyncRecurse(obj, iterate[, options, callback])`


```
var targetObject = JSON.parse(someJsonObject);

let iterate = (value, callback) => {
	setTimeout(() => {
		console.log('done with', value)
		return callback(null); // I can pass a truthy value here to error the iteration - which would prematurely end the traversal
	}, 100);
};
```

To use with a callback:

```
asyncRecurse(targetObject, iterate, options, (err) => {
	if (err) throw Err;

	//...
});
```

To use as an ES6 Promise, do not pass a fourth argument:
```
asyncRecurse(targetObject, worker, options)
.then(...)
.catch(...);
```
Or most simply:
```
asyncRecurse(targetObject, worker)
...
```

### Basic behavior
If called as an ES6 Promise, then the worker can itself be a Promise. Regardless of whether Promises or callbacks are used, the worker can always be a function with the arguments value and callback. The worker's callback can take an error argument, which if truthy, will prematurely terminate the traversal in a similar fashion to how Promise.all will break the iteration if any Promise fails. If you choose to define your worker as a Promise, then you can reject from your worker to get the same behavior.

### Options:

| Name            | Type    | Default  |
|-----------------|---------|----------|
| includeLeaves   | Boolean | true     |
| includeBranches | Boolean | false    |
| parallel	  | Boolean | true     |

If parallel is off, the work will be done serially - the next worker won't start
until the previous finished. This walk is performed as a depth-first pre-order
traversal and the order serialization will accord.

A branch is an Object or Array and a leaf is everything else (in other words if you're parsing
from JSON a leaf must be a String, Number, Boolean, or null).

by Dillon Bostwick
