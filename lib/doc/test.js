var assert = require('assert');

var Entry = require('docdown/lib/entry');

var applyFPMapping = require('./apply-fp-mapping');
var mapping = require('../../fp/_mapping');

function toSource(name, paramLines, exampleLines, attachedToPrototype) {
  var start = [
    "/**",
    " * ",
    " * Foo",
    " * "
  ];
  var end = [
    " */",
    "function " + name + "(a, b, c) {",
    "",
    "}"
  ];
  var staticLine = attachedToPrototype ? [] : [' * @static'];
  var params = paramLines.map(function(line) {
    return ' * @param ' + line;
  });
  var example = (exampleLines || []).map(function(line) {
    return ' * ' + line;
  });

  return [].concat(start, staticLine, params, [' * @example'], example, end).join('\n');
}

function toParams(name, lines, wrapped) {
  var start = [
    "/**",
    " * ",
    " * Foo",
    " * "
  ];
  var end = [
    " * @returns Foo bar",
    " */",
    "function " + name + "(a, b, c) {",
    "",
    "}"
  ];
  var staticLine = wrapped ? [] : [' * @static'];
  var params = lines.map(function(line) {
    return ' * @param ' + line;
  });
  return [].concat(start, staticLine, params, end).join('\n');
}

var differenceBySource = toSource('differenceBy', [
  '{Array} array The array to inspect.',
  '{...Array} [values] The values to exclude.',
  '{Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.'
], [
  "_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);",
  "// → [3.1, 1.3]",
  "",
  "// The `_.property` iteratee shorthand.",
  "_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');",
  "// → [{ 'x': 2 }]"
]);

var setParams = [
  '{Object} object The object to modify.',
  '{Array|string} path The path of the property to set.',
  '{*} value The value to set.'
];

