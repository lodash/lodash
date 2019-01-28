import assert from 'assert';
import lodashStable from 'lodash';

describe('lodash(...) methods that return the wrapped modified array', function() {
  var funcs = [
    'push',
    'reverse',
    'sort',
    'unshift'
  ];

  lodashStable.each(funcs, function(methodName) {
    it('`_(...).' + methodName + '` should return a new wrapper', function() {
      var array = [1, 2, 3],
          wrapped = _(array),
          actual = wrapped[methodName]();

      assert.ok(actual instanceof _);
      assert.notStrictEqual(actual, wrapped);
    });
  });
});
