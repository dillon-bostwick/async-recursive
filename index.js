/**
 * Dillon Bostwick
 */

var _ = require('lodash');
var async = require('async');


const defaultOptions = {
	includeLeaves: true,
	includeBranches: true,
	parallel: true,
	breadthFirst: true,
	depth: Infinity
}

/**
 * obj: Object
 * action: function(element, callback)
 * 			-> element: any type
 * 			-> callback: function(err, element)
 * 				-> err: Error
 * 				-> element: any type, Object if !onlyLeafs
 * callback: function(err, result)
 * 			-> err: Error
 * 			-> result: Object matching obj
 * options: Object
 */
var asyncRecurse = (root, iteratee, done, options) => {
	validateArguments(root, iteratee, callback, options)
	options = options ? _.defaults(options, defaultOptions) : defaultOptions;

	var iterateeQueue = async.queue()

	recurse(null, obj, iteratee, done, options, 0); // null represents the root key
};



function recurse(key, value, iteratee, done, options, count) {
	if (count > options.depth) return; //check depth

	var cb = (err) => { assert(!err) }; // TODO

	if (_.isObject(obj)) { // is branch
		if (!breadthFirst) recurseOnEach(obj);
		if (options.includeBranches) iteratee(key, value, cb);
		if (breadthFirst) recurseOnEach(obj);
	} else { // is leaf
		if (options.includeLeaves) iteratee(key, value, cb);
	}
}

function recurseOnEach(obj, iteratee, done, options, count) {
	// if obj is array lodash sets key as the index Number
	_.each(obj, (value, key) => {
		recurse(key, value, iteratee, done, options, count + 1);
	});
}

//TODO:
// done, parallel vs waterfall






/**
 * Throw a TypeError if validation fails
 */
function validateArguments(root, iteratee, callback, options) {
	var orderChoices = ['pre', 'in', 'post'];

	if (!_.isFunction(iteratee)) throw new TypeError('Expected ' + iteratee + ' to be a function');
	if (!_.isFunction(callback)) throw new TypeError('Expected ' + callback + ' to be a function');
	if (options && !_.isPlainObject(options)) throw new TypeError('Expected ' + options + ' to be an object');

	if (options) {
		if (!_.isUndefined(options.includeLeaves)	&& !_.isBoolean(options.includeLeaves))   throw new TypeError('Expected ' + options.includeLeaves   + ' to be a Boolean');
		if (!_.isUndefined(options.includeBranches) && !_.isBoolean(options.includeBranches)) throw new TypeError('Expected ' + options.includeBranches + ' to be a Boolean');
		if (!_.isUndefined(options.parallel)        && !_.isBoolean(options.parallel)) 		  throw new TypeError('Expected ' + options.paralell 		+ ' to be a Boolean');
		if (!_.isUndefined(options.breadthFirst)    && !_.isNumber(options.breadthFirst)) 	  throw new TypeError('Expected ' + options.breadthFirst 	+ ' to be a Boolean');
		if (!_.isUndefined(options.depth) 			&& !_.isNumber(options.depth)) 		  	  throw new TypeError('Expected ' + options.depth 			+ ' to be a Number');
	}
}



if (typeof module === 'object' && module.exports) {
  module.exports = asyncRecurse;
}