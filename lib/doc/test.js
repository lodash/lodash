var assert = require('assert');

var Entry = require('docdown/lib/entry');

var applyFPMapping = require('./apply-fp-mapping');
var mapping = require('../../fp/_mapping');

function toExample(name, lines) {
  var start = [
    "/**",
    " * ",
    " * @example"
  ];
  var end = [
    " */",
    "function " + name + "(a, b, c) {",
    "",
    "}"
  ];
  var example = lines.map(function(line) {
    return ' * ' + line;
  });
  return [].concat(start, example, end).join('\n');
}

function toParams(name, lines) {
  var start = [
    "/**",
    " * ",
  ];
  var end = [
    " * @returns Foo bar",
    " */",
    "function " + name + "(a, b, c) {",
    "",
    "}"
  ];
  var example = lines.map(function(line) {
    return ' * @param ' + line;
  });
  return [].concat(start, example, end).join('\n');
}

describe('Docs FP mapping', function() {
  var oldgetParams;
  var oldgetExample;

  before(function() {
    oldgetParams = Entry.prototype.getParams;
    oldgetExample = Entry.prototype.getExample;
    applyFPMapping(mapping);
  });

  after(function() {
    Entry.prototype.getParams = oldgetParams;
    Entry.prototype.getExample = oldgetExample;
  });

  describe('getExample', function() {
    it('should reorder parameters', function() {
      var example = toExample('differenceBy', [
        "_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);",
        "// → [3.1, 1.3]",
        "",
        "// The `_.property` iteratee shorthand.",
        "_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');",
        "// → [{ 'x': 2 }]"
      ]);
      var entry = new Entry(example, example);

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
      var example = toExample('set', [
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
      var example = toExample('set', [
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
      var example = toExample('set', [
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
      var example = toExample('pullAt', [
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
  });

  describe('getParams', function() {
    it('should reorder arguments', function() {
      var example = toParams('differenceBy', [
        '{Array} array The array to inspect.',
        '{...Array} [values] The values to exclude.',
        '{Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        ['Function|Object|string', '[iteratee=_.identity]', 'The iteratee invoked per element. '],
        ['Array|Array[]', '[values]', 'The values to exclude. '],
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
        ['((number|number)|((number|number)[]', '[indexes]', 'The indexes of elements to remove, specified individually or in arrays. '],
        // ['number|number[]', '[indexes]', 'The indexes of elements to remove, specified individually or in arrays. '],
        ['Array', 'array', 'The array to modify. '],
      ]);
    });
  });
});
