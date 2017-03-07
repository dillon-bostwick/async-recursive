const asyncRecurse = require('.');

let testObj = {
	z: [[[[{ p: ['o']}]]]],

a: [1, 2, 3],
	b: 4,
	c: {
		d: 5,
		e: 6,
		f: null,
		g: [{
			h: 7
		}, 8, [9], []]
	}
}

const options = {
	includeLeaves: true,
	includeBranches: true,
	parallel: false
};

const iteratee = (val, callback) => {
	setTimeout(() => {
		console.log('heres the goods: ', val);
		callback(4 === 5 ? 'dead' : null) // the param is error obj
	}, 100);
};

// asyncRecurse.asyncRecurse(testObj, iteratee, options, (err) => {
// 	console.log('hey I finished with the error being ', err);
// });

asyncTraverse(testObj, iteratee, options)
.then(() => {
	console.log('finished promised')
})
.catch((err) => {
	console.log('promise rejected with ', err)
})



// /**
//  * 
//  */

// var expect = require('chai').expect;

// var asyncRecurse = require('.');

// var validObject = {
// 	_id: '20384',
// 	comment: {
// 		_user: '2f930f',
// 		_upvoteUserIds: {
// 			up: ['20fj3', '39fjs'],
// 			down: ['29fj3', 'f93jf']
// 		}
// 	},
// 	_imageIds: ['20fj3rk4', 'fj3fj3']
// };


// var validOptions = {
// 	depth: 1
// };

// var validAction =(key, val, cb) => {
// 	cb(null)
// }

// var validCallback = (err) => {
// 	if (err) throw err;

// 	console.log('finished');
// };


// describe('async-recurse', () => {
// 	describe('argument validation', () => {
// 		it('should require first arg to be an object', () => {
// 			try {
// 				asyncRecurse(1, validAction, validCallback, validOptions)
// 				asyncRecurse('', validAction, validCallback, validOptions)
// 			} catch(err) {
// 				expect(err).to.be.ok;
// 			}
// 		});

// 		it('should require second and third args to be functions', () => {
// 			try {
// 				asyncRecurse(validObject, validAction, 1, validOptions);
// 				asyncRecurse(validObject, 1, validCallback, validOptions);
// 			} catch(err) {
// 				expect(err).to.be.ok; //fail
// 			}
// 		});

// 		it('should require optional 4th arg to be object', () => {
// 			try {
// 				asyncRecurse(validObject, validAction, validCallback, 1)
// 			} catch(err) {
// 				expect(err).to.be.ok; //fail
// 			}
// 		});
// 	});

// 	describe('options', () => {
// 		it('should set all options to default if no 4th argument is used', () => {
// 			expect(asyncRecurse({}, validAction, validCallback, { depth: 1 }))
// 		});

// 		it('should default missing option properties if some options werent specified', () => {
			
// 		})
// 	})
// });

// asyncRecurse(validObject, validAction, validCallback)
