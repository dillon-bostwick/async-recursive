/**
 * Dillon Bostwick
 */

const _ = require('lodash');
const async = require('async');

const defaultOptions = {
	includeLeaves: true,
	includeBranches: true,
	parallel: true
};

const handleInput = (rootObj, iteratee, options, done) => {
	if (_.isUndefined(rootObj) || (!_.isFunction(iteratee) && !(iteratee instanceof Promise))) {
		throw new TypeError('Must pass rootObj and iteratee')
	}

	if (options && _.isObject(options)) {
		_.each(options, (option) => {
			if (!_.isBoolean(option)) {
				throw new TypeError('All options should be boolean')
			}
		})

		_.defaults(options, defaultOptions)
	} else {
		options = defaultOptions
	}

	if (!_.isUndefined(done)) {
		if (!_.isFunction(done)) {
			throw new TypeError('fourth argument must be function');
		};

		asyncRecurse(rootObj, iteratee, options, done);
		return null;
	}

	return asyncRecursePromised(rootObj, iteratee, options)
};

function asyncRecurse(rootObj, iteratee, options, done) {
	queue = async.queue(iteratee, options.parallel ? Infinity : 1);
	queue.drain = () => done(null);

	if (_.isObject(rootObj) && _.isEmpty(rootObj) && !options.include) {
		return done(null);
	}

	doRecurse(rootObj, iteratee, options, queue, done);

	// immediately after synchronous traverse
	if (!queue.started) { // nothing added
		return done(null); // prevent hang
	}
};

// Returns a promise. Also, iteratee can be a promise
function asyncRecursePromised(rootObj, iteratee, options) {
	// if iteratee is a Promise then convert to a traditional callback function
	const callbackedIteratee = iteratee instanceof Promise ? (val, callback) => {
		iteratee
		.then(() => callback(null))
		.catch(callback);
	} : iteratee;

	return new Promise((resolve, reject) => {
		return asyncRecurse(rootObj, callbackedIteratee, options, (err) => {
			return err ? reject(err) : resolve(null);
		});
	});
};

// NOTE: done is only passed so that it can be called prematurely in error case. In success case it
// does not get called in the doRecurse helper
function doRecurse(rootObj, iteratee, options, queue, done) {
	if (!_.isObject(rootObj)) {
		if (options.includeLeaves) {
			queue.push(rootObj, (err) => {
				if (err) {
					queue.kill();
					return done(err);
				}
			});
		}
	} else {
		if (options.includeBranches) {
			queue.push(rootObj, (err) => {
				if (err) {
					queue.kill();
					return done(err);
				}
			});
		}

		_.each(rootObj, (child, i) => {
			return doRecurse(child, iteratee, options, queue, done);
		});
	}
};

if (typeof module === 'object' && module.exports) {
  module.exports = handleInput;
}