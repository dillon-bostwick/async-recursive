# async-recurse

```
asyncRecurse(targetObject, iteratee, done, options);
```

### iteratee(key, value, callback

Modify the value as you'd like (key is read- only) then call callback(err,
result) where result will replace the value of the element in the final
results. Calling the callback with an err value will immaturely terminate the
traversal of all elements and trigger the done callback immediately. Pass one
argument as callback(err) if you don't want to modify the results. Key is not
always the object literal key. It can be the index of an element of an array
or simply null if includeBranches is on and value is the root.

### done(err, results)

Called when all iteratees during the traversal are completed or if any iteratee
callbacks with a non-null error. The original object is not mutated but
results will show the compilation each result of individual iteratees.

### Options:

| Name            | Type    | Default  |
|-----------------|---------|----------|
| includeLeaves   | Boolean | true     |
| includeBranches | Boolean | true     |
| parallel		  | Boolean | true	   |
| depth           | Number  | Infinity |
| order			  | one of pre', 'in', 'post' | 'pre' |

If parallel is off, iteratees will waterfall, blocking the traversal until
completion. Even if parallel is on, you can still specify order and iteratees
will begin executing in that order without blocking next iteratees. Either
way, the final callback won't execute until all iteratees have completed

### Example #1:
```
var asyncRecurse = require('async-recurse');

var blogPost = {
	_id: '20384',
	comment: {
		_user: '2f930f',
		_upvoteUserIds: {
			up: ['20fj3', '39fjs'],
			down: ['29fj3', 'f93jf']
		}
	},
	_imageIds: ['20fj3rk4', 'fj3fj3']
}

var options: {
	includeLeaves: false,
	parallel: true
}

var populateField = (key, value, callback) => {
	if (isId(value)) {
		console.log('Now populating ' + key);

		populateTheId(null, callback);
	} else {
		callback(null, value);
	}
}

var done = (err, results) => {
	if (err) throw err;

	console.log(results);
}

asyncRecurse(blogPost, populateField, done, options);

``` 

### Example #2: perform iteratee on elements without changing results
```
logField = (key, value, callback) => {
	console.log('Arrived at: ' + key + ': ' + value + '\n');

	setTimeout(() => {
		callback(null);
	}), 100);
}

done = (err) => {
	if(err) throw err;

	console.log('Finished traversal');
}

asyncRecurse(blogPost, logField, done);
```




by [Dillon Bostwick](http://linkedin.com/in/dillonbostwick)