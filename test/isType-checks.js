import assert from 'assert';
import lodashStable from 'lodash';
import { objToString, objectTag, _, xml } from './utils.js';

describe('isType checks', function() {
  it('should return `false` for subclassed values', function() {
    var funcs = [
      'isArray', 'isBoolean', 'isDate', 'isFunction',
      'isNumber', 'isRegExp', 'isString'
    ];

    lodashStable.each(funcs, function(methodName) {
      function Foo() {}
      Foo.prototype = root[methodName.slice(2)].prototype;

      var object = new Foo;
      if (objToString.call(object) == objectTag) {
        assert.strictEqual(_[methodName](object), false, '`_.' + methodName + '` returns `false`');
      }
    });
  });

  it('should not error on host objects (test in IE)', function() {
    var funcs = [
      'isArguments', 'isArray', 'isArrayBuffer', 'isArrayLike', 'isBoolean',
      'isBuffer', 'isDate', 'isElement', 'isError', 'isFinite', 'isFunction',
      'isInteger', 'isMap', 'isNaN', 'isNil', 'isNull', 'isNumber', 'isObject',
      'isObjectLike', 'isRegExp', 'isSet', 'isSafeInteger', 'isString',
      'isUndefined', 'isWeakMap', 'isWeakSet'
    ];

    lodashStable.each(funcs, function(methodName) {
      if (xml) {
        _[methodName](xml);
        assert.ok(true, '`_.' + methodName + '` should not error');
      }
    });
  });
});