describe('Docs FP mapping', function() {
  var oldgetParams;
  var oldgetExample;

  before(function() {
    oldgetParams = Entry.prototype.getParams;
    oldgetExample = Entry.prototype.getExample;
    mapping.aryMethod[2].push('customFun');
    applyFPMapping(mapping);
  });

  after(function() {
    Entry.prototype.getParams = oldgetParams;
    Entry.prototype.getExample = oldgetExample;
  });

  describe('getExample', function() {
    it('should reorder parameters', function() {
      var entry = new Entry(differenceBySource, differenceBySource);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "_.differenceBy(Math.floor, [4.4, 2.5], [3.1, 2.2, 1.3]);",
        "// → [3.1, 1.3]",
        "",
        "// The `_.property` iteratee shorthand.",
        "_.differenceBy('x', [{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]);",
        "// → [{ 'x': 2 }]",
        "```"
      ].join('\n'));
    });

    it('should reorder parameters that have a special order', function() {
      var example = toSource('set', setParams, [
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set(object, 'a[0].b.c', 4);",
        "_.set(object, 'x[0].y.z', 5);",
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set('a[0].b.c', 4, object);",
        "_.set('x[0].y.z', 5, object);",
        "```"
      ].join('\n'));
    });

    it('should preserve comments', function() {
      var example = toSource('set', setParams, [
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set(object, 'a[0].b.c', 4);",
        "// => 4",
        "_.set(object, 'x[0].y.z', 5);",
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set('a[0].b.c', 4, object);",
        "// => 4",
        "_.set('x[0].y.z', 5, object);",
        "```"
      ].join('\n'));
    });

    it('should remove console.logs from example', function() {
      var example = toSource('set', setParams, [
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "",
        "_.set(object, 'a[0].b.c', 4);",
        "console.log(object.a[0].b.c);",
        "// => 4",
        "",
        "_.set(object, 'x[0].y.z', 5);",
        "console.log(object.x[0].y.z);",
        "// => 5"
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "",
        "_.set('a[0].b.c', 4, object);",
        "// => 4",
        "",
        "_.set('x[0].y.z', 5, object);",
        "// => 5",
        "```"
      ].join('\n'));
    });

    it('should merge extra arguments into an array', function() {
      var example = toSource('pullAt', [
        '{Array} array The array to modify.',
        '{...(number|number[])} [indexes] The indexes of elements to remove,\n' +
        ' *   specified individually or in arrays.'
      ], [
        "var array = [5, 10, 15, 20];",
        "var evens = _.pullAt(array, 1, 3);",
        "",
        "console.log(array);",
        "// => [5, 15]",
        "",
        "console.log(evens);",
        "// => [10, 20]",
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "var array = [5, 10, 15, 20];",
        "var evens = _.pullAt([1, 3], array);",
        "",
        "// => [5, 15]",
        "",
        "// => [10, 20]",
        "```"
      ].join('\n'));
    });

    it('should inject default values into optional arguments that became compulsory', function() {
      var example = toSource('sampleSize', [
        '{Array|Object} collection The collection to sample.',
        '{number} [n=0] The number of elements to sample.'
      ], [
        "_.sampleSize([1, 2, 3]);",
        "// => [3, 1]",
        "",
        "_.sampleSize([1, 2, 3], 4);",
        "// => [2, 3, 1]"
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "_.sampleSize(0, [1, 2, 3]);",
        "// => [3, 1]",
        "",
        "_.sampleSize(4, [1, 2, 3]);",
        "// => [2, 3, 1]",
        "```"
      ].join('\n'));
    });

    it('should inject referenced values into optional arguments that became compulsory, '
    + 'if a parameter\'s default value references parameter (direct reference)',
    function() {
      var example = toSource('customFun', [
        '{Array} array Array',
        '{number} [foo=array] Foo'
      ], [
        "_.customFun([1, 2, 3]);",
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "_.customFun([1, 2, 3], [1, 2, 3]);",
        "```"
      ].join('\n'));
    });

    it('should inject referenced values into optional arguments that became compulsory, '
    + 'if a parameter\'s default value references parameter (member expression)',
    function() {
      var example = toSource('fill', [
        '{Array} array The array to fill.',
        '{*} value The value to fill `array` with.',
        '{number} [start=0] The start position.',
        '{number} [end=array.length] The end position.'
      ], [
        "var array = [1, 2, 3];",
        "",
        "_.fill(array, 'a');",
        "console.log(array);",
        "// => ['a', 'a', 'a']",
        "",
        "_.fill(Array(3), 2, 1);",
        "// => [undefined, 2, 2]",
        "",
        "_.fill([4, 6, 8, 10], '*');",
        "// => [*, '*', '*', *]"
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "var array = [1, 2, 3];",
        "",
        "_.fill(0, array.length, 'a', array);",
        "// => ['a', 'a', 'a']",
        "",
        "_.fill(1, 3, 2, Array(3));",
        "// => [undefined, 2, 2]",
        "",
        "_.fill(0, 4, '*', [4, 6, 8, 10]);",
        "// => [*, '*', '*', *]",
        "```"
      ].join('\n'));
    });

    it('should inject default values in the middle of the arguments', function() {
      var example = toSource('inRange', [
        '{number} number The number to check.',
        '{number} [start=0] The start of the range.',
        '{number} end The end of the range.'
      ], [
        "_.inRange(4, 8);",
        "// => true"
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "_.inRange(8, 0, 4);",
        "// => true",
        "```"
      ].join('\n'));
    });

    it('should not use ignored params as default values', function() {
      var example = toSource('drop', [
        '{Array} array The array to query.',
        '{number} [n=1] The number of elements to drop.',
        '{Object} [guard] Enables use as an iteratee for functions like `_.map`.'
      ], [
        "_.drop([1, 2, 3]);",
        "// => [2, 3]"
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        "```js",
        "_.drop(1, [1, 2, 3]);",
        "// => [2, 3]",
        "```"
      ].join('\n'));
    });
  });

  describe('getParams', function() {
    it('should reorder arguments and remove default values', function() {
      var example = toParams('differenceBy', [
        '{Array} array The array to inspect.',
        '{...Array} [values] The values to exclude.',
        '{Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        ['Function|Object|string', 'iteratee', 'The iteratee invoked per element. '],
        ['Array|Array[]', 'values', 'The values to exclude. '],
        ['Array', 'array', 'The array to inspect. ']
      ]);
    });

    it('should reorder arguments that have a special order', function() {
      var example = toParams('set', [
        '{Object} object The object to modify.',
        '{Array|string} path The path of the property to set.',
        '{*} value The value to set.'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        ['Array|string', 'path', 'The path of the property to set. '],
        ['*', 'value', 'The value to set. '],
        ['Object', 'object', 'The object to modify. '],
      ]);
    });

    it('should transform rest arguments into an array', function() {
      var example = toParams('pullAt', [
        '{Array} array The array to modify.',
        '{...(number|number[])} [indexes] The indexes of elements to remove,\n' +
        ' *   specified individually or in arrays.'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        // TODO Remove this line in favor of the commented one.
        // Is linked to a docdown (https://github.com/jdalton/docdown/pull/37)
        // that does not handle parens in the arguments well
        ['((number|number)|((number|number)[]', 'indexes', 'The indexes of elements to remove, specified individually or in arrays. '],
        // ['number|number[]', '[indexes]', 'The indexes of elements to remove, specified individually or in arrays. '],
        ['Array', 'array', 'The array to modify. '],
      ]);
    });
  });

  it('should duplicate and de-restify "rest" parameters if there are less parameters than cap', function() {
    var example = toParams('intersectionWith', [
      '{...Array} [arrays] The arrays to inspect.',
      '{Function} [comparator] The comparator invoked per element.'
    ]);
    var entry = new Entry(example, example);

    var actual = entry.getParams();

    assert.deepEqual(actual, [
      ['Function', 'comparator', 'The comparator invoked per element. '],
      ['Array', 'arrays', 'The arrays to inspect. '],
      ['Array', 'arrays', 'The arrays to inspect. ']
    ]);
  });

  it('should consider method to have an ary of `ary - 1` when capped and wrapped', function() {
    var wrapped = true;
    var example = toParams('flatMap', [
      '{Array} array The array to iterate over.',
      '{Function|Object|string} [iteratee=_.identity] The function invoked per iteration.'
    ], wrapped);
    var entry = new Entry(example, example);

    var actual = entry.getParams();

    assert.deepEqual(actual, [
      ['Function|Object|string', 'iteratee', 'The function invoked per iteration. ']
    ]);
  });

  it('should remove arguments ignored because of capping', function() {
    var example = toParams('includes', [
      '{Array|Object|string} collection The collection to search.',
      '{*} value The value to search for.',
      '{number} [fromIndex=0] The index to search from.'
    ]);
    var entry = new Entry(example, example);

    var actual = entry.getParams();

    assert.deepEqual(actual, [
      ['*', 'value', 'The value to search for. '],
      ['Array|Object|string', 'collection', 'The collection to search. ']
    ]);
  });
});
