/**
 * Dillon Bostwick
 */

var copy = require('clone');


/**
 * obj: Object
 * action: function(element, callback)
 * 			-> element: any type
 * 			-> callback: function(err, result)
 * 				-> err: Error
 * 				-> result: any type
 * callback: function(err, result)
 * 			-> err: Error
 * 			-> result: Object matching obj
 */
var asyncRecurse = (obj, action, callback) => {
	try {
		if (typeof obj !== Object) {
			throw new Error('Must pass an object as first argument')
		}



	} catch(err) {
		callback(err, null)
	}
};


















if (typeof module === 'object' && module.exports) {
  module.exports = asyncRecurse;
}