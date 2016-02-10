;(function() {
  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as a reference to the global object. */
  var root = (typeof global == 'object' && global) || this;

  var phantom = root.phantom,
      amd = root.define && define.amd,
      document = !phantom && root.document,
      noop = function() {},
      argv = root.process && process.argv;

  /** Use a single "load" function. */
  var load = (!amd && typeof require == 'function')
    ? require
    : noop;

  /** The unit testing framework. */
  var QUnit = root.QUnit || (root.QUnit = (
    QUnit = load('../node_modules/qunitjs/qunit/qunit.js') || root.QUnit,
    QUnit = QUnit.QUnit || QUnit
  ));

  /** Load stable Lodash and QUnit Extras. */
  var _ = root._ || load('../lodash.js');
  if (_) {
    _ = _.runInContext(root);
  }
  var QUnitExtras = load('../node_modules/qunit-extras/qunit-extras.js');
  if (QUnitExtras) {
    QUnitExtras.runInContext(root);
  }

  var mapping = root.mapping || load('../fp/_mapping.js'),
      applyFPMapping = load('../lib/doc/apply-fp-mapping'),
      Entry = load('docdown/lib/entry');

  /*--------------------------------------------------------------------------*/

  function toCommentLine(line) {
    return ' * ' + line;
  }

  function toEntry(name, paramLines, exampleLines, attachedToPrototype) {
    var start = [
      '/**',
      ' * ',
      ' * Foo',
      ' * '
    ];
    var end = [
      ' */',
      'function ' + name + '(a, b, c) {',
      '',
      '}'
    ];
    var staticLine = attachedToPrototype ? [] : [' * @static'];
    var params = paramLines.map(function(line) {
      return ' * @param ' + line;
    });
    var example = (exampleLines || []).map(toCommentLine);

    return [].concat(start, staticLine, params, [' * @example'], example, end).join('\n');
  }

  var differenceBySource = toEntry('differenceBy', [
    '{Array} array The array to inspect.',
    '{...Array} [values] The values to exclude.',
    '{Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.'
  ], [
    '_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);',
    '// → [3.1, 1.3]',
    '',
    '// The `_.property` iteratee shorthand.',
    "_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');",
    "// → [{ 'x': 2 }]"
  ]);

  var setParams = [
    '{Object} object The object to modify.',
    '{Array|string} path The path of the property to set.',
    '{*} value The value to set.'
  ];

  /*--------------------------------------------------------------------------*/

  if (argv) {
    console.log('Running doc generation tests.');
  }

  mapping.aryMethod[2].push('customFun');
  applyFPMapping(mapping);

  /*--------------------------------------------------------------------------*/

  QUnit.module('getExample');

  (function() {
    QUnit.test('should reorder parameters', function(assert) {
      assert.expect(1);

      var entry = new Entry(differenceBySource, differenceBySource);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        '_.differenceBy(Math.floor, [4.4, 2.5], [3.1, 2.2, 1.3]);',
        '// → [3.1, 1.3]',
        '',
        '// The `_.property` iteratee shorthand.',
        "_.differenceBy('x', [{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }]);",
        "// → [{ 'x': 2 }]",
        '```'
      ].join('\n'));
    });

    QUnit.test('should reorder parameters that have a special order', function(assert) {
      assert.expect(1);

      var example = toEntry('set', setParams, [
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set(object, 'a[0].b.c', 4);",
        "_.set(object, 'x[0].y.z', 5);",
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set('a[0].b.c', 4, object);",
        "_.set('x[0].y.z', 5, object);",
        '```'
      ].join('\n'));
    });

    QUnit.test('should preserve comments', function(assert) {
      assert.expect(1);

      var example = toEntry('set', setParams, [
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set(object, 'a[0].b.c', 4);",
        '// => 4',
        "_.set(object, 'x[0].y.z', 5);",
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        "_.set('a[0].b.c', 4, object);",
        '// => 4',
        "_.set('x[0].y.z', 5, object);",
        '```'
      ].join('\n'));
    });

    QUnit.test('should remove console.logs from example', function(assert) {
      assert.expect(1);

      var example = toEntry('set', setParams, [
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        '',
        "_.set(object, 'a[0].b.c', 4);",
        'console.log(object.a[0].b.c);',
        '// => 4',
        '',
        "_.set(object, 'x[0].y.z', 5);",
        'console.log(object.x[0].y.z);',
        '// => 5'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        "var object = { 'a': [{ 'b': { 'c': 3 } }] };",
        '',
        "_.set('a[0].b.c', 4, object);",
        '// => 4',
        '',
        "_.set('x[0].y.z', 5, object);",
        '// => 5',
        '```'
      ].join('\n'));
    });

    QUnit.test('should merge extra arguments into an array', function(assert) {
      assert.expect(1);

      var example = toEntry('pullAt', [
        '{Array} array The array to modify.',
        '{...(number|number[])} [indexes] The indexes of elements to remove,\n' +
        ' *   specified individually or in arrays.'
      ], [
        'var array = [5, 10, 15, 20];',
        'var evens = _.pullAt(array, 1, 3);',
        '',
        'console.log(array);',
        '// => [5, 15]',
        '',
        'console.log(evens);',
        '// => [10, 20]'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        'var array = [5, 10, 15, 20];',
        'var evens = _.pullAt([1, 3], array);',
        '',
        '// => [5, 15]',
        '',
        '// => [10, 20]',
        '```'
      ].join('\n'));
    });

    QUnit.test('should inject default values into optional arguments that became compulsory', function(assert) {
      assert.expect(1);

      var example = toEntry('sampleSize', [
        '{Array|Object} collection The collection to sample.',
        '{number} [n=0] The number of elements to sample.'
      ], [
        '_.sampleSize([1, 2, 3]);',
        '// => [3, 1]',
        '',
        '_.sampleSize([1, 2, 3], 4);',
        '// => [2, 3, 1]'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        '_.sampleSize(0, [1, 2, 3]);',
        '// => [3, 1]',
        '',
        '_.sampleSize(4, [1, 2, 3]);',
        '// => [2, 3, 1]',
        '```'
      ].join('\n'));
    });

    QUnit.test('should inject referenced values into optional arguments that became compulsory, ' +

    'if a parameter\'s default value references parameter (direct reference)',
    function(assert) {
      assert.expect(1);

      var example = toEntry('customFun', [
        '{Array} array Array',
        '{number} [foo=array] Foo'
      ], [
        '_.customFun([1, 2, 3]);',
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        '_.customFun([1, 2, 3], [1, 2, 3]);',
        '```'
      ].join('\n'));
    });

    QUnit.test('should inject referenced values into optional arguments that became compulsory, ' +
    'if a parameter\'s default value references parameter (member expression)',
    function(assert) {
      assert.expect(1);

      var example = toEntry('fill', [
        '{Array} array The array to fill.',
        '{*} value The value to fill `array` with.',
        '{number} [start=0] The start position.',
        '{number} [end=array.length] The end position.'
      ], [
        'var array = [1, 2, 3];',
        '',
        "_.fill(array, 'a');",
        'console.log(array);',
        "// => ['a', 'a', 'a']",
        '',
        '_.fill(Array(3), 2, 1);',
        '// => [undefined, 2, 2]',
        '',
        "_.fill([4, 6, 8, 10], '*');",
        "// => [*, '*', '*', *]"
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        'var array = [1, 2, 3];',
        '',
        "_.fill(0, array.length, 'a', array);",
        "// => ['a', 'a', 'a']",
        '',
        '_.fill(1, 3, 2, Array(3));',
        '// => [undefined, 2, 2]',
        '',
        "_.fill(0, 4, '*', [4, 6, 8, 10]);",
        "// => [*, '*', '*', *]",
        '```'
      ].join('\n'));
    });

    QUnit.test('should inject default values in the middle of the arguments', function(assert) {
      assert.expect(1);

      var example = toEntry('inRange', [
        '{number} number The number to check.',
        '{number} [start=0] The start of the range.',
        '{number} end The end of the range.'
      ], [
        '_.inRange(4, 8);',
        '// => true'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        '_.inRange(8, 0, 4);',
        '// => true',
        '```'
      ].join('\n'));
    });

    QUnit.test('should not use ignored params as default values', function(assert) {
      assert.expect(1);

      var example = toEntry('drop', [
        '{Array} array The array to query.',
        '{number} [n=1] The number of elements to drop.',
        '{Object} [guard] Enables use as an iteratee for functions like `_.map`.'
      ], [
        '_.drop([1, 2, 3]);',
        '// => [2, 3]'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getExample();

      assert.equal(actual, [
        '```js',
        '_.drop(1, [1, 2, 3]);',
        '// => [2, 3]',
        '```'
      ].join('\n'));
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('getParams');

  (function() {
    QUnit.test('should reorder arguments and remove default values', function(assert) {
      assert.expect(1);

      var example = toEntry('differenceBy', [
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

    QUnit.test('should reorder arguments that have a special order', function(assert) {
      assert.expect(1);

      var example = toEntry('set', [
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

    QUnit.test('should transform rest arguments into an array', function(assert) {
      assert.expect(1);

      var example = toEntry('pullAt', [
        '{Array} array The array to modify.',
        '{...(number|number[])} [indexes] The indexes of elements to remove,\n' +
        ' *   specified individually or in arrays.'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        // TODO Remove this line in favor of the commented one.
        // Is linked to a docdown issue (https://github.com/jdalton/docdown/pull/37)
        // that does not handle parens in the arguments well
        ['((number|number)|((number|number)[]', 'indexes', 'The indexes of elements to remove, specified individually or in arrays. '],
        // ['number|number[]', '[indexes]', 'The indexes of elements to remove, specified individually or in arrays. '],
        ['Array', 'array', 'The array to modify. '],
      ]);
    });

    QUnit.test('should duplicate and de-restify "rest" parameters if there are less parameters than cap', function(assert) {
      assert.expect(1);

      var example = toEntry('intersectionWith', [
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

    QUnit.test('should consider method to have an ary of `ary - 1` when capped and wrapped', function(assert) {
      assert.expect(1);

      var wrapped = true;
      var example = toEntry('flatMap', [
        '{Array} array The array to iterate over.',
        '{Function|Object|string} [iteratee=_.identity] The function invoked per iteration.'
      ], [], wrapped);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        ['Function|Object|string', 'iteratee', 'The function invoked per iteration. ']
      ]);
    });

    QUnit.test('should remove arguments ignored because of capping (includes)', function(assert) {
      assert.expect(1);

      var example = toEntry('includes', [
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

    QUnit.test('should remove arguments ignored because of capping (trim)', function(assert) {
      assert.expect(1);

      var example = toEntry('trim', [
        "{string} [string=''] The string to trim.",
        '{string} [chars=whitespace] The characters to trim.'
      ]);
      var entry = new Entry(example, example);

      var actual = entry.getParams();

      assert.deepEqual(actual, [
        ['string', 'string', 'The string to trim. ']
      ]);
    });
  }());

  /*--------------------------------------------------------------------------*/

  QUnit.module('getDesc');

  (function() {
    function toSourceWithDescription(name, description) {
      var start = [
        '/**',
        ' * '
      ];

      var end = [
        ' * @static',
        ' * ',
        ' */',
        'function ' + name + '(a, b, c) {',
        '',
        '}'
      ];

      var descriptionLines = description.map(toCommentLine);
      return [].concat(start, descriptionLines, end).join('\n');
    }

    QUnit.test('should remove notes about mutators arguments and remove default values', function(assert) {
      assert.expect(1);

      var example = toSourceWithDescription('pullAt', [
        'Removes elements from `array` corresponding to `indexes` and returns an',
        'array of removed elements.',
        '',
        '**Note:** Unlike `_.at`, this method mutates `array`.',
        ''
      ]);

      var entry = new Entry(example, example);

      var actual = entry.getDesc();

      assert.equal(actual, [
        'Removes elements from `array` corresponding to `indexes` and returns an',
        'array of removed elements.'
      ].join('\n'));
    });

    QUnit.test('should remove following related lines', function(assert) {
      assert.expect(1);

      var example = toSourceWithDescription('assign', [
        'Assigns own enumerable properties of source objects to the destination',
        'object. Source objects are applied from left to right. Subsequent sources',
        'overwrite property assignments of previous sources.',
        '',
        '**Note:** This method mutates `object` and is loosely based on',
        '[`Object.assign`](https://mdn.io/Object/assign).',
        ''
      ]);

      var entry = new Entry(example, example);

      var actual = entry.getDesc();

      assert.equal(actual, [
        'Assigns own enumerable properties of source objects to the destination',
        'object. Source objects are applied from left to right. Subsequent sources',
        'overwrite property assignments of previous sources.',
      ].join('\n'));
    });
  }());

  QUnit.config.asyncRetries = 10;
  QUnit.config.hidepassed = true;

  if (!document) {
    QUnit.config.noglobals = true;
    QUnit.load();
  }
}.call(this));
