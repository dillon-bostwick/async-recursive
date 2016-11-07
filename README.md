# async-recurse

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
	canModifyOriginal: true,
	includeLeaves: true,
	includeNonLeaves: true,
	depth: Infinity
}

var populateField = (element, callback) => {
	if (elementIsId(element)) {
		populateTheId(element, callback);
	} else {
		callback(null, element);
	}
}

var done = (err, results) => {
	if (err) throw err;

	console.log(results);
}

asyncRecurse(blogPost, populateField, done, options);

```