// const _ = require('lodash');
// var testObj1 = {};
// console.log('1:', typeof testObj1.toString);
// _.omit({}, 'constructor.prototype.toString');
// var testObj2 = {};
// console.log('2:', typeof testObj2.toString);

const _ = require('lodash');
var testObj1 = { __proto__: { a: 1, b: 2 } };
_.unset(testObj1, '__proto__');
console.log('testObj1:', JSON.stringify(testObj1), testObj1.__proto__.toString);
var testObj2 = {};
console.log('testObj2:', typeof testObj2.toString, testObj2.toString);