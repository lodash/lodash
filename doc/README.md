# Lo-Dash <sup>v0.6.1</sup>

<!-- div -->


<!-- div -->

## <a id="_"></a>`_`
* [`_`](#_value)
* [`_.VERSION`](#_version)
* [`_.after`](#_aftern-func)
* [`_.bind`](#_bindfunc--thisarg-arg1-arg2-)
* [`_.bindAll`](#_bindallobject--methodname1-methodname2-)
* [`_.chain`](#_chainvalue)
* [`_.clone`](#_clonevalue-deep--guard-stack-thorough)
* [`_.compact`](#_compactarray)
* [`_.compose`](#_composefunc1-func2-)
* [`_.contains`](#_containscollection-target)
* [`_.countBy`](#_countbycollection-callbackproperty--thisarg)
* [`_.debounce`](#_debouncefunc-wait-immediate)
* [`_.defaults`](#_defaultsobject--default1-default2-)
* [`_.defer`](#_deferfunc--arg1-arg2-)
* [`_.delay`](#_delayfunc-wait--arg1-arg2-)
* [`_.difference`](#_differencearray--array1-array2-)
* [`_.drop`](#_dropobject-callback-prop1-prop2--thisarg)
* [`_.escape`](#_escapestring)
* [`_.every`](#_everycollection--callbackidentity-thisarg)
* [`_.extend`](#_extendobject--source1-source2-)
* [`_.filter`](#_filtercollection--callbackidentity-thisarg)
* [`_.find`](#_findcollection-callback--thisarg)
* [`_.first`](#_firstarray--n-guard)
* [`_.flatten`](#_flattenarray-shallow)
* [`_.forEach`](#_foreachcollection-callback--thisarg)
* [`_.forIn`](#_forinobject-callback--thisarg)
* [`_.forOwn`](#_forownobject-callback--thisarg)
* [`_.functions`](#_functionsobject)
* [`_.groupBy`](#_groupbycollection-callbackproperty--thisarg)
* [`_.has`](#_hasobject-property)
* [`_.identity`](#_identityvalue)
* [`_.indexOf`](#_indexofarray-value--fromindex0)
* [`_.initial`](#_initialarray--n-guard)
* [`_.intersection`](#_intersectionarray1-array2-)
* [`_.invoke`](#_invokecollection-methodname--arg1-arg2-)
* [`_.isArguments`](#_isargumentsvalue)
* [`_.isArray`](#_isarrayvalue)
* [`_.isBoolean`](#_isbooleanvalue)
* [`_.isDate`](#_isdatevalue)
* [`_.isElement`](#_iselementvalue)
* [`_.isEmpty`](#_isemptyvalue)
* [`_.isEqual`](#_isequala-b--stack-thorough)
* [`_.isFinite`](#_isfinitevalue)
* [`_.isFunction`](#_isfunctionvalue)
* [`_.isNaN`](#_isnanvalue)
* [`_.isNull`](#_isnullvalue)
* [`_.isNumber`](#_isnumbervalue)
* [`_.isObject`](#_isobjectvalue)
* [`_.isRegExp`](#_isregexpvalue)
* [`_.isString`](#_isstringvalue)
* [`_.isUndefined`](#_isundefinedvalue)
* [`_.keys`](#_keysobject)
* [`_.last`](#_lastarray--n-guard)
* [`_.lastIndexOf`](#_lastindexofarray-value--fromindexarraylength-1)
* [`_.map`](#_mapcollection--callbackidentity-thisarg)
* [`_.max`](#_maxarray--callback-thisarg)
* [`_.memoize`](#_memoizefunc--resolver)
* [`_.merge`](#_mergeobject--source1-source2--indicator-stack)
* [`_.min`](#_minarray--callback-thisarg)
* [`_.mixin`](#_mixinobject)
* [`_.noConflict`](#_noconflict)
* [`_.once`](#_oncefunc)
* [`_.partial`](#_partialfunc--arg1-arg2-)
* [`_.pick`](#_pickobject-callback-prop1-prop2--thisarg)
* [`_.pluck`](#_pluckcollection-property)
* [`_.range`](#_rangestart0-end--step1)
* [`_.reduce`](#_reducecollection-callback--accumulator-thisarg)
* [`_.reduceRight`](#_reducerightcollection-callback--accumulator-thisarg)
* [`_.reject`](#_rejectcollection--callbackidentity-thisarg)
* [`_.rest`](#_restarray--n-guard)
* [`_.result`](#_resultobject-property)
* [`_.shuffle`](#_shufflearray)
* [`_.size`](#_sizevalue)
* [`_.some`](#_somecollection--callbackidentity-thisarg)
* [`_.sortBy`](#_sortbycollection-callbackproperty--thisarg)
* [`_.sortedIndex`](#_sortedindexarray-value--callbackidentity-thisarg)
* [`_.tap`](#_tapvalue-interceptor)
* [`_.template`](#_templatetext-data-options)
* [`_.throttle`](#_throttlefunc-wait)
* [`_.times`](#_timesn-callback--thisarg)
* [`_.toArray`](#_toarraycollection)
* [`_.unescape`](#_unescapestring)
* [`_.union`](#_unionarray1-array2-)
* [`_.uniq`](#_uniqarray--issortedfalse-callbackidentity-thisarg)
* [`_.uniqueId`](#_uniqueidprefix)
* [`_.values`](#_valuesobject)
* [`_.where`](#_wherecollection-properties)
* [`_.without`](#_withoutarray--value1-value2-)
* [`_.wrap`](#_wrapvalue-wrapper)
* [`_.zip`](#_ziparray1-array2-)
* [`_.zipObject`](#_zipobjectkeys--values)

<!-- /div -->


<!-- div -->

## `_.prototype`
* [`_.prototype.chain`](#_prototypechain)
* [`_.prototype.value`](#_prototypevalue)

<!-- /div -->


<!-- div -->

## `_.templateSettings`
* [`_.templateSettings`](#_templatesettings)
* [`_.templateSettings.escape`](#_templatesettingsescape)
* [`_.templateSettings.evaluate`](#_templatesettingsevaluate)
* [`_.templateSettings.interpolate`](#_templatesettingsinterpolate)
* [`_.templateSettings.variable`](#_templatesettingsvariable)

<!-- /div -->


<!-- div -->

## ``
* [``](#)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `_`

<!-- div -->

### <a id="_value"></a>`_(value)`
<a href="#_value">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L292 "View in source") [&#x24C9;][1]

The `lodash` function.

#### Arguments
1. `value` *(Mixed)*: The value to wrap in a `LoDash` instance.

#### Returns
*(Object)*: Returns a `LoDash` instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="_version"></a>`_.VERSION`
<a href="#_version">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4171 "View in source") [&#x24C9;][1]

*(String)*: The semantic version number.

* * *

<!-- /div -->


<!-- div -->

### <a id="_aftern-func"></a>`_.after(n, func)`
<a href="#_aftern-func">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3240 "View in source") [&#x24C9;][1]

Creates a new function that is restricted to executing only after it is called `n` times.

#### Arguments
1. `n` *(Number)*: The number of times the function must be called before it is executed.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
var renderNotes = _.after(notes.length, render);
_.forEach(notes, function(note) {
  note.asyncSave({ 'success': renderNotes });
});
// `renderNotes` is run once, after all notes have saved
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_bindfunc--thisarg-arg1-arg2-"></a>`_.bind(func [, thisArg, arg1, arg2, ...])`
<a href="#_bindfunc--thisarg-arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3294 "View in source") [&#x24C9;][1]

Creates a new function that, when called, invokes `func` with the `this` binding of `thisArg` and prepends any additional `bind` arguments to those passed to the bound function. Lazy defined methods may be bound by passing the object they are bound to as `func` and the method name as `thisArg`.

#### Arguments
1. `func` *(Function|Object)*: The function to bind or the object the method belongs to.
2. `[thisArg]` *(Mixed)*: The `this` binding of `func` or the method name.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to be partially applied.

#### Returns
*(Function)*: Returns the new bound function.

#### Example
```js
// basic bind
var func = function(greeting) {
  return greeting + ' ' + this.name;
};

func = _.bind(func, { 'name': 'moe' }, 'hi');
func();
// => 'hi moe'

// lazy bind
var object = {
  'name': 'moe',
  'greet': function(greeting) {
    return greeting + ' ' + this.name;
  }
};

var func = _.bind(object, 'greet', 'hi');
func();
// => 'hi moe'

object.greet = function(greeting) {
  return greeting + ', ' + this.name + '!';
};

func();
// => 'hi, moe!'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_bindallobject--methodname1-methodname2-"></a>`_.bindAll(object [, methodName1, methodName2, ...])`
<a href="#_bindallobject--methodname1-methodname2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3364 "View in source") [&#x24C9;][1]

Binds methods on `object` to `object`, overwriting the existing method. If no method names are provided, all the function properties of `object` will be bound.

#### Arguments
1. `object` *(Object)*: The object to bind and assign the bound methods to.
2. `[methodName1, methodName2, ...]` *(String)*: Method names on the object to bind.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var buttonView = {
 'label': 'lodash',
 'onClick': function() { alert('clicked: ' + this.label); }
};

_.bindAll(buttonView);
jQuery('#lodash_button').on('click', buttonView.onClick);
// => When the button is clicked, `this.label` will have the correct value
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_chainvalue"></a>`_.chain(value)`
<a href="#_chainvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4096 "View in source") [&#x24C9;][1]

Wraps the value in a `lodash` wrapper object.

#### Arguments
1. `value` *(Mixed)*: The value to wrap.

#### Returns
*(Object)*: Returns the wrapper object.

#### Example
```js
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
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_clonevalue-deep--guard-stack-thorough"></a>`_.clone(value, deep [, guard, stack=[]], thorough)`
<a href="#_clonevalue-deep--guard-stack-thorough">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1070 "View in source") [&#x24C9;][1]

Creates a clone of `value`. If `deep` is `true`, all nested objects will also be cloned otherwise they will be assigned by reference. If a value has a `clone` method it will be used to perform the clone. Functions, DOM nodes, `arguments` objects, and objects created by constructors other than `Object` are **not** cloned unless they have a custom `clone` method.

#### Arguments
1. `value` *(Mixed)*: The value to clone.
2. `deep` *(Boolean)*: A flag to indicate a deep clone.
3. `[guard]` *(Object)*: Internally used to allow this method to work with others like `_.map` without using their callback `index` argument for `deep`.
4. `[stack=[]]` *(Array)*: Internally used to keep track of traversed objects to avoid circular references.
5. `thorough` *(Object)*: Internally used to indicate whether or not to perform a more thorough clone of non-object values.

#### Returns
*(Mixed)*: Returns the cloned `value`.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

_.clone({ 'name': 'moe' });
// => { 'name': 'moe' }

var shallow = _.clone(stooges);
shallow[0] === stooges[0];
// => true

var deep = _.clone(stooges, true);
shallow[0] === stooges[0];
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_compactarray"></a>`_.compact(array)`
<a href="#_compactarray">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2477 "View in source") [&#x24C9;][1]

Creates a new array with all falsey values of `array` removed. The values `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.

#### Arguments
1. `array` *(Array)*: The array to compact.

#### Returns
*(Array)*: Returns a new filtered array.

#### Example
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_composefunc1-func2-"></a>`_.compose([func1, func2, ...])`
<a href="#_composefunc1-func2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3402 "View in source") [&#x24C9;][1]

Creates a new function that is the composition of the passed functions, where each function consumes the return value of the function that follows. In math terms, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.

#### Arguments
1. `[func1, func2, ...]` *(Function)*: Functions to compose.

#### Returns
*(Function)*: Returns the new composed function.

#### Example
```js
var greet = function(name) { return 'hi: ' + name; };
var exclaim = function(statement) { return statement + '!'; };
var welcome = _.compose(exclaim, greet);
welcome('moe');
// => 'hi: moe!'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_containscollection-target"></a>`_.contains(collection, target)`
<a href="#_containscollection-target">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1961 "View in source") [&#x24C9;][1]

Checks if a given `target` element is present in a `collection` using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `target` *(Mixed)*: The value to check for.

#### Returns
*(Boolean)*: Returns `true` if the `target` element is found, else `false`.

#### Example
```js
_.contains([1, 2, 3], 3);
// => true

_.contains({ 'name': 'moe', 'age': 40 }, 'moe');
// => true

_.contains('curly', 'ur');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_countbycollection-callbackproperty--thisarg"></a>`_.countBy(collection, callback|property [, thisArg])`
<a href="#_countbycollection-callbackproperty--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1997 "View in source") [&#x24C9;][1]

Creates an object composed of keys returned from running each element of `collection` through a `callback`. The corresponding value of each key is the number of times the key was returned by `callback`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*. The `callback` argument may also be the name of a property to count by *(e.g. 'length')*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback|property` *(Function|String)*: The function called per iteration or property name to count by.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
_.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
// => { '4': 1, '6': 2 }

_.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
// => { '4': 1, '6': 2 }

_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_debouncefunc-wait-immediate"></a>`_.debounce(func, wait, immediate)`
<a href="#_debouncefunc-wait-immediate">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3435 "View in source") [&#x24C9;][1]

Creates a new function that will delay the execution of `func` until after `wait` milliseconds have elapsed since the last time it was invoked. Pass `true` for `immediate` to cause debounce to invoke `func` on the leading, instead of the trailing, edge of the `wait` timeout. Subsequent calls to the debounced function will return the result of the last `func` call.

#### Arguments
1. `func` *(Function)*: The function to debounce.
2. `wait` *(Number)*: The number of milliseconds to delay.
3. `immediate` *(Boolean)*: A flag to indicate execution is on the leading edge of the timeout.

#### Returns
*(Function)*: Returns the new debounced function.

#### Example
```js
var lazyLayout = _.debounce(calculateLayout, 300);
jQuery(window).on('resize', lazyLayout);
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_defaultsobject--default1-default2-"></a>`_.defaults(object [, default1, default2, ...])`
<a href="#_defaultsobject--default1-default2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1171 "View in source") [&#x24C9;][1]

Assigns enumerable properties of the default object(s) to the `destination` object for all `destination` properties that resolve to `null`/`undefined`. Once a property is set, additional defaults of the same property will be ignored.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[default1, default2, ...]` *(Object)*: The default objects.

#### Returns
*(Object)*: Returns the destination object.

#### Example
```js
var iceCream = { 'flavor': 'chocolate' };
_.defaults(iceCream, { 'flavor': 'vanilla', 'sprinkles': 'rainbow' });
// => { 'flavor': 'chocolate', 'sprinkles': 'rainbow' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_deferfunc--arg1-arg2-"></a>`_.defer(func [, arg1, arg2, ...])`
<a href="#_deferfunc--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3500 "View in source") [&#x24C9;][1]

Defers executing the `func` function until the current call stack has cleared. Additional arguments will be passed to `func` when it is invoked.

#### Arguments
1. `func` *(Function)*: The function to defer.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the function with.

#### Returns
*(Number)*: Returns the `setTimeout` timeout id.

#### Example
```js
_.defer(function() { alert('deferred'); });
// returns from the function before `alert` is called
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_delayfunc-wait--arg1-arg2-"></a>`_.delay(func, wait [, arg1, arg2, ...])`
<a href="#_delayfunc-wait--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3480 "View in source") [&#x24C9;][1]

Executes the `func` function after `wait` milliseconds. Additional arguments will be passed to `func` when it is invoked.

#### Arguments
1. `func` *(Function)*: The function to delay.
2. `wait` *(Number)*: The number of milliseconds to delay execution.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the function with.

#### Returns
*(Number)*: Returns the `setTimeout` timeout id.

#### Example
```js
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
// => 'logged later' (Appears after one second.)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_differencearray--array1-array2-"></a>`_.difference(array [, array1, array2, ...])`
<a href="#_differencearray--array1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2509 "View in source") [&#x24C9;][1]

Creates a new array of `array` elements not present in the other arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[array1, array2, ...]` *(Array)*: Arrays to check.

#### Returns
*(Array)*: Returns a new array of `array` elements not present in the  other arrays.

#### Example
```js
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
// => [1, 3, 4]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_dropobject-callback-prop1-prop2--thisarg"></a>`_.drop(object, callback|[prop1, prop2, ..., thisArg])`
<a href="#_dropobject-callback-prop1-prop2--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1201 "View in source") [&#x24C9;][1]

Creates a shallow clone of `object` excluding the specified properties. Property names may be specified as individual arguments or as arrays of property names. If `callback` is passed, it will be executed for each property in the `object`, dropping the properties `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, key, object)*.

#### Arguments
1. `object` *(Object)*: The source object.
2. `callback|[prop1, prop2, ...]` *(Function|String)*: The properties to drop or the function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns an object without the dropped properties.

#### Example
```js
_.drop({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'userid');
// => { 'name': 'moe', 'age': 40 }

_.drop({ 'name': 'moe', '_hint': 'knucklehead', '_seed': '96c4eb' }, function(value, key) {
  return key.charAt(0) == '_';
});
// => { 'name': 'moe' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_escapestring"></a>`_.escape(string)`
<a href="#_escapestring">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3697 "View in source") [&#x24C9;][1]

Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their corresponding HTML entities.

#### Arguments
1. `string` *(String)*: The string to escape.

#### Returns
*(String)*: Returns the escaped string.

#### Example
```js
_.escape('Moe, Larry & Curly');
// => "Moe, Larry &amp; Curly"
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_everycollection--callbackidentity-thisarg"></a>`_.every(collection [, callback=identity, thisArg])`
<a href="#_everycollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2017 "View in source") [&#x24C9;][1]

Checks if the `callback` returns a truthy value for **all** elements of a `collection`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Boolean)*: Returns `true` if all elements pass the callback check, else `false`.

#### Example
```js
_.every([true, 1, null, 'yes'], Boolean);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_extendobject--source1-source2-"></a>`_.extend(object [, source1, source2, ...])`
<a href="#_extendobject--source1-source2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1219 "View in source") [&#x24C9;][1]

Assigns enumerable properties of the source object(s) to the `destination` object. Subsequent sources will overwrite propery assignments of previous sources.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source1, source2, ...]` *(Object)*: The source objects.

#### Returns
*(Object)*: Returns the destination object.

#### Example
```js
_.extend({ 'name': 'moe' }, { 'age': 40 });
// => { 'name': 'moe', 'age': 40 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_filtercollection--callbackidentity-thisarg"></a>`_.filter(collection [, callback=identity, thisArg])`
<a href="#_filtercollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2037 "View in source") [&#x24C9;][1]

Examines each element in a `collection`, returning an array of all elements the `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of elements that passed callback check.

#### Example
```js
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => [2, 4, 6]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_findcollection-callback--thisarg"></a>`_.find(collection, callback [, thisArg])`
<a href="#_findcollection-callback--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2058 "View in source") [&#x24C9;][1]

Examines each element in a `collection`, returning the first one the `callback` returns truthy for. The function returns as soon as it finds an acceptable element, and does not iterate over the entire `collection`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the element that passed the callback check, else `undefined`.

#### Example
```js
var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => 2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_firstarray--n-guard"></a>`_.first(array [, n, guard])`
<a href="#_firstarray--n-guard">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2546 "View in source") [&#x24C9;][1]

Gets the first element of the `array`. Pass `n` to return the first `n` elements of the `array`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Mixed)*: Returns the first element or an array of the first `n`  elements of `array`.

#### Example
```js
_.first([5, 4, 3, 2, 1]);
// => 5
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_flattenarray-shallow"></a>`_.flatten(array, shallow)`
<a href="#_flattenarray-shallow">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2570 "View in source") [&#x24C9;][1]

Flattens a nested array *(the nesting can be to any depth)*. If `shallow` is truthy, `array` will only be flattened a single level.

#### Arguments
1. `array` *(Array)*: The array to compact.
2. `shallow` *(Boolean)*: A flag to indicate only flattening a single level.

#### Returns
*(Array)*: Returns a new flattened array.

#### Example
```js
_.flatten([1, [2], [3, [[4]]]]);
// => [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
// => [1, 2, 3, [[4]]];
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_foreachcollection-callback--thisarg"></a>`_.forEach(collection, callback [, thisArg])`
<a href="#_foreachcollection-callback--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2085 "View in source") [&#x24C9;][1]

Iterates over a `collection`, executing the `callback` for each element in the `collection`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array, Object)*: Returns `collection`.

#### Example
```js
_([1, 2, 3]).forEach(alert).join(',');
// => alerts each number and returns '1,2,3'

_.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
// => alerts each number (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forinobject-callback--thisarg"></a>`_.forIn(object, callback [, thisArg])`
<a href="#_forinobject-callback--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1249 "View in source") [&#x24C9;][1]

Iterates over `object`'s own and inherited enumerable properties, executing the `callback` for each property. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  alert('Woof, woof!');
};

_.forIn(new Dog('Dagny'), function(value, key) {
  alert(key);
});
// => alerts 'name' and 'bark' (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forownobject-callback--thisarg"></a>`_.forOwn(object, callback [, thisArg])`
<a href="#_forownobject-callback--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1273 "View in source") [&#x24C9;][1]

Iterates over `object`'s own enumerable properties, executing the `callback` for each property. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
_.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
  alert(key);
});
// => alerts '0', '1', and 'length' (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_functionsobject"></a>`_.functions(object)`
<a href="#_functionsobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1290 "View in source") [&#x24C9;][1]

Creates a sorted array of all enumerable properties, own and inherited, of `object` that have function values.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns a new array of property names that have function values.

#### Example
```js
_.functions(_);
// => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_groupbycollection-callbackproperty--thisarg"></a>`_.groupBy(collection, callback|property [, thisArg])`
<a href="#_groupbycollection-callbackproperty--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2113 "View in source") [&#x24C9;][1]

Creates an object composed of keys returned from running each element of `collection` through a `callback`. The corresponding value of each key is an array of elements passed to `callback` that returned the key. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*. The `callback` argument may also be the name of a property to count by *(e.g. 'length')*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback|property` *(Function|String)*: The function called per iteration or property name to group by.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
_.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
// => { '4': [4.2], '6': [6.1, 6.4] }

_.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
// => { '4': [4.2], '6': [6.1, 6.4] }

_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_hasobject-property"></a>`_.has(object, property)`
<a href="#_hasobject-property">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1313 "View in source") [&#x24C9;][1]

Checks if the specified object `property` exists and is a direct property, instead of an inherited property.

#### Arguments
1. `object` *(Object)*: The object to check.
2. `property` *(String)*: The property to check for.

#### Returns
*(Boolean)*: Returns `true` if key is a direct property, else `false`.

#### Example
```js
_.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_identityvalue"></a>`_.identity(value)`
<a href="#_identityvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3717 "View in source") [&#x24C9;][1]

This function returns the first argument passed to it.  Note: It is used throughout Lo-Dash as a default callback.

#### Arguments
1. `value` *(Mixed)*: Any value.

#### Returns
*(Mixed)*: Returns `value`.

#### Example
```js
var moe = { 'name': 'moe' };
moe === _.identity(moe);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_indexofarray-value--fromindex0"></a>`_.indexOf(array, value [, fromIndex=0])`
<a href="#_indexofarray-value--fromindex0">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2614 "View in source") [&#x24C9;][1]

Gets the index at which the first occurrence of `value` is found using strict equality for comparisons, i.e. `===`. If the `array` is already sorted, passing `true` for `isSorted` will run a faster binary search.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(Mixed)*: The value to search for.
3. `[fromIndex=0]` *(Boolean|Number)*: The index to start searching from or `true` to perform a binary search on a sorted `array`.

#### Returns
*(Number)*: Returns the index of the matched value or `-1`.

#### Example
```js
_.indexOf([1, 2, 3, 1, 2, 3], 2);
// => 1

_.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
// => 4

_.indexOf([1, 1, 2, 2, 3, 3], 2, true);
// => 2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_initialarray--n-guard"></a>`_.initial(array [, n, guard])`
<a href="#_initialarray--n-guard">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2654 "View in source") [&#x24C9;][1]

Gets all but the last element of `array`. Pass `n` to exclude the last `n` elements from the result.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Array)*: Returns all but the last element or `n` elements of `array`.

#### Example
```js
_.initial([3, 2, 1]);
// => [3, 2]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_intersectionarray1-array2-"></a>`_.intersection([array1, array2, ...])`
<a href="#_intersectionarray1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2676 "View in source") [&#x24C9;][1]

Computes the intersection of all the passed-in arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `[array1, array2, ...]` *(Array)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of unique elements, in order, that are  present in **all** of the arrays.

#### Example
```js
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_invokecollection-methodname--arg1-arg2-"></a>`_.invoke(collection, methodName [, arg1, arg2, ...])`
<a href="#_invokecollection-methodname--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2141 "View in source") [&#x24C9;][1]

Invokes the method named by `methodName` on each element in the `collection`. Additional arguments will be passed to each invoked method. If `methodName` is a function it will be invoked for, and `this` bound to, each element in the `collection`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `methodName` *(Function|String)*: The name of the method to invoke or the function invoked per iteration.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: Returns a new array of values returned from each invoked method.

#### Example
```js
_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]

_.invoke([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isargumentsvalue"></a>`_.isArguments(value)`
<a href="#_isargumentsvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L910 "View in source") [&#x24C9;][1]

Checks if `value` is an `arguments` object.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is an `arguments` object, else `false`.

#### Example
```js
(function() { return _.isArguments(arguments); })(1, 2, 3);
// => true

_.isArguments([1, 2, 3]);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isarrayvalue"></a>`_.isArray(value)`
<a href="#_isarrayvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L936 "View in source") [&#x24C9;][1]

Checks if `value` is an array.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is an array, else `false`.

#### Example
```js
(function() { return _.isArray(arguments); })();
// => false

_.isArray([1, 2, 3]);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isbooleanvalue"></a>`_.isBoolean(value)`
<a href="#_isbooleanvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1330 "View in source") [&#x24C9;][1]

Checks if `value` is a boolean *(`true` or `false`)* value.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a boolean value, else `false`.

#### Example
```js
_.isBoolean(null);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isdatevalue"></a>`_.isDate(value)`
<a href="#_isdatevalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1347 "View in source") [&#x24C9;][1]

Checks if `value` is a date.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a date, else `false`.

#### Example
```js
_.isDate(new Date);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_iselementvalue"></a>`_.isElement(value)`
<a href="#_iselementvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1364 "View in source") [&#x24C9;][1]

Checks if `value` is a DOM element.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a DOM element, else `false`.

#### Example
```js
_.isElement(document.body);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isemptyvalue"></a>`_.isEmpty(value)`
<a href="#_isemptyvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1389 "View in source") [&#x24C9;][1]

Checks if `value` is empty. Arrays, strings, or `arguments` objects with a length of `0` and objects with no own enumerable properties are considered "empty".

#### Arguments
1. `value` *(Array|Object|String)*: The value to inspect.

#### Returns
*(Boolean)*: Returns `true` if the `value` is empty, else `false`.

#### Example
```js
_.isEmpty([1, 2, 3]);
// => false

_.isEmpty({});
// => true

_.isEmpty('');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isequala-b--stack-thorough"></a>`_.isEqual(a, b [, stack=[]], thorough)`
<a href="#_isequala-b--stack-thorough">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1431 "View in source") [&#x24C9;][1]

Performs a deep comparison between two values to determine if they are equivalent to each other. If a value has an `isEqual` method it will be used to perform the comparison.

#### Arguments
1. `a` *(Mixed)*: The value to compare.
2. `b` *(Mixed)*: The other value to compare.
3. `[stack=[]]` *(Array)*: Internally used to keep track of traversed objects to avoid circular references.
4. `thorough` *(Object)*: Internally used to indicate whether or not to perform a more thorough comparison of non-object values.

#### Returns
*(Boolean)*: Returns `true` if the values are equvalent, else `false`.

#### Example
```js
var moe = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };
var clone = { 'name': 'moe', 'luckyNumbers': [13, 27, 34] };

moe == clone;
// => false

_.isEqual(moe, clone);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isfinitevalue"></a>`_.isFinite(value)`
<a href="#_isfinitevalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1604 "View in source") [&#x24C9;][1]

Checks if `value` is a finite number.  Note: This is not the same as native `isFinite`, which will return true for booleans and other values. See http://es5.github.com/#x15.1.2.5.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a finite number, else `false`.

#### Example
```js
_.isFinite(-101);
// => true

_.isFinite('10');
// => false

_.isFinite(Infinity);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isfunctionvalue"></a>`_.isFunction(value)`
<a href="#_isfunctionvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L953 "View in source") [&#x24C9;][1]

Checks if `value` is a function.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a function, else `false`.

#### Example
```js
_.isFunction(''.concat);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isnanvalue"></a>`_.isNaN(value)`
<a href="#_isnanvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1659 "View in source") [&#x24C9;][1]

Checks if `value` is `NaN`.  Note: This is not the same as native `isNaN`, which will return true for `undefined` and other values. See http://es5.github.com/#x15.1.2.4.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is `NaN`, else `false`.

#### Example
```js
_.isNaN(NaN);
// => true

_.isNaN(new Number(NaN));
// => true

isNaN(undefined);
// => true

_.isNaN(undefined);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isnullvalue"></a>`_.isNull(value)`
<a href="#_isnullvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1682 "View in source") [&#x24C9;][1]

Checks if `value` is `null`.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is `null`, else `false`.

#### Example
```js
_.isNull(null);
// => true

_.isNull(undefined);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isnumbervalue"></a>`_.isNumber(value)`
<a href="#_isnumbervalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1699 "View in source") [&#x24C9;][1]

Checks if `value` is a number.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a number, else `false`.

#### Example
```js
_.isNumber(8.4 * 5;
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isobjectvalue"></a>`_.isObject(value)`
<a href="#_isobjectvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1625 "View in source") [&#x24C9;][1]

Checks if `value` is the language type of Object. *(e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)*

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is an object, else `false`.

#### Example
```js
_.isObject({});
// => true

_.isObject(1);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isregexpvalue"></a>`_.isRegExp(value)`
<a href="#_isregexpvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1716 "View in source") [&#x24C9;][1]

Checks if `value` is a regular expression.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a regular expression, else `false`.

#### Example
```js
_.isRegExp(/moe/);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isstringvalue"></a>`_.isString(value)`
<a href="#_isstringvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1733 "View in source") [&#x24C9;][1]

Checks if `value` is a string.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is a string, else `false`.

#### Example
```js
_.isString('moe');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isundefinedvalue"></a>`_.isUndefined(value)`
<a href="#_isundefinedvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1751 "View in source") [&#x24C9;][1]

Checks if `value` is `undefined`.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true` if the `value` is `undefined`, else `false`.

#### Example
```js
_.isUndefined(void 0);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_keysobject"></a>`_.keys(object)`
<a href="#_keysobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1768 "View in source") [&#x24C9;][1]

Creates an array composed of the own enumerable property names of `object`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns a new array of property names.

#### Example
```js
_.keys({ 'one': 1, 'two': 2, 'three': 3 });
// => ['one', 'two', 'three'] (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_lastarray--n-guard"></a>`_.last(array [, n, guard])`
<a href="#_lastarray--n-guard">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2719 "View in source") [&#x24C9;][1]

Gets the last element of the `array`. Pass `n` to return the lasy `n` elementsvof the `array`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Mixed)*: Returns the last element or an array of the last `n`  elements of `array`.

#### Example
```js
_.last([3, 2, 1]);
// => 1
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_lastindexofarray-value--fromindexarraylength-1"></a>`_.lastIndexOf(array, value [, fromIndex=array.length-1])`
<a href="#_lastindexofarray-value--fromindexarraylength-1">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2745 "View in source") [&#x24C9;][1]

Gets the index at which the last occurrence of `value` is found using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(Mixed)*: The value to search for.
3. `[fromIndex=array.length-1]` *(Number)*: The index to start searching from.

#### Returns
*(Number)*: Returns the index of the matched value or `-1`.

#### Example
```js
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
// => 4

_.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
// => 1
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_mapcollection--callbackidentity-thisarg"></a>`_.map(collection [, callback=identity, thisArg])`
<a href="#_mapcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2176 "View in source") [&#x24C9;][1]

Creates a new array of values by running each element in the `collection` through a `callback`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of elements returned by the callback.

#### Example
```js
_.map([1, 2, 3], function(num) { return num * 3; });
// => [3, 6, 9]

_.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
// => [3, 6, 9] (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_maxarray--callback-thisarg"></a>`_.max(array [, callback, thisArg])`
<a href="#_maxarray--callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2785 "View in source") [&#x24C9;][1]

Retrieves the maximum value of an `array`. If `callback` is passed, it will be executed for each value in the `array` to generate the criterion by which the value is ranked. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index, array)*.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `[callback]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the maximum value.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

_.max(stooges, function(stooge) { return stooge.age; });
// => { 'name': 'curly', 'age': 60 };
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_memoizefunc--resolver"></a>`_.memoize(func [, resolver])`
<a href="#_memoizefunc--resolver">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3523 "View in source") [&#x24C9;][1]

Creates a new function that memoizes the result of `func`. If `resolver` is passed, it will be used to determine the cache key for storing the result based on the arguments passed to the memoized function. By default, the first argument passed to the memoized function is used as the cache key.

#### Arguments
1. `func` *(Function)*: The function to have its output memoized.
2. `[resolver]` *(Function)*: A function used to resolve the cache key.

#### Returns
*(Function)*: Returns the new memoizing function.

#### Example
```js
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_mergeobject--source1-source2--indicator-stack"></a>`_.merge(object [, source1, source2, ..., indicator, stack=[]])`
<a href="#_mergeobject--source1-source2--indicator-stack">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1810 "View in source") [&#x24C9;][1]

Merges enumerable properties of the source object(s) into the `destination` object. Subsequent sources will overwrite propery assignments of previous sources.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source1, source2, ...]` *(Object)*: The source objects.
3. `[indicator]` *(Object)*: Internally used to indicate that the `stack` argument is an array of traversed objects instead of another source object.
4. `[stack=[]]` *(Array)*: Internally used to keep track of traversed objects to avoid circular references.

#### Returns
*(Object)*: Returns the destination object.

#### Example
```js
var stooges = [
  { 'name': 'moe' },
  { 'name': 'larry' }
];

var ages = [
  { 'age': 40 },
  { 'age': 50 }
];

_.merge(stooges, ages);
// => [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_minarray--callback-thisarg"></a>`_.min(array [, callback, thisArg])`
<a href="#_minarray--callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2835 "View in source") [&#x24C9;][1]

Retrieves the minimum value of an `array`. If `callback` is passed, it will be executed for each value in the `array` to generate the criterion by which the value is ranked. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index, array)*.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `[callback]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the minimum value.

#### Example
```js
_.min([10, 5, 100, 2, 1000]);
// => 2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_mixinobject"></a>`_.mixin(object)`
<a href="#_mixinobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3743 "View in source") [&#x24C9;][1]

Adds functions properties of `object` to the `lodash` function and chainable wrapper.

#### Arguments
1. `object` *(Object)*: The object of function properties to add to `lodash`.

#### Example
```js
_.mixin({
  'capitalize': function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
});

_.capitalize('larry');
// => 'Larry'

_('curly').capitalize();
// => 'Curly'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_noconflict"></a>`_.noConflict()`
<a href="#_noconflict">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3774 "View in source") [&#x24C9;][1]

Reverts the '_' variable to its previous value and returns a reference to the `lodash` function.

#### Returns
*(Function)*: Returns the `lodash` function.

#### Example
```js
var lodash = _.noConflict();
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_oncefunc"></a>`_.once(func)`
<a href="#_oncefunc">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3549 "View in source") [&#x24C9;][1]

Creates a new function that is restricted to one execution. Repeat calls to the function will return the value of the first call.

#### Arguments
1. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
var initialize = _.once(createApplication);
initialize();
initialize();
// Application is only created once.
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_partialfunc--arg1-arg2-"></a>`_.partial(func [, arg1, arg2, ...])`
<a href="#_partialfunc--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3584 "View in source") [&#x24C9;][1]

Creates a new function that, when called, invokes `func` with any additional `partial` arguments prepended to those passed to the new function. This method is similar `bind`, except it does **not** alter the `this` binding.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to be partially applied.

#### Returns
*(Function)*: Returns the new partially applied function.

#### Example
```js
var greet = function(greeting, name) { return greeting + ': ' + name; };
var hi = _.partial(greet, 'hi');
hi('moe');
// => 'hi: moe'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_pickobject-callback-prop1-prop2--thisarg"></a>`_.pick(object, callback|[prop1, prop2, ..., thisArg])`
<a href="#_pickobject-callback-prop1-prop2--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1862 "View in source") [&#x24C9;][1]

Creates a shallow clone of `object` composed of the specified properties. Property names may be specified as individual arguments or as arrays of property names. If `callback` is passed, it will be executed for each property in the `object`, picking the properties `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, key, object)*.

#### Arguments
1. `object` *(Object)*: The source object.
2. `callback|[prop1, prop2, ...]` *(Function|String)*: The properties to pick or the function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Object)*: Returns an object composed of the picked properties.

#### Example
```js
_.pick({ 'name': 'moe', 'age': 40, 'userid': 'moe1' }, 'name', 'age');
// => { 'name': 'moe', 'age': 40 }

_.pick({ 'name': 'moe', '_hint': 'knucklehead', '_seed': '96c4eb' }, function(value, key) {
  return key.charAt(0) != '_';
});
// => { 'name': 'moe' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_pluckcollection-property"></a>`_.pluck(collection, property)`
<a href="#_pluckcollection-property">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2199 "View in source") [&#x24C9;][1]

Retrieves the value of a specified property from all elements in the `collection`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `property` *(String)*: The property to pluck.

#### Returns
*(Array)*: Returns a new array of property values.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

_.pluck(stooges, 'name');
// => ['moe', 'larry', 'curly']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_rangestart0-end--step1"></a>`_.range([start=0], end [, step=1])`
<a href="#_rangestart0-end--step1">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2896 "View in source") [&#x24C9;][1]

Creates an array of numbers *(positive and/or negative)* progressing from `start` up to but not including `stop`. This method is a port of Python's `range()` function. See http://docs.python.org/library/functions.html#range.

#### Arguments
1. `[start=0]` *(Number)*: The start of the range.
2. `end` *(Number)*: The end of the range.
3. `[step=1]` *(Number)*: The value to increment or descrement by.

#### Returns
*(Array)*: Returns a new range array.

#### Example
```js
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
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_reducecollection-callback--accumulator-thisarg"></a>`_.reduce(collection, callback [, accumulator, thisArg])`
<a href="#_reducecollection-callback--accumulator-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2227 "View in source") [&#x24C9;][1]

Boils down a `collection` to a single value. The initial state of the reduction is `accumulator` and each successive step of it should be returned by the `callback`. The `callback` is bound to `thisArg` and invoked with `4` arguments; for arrays they are *(accumulator, value, index|key, collection)*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[accumulator]` *(Mixed)*: Initial value of the accumulator.
4. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the accumulated value.

#### Example
```js
var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; });
// => 6
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_reducerightcollection-callback--accumulator-thisarg"></a>`_.reduceRight(collection, callback [, accumulator, thisArg])`
<a href="#_reducerightcollection-callback--accumulator-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2264 "View in source") [&#x24C9;][1]

The right-associative version of `_.reduce`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback` *(Function)*: The function called per iteration.
3. `[accumulator]` *(Mixed)*: Initial value of the accumulator.
4. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Mixed)*: Returns the accumulated value.

#### Example
```js
var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
// => [4, 5, 2, 3, 0, 1]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_rejectcollection--callbackidentity-thisarg"></a>`_.reject(collection [, callback=identity, thisArg])`
<a href="#_rejectcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2320 "View in source") [&#x24C9;][1]

The opposite of `_.filter`, this method returns the values of a `collection` that `callback` does **not** return truthy for.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of elements that did **not** pass the callback check.

#### Example
```js
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => [1, 3, 5]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_restarray--n-guard"></a>`_.rest(array [, n, guard])`
<a href="#_restarray--n-guard">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2935 "View in source") [&#x24C9;][1]

The opposite of `_.initial`, this method gets all but the first value of `array`. Pass `n` to exclude the first `n` values from the result.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n]` *(Number)*: The number of elements to return.
3. `[guard]` *(Object)*: Internally used to allow this method to work with others like `_.map` without using their callback `index` argument for `n`.

#### Returns
*(Array)*: Returns all but the first value or `n` values of `array`.

#### Example
```js
_.rest([3, 2, 1]);
// => [2, 1]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_resultobject-property"></a>`_.result(object, property)`
<a href="#_resultobject-property">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3806 "View in source") [&#x24C9;][1]

Resolves the value of `property` on `object`. If `property` is a function it will be invoked and its result returned, else the property value is returned. If `object` is falsey, then `null` is returned.

#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `property` *(String)*: The property to get the result of.

#### Returns
*(Mixed)*: Returns the resolved value.

#### Example
```js
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
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_shufflearray"></a>`_.shuffle(array)`
<a href="#_shufflearray">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2956 "View in source") [&#x24C9;][1]

Creates a new array of shuffled `array` values, using a version of the Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.

#### Arguments
1. `array` *(Array)*: The array to shuffle.

#### Returns
*(Array)*: Returns a new shuffled array.

#### Example
```js
_.shuffle([1, 2, 3, 4, 5, 6]);
// => [4, 1, 6, 3, 5, 2]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_sizevalue"></a>`_.size(value)`
<a href="#_sizevalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1900 "View in source") [&#x24C9;][1]

Gets the size of `value` by returning `value.length` if `value` is an array, string, or `arguments` object. If `value` is an object, size is determined by returning the number of own enumerable properties it has.

#### Arguments
1. `value` *(Array|Object|String)*: The value to inspect.

#### Returns
*(Number)*: Returns `value.length` or number of own enumerable properties.

#### Example
```js
_.size([1, 2]);
// => 2

_.size({ 'one': 1, 'two': 2, 'three': 3 });
// => 3

_.size('curly');
// => 5
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_somecollection--callbackidentity-thisarg"></a>`_.some(collection [, callback=identity, thisArg])`
<a href="#_somecollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2343 "View in source") [&#x24C9;][1]

Checks if the `callback` returns a truthy value for **any** element of a `collection`. The function returns as soon as it finds passing value, and does not iterate over the entire `collection`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Boolean)*: Returns `true` if any element passes the callback check, else `false`.

#### Example
```js
_.some([null, 0, 'yes', false]);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_sortbycollection-callbackproperty--thisarg"></a>`_.sortBy(collection, callback|property [, thisArg])`
<a href="#_sortbycollection-callbackproperty--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2373 "View in source") [&#x24C9;][1]

Creates a new array, stable sorted in ascending order by the results of running each element of `collection` through a `callback`. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index|key, collection)*. The `callback` argument may also be the name of a property to sort by *(e.g. 'length')*.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `callback|property` *(Function|String)*: The function called per iteration or property name to sort by.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a new array of sorted elements.

#### Example
```js
_.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
// => [3, 1, 2]

_.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
// => [3, 1, 2]

_.sortBy(['larry', 'brendan', 'moe'], 'length');
// => ['moe', 'larry', 'brendan']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_sortedindexarray-value--callbackidentity-thisarg"></a>`_.sortedIndex(array, value [, callback=identity, thisArg])`
<a href="#_sortedindexarray-value--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3008 "View in source") [&#x24C9;][1]

Uses a binary search to determine the smallest index at which the `value` should be inserted into `array` in order to maintain the sort order of the sorted `array`. If `callback` is passed, it will be executed for `value` and each element in `array` to compute their sort ranking. The `callback` is bound to `thisArg` and invoked with `1` argument; *(value)*.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to evaluate.
3. `[callback=identity]` *(Function)*: The function called per iteration.
4. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Number)*: Returns the index at which the value should be inserted  into `array`.

#### Example
```js
_.sortedIndex([20, 30, 40], 35);
// => 2

var dict = {
  'wordToNumber': { 'twenty': 20, 'thirty': 30, 'thirty-five': 35, 'fourty': 40 }
};

_.sortedIndex(['twenty', 'thirty', 'fourty'], 'thirty-five', function(word) {
  return dict.wordToNumber[word];
});
// => 2

_.sortedIndex(['twenty', 'thirty', 'fourty'], 'thirty-five', function(word) {
  return this.wordToNumber[word];
}, dict);
// => 2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_tapvalue-interceptor"></a>`_.tap(value, interceptor)`
<a href="#_tapvalue-interceptor">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4123 "View in source") [&#x24C9;][1]

Invokes `interceptor` with the `value` as the first argument, and then returns `value`. The purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

#### Arguments
1. `value` *(Mixed)*: The value to pass to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.

#### Returns
*(Mixed)*: Returns `value`.

#### Example
```js
_.chain([1,2,3,200])
 .filter(function(num) { return num % 2 == 0; })
 .tap(alert)
 .map(function(num) { return num * num })
 .value();
// => // [2, 200] (alerted)
// => [4, 40000]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatetext-data-options"></a>`_.template(text, data, options)`
<a href="#_templatetext-data-options">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3879 "View in source") [&#x24C9;][1]

A micro-templating method that handles arbitrary delimiters, preserves whitespace, and correctly escapes quotes within interpolated code.  Note: In the development build `_.template` utilizes sourceURLs for easier debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl  Note: Lo-Dash may be used in Chrome extensions by either creating a `lodash csp` build and avoiding `_.template` use, or loading Lo-Dash in a sandboxed page. See http://developer.chrome.com/trunk/extensions/sandboxingEval.html

#### Arguments
1. `text` *(String)*: The template text.
2. `data` *(Obect)*: The data object used to populate the text.
3. `options` *(Object)*: The options object.

#### Returns
*(Function, String)*: Returns a compiled function when no `data` object  is given, else it returns the interpolated text.

#### Example
```js
// using a compiled template
var compiled = _.template('hello: <%= name %>');
compiled({ 'name': 'moe' });
// => 'hello: moe'

var list = '<% _.forEach(people, function(name) { %> <li><%= name %></li> <% }); %>';
_.template(list, { 'people': ['moe', 'larry', 'curly'] });
// => '<li>moe</li><li>larry</li><li>curly</li>'

// using the "escape" delimiter to escape HTML in data property values
_.template('<b><%- value %></b>', { 'value': '<script>' });
// => '<b>&lt;script></b>'

// using the internal `print` function in "evaluate" delimiters
_.template('<% print("Hello " + epithet); %>', { 'epithet': 'stooge' });
// => 'Hello stooge.'

// using custom template delimiter settings
_.templateSettings = {
  'interpolate': /\{\{(.+?)\}\}/g
};

_.template('Hello {{ name }}!', { 'name': 'Mustache' });
// => 'Hello Mustache!'

// using the `variable` option to ensure a with-statement isn't used in the compiled template
var compiled = _.template('hello: <%= data.name %>', null, { 'variable': 'data' });
compiled.source;
// => function(data) {
  var __t, __p = '', __e = _.escape;
  __p += 'hello: ' + ((__t = ( data.name )) == null ? '' : __t);
  return __p;
}

// using the `source` property to inline compiled templates for meaningful
// line numbers in error messages and a stack trace
fs.writeFileSync(path.join(cwd, 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
');
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_throttlefunc-wait"></a>`_.throttle(func, wait)`
<a href="#_throttlefunc-wait">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3620 "View in source") [&#x24C9;][1]

Creates a new function that, when executed, will only call the `func` function at most once per every `wait` milliseconds. If the throttled function is invoked more than once during the `wait` timeout, `func` will also be called on the trailing edge of the timeout. Subsequent calls to the throttled function will return the result of the last `func` call.

#### Arguments
1. `func` *(Function)*: The function to throttle.
2. `wait` *(Number)*: The number of milliseconds to throttle executions to.

#### Returns
*(Function)*: Returns the new throttled function.

#### Example
```js
var throttled = _.throttle(updatePosition, 100);
jQuery(window).on('scroll', throttled);
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_timesn-callback--thisarg"></a>`_.times(n, callback [, thisArg])`
<a href="#_timesn-callback--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4021 "View in source") [&#x24C9;][1]

Executes the `callback` function `n` times. The `callback` is bound to `thisArg` and invoked with `1` argument; *(index)*.

#### Arguments
1. `n` *(Number)*: The number of times to execute the callback.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Example
```js
_.times(3, function() { genie.grantWish(); });
// => calls `genie.grantWish()` 3 times

_.times(3, function() { this.grantWish(); }, genie);
// => also calls `genie.grantWish()` 3 times
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_toarraycollection"></a>`_.toArray(collection)`
<a href="#_toarraycollection">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2410 "View in source") [&#x24C9;][1]

Converts the `collection`, to an array. Useful for converting the `arguments` object.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to convert.

#### Returns
*(Array)*: Returns the new converted array.

#### Example
```js
(function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
// => [2, 3, 4]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_unescapestring"></a>`_.unescape(string)`
<a href="#_unescapestring">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4048 "View in source") [&#x24C9;][1]

Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#x27;` in `string` to their corresponding characters.

#### Arguments
1. `string` *(String)*: The string to unescape.

#### Returns
*(String)*: Returns the unescaped string.

#### Example
```js
_.unescape('Moe, Larry &amp; Curly');
// => "Moe, Larry & Curly"
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_unionarray1-array2-"></a>`_.union([array1, array2, ...])`
<a href="#_unionarray1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3049 "View in source") [&#x24C9;][1]

Computes the union of the passed-in arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `[array1, array2, ...]` *(Array)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of unique values, in order, that are  present in one or more of the arrays.

#### Example
```js
_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2, 3, 101, 10]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_uniqarray--issortedfalse-callbackidentity-thisarg"></a>`_.uniq(array [, isSorted=false, callback=identity, thisArg])`
<a href="#_uniqarray--issortedfalse-callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3093 "View in source") [&#x24C9;][1]

Creates a duplicate-value-free version of the `array` using strict equality for comparisons, i.e. `===`. If the `array` is already sorted, passing `true` for `isSorted` will run a faster algorithm. If `callback` is passed, each element of `array` is passed through a callback` before uniqueness is computed. The `callback` is bound to `thisArg` and invoked with `3` arguments; *(value, index, array)*.

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[isSorted=false]` *(Boolean)*: A flag to indicate that the `array` is already sorted.
3. `[callback=identity]` *(Function)*: The function called per iteration.
4. `[thisArg]` *(Mixed)*: The `this` binding for the callback.

#### Returns
*(Array)*: Returns a duplicate-value-free array.

#### Example
```js
_.uniq([1, 2, 1, 3, 1]);
// => [1, 2, 3]

_.uniq([1, 1, 2, 2, 3], true);
// => [1, 2, 3]

_.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
// => [1, 2, 3]

_.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_uniqueidprefix"></a>`_.uniqueId([prefix])`
<a href="#_uniqueidprefix">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4066 "View in source") [&#x24C9;][1]

Generates a unique id. If `prefix` is passed, the id will be appended to it.

#### Arguments
1. `[prefix]` *(String)*: The value to prefix the id with.

#### Returns
*(Number, String)*: Returns a numeric id if no prefix is passed, else  a string id may be returned.

#### Example
```js
_.uniqueId('contact_');
// => 'contact_104'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_valuesobject"></a>`_.values(object)`
<a href="#_valuesobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1931 "View in source") [&#x24C9;][1]

Creates an array composed of the own enumerable property values of `object`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns a new array of property values.

#### Example
```js
_.values({ 'one': 1, 'two': 2, 'three': 3 });
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_wherecollection-properties"></a>`_.where(collection, properties)`
<a href="#_wherecollection-properties">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2447 "View in source") [&#x24C9;][1]

Examines each element in a `collection`, returning an array of all elements that contain the given `properties`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `properties` *(Object)*: The object of properties/values to filter by.

#### Returns
*(Array)*: Returns a new array of elements that contain the given `properties`.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 },
  { 'name': 'curly', 'age': 60 }
];

_.where(stooges, { 'age': 40 });
// => [{ 'name': 'moe', 'age': 40 }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_withoutarray--value1-value2-"></a>`_.without(array [, value1, value2, ...])`
<a href="#_withoutarray--value1-value2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3142 "View in source") [&#x24C9;][1]

Creates a new array with all occurrences of the passed values removed using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `array` *(Array)*: The array to filter.
2. `[value1, value2, ...]` *(Mixed)*: Values to remove.

#### Returns
*(Array)*: Returns a new filtered array.

#### Example
```js
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
// => [2, 3, 4]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_wrapvalue-wrapper"></a>`_.wrap(value, wrapper)`
<a href="#_wrapvalue-wrapper">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3671 "View in source") [&#x24C9;][1]

Creates a new function that passes `value` to the `wrapper` function as its first argument. Additional arguments passed to the new function are appended to those passed to the `wrapper` function.

#### Arguments
1. `value` *(Mixed)*: The value to wrap.
2. `wrapper` *(Function)*: The wrapper function.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var hello = function(name) { return 'hello: ' + name; };
hello = _.wrap(hello, function(func) {
  return 'before, ' + func('moe') + ', after';
});
hello();
// => 'before, hello: moe, after'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_ziparray1-array2-"></a>`_.zip([array1, array2, ...])`
<a href="#_ziparray1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3175 "View in source") [&#x24C9;][1]

Groups the elements of each array at their corresponding indexes. Useful for separate data sources that are coordinated through matching array indexes. For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix in a similar fashion.

#### Arguments
1. `[array1, array2, ...]` *(Array)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of grouped elements.

#### Example
```js
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
// => [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_zipobjectkeys--values"></a>`_.zipObject(keys [, values=[]])`
<a href="#_zipobjectkeys--values">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3204 "View in source") [&#x24C9;][1]

Creates an object composed from an array of `keys` and an array of `values`.

#### Arguments
1. `keys` *(Array)*: The array of keys.
2. `[values=[]]` *(Array)*: The array of values.

#### Returns
*(Object)*: Returns an object composed of the given keys and  corresponding values.

#### Example
```js
_.zipObject(['moe', 'larry', 'curly'], [30, 40, 50]);
// => { 'moe': 30, 'larry': 40, 'curly': 50 }
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `_.prototype`

<!-- div -->

### <a id="_prototypechain"></a>`_.prototype.chain()`
<a href="#_prototypechain">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4141 "View in source") [&#x24C9;][1]

Enables method chaining on the wrapper object.

#### Returns
*(Mixed)*: Returns the wrapper object.

#### Example
```js
_([1, 2, 3]).value();
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_prototypevalue"></a>`_.prototype.value()`
<a href="#_prototypevalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4158 "View in source") [&#x24C9;][1]

Extracts the wrapped value.

#### Returns
*(Mixed)*: Returns the wrapped value.

#### Example
```js
_([1, 2, 3]).value();
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `_.templateSettings`

<!-- div -->

### <a id="_templatesettings"></a>`_.templateSettings`
<a href="#_templatesettings">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L321 "View in source") [&#x24C9;][1]

*(Object)*: By default, the template delimiters used by Lo-Dash are similar to those in embedded Ruby *(ERB)*. Change the following template settings to use alternative delimiters.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsescape"></a>`_.templateSettings.escape`
<a href="#_templatesettingsescape">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L330 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect `data` property values to be HTML-escaped.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsevaluate"></a>`_.templateSettings.evaluate`
<a href="#_templatesettingsevaluate">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L339 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect code to be evaluated.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsinterpolate"></a>`_.templateSettings.interpolate`
<a href="#_templatesettingsinterpolate">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L348 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect `data` property values to inject.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsvariable"></a>`_.templateSettings.variable`
<a href="#_templatesettingsvariable">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L357 "View in source") [&#x24C9;][1]

*(String)*: Used to reference the data object in the template text.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## ``

<!-- div -->

### <a id=""></a>``
<a href="#">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L218 "View in source") [&#x24C9;][1]

(Unknown): Detect if sourceURL syntax is usable without erroring:  The JS engine in Adobe products, like InDesign, will throw a syntax error when it encounters a single line comment beginning with the `@` symbol.  The JS engine in Narwhal will generate the function `function anonymous(){//}` and throw a syntax error.  Avoid comments beginning `@` symbols in IE because they are part of its non-standard conditional compilation support. http://msdn.microsoft.com/en-us/library/121hztk3(v=vs.94).aspx

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #_ "Jump back to the TOC."