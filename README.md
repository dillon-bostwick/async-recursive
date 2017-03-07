# async-recurse

I have some JSON and I have no idea how its formatted. There are lots of deeply nested... stuff... and 
I just need to run some call on each element but the calls are asynchronous and I need wait for all to
complete. Lets start:
```
try {
	var targetObject = JSON.parse(someJsonStuff);
}

let iteratee = (value, callback) => {
	setTimeout(() => {
		console.log('done with', value)
		return callback(null); // I can pass truthy to error - which would break the traversal
	}, 100);	
};
```

To use with traditional callback:

```
asyncRecurse(targetObject, iteratee, options, (err) => {
	if (err) throw Err;

	console.log('good job team');
});
```

To use as an ES6 promise, just leave out the last argument:
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
If called as an ES6 Promise, then the worker can itself be a Promise. Either way,
the worker can always be a function with the arguments value and callback. The worker's
callback can take an error argument, which if truthy, will prematurely terminate the
traversal in a similar fashion to how Promise.all will break the iteration if anything fails.
If you choose to define your worker as a Promise, then you can reject to get the same behavior.

### Options:

| Name            | Type    | Default  |
|-----------------|---------|----------|
| includeLeaves   | Boolean | true     |
| includeBranches | Boolean | false    |
| parallel		  | Boolean | true	   |

If parallel is off, the work will be done serially - the next worker won't start
until the previous finished. The walk is performed as a depth-first pre-order
traversal and the order serialization will accord.

A branch is an Object or Array and a leaf is everything else (in other words if you're parsing
from JSON a leaf must be a String, Number, Boolean, or null).

by [Dillon Bostwick](http://linkedin.com/in/dillonbostwick)