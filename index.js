/**
 * Dillon Bostwick
 */

var _ = require('lodash');


const defaultOptions = {
	includeLeaves: true,
	includeBranches: true,
	parallel: true,
	depth: Infinity,
	order: 'pre'
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
var asyncRecurse = (obj, iteratee, callback, options) => {
	validateArguments(obj, iteratee, callback, options)

	options = _.defaults(defaultOptions, options);

console.log(options);
	return (options);

	recurse(null, obj, iteratee, callback, options, 0); // null represents the root key
};



function recurse(key, value, iteratee, callback, options, count) {
	if (count > options.depth) callback(null, null); //check depth

	if (_.isObject(obj)) { // is leaf

	} else { // is branch

	}

	action(obj);
}




/**
 * Throw a TypeError if validation fails
 */
function validateArguments(obj, iteratee, callback, options) {
	var orderChoices = ['pre', 'in', 'post'];

	if (obj === undefined) throw new TypeError('Expected ' + obj + ' to not be undefined');
	if (!_.isFunction(iteratee)) throw new TypeError('Expected ' + iteratee + ' to be a function');
	if (!_.isFunction(callback)) throw new TypeError('Expected ' + callback + ' to be a function');
	if (options && !_.isPlainObject(options)) throw new TypeError('Expected ' + options + ' to be an object');

	if (options) {
		if (!_.isUndefined(includeLeaves) && !_.isBoolean(includeLeaves)) throw new TypeError('Expected ' + includeLeaves + ' to be a Boolean');
		if (!_.isUndefined(includeBranches) && !_.isBoolean(includeBranches)) throw new TypeError('Expected ' + includeBranches + ' to be a Boolean');
		if (!_.isUndefined(parallel) && !_.isBoolean(parallel)) throw new TypeError('Expected ' + paralell + ' to be a Boolean');
		if (!_.isUndefined(depth) && !_.isNumber(depth)) throw new TypeError('Expected ' + depth + ' to be a Number');
		if (!_.isUndefined(order) && !_.includes(orderChoices, order)) throw new TypeError('Expected ' + order + ' to be "pre", "in", or "post');
	}
}



if (typeof module === 'object' && module.exports) {
  module.exports = asyncRecurse;
}