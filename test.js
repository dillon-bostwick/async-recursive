var asyncRecurse = require('.');

var options = {

};

var callback = (err, ele) => {
	console.log(err, ele);
};

asyncRecurse({}, callback, callback, options);