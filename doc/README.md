# Lo-Dash <sup>v0.1.0</sup>

<!-- div -->


<!-- div -->

## `_`
* [`_`](#_)
* [`_.VERSION`](#_.VERSION)
* [`_.after`](#_.after)
* [`_.bind`](#_.bind)
* [`_.bindAll`](#_.bindAll)
* [`_.chain`](#_.chain)
* [`_.chain`](#_.chain)
* [`_.clone`](#_.clone)
* [`_.compact`](#_.compact)
* [`_.compose`](#_.compose)
* [`_.contains`](#_.contains)
* [`_.debounce`](#_.debounce)
* [`_.defaults`](#_.defaults)
* [`_.defer`](#_.defer)
* [`_.delay`](#_.delay)
* [`_.difference`](#_.difference)
* [`_.escape`](#_.escape)
* [`_.every`](#_.every)
* [`_.extend`](#_.extend)
* [`_.filter`](#_.filter)
* [`_.find`](#_.find)
* [`_.first`](#_.first)
* [`_.flatten`](#_.flatten)
* [`_.forEach`](#_.forEach)
* [`_.functions`](#_.functions)
* [`_.groupBy`](#_.groupBy)
* [`_.has`](#_.has)
* [`_.identity`](#_.identity)
* [`_.indexOf`](#_.indexOf)
* [`_.initial`](#_.initial)
* [`_.intersection`](#_.intersection)
* [`_.invoke`](#_.invoke)
* [`_.isArguments`](#_.isArguments)
* [`_.isArray`](#_.isArray)
* [`_.isBoolean`](#_.isBoolean)
* [`_.isDate`](#_.isDate)
* [`_.isElement`](#_.isElement)
* [`_.isEmpty`](#_.isEmpty)
* [`_.isEqual`](#_.isEqual)
* [`_.isFinite`](#_.isFinite)
* [`_.isFunction`](#_.isFunction)
* [`_.isNaN`](#_.isNaN)
* [`_.isNull`](#_.isNull)
* [`_.isNumber`](#_.isNumber)
* [`_.isObject`](#_.isObject)
* [`_.isRegExp`](#_.isRegExp)
* [`_.isString`](#_.isString)
* [`_.isUndefined`](#_.isUndefined)
* [`_.keys`](#_.keys)
* [`_.last`](#_.last)
* [`_.lastIndexOf`](#_.lastIndexOf)
* [`_.map`](#_.map)
* [`_.max`](#_.max)
* [`_.memoize`](#_.memoize)
* [`_.min`](#_.min)
* [`_.mixin`](#_.mixin)
* [`_.noConflict`](#_.noConflict)
* [`_.once`](#_.once)
* [`_.pick`](#_.pick)
* [`_.pluck`](#_.pluck)
* [`_.range`](#_.range)
* [`_.reduce`](#_.reduce)
* [`_.reduceRight`](#_.reduceRight)
* [`_.reject`](#_.reject)
* [`_.rest`](#_.rest)
* [`_.result`](#_.result)
* [`_.shuffle`](#_.shuffle)
* [`_.size`](#_.size)
* [`_.some`](#_.some)
* [`_.sortBy`](#_.sortBy)
* [`_.sortedIndex`](#_.sortedIndex)
* [`_.tap`](#_.tap)
* [`_.template`](#_.template)
* [`_.throttle`](#_.throttle)
* [`_.times`](#_.times)
* [`_.toArray`](#_.toArray)
* [`_.union`](#_.union)
* [`_.uniq`](#_.uniq)
* [`_.uniqueId`](#_.uniqueId)
* [`_.value`](#_.value)
* [`_.values`](#_.values)
* [`_.without`](#_.without)
* [`_.wrap`](#_.wrap)
* [`_.zip`](#_.zip)

<!-- /div -->


<!-- div -->

## `_.templateSettings`
* [`_.templateSettings`](#_.templateSettings)
* [`_.templateSettings.escape`](#_.templateSettings.escape)
* [`_.templateSettings.evaluate`](#_.templateSettings.evaluate)
* [`_.templateSettings.interpolate`](#_.templateSettings.interpolate)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `_`

<!-- div -->

### <a id="_" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L167" title="View in source">`_(value)`</a>
The `lodash` function.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to wrap in a `Lodash` instance.

#### Returns
*(Object)*: Returns a `Lodash` instance.

<!-- /div -->


<!-- div -->

## `_`
### <a id="_" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L167" title="View in source">`_(value)`</a>
The `lodash` function.
[&#9650;][1]

<!-- div -->

### <a id="_.VERSION" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2576" title="View in source">`_.VERSION`</a>
*(String)*: The semantic version number.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="_.after" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1335" title="View in source">`_.after(times, func)`</a>
Creates a new function that is restricted to executing only after it is called a given number of `times`.
[&#9650;][1]

#### Arguments
1. `times` *(Number)*: The number of times the function must be called before it is executed.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
~~~ js
var renderNotes = _.after(notes.length, render);
_.forEach(notes, function(note) {
  note.asyncSave({ 'success': renderNotes });
});
// renderNotes is run once, after all notes have saved.
~~~

<!-- /div -->


<!-- div -->

### <a id="_.bind" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1365" title="View in source">`_.bind(func [, arg1, arg2, ...])`</a>
Creates a new function that, when called, invokes `func` with the `this` binding of `thisArg` and prepends additional arguments to those passed to the bound function.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to bind.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to prepend to those passed to the bound function.

#### Returns
*(Function)*: Returns the new bound function.

#### Example
~~~ js
var func = function(greeting) { return greeting + ': ' + this.name; };
func = _.bind(func, { 'name': 'moe' }, 'hi');
func();
// => 'hi: moe'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.bindAll" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1399" title="View in source">`_.bindAll(object [, methodName1, methodName2, ...])`</a>
Binds methods on the `object` to the object, overwriting the non-bound method. If no method names are provided, all the function properties of the `object` will be bound.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to bind and assign the bound methods to.
2. `[methodName1, methodName2, ...]` *(Mixed)*: Method names on the object to bind.

#### Returns
*(Object)*: Returns the `object`.

#### Example
~~~ js
var buttonView = {
 'label': 'lodash',
 'onClick': function() { alert('clicked: ' + this.label); },
 'onHover': function() { console.log('hovering: ' + this.label); }
};

_.bindAll(buttonView);
jQuery('#lodash_button').on('click', buttonView.onClick);
// => When the button is clicked, `this.label` will have the correct value
~~~

<!-- /div -->


<!-- div -->

### <a id="_.chain" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2545" title="View in source">`_.chain()`</a>
Extracts the value from a wrapped chainable object.
[&#9650;][1]

#### Returns
*(Mixed)*: Returns the wrapped object.

#### Example
~~~ js
_([1, 2, 3]).value();
// => [1, 2, 3]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.chain" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2529" title="View in source">`_.chain(value)`</a>
Wraps the value in a `lodash` chainable object.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to wrap.

#### Returns
*(Object)*: Returns the `lodash` chainable object.

#### Example
~~~ js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

var youngest = _.chain(stooges)
    .sortBy(function(stooge) { return stooge.age; })
    .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
    .first()
    .value();
// => 'moe is 40'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.clone" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1670" title="View in source">`_.clone(value)`</a>
Create a shallow clone of the `value`. Any nested objects or arrays will be assigned by reference and not cloned.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to clone.

#### Returns
*(Mixed)*: Returns the cloned `value`.

#### Example
~~~ js
_.clone({ 'name': 'moe' });
// => { 'name': 'moe' };
~~~

<!-- /div -->


<!-- div -->

### <a id="_.compact" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L932" title="View in source">`_.compact(array)`</a>
Produces a new array with all falsey values of `array` removed. The values `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to compact.

#### Returns
*(Array)*: Returns a new filtered array.

#### Example
~~~ js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.compose" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1431" title="View in source">`_.compose([func1, func2, ...])`</a>
Creates a new function that is the composition of the passed functions, where each function consumes the return value of the function that follows. In math terms, composing thefunctions `f()`, `g()`, and `h()` produces `f(g(h()))`.
[&#9650;][1]

#### Arguments
1. `[func1, func2, ...]` *(Mixed)*: Functions to compose.

#### Returns
*(Function)*: Returns the new composed function.

#### Example
~~~ js
var greet = function(name) { return 'hi: ' + name; };
var exclaim = function(statement) { return statement + '!'; };
var welcome = _.compose(exclaim, greet);
welcome('moe');
// => 'hi: moe!'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.contains" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L340" title="View in source">`_.contains(collection, target)`</a>
Checks if a given `target` value is present in a `collection` using strict equality for comparisons, i.e. `===`.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `target` *(Mixed)*: The value to check for.

#### Returns
*(Boolean)*: Returns `true` if `target` value is found, else `false`.

#### Example
~~~ js
_.contains([1, 2, 3], 3);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.debounce" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1463" title="View in source">`_.debounce(func, wait, immediate)`</a>
Creates a new function that will postpone its execution until after `wait` milliseconds have elapsed since the last time it was invoked. Pass `true` for `immediate` to cause debounce to invoke the function on the leading, instead of the trailing, edge of the `wait` timeout.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to debounce.
2. `wait` *(Number)*: The number of milliseconds to postone.
3. `immediate` *(Boolean)*: A flag to indicate execution is on the leading  edge of the timeout.

#### Returns
*(Function)*: Returns the new debounced function.

#### Example
~~~ js
var lazyLayout = _.debounce(calculateLayout, 300);
jQuery(window).on('resize', lazyLayout);
~~~

<!-- /div -->


<!-- div -->

### <a id="_.defaults" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1694" title="View in source">`_.defaults(object [, defaults1, defaults2, ..])`</a>
Assigns missing properties in `object` with default values from the defaults objects. As soon as a property is set, additional defaults of the same property will be ignored.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to populate.
2. `[defaults1, defaults2, ..]` *(Object)*: The defaults objects to apply to `object`.

#### Returns
*(Object)*: Returns `object`.

#### Example
~~~ js
var iceCream = { 'flavor': 'chocolate' };
_.defaults(iceCream, { 'flavor': 'vanilla', 'sprinkles': 'lots' });
// => { 'flavor': 'chocolate', 'sprinkles': 'lots' }
~~~

<!-- /div -->


<!-- div -->

### <a id="_.defer" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1519" title="View in source">`_.defer(func [, arg1, arg2, ...])`</a>
Defers invoking the `func` function until the current call stack has cleared. Additional arguments are passed to `func` when it is invoked.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to defer.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the function with.

#### Returns
*(Number)*: Returns the `setTimeout` timeout id.

#### Example
~~~ js
_.defer(function() { alert('deferred'); });
// Returns from the function before the alert runs.
~~~

<!-- /div -->


<!-- div -->

### <a id="_.delay" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1499" title="View in source">`_.delay(func, wait [, arg1, arg2, ...])`</a>
Invokes the `func` function after `wait` milliseconds. Additional arguments are passed `func` when it is invoked.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to delay.
2. `wait` *(Number)*: The number of milliseconds to delay execution.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the function with.

#### Returns
*(Number)*: Returns the `setTimeout` timeout id.

#### Example
~~~ js
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
// => 'logged later' (Appears after one second.)
~~~

<!-- /div -->


<!-- div -->

### <a id="_.difference" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L954" title="View in source">`_.difference(array [, array1, array2, ...])`</a>
Produces a new array of `array` values not present in the other arrays using strict equality for comparisons, i.e. `===`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[array1, array2, ...]` *(Mixed)*: Arrays to check.

#### Returns
*(Array)*: Returns a new array of `array` values not present in the  other arrays.

#### Example
~~~ js
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
// => [1, 3, 4]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.escape" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2246" title="View in source">`_.escape(string)`</a>
Escapes a string for insertion into HTML, replacing `&`, `<`, `>`, `"`, `'`, and `/` characters.
[&#9650;][1]

#### Arguments
1. `string` *(String)*: The string to escape.

#### Returns
*(String)*: Returns the escaped string.

#### Example
~~~ js
_.escape('Curly, Larry & Moe');
// => "Curly, Larry &amp; Moe"
~~~

<!-- /div -->


<!-- div -->

### <a id="_.every" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L364" title="View in source">`_.every(collection, callback [, thisArg])`</a>
Checks if the `callback` returns truthy for **all** values of a `collection`. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Boolean)*: Returns `true` if all values pass the callback check, else `false`.

#### Example
~~~ js
_.every([true, 1, null, 'yes'], Boolean);
=> false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.extend" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1713" title="View in source">`_.extend(object [, source1, source2, ..])`</a>
Copies enumerable properties from the source objects to the `destination` object. Subsequent sources will overwrite propery assignments of previous sources.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source1, source2, ..]` *(Object)*: The source objects.

#### Returns
*(Object)*: Returns the destination object.

#### Example
~~~ js
_.extend({ 'name': 'moe' }, { 'age': 40 });
// => { 'name': 'moe', 'age': 40 }
~~~

<!-- /div -->


<!-- div -->

### <a id="_.filter" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L385" title="View in source">`_.filter(collection, callback [, thisArg])`</a>
Examines each value in a `collection`, returning an array of all values the `callback` returns truthy for. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of values that passed callback check.

#### Example
~~~ js
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => [2, 4, 6]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.find" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L407" title="View in source">`_.find(collection, callback [, thisArg])`</a>
Examines each value in a `collection`, returning the first one the `callback` returns truthy for. The function returns as soon as it finds an acceptable value, and does not iterate over the entire `collection`. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the value that passed the callback check, else `undefined`.

#### Example
~~~ js
var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => 2
~~~

<!-- /div -->


<!-- div -->

### <a id="_.first" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L975" title="View in source">`_.first(array [, n, guard])`</a>
Gets the first value of the `array`. Pass `n` to return the first `n` values of the `array`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with  others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Mixed)*: Returns the first value or an array of the first `n` values  of the `array`.

#### Example
~~~ js
_.first([5, 4, 3, 2, 1]);
// => 5
~~~

<!-- /div -->


<!-- div -->

### <a id="_.flatten" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L997" title="View in source">`_.flatten(array, shallow)`</a>
Flattens a nested array *(the nesting can be to any depth)*. If `shallow` is truthy, `array` will only be flattened a single level.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to compact.
2. `shallow` *(Boolean)*: A flag to indicate only flattening a single level.

#### Returns
*(Array)*: Returns a new flattened array.

#### Example
~~~ js
_.flatten([1, [2], [3, [[4]]]]);
// => [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
// => [1, 2, 3, [[4]]];
~~~

<!-- /div -->


<!-- div -->

### <a id="_.forEach" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L433" title="View in source">`_.forEach(collection, callback [, thisArg])`</a>
Iterates over a `collection`, executing the `callback` for each value in the `collection`. The `callback` is bound to the `thisArg` value, if one is passed. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array, Object)*: Returns the `collection`.

#### Example
~~~ js
_.forEach([1, 2, 3], function(num) { alert(num); });
// => alerts each number in turn...

_.forEach({ 'one': 1, 'two': 2, 'three': 3}, function(num) { alert(num); });
// => alerts each number in turn...
~~~

<!-- /div -->


<!-- div -->

### <a id="_.functions" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1730" title="View in source">`_.functions(object)`</a>
Produces a sorted array of the properties, own and inherited, of `object` that have function values.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns a new array of property names that have function values.

#### Example
~~~ js
_.functions(_);
// => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.groupBy" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L457" title="View in source">`_.groupBy(collection, callback [, thisArg])`</a>
Splits a `collection` into sets, grouped by the result of running each value through `callback`. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*. The `callback` argument may also be the name of a property to group by.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function|String)*: The function called per iteration or  property name to group by.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns an object of grouped values.

#### Example
~~~ js
_.groupBy([1.3, 2.1, 2.4], function(num) { return Math.floor(num); });
// => { '1': [1.3], '2': [2.1, 2.4] }

_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
~~~

<!-- /div -->


<!-- div -->

### <a id="_.has" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1752" title="View in source">`_.has(object, property)`</a>
Checks if the specified object `property` exists and is a direct property, instead of an inherited property.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to check.
2. `property` *(String)*: The property to check for.

#### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.

#### Example
~~~ js
_.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.identity" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2271" title="View in source">`_.identity(value)`</a>
This function simply returns the first argument passed to it. Note: It is used throughout Lo-Dash as a default callback.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: Any value.

#### Returns
*(Mixed)*: Returns `value`.

#### Example
~~~ js
var moe = { 'name': 'moe' };
moe === _.identity(moe);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.indexOf" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1028" title="View in source">`_.indexOf(array, value [, isSorted=false])`</a>
Gets the index at which the first occurrence of `value` is found using strict equality for comparisons, i.e. `===`. If the `array` is already sorted, passing `true` for `isSorted` will run a faster binary search.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(Mixed)*: The value to search for.
3. `[isSorted=false]` *(Boolean)*: A flag to indicate that the `array` is already sorted.

#### Returns
*(Number)*: Returns the index of the matched value or `-1`.

#### Example
~~~ js
_.indexOf([1, 2, 3], 2);
// => 1
~~~

<!-- /div -->


<!-- div -->

### <a id="_.initial" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1062" title="View in source">`_.initial(array [, n, guard])`</a>
Gets all but the last value of the `array`. Pass `n` to exclude the last `n` values from the result.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with  others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Array)*: Returns all but the last value or `n` values of the `array`.

#### Example
~~~ js
_.initial([5, 4, 3, 2, 1]);
// => [5, 4, 3, 2]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.intersection" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1081" title="View in source">`_.intersection([array1, array2, ...])`</a>
Computes the intersection of all the passed-in arrays.
[&#9650;][1]

#### Arguments
1. `[array1, array2, ...]` *(Mixed)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of unique values, in order, that are  present in **all** of the arrays.

#### Example
~~~ js
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.invoke" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L486" title="View in source">`_.invoke(collection, methodName [, arg1, arg2, ...])`</a>
Calls the method named by `methodName` for each value of the `collection`. Additional arguments will be passed to each invoked method.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `methodName` *(String)*: The name of the method to invoke.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: Returns a new array of values returned from each invoked method.

#### Example
~~~ js
_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isArguments" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1772" title="View in source">`_.isArguments(value)`</a>
Checks if a `value` is an `arguments` object.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is an `arguments` object, else `false`.

#### Example
~~~ js
(function() { return _.isArguments(arguments); })(1, 2, 3);
// => true

_.isArguments([1, 2, 3]);
// => false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isArray" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L201" title="View in source">`_.isArray(value)`</a>
Checks if a `value` is an array.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is an array, else `false`.

#### Example
~~~ js
(function() { return _.isArray(arguments); })();
// => false

_.isArray([1, 2, 3]);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isBoolean" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1795" title="View in source">`_.isBoolean(value)`</a>
Checks if a `value` is a boolean *(`true` or `false`)* value.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a boolean value, else `false`.

#### Example
~~~ js
_.isBoolean(null);
// => false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isDate" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1812" title="View in source">`_.isDate(value)`</a>
Checks if a `value` is a date.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a date, else `false`.

#### Example
~~~ js
_.isDate(new Date);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isElement" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1829" title="View in source">`_.isElement(value)`</a>
Checks if a `value` is a DOM element.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a DOM element, else `false`.

#### Example
~~~ js
_.isElement(document.body);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isEmpty" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L222" title="View in source">`_.isEmpty(value)`</a>
Checks if a `value` is empty. Arrays or strings with a length of `0` and objects with no enumerable own properties are considered "empty".
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is empty, else `false`.

#### Example
~~~ js
_.isEmpty([1, 2, 3]);
// => false

_.isEmpty({});
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isEqual" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1856" title="View in source">`_.isEqual(a, b [, stack])`</a>
Performs a deep comparison between two values to determine if they are equivalent to each other.
[&#9650;][1]

#### Arguments
1. `a` *(Mixed)*: The value to compare.
2. `b` *(Mixed)*: The other value to compare.
3. `[stack]` *(Array)*: Internally used to keep track of "seen" objects to  avoid circular references.

#### Returns
*(Boolean)*: Returns `true` if the values are equvalent, else `false`.

#### Example
~~~ js
var moe = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
var clone = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };

moe == clone;
// => false

_.isEqual(moe, clone);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isFinite" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1999" title="View in source">`_.isFinite(value)`</a>
Checks if a `value` is a finite number.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a finite number, else `false`.

#### Example
~~~ js
_.isFinite(-101);
// => true

_.isFinite('10');
// => false

_.isFinite(Infinity);
// => false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isFunction" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2016" title="View in source">`_.isFunction(value)`</a>
Checks if a `value` is a function.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a function, else `false`.

#### Example
~~~ js
_.isFunction(''.concat);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isNaN" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2064" title="View in source">`_.isNaN(value)`</a>
Checks if a `value` is `NaN`. Note: this is not the same as native `isNaN`, which will return true for `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is `NaN`, else `false`.

#### Example
~~~ js
_.isNaN(NaN);
// => true

_.isNaN(new Number(NaN));
// => true

isNaN(undefined);
// => true

_.isNaN(undefined);
// => false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isNull" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2086" title="View in source">`_.isNull(value)`</a>
Checks if a `value` is `null`.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is `null`, else `false`.

#### Example
~~~ js
_.isNull(null);
// => true

_.isNull(undefined);
// => false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isNumber" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2103" title="View in source">`_.isNumber(value)`</a>
Checks if a `value` is a number.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a number, else `false`.

#### Example
~~~ js
_.isNumber(8.4 * 5;
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isObject" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2036" title="View in source">`_.isObject(value)`</a>
Checks if a `value` is an object.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is an object, else `false`.

#### Example
~~~ js
_.isObject({});
// => true

_.isObject(1);
// => false
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isRegExp" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2120" title="View in source">`_.isRegExp(value)`</a>
Checks if a `value` is a regular expression.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a regular expression, else `false`.

#### Example
~~~ js
_.isRegExp(/moe/);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isString" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2137" title="View in source">`_.isString(value)`</a>
Checks if a `value` is a string.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a string, else `false`.

#### Example
~~~ js
_.isString('moe');
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.isUndefined" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2154" title="View in source">`_.isUndefined(value)`</a>
Checks if a `value` is `undefined`.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is `undefined`, else `false`.

#### Example
~~~ js
_.isUndefined(void 0);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.keys" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2171" title="View in source">`_.keys(object)`</a>
Produces an array of the `object`'s enumerable own property names.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns a new array of property names.

#### Example
~~~ js
_.keys({ 'one': 1, 'two': 2, 'three': 3 });
// => ['one', 'two', 'three']
~~~

<!-- /div -->


<!-- div -->

### <a id="_.last" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1107" title="View in source">`_.last(array [, n, guard])`</a>
Gets the last value of the `array`. Pass `n` to return the lasy `n` values of the `array`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with  others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Array)*: Returns all but the last value or `n` values of the `array`.

#### Example
~~~ js
_.last([5, 4, 3, 2, 1]);
// => 1
~~~

<!-- /div -->


<!-- div -->

### <a id="_.lastIndexOf" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1127" title="View in source">`_.lastIndexOf(array, value)`</a>
Gets the index at which the last occurrence of `value` is found using strict equality for comparisons, i.e. `===`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(Mixed)*: The value to search for.

#### Returns
*(Number)*: Returns the index of the matched value or `-1`.

#### Example
~~~ js
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
// => 4
~~~

<!-- /div -->


<!-- div -->

### <a id="_.map" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L517" title="View in source">`_.map(collection, callback [, thisArg])`</a>
Produces a new array of values by mapping each value in the `collection` through a transformation `callback`. The `callback` is bound to the `thisArg` value, if one is passed. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of values returned by the callback.

#### Example
~~~ js
_.map([1, 2, 3], function(num) { return num * 3; });
// => [3, 6, 9]

_.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
// => [3, 6, 9]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.max" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L544" title="View in source">`_.max(collection [, callback, thisArg])`</a>
Retrieves the maximum value of a `collection`. If `callback` is passed, it will be executed for each value in the `collection` to generate the criterion by which the value is ranked. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[callback]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the maximum value.

#### Example
~~~ js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

_.max(stooges, function(stooge) { return stooge.age; });
// => { 'name': 'curly', 'age': 60 };
~~~

<!-- /div -->


<!-- div -->

### <a id="_.memoize" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1542" title="View in source">`_.memoize(func [, resolver])`</a>
Creates a new function that memoizes the result of `func`. If `resolver` is passed, it will be used to determine the cache key for storing the result based on the arguments passed to the memoized function. By default, the first argument passed to the memoized function is used as the cache key.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to have its output memoized.
2. `[resolver]` *(Function)*: A function used to resolve the cache key.

#### Returns
*(Function)*: Returns the new memoizing function.

#### Example
~~~ js
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
~~~

<!-- /div -->


<!-- div -->

### <a id="_.min" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L565" title="View in source">`_.min(collection [, callback, thisArg])`</a>
Retrieves the minimum value of a `collection`. If `callback` is passed, it will be executed for each value in the `collection` to generate the criterion by which the value is ranked. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[callback]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the minimum value.

#### Example
~~~ js
_.min([10, 5, 100, 2, 1000]);
// => 2
~~~

<!-- /div -->


<!-- div -->

### <a id="_.mixin" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2297" title="View in source">`_.mixin(object)`</a>
Adds functions properties of `object` to the `lodash` function and chainable wrapper.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object of function properties to add to `lodash`.

#### Example
~~~ js
_.mixin({
  'capitalize': function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
});

_.capitalize('curly');
// => 'Curly'

_('larry').capitalize();
// => 'Larry'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.noConflict" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2327" title="View in source">`_.noConflict()`</a>
Reverts the '_' variable to its previous value and returns a reference to the `lodash` function.
[&#9650;][1]

#### Returns
*(Function)*: Returns the `lodash` function.

#### Example
~~~ js
var lodash = _.noConflict();
~~~

<!-- /div -->


<!-- div -->

### <a id="_.once" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1568" title="View in source">`_.once(func)`</a>
Creates a new function that is restricted to one execution. Repeat calls to the function will return the value of the first call.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
~~~ js
var initialize = _.once(createApplication);
initialize();
initialize();
// Application is only created once.
~~~

<!-- /div -->


<!-- div -->

### <a id="_.pick" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2188" title="View in source">`_.pick(object [, prop1, prop2, ..])`</a>
Creates an object composed of the specified properties. Property names may be specified as individual arguments or as arrays of property names.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to pluck.
2. `[prop1, prop2, ..]` *(Object)*: The properties to pick.

#### Returns
*(Object)*: Returns an object composed of the picked properties.

#### Example
~~~ js
_.pick({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'name', 'age');
// => { 'name': 'moe', 'age': 40 }
~~~

<!-- /div -->


<!-- div -->

### <a id="_.pluck" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L590" title="View in source">`_.pluck(collection, property)`</a>
Retrieves the value of a specified property from all values in a `collection`.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: Returns a new array of property values.

#### Example
~~~ js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

_.pluck(stooges, 'name');
// => ['moe', 'larry', 'curly']
~~~

<!-- /div -->


<!-- div -->

### <a id="_.range" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1169" title="View in source">`_.range([start=0], end [, step=1])`</a>
Creates an array of numbers *(positive and/or negative)* progressing from `start` up to but not including `stop`. This method is a port of Python's `range()` function. See http://docs.python.org/library/functions.html#range.
[&#9650;][1]

#### Arguments
1. `[start=0]` *(Number)*: The start of the range.
2. `end` *(Number)*: The end of the range.
3. `[step=1]` *(Number)*: The value to increment or descrement by.

#### Returns
*(Array)*: Returns a new range array.

#### Example
~~~ js
_.range(10);
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

_.range(1, 11);
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

_.range(0, 30, 5);
// => [0, 5, 10, 15, 20, 25]

_.range(0, -10, -1);
// => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]

_.range(0);
// => []
~~~

<!-- /div -->


<!-- div -->

### <a id="_.reduce" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L620" title="View in source">`_.reduce(collection, callback [, accumulator, thisArg])`</a>
Boils down a `collection` to a single value. The initial state of the reduction is `accumulator` and each successive step of it should be returned by the `callback`. The `callback` is bound to the `thisArg` value, if one is passed. The `callback` is invoked with `4` arguments; for arrays they are *(accumulator, value, index, array)* and for objects they are *(accumulator, value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[accumulator]` *(Mixed)*: Initial value of the accumulator.
4. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the accumulated value.

#### Example
~~~ js
var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
// => 6
~~~

<!-- /div -->


<!-- div -->

### <a id="_.reduceRight" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L662" title="View in source">`_.reduceRight(collection, callback [, accumulator, thisArg])`</a>
The right-associative version of `_.reduce`. The `callback` is bound to the `thisArg` value, if one is passed. The `callback` is invoked with `4` arguments; for arrays they are *(accumulator, value, index, array)* and for objects they are *(accumulator, value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[accumulator]` *(Mixed)*: Initial value of the accumulator.
4. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the accumulated value.

#### Example
~~~ js
var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
// => [4, 5, 2, 3, 0, 1]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.reject" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L713" title="View in source">`_.reject(collection, callback [, thisArg])`</a>
The opposite of `_.filter`, this method returns the values of a `collection` that `callback` does **not** return truthy for. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of values that did **not** pass the callback check.

#### Example
~~~ js
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => [1, 3, 5]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.rest" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1205" title="View in source">`_.rest(array [, n, guard])`</a>
The opposite of `_.initial`, this method gets all but the first value of the `array`. Pass `n` to exclude the first `n` values from the result.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with  others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Array)*: Returns all but the first value or `n` values of the `array`.

#### Example
~~~ js
_.rest([5, 4, 3, 2, 1]);
// => [4, 3, 2, 1]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.result" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2357" title="View in source">`_.result(object, property)`</a>
Resolves the value of `property` on `object`. If the property is a function it will be invoked and its result returned, else the property value is returned.
[&#9650;][1]

#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `property` *(String)*: The property to get the result of.

#### Returns
*(Mixed)*: Returns the resolved.

#### Example
~~~ js
var object = {
  'cheese': 'crumpets',
  'stuff': function() {
    return 'nonsense';
  }
};

_.result(object, 'cheese');
// => 'crumpets'

_.result(object, 'stuff');
// => 'nonsense'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.shuffle" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L731" title="View in source">`_.shuffle(collection)`</a>
Produces a new array of shuffled `collection` values, using a version of the Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to shuffle.

#### Returns
*(Array)*: Returns a new shuffled array.

#### Example
~~~ js
_.shuffle([1, 2, 3, 4, 5, 6]);
// => [4, 1, 6, 3, 5, 2]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.size" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L756" title="View in source">`_.size(collection)`</a>
Gets the number of values in the `collection`.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection inspect.

#### Returns
*(Number)*: Returns the number of values in the collection.

#### Example
~~~ js
_.size({ 'one': 1, 'two': 2, 'three': 3 });
// => 3
~~~

<!-- /div -->


<!-- div -->

### <a id="_.some" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L829" title="View in source">`_.some(collection, callback [, thisArg])`</a>
Checks if the `callback` returns truthy for **any** value of a `collection`. The function returns as soon as it finds passing value, and does not iterate over the entire `collection`. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Boolean)*: Returns `true` if any value passes the callback check, else `false`.

#### Example
~~~ js
_.some([null, 0, 'yes', false]);
// => true
~~~

<!-- /div -->


<!-- div -->

### <a id="_.sortBy" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L783" title="View in source">`_.sortBy(collection, callback [, thisArg])`</a>
Produces a new sorted array, ranked in ascending order by the results of running each value of a `collection` through `callback`. The `callback` is invoked with `3` arguments; for arrays they are *(value, index, array)* and for objects they are *(value, key, object)*. The `callback` argument may also be the name of a property to sort by *(e.g. 'length')*.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `callback` *(Function|String)*: The function called per iteration or  property name to sort by.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of sorted values.

#### Example
~~~ js
_.sortBy([1, 2, 3, 4, 5, 6], function(num) { return Math.sin(num); });
// => [5, 4, 6, 3, 1, 2]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.sortedIndex" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L854" title="View in source">`_.sortedIndex(array, value [, callback])`</a>
Uses a binary search to determine the smallest  index at which the `value` should be inserted into the `collection` in order to maintain the sort order of the `collection`. If `callback` is passed, it will be executed for each value in the `collection` to compute their sort ranking. The `callback` is invoked with `1` argument.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to evaluate.
3. `[callback]` *(Function)*: The function called per iteration.

#### Returns
*(Number)*: Returns the index at which the value should be inserted  into the collection.

#### Example
~~~ js
_.sortedIndex([10, 20, 30, 40, 50], 35);
// => 3
~~~

<!-- /div -->


<!-- div -->

### <a id="_.tap" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2225" title="View in source">`_.tap(value, interceptor)`</a>
Invokes `interceptor` with the `value` as the first argument, and then returns `value`. The primary purpose of this method is to "tap into" a method chain, in order to performoperations on intermediate results within the chain.
[&#9650;][1]

#### Arguments
1. `value` *(Mixed)*: The value to pass to `callback`.
2. `interceptor` *(Function)*: The function to invoke.

#### Returns
*(Mixed)*: Returns `value`.

#### Example
~~~ js
_.chain([1,2,3,200])
 .filter(function(num) { return num % 2 == 0; })
 .tap(alert)
 .map(function(num) { return num * num })
 .value();
// => // [2, 200] (alerted)
// => [4, 40000]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.template" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2460" title="View in source">`_.template(text, data, options)`</a>
A JavaScript micro-templating method, similar to John Resig's implementation. Lo-Dash templating handles arbitrary delimiters, preserves whitespace, and correctly escapes quotes within interpolated code.
[&#9650;][1]

#### Arguments
1. `text` *(String)*: The template text.
2. `data` *(Obect)*: The data object used to populate the text.
3. `options` *(Object)*: The options object.

#### Returns
*(Function, String)*: Returns a compiled function when no `data` object  is given, else it returns the interpolated text.

#### Example
~~~ js
// using compiled template
var compiled = _.template('hello: <%= name %>');
compiled({ 'name': 'moe' });
// => 'hello: moe'

var list = '% _.forEach(people, function(name) { %> <li><%= name %></li> <% }); %>';
_.template(list, { 'people': ['moe', 'curly', 'larry'] });
// => '<li>moe</li><li>curly</li><li>larry</li>'

var template = _.template('<b><%- value %></b>');
template({ 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'

// using `print`
var compiled = _.template('<% print("Hello " + epithet); %>');
compiled({ 'epithet': 'stooge' });
// => 'Hello stooge.'

// using custom template settings
_.templateSettings = {
  'interpolate': /\{\{(.+?)\}\}/g
};

var template = _.template('Hello {{ name }}!');
template({ 'name': 'Mustache' });
// => 'Hello Mustache!'


// using the `variable` option
_.template('<%= data.hasWith %>', { 'hasWith': 'no' }, { 'variable': 'data' });
// => 'no'

// using the `source` property
<script>
  JST.project = <%= _.template(jstText).source %>;
</script>
~~~

<!-- /div -->


<!-- div -->

### <a id="_.throttle" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1597" title="View in source">`_.throttle(func, wait)`</a>
Creates a new function that, when invoked, will only call the original function at most once per every `wait` milliseconds.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to throttle.
2. `wait` *(Number)*: The number of milliseconds to throttle executions to.

#### Returns
*(Function)*: Returns the new throttled function.

#### Example
~~~ js
var throttled = _.throttle(updatePosition, 100);
jQuery(window).on('scroll', throttled);
~~~

<!-- /div -->


<!-- div -->

### <a id="_.times" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2378" title="View in source">`_.times(n, callback [, thisArg])`</a>
Executes the `callback` function `n` times.
[&#9650;][1]

#### Arguments
1. `n` *(Number)*: The number of times to execute the callback.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Example
~~~ js
_.times(3, function() { genie.grantWish(); });
~~~

<!-- /div -->


<!-- div -->

### <a id="_.toArray" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L880" title="View in source">`_.toArray(collection)`</a>
Converts the `collection`, into an array. Useful for converting the `arguments` object.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to convert.

#### Returns
*(Array)*: Returns the new converted array.

#### Example
~~~ js
(function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
// => [2, 3, 4]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.union" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1223" title="View in source">`_.union([array1, array2, ...])`</a>
Computes the union of the passed-in arrays.
[&#9650;][1]

#### Arguments
1. `[array1, array2, ...]` *(Mixed)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of unique values, in order, that are  present in one or more of the arrays.

#### Example
~~~ js
_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2, 3, 101, 10]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.uniq" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1248" title="View in source">`_.uniq(array [, isSorted=false, callback])`</a>
Produces a duplicate-value-free version of the `array` using strict equality for comparisons, i.e. `===`. If the `array` is already sorted, passing `true` for `isSorted` will run a faster algorithm. If `callback` is passed, each value of `array` is passed through a transformation `callback` before uniqueness is computed. The `callback` is invoked with `3` arguments; *(value, index, array)*.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[isSorted=false]` *(Boolean)*: A flag to indicate that the `array` is already sorted.
3. `[callback]` *(Function)*: A

#### Returns
*(Array)*: Returns a duplicate-value-free array.

#### Example
~~~ js
_.uniq([1, 2, 1, 3, 1, 4]);
// => [1, 2, 3, 4]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.uniqueId" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2401" title="View in source">`_.uniqueId([prefix])`</a>
Generates a unique id. If `prefix` is passed, the id will be appended to it.
[&#9650;][1]

#### Arguments
1. `[prefix]` *(String)*: The value to prefix the id with.

#### Returns
*(Number, String)*: Returns a numeric id if no prefix is passed, else  a string id may be returned.

#### Example
~~~ js
_.uniqueId('contact_');
// => 'contact_104'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.value" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2561" title="View in source">`_.value()`</a>
Extracts the value from a wrapped chainable object.
[&#9650;][1]

#### Returns
*(Mixed)*: Returns the wrapped object.

#### Example
~~~ js
_([1, 2, 3]).value();
// => [1, 2, 3]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.values" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L908" title="View in source">`_.values(collection)`</a>
Produces an array of enumerable own property values of the `collection`.
[&#9650;][1]

#### Arguments
1. `collection` *(Array|Object)*: The collection to inspect.

#### Returns
*(Array)*: Returns a new array of property values.

#### Example
~~~ js
_.values({ 'one': 1, 'two': 2, 'three': 3 });
// => [1, 2, 3]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.without" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1282" title="View in source">`_.without(array [, value1, value2, ...])`</a>
Produces a new array with all occurrences of the values removed using strict equality for comparisons, i.e. `===`.
[&#9650;][1]

#### Arguments
1. `array` *(Array)*: The array to filter.
2. `[value1, value2, ...]` *(Mixed)*: Values to remove.

#### Returns
*(Array)*: Returns a new filtered array.

#### Example
~~~ js
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
// => [2, 3, 4]
~~~

<!-- /div -->


<!-- div -->

### <a id="_.wrap" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1646" title="View in source">`_.wrap(func, wrapper [, arg1, arg2, ...])`</a>
Create a new function that passes the `func` function to the `wrapper` function as its first argument. Additional arguments are appended to those passed to the `wrapper` function.
[&#9650;][1]

#### Arguments
1. `func` *(Function)*: The function to wrap.
2. `wrapper` *(Function)*: The wrapper function.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to append to those passed to the wrapper.

#### Returns
*(Function)*: Returns the new function.

#### Example
~~~ js
var hello = function(name) { return 'hello: ' + name; };
hello = _.wrap(hello, function(func) {
  return 'before, ' + func('moe') + ', after';
});
hello();
// => 'before, hello: moe, after'
~~~

<!-- /div -->


<!-- div -->

### <a id="_.zip" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L1303" title="View in source">`_.zip([array1, array2, ...])`</a>
Merges together the values of each of the arrays with the value at the corresponding position. Useful for separate data sources that are coordinated through matching array indexes. For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix in a similar fashion.
[&#9650;][1]

#### Arguments
1. `[array1, array2, ...]` *(Mixed)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of merged arrays.

#### Example
~~~ js
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
// => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
~~~

<!-- /div -->


<!-- /div -->


<!-- div -->

## `_.templateSettings`

<!-- div -->

### <a id="_.templateSettings" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2586" title="View in source">`_.templateSettings`</a>
*(Object)*: By default, Lo-Dash uses ERB-style template delimiters, change the following template settings to use alternative delimiters.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="_.templateSettings.escape" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2595" title="View in source">`_.templateSettings.escape`</a>
*(RegExp)*: Used to detect `data` property values to be HTML-escaped.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="_.templateSettings.evaluate" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2604" title="View in source">`_.templateSettings.evaluate`</a>
*(RegExp)*: Used to detect code to be evaluated.
[&#9650;][1]

<!-- /div -->


<!-- div -->

### <a id="_.templateSettings.interpolate" href="https://github.com/bestiejs/lodash/blob/master/lodash.js#L2613" title="View in source">`_.templateSettings.interpolate`</a>
*(RegExp)*: Used to detect `data` property values to inject.
[&#9650;][1]

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #readme "Jump back to the TOC."