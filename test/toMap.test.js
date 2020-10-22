import assert from 'assert';
import toMap from '../toMap.js';

describe('toMap', function() {
  var demoArr = [{ key: 'first', b: 2 }, { key: 'second', b: 5}];
  var demoObj = { key: 'first', b: 2 };

  it('should convert object to Map', function() {
    var map = toMap(demoObj);
    var expect = new Map();
    expect.set('key', 'first');
    expect.set('b', 2);
    assert.deepStrictEqual(map, expect);
  });

  it('should convert array without path', function() {
    var map = toMap(demoArr);
    var expect = new Map();
    expect.set(0, { key: 'first', b: 2 });
    expect.set(1, { key: 'second', b: 5});
    assert.deepStrictEqual(map, expect);
  })

  it('should use path as key of new Map', function() {
    var map = toMap(demoArr, 'key');
    var expect = new Map();
    expect.set('first', { key: 'first', b: 2 });
    expect.set('second', { key: 'second', b: 5 });
    assert.deepStrictEqual(map, expect)
  })
})
