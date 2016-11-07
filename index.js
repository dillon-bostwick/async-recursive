/**
 * Dillon Bostwick
 */

var copy = require('clone');
var _ = require('lodash');


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
 * options:
 * 			-> canModify: Boolean
 * 			-> includeLeaves: Boolean
 * 			-> includeNonLeaves: Boolean
 */
var asyncRecurse = (obj, action, callback, options) => {
	try {
		if (!_.isPlainObject(obj)) throw new Error('Must pass a plain object as first argument');

		//set defaults:
		if (_.isUndefined(options.canModify)) options.canModify = true;
		if (_.isUndefined(options.includeLeafs)) options.includeLeaves = true;
		if (_.isUndefined(options.includeNonLeafs)) options.includeNonLeaves = true;

		recurse(obj, action, callback, options);
	} catch(err) {
		callback(err, null)
	}
};

function recurse(obj, action, callback, options) {
	if (_.isPlainObject(obj)) {
		if (options.includeNonLeaves) {
			action(null, obj)
		}

		_.each(obj, (ele) => {
			recurse(ele, action, callback, options);
		})
	} else {
		if (options.includeLeaves) {
			action(null, obj);
		}
	}
}







if (typeof module === 'object' && module.exports) {
  module.exports = asyncRecurse;
}