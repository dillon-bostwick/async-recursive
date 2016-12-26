/**
 * Dillon Bostwick
 */

var _ = require('lodash');
var async = require('async');
var clone = require('clone');


const defaultOptions = {
	includeLeaves: true,
	includeBranches: true,
	parallel: true,
	breadthFirst: true,
	depth: Infinity
}

/**
 * obj: Object
 * worker: function(value, key, callback)
 * 			-> value, key
 * 			-> callback: function(err, element)
 * 				-> err: Error
 * 				-> element: any type, always Object if !onlyLeafs
 * done: function(err, result)
 * 			-> err: Error
 * 			-> result: Object matching obj keys but maybe new vals from workers
 * options: Object
 */
var asyncRecurse = (root, worker, done, options) => {
	validateArguments(root, iteratee, callback, options)

	options = options ? _.defaults(options, defaultOptions) : defaultOptions;

	q = async.queue(iteratee, options.parallel ? Infinity : 1); // set concurrency to be parallel or waterfall

	var results = clone(root);

	var err = doRecurse(obj, results, worker, options);

	// traversal is finished

	// either traversal ended prematurely
	if (err) done(err, null)
	
	// or traversal completed and the next time q drains, all workers finished
	q.drain = () => done(null, result)
};


function doRecurse(obj, results, worker, options, workerQueue) {
	workerQueue.push(obj);

	if (options.breadthFirst) {
		var traversalQueue = [obj];

		while (!_.isEmpty(traversalQueue)) {
			_.each(shift(traversalQueue), (value, key) => {
				if ((_.isObject(value) && options.includeBranches) ||
					(!_.isObject(value) && options.includeLeaves)) {
					workerQueue.push((err) => {
						worker(value, key, (err, result) => {
							if (err) return err;

							// value = result?
						})
					});
				}

				if (_.isObject(value)) {
					traversalQueue.push(value);
				}
			});
		}
	} else { //depth first
		depthFirstRecurse(null, obj, results, worker, options, workerQueue)
	}
}

function  {

}















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