# async-recurse

```
// Perform action on each element of targetObject, perform done when finished
asyncRecurse(targetObject, action, done, options);
```

### action(key, value, callback) You get the key and value of each element.
Callback function(err, result) where result will replace the value of the
element in the final results. Calling the callback with a non-null err value
will end the traversal immediately and trigger the done callback.

### done(err, results)
done is called when all actions during the traversal are completed or if any action
callbacks with a non-null error. Results is the new object with values replaced.
(The original object is not changed).

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
	includeLeaves: true,
	includeNonLeaves: true,
	depth: Infinity
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

### Example #2: perform action on elements without changing results
```
populateField = (key, value, callback) => {
	console.log(key, value);

	setTimeout(() => {
		callback(null);
	}), 100);
}

done = (err) => {
	console.log('Finished traversal');
}
```
