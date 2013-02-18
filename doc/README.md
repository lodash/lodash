# Lo-Dash <sup>v1.0.1</sup>

<!-- div -->


<!-- div -->

## <a id="Arrays"></a>`Arrays`
* [`_.compact`](#_compactarray)
* [`_.difference`](#_differencearray--array1-array2-)
* [`_.drop`](#_restarray--callbackn1-thisarg)
* [`_.first`](#_firstarray--callbackn-thisarg)
* [`_.flatten`](#_flattenarray-shallow)
* [`_.head`](#_firstarray--callbackn-thisarg)
* [`_.indexOf`](#_indexofarray-value--fromindex0)
* [`_.initial`](#_initialarray--callbackn1-thisarg)
* [`_.intersection`](#_intersectionarray1-array2-)
* [`_.last`](#_lastarray--callbackn-thisarg)
* [`_.lastIndexOf`](#_lastindexofarray-value--fromindexarraylength-1)
* [`_.object`](#_objectkeys--values)
* [`_.range`](#_rangestart0-end--step1)
* [`_.rest`](#_restarray--callbackn1-thisarg)
* [`_.sortedIndex`](#_sortedindexarray-value--callbackidentity-thisarg)
* [`_.tail`](#_restarray--callbackn1-thisarg)
* [`_.take`](#_firstarray--callbackn-thisarg)
* [`_.union`](#_unionarray1-array2-)
* [`_.uniq`](#_uniqarray--issortedfalse-callbackidentity-thisarg)
* [`_.unique`](#_uniqarray--issortedfalse-callbackidentity-thisarg)
* [`_.without`](#_withoutarray--value1-value2-)
* [`_.zip`](#_ziparray1-array2-)

<!-- /div -->


<!-- div -->

## `Chaining`
* [`_`](#_value)
* [`_.tap`](#_tapvalue-interceptor)
* [`_.prototype.toString`](#_prototypetostring)
* [`_.prototype.value`](#_prototypevalueof)
* [`_.prototype.valueOf`](#_prototypevalueof)

<!-- /div -->


<!-- div -->

## `Collections`
* [`_.all`](#_everycollection--callbackidentity-thisarg)
* [`_.any`](#_somecollection--callbackidentity-thisarg)
* [`_.at`](#_atcollection--index1-index2-)
* [`_.collect`](#_mapcollection--callbackidentity-thisarg)
* [`_.contains`](#_containscollection-target--fromindex0)
* [`_.countBy`](#_countbycollection--callbackidentity-thisarg)
* [`_.detect`](#_findcollection--callbackidentity-thisarg)
* [`_.each`](#_foreachcollection--callbackidentity-thisarg)
* [`_.every`](#_everycollection--callbackidentity-thisarg)
* [`_.filter`](#_filtercollection--callbackidentity-thisarg)
* [`_.find`](#_findcollection--callbackidentity-thisarg)
* [`_.foldl`](#_reducecollection--callbackidentity-accumulator-thisarg)
* [`_.foldr`](#_reducerightcollection--callbackidentity-accumulator-thisarg)
* [`_.forEach`](#_foreachcollection--callbackidentity-thisarg)
* [`_.groupBy`](#_groupbycollection--callbackidentity-thisarg)
* [`_.include`](#_containscollection-target--fromindex0)
* [`_.inject`](#_reducecollection--callbackidentity-accumulator-thisarg)
* [`_.invoke`](#_invokecollection-methodname--arg1-arg2-)
* [`_.map`](#_mapcollection--callbackidentity-thisarg)
* [`_.max`](#_maxcollection--callbackidentity-thisarg)
* [`_.min`](#_mincollection--callbackidentity-thisarg)
* [`_.pluck`](#_pluckcollection-property)
* [`_.reduce`](#_reducecollection--callbackidentity-accumulator-thisarg)
* [`_.reduceRight`](#_reducerightcollection--callbackidentity-accumulator-thisarg)
* [`_.reject`](#_rejectcollection--callbackidentity-thisarg)
* [`_.select`](#_filtercollection--callbackidentity-thisarg)
* [`_.shuffle`](#_shufflecollection)
* [`_.size`](#_sizecollection)
* [`_.some`](#_somecollection--callbackidentity-thisarg)
* [`_.sortBy`](#_sortbycollection--callbackidentity-thisarg)
* [`_.toArray`](#_toarraycollection)
* [`_.where`](#_wherecollection-properties)

<!-- /div -->


<!-- div -->

## `Functions`
* [`_.after`](#_aftern-func)
* [`_.bind`](#_bindfunc--thisarg-arg1-arg2-)
* [`_.bindAll`](#_bindallobject--methodname1-methodname2-)
* [`_.bindKey`](#_bindkeyobject-key--arg1-arg2-)
* [`_.compose`](#_composefunc1-func2-)
* [`_.debounce`](#_debouncefunc-wait-immediate)
* [`_.defer`](#_deferfunc--arg1-arg2-)
* [`_.delay`](#_delayfunc-wait--arg1-arg2-)
* [`_.memoize`](#_memoizefunc--resolver)
* [`_.once`](#_oncefunc)
* [`_.partial`](#_partialfunc--arg1-arg2-)
* [`_.partialRight`](#_partialrightfunc--arg1-arg2-)
* [`_.throttle`](#_throttlefunc-wait)
* [`_.wrap`](#_wrapvalue-wrapper)

<!-- /div -->


<!-- div -->

## `Objects`
* [`_.assign`](#_assignobject--source1-source2--callback-thisarg)
* [`_.clone`](#_clonevalue--deepfalse-callback-thisarg)
* [`_.cloneDeep`](#_clonedeepvalue--callback-thisarg)
* [`_.defaults`](#_defaultsobject--source1-source2-)
* [`_.extend`](#_assignobject--source1-source2--callback-thisarg)
* [`_.forIn`](#_forinobject--callbackidentity-thisarg)
* [`_.forOwn`](#_forownobject--callbackidentity-thisarg)
* [`_.functions`](#_functionsobject)
* [`_.has`](#_hasobject-property)
* [`_.invert`](#_invertobject)
* [`_.isArguments`](#_isargumentsvalue)
* [`_.isArray`](#_isarrayvalue)
* [`_.isBoolean`](#_isbooleanvalue)
* [`_.isDate`](#_isdatevalue)
* [`_.isElement`](#_iselementvalue)
* [`_.isEmpty`](#_isemptyvalue)
* [`_.isEqual`](#_isequala-b--callback-thisarg)
* [`_.isFinite`](#_isfinitevalue)
* [`_.isFunction`](#_isfunctionvalue)
* [`_.isNaN`](#_isnanvalue)
* [`_.isNull`](#_isnullvalue)
* [`_.isNumber`](#_isnumbervalue)
* [`_.isObject`](#_isobjectvalue)
* [`_.isPlainObject`](#_isplainobjectvalue)
* [`_.isRegExp`](#_isregexpvalue)
* [`_.isString`](#_isstringvalue)
* [`_.isUndefined`](#_isundefinedvalue)
* [`_.keys`](#_keysobject)
* [`_.merge`](#_mergeobject--source1-source2--callback-thisarg)
* [`_.methods`](#_functionsobject)
* [`_.omit`](#_omitobject-callback-prop1-prop2--thisarg)
* [`_.pairs`](#_pairsobject)
* [`_.pick`](#_pickobject-callback-prop1-prop2--thisarg)
* [`_.values`](#_valuesobject)

<!-- /div -->


<!-- div -->

## `Utilities`
* [`_.escape`](#_escapestring)
* [`_.identity`](#_identityvalue)
* [`_.mixin`](#_mixinobject)
* [`_.noConflict`](#_noconflict)
* [`_.random`](#_randommin0-max1)
* [`_.result`](#_resultobject-property)
* [`_.template`](#_templatetext-data-options)
* [`_.times`](#_timesn-callback--thisarg)
* [`_.unescape`](#_unescapestring)
* [`_.uniqueId`](#_uniqueidprefix)

<!-- /div -->


<!-- div -->

## `Methods`
* [`_.templateSettings.imports._`](#_templatesettingsimports_)

<!-- /div -->


<!-- div -->

## `Properties`
* [`_.VERSION`](#_version)
* [`_.templateSettings`](#_templatesettings)
* [`_.templateSettings.escape`](#_templatesettingsescape)
* [`_.templateSettings.evaluate`](#_templatesettingsevaluate)
* [`_.templateSettings.interpolate`](#_templatesettingsinterpolate)
* [`_.templateSettings.variable`](#_templatesettingsvariable)
* [`_.templateSettings.imports`](#_templatesettingsimports)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `“Arrays” Methods`

<!-- div -->

### <a id="_compactarray"></a>`_.compact(array)`
<a href="#_compactarray">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3166 "View in source") [&#x24C9;][1]

Creates an array with all falsey values of `array` removed. The values `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.

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

### <a id="_differencearray--array1-array2-"></a>`_.difference(array [, array1, array2, ...])`
<a href="#_differencearray--array1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3196 "View in source") [&#x24C9;][1]

Creates an array of `array` elements not present in the other arrays using strict equality for comparisons, i.e. `===`.

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

### <a id="_firstarray--callbackn-thisarg"></a>`_.first(array [, callback|n, thisArg])`
<a href="#_firstarray--callbackn-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3268 "View in source") [&#x24C9;][1]

Gets the first element of the `array`. If a number `n` is passed, the first `n` elements of the `array` are returned. If a `callback` function is passed, the first elements the `callback` returns truthy for are returned. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*head, take*

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback|n]` *(Function|Object|Number|String)*: The function called per element or the number of elements to return. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the first element(s) of `array`.

#### Example
```js
_.first([1, 2, 3]);
// => 1

_.first([1, 2, 3], 2);
// => [1, 2]

_.first([1, 2, 3], function(num) {
  return num < 3;
});
// => [1, 2]

var food = [
  { 'name': 'banana', 'organic': true },
  { 'name': 'beet',   'organic': false },
];

// using "_.pluck" callback shorthand
_.first(food, 'organic');
// => [{ 'name': 'banana', 'organic': true }]

var food = [
  { 'name': 'apple',  'type': 'fruit' },
  { 'name': 'banana', 'type': 'fruit' },
  { 'name': 'beet',   'type': 'vegetable' }
];

// using "_.where" callback shorthand
_.first(food, { 'type': 'fruit' });
// => [{ 'name': 'apple', 'type': 'fruit' }, { 'name': 'banana', 'type': 'fruit' }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_flattenarray-shallow"></a>`_.flatten(array, shallow)`
<a href="#_flattenarray-shallow">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3307 "View in source") [&#x24C9;][1]

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

### <a id="_indexofarray-value--fromindex0"></a>`_.indexOf(array, value [, fromIndex=0])`
<a href="#_indexofarray-value--fromindex0">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3349 "View in source") [&#x24C9;][1]

Gets the index at which the first occurrence of `value` is found using strict equality for comparisons, i.e. `===`. If the `array` is already sorted, passing `true` for `fromIndex` will run a faster binary search.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(Mixed)*: The value to search for.
3. `[fromIndex=0]` *(Boolean|Number)*: The index to search from or `true` to perform a binary search on a sorted `array`.

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

### <a id="_initialarray--callbackn1-thisarg"></a>`_.initial(array [, callback|n=1, thisArg])`
<a href="#_initialarray--callbackn1-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3423 "View in source") [&#x24C9;][1]

Gets all but the last element of `array`. If a number `n` is passed, the last `n` elements are excluded from the result. If a `callback` function is passed, the last elements the `callback` returns truthy for are excluded from the result. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback|n=1]` *(Function|Object|Number|String)*: The function called per element or the number of elements to exclude. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a slice of `array`.

#### Example
```js
_.initial([1, 2, 3]);
// => [1, 2]

_.initial([1, 2, 3], 2);
// => [1]

_.initial([1, 2, 3], function(num) {
  return num > 1;
});
// => [1]

var food = [
  { 'name': 'beet',   'organic': false },
  { 'name': 'carrot', 'organic': true }
];

// using "_.pluck" callback shorthand
_.initial(food, 'organic');
// => [{ 'name': 'beet',   'organic': false }]

var food = [
  { 'name': 'banana', 'type': 'fruit' },
  { 'name': 'beet',   'type': 'vegetable' },
  { 'name': 'carrot', 'type': 'vegetable' }
];

// using "_.where" callback shorthand
_.initial(food, { 'type': 'vegetable' });
// => [{ 'name': 'banana', 'type': 'fruit' }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_intersectionarray1-array2-"></a>`_.intersection([array1, array2, ...])`
<a href="#_intersectionarray1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3457 "View in source") [&#x24C9;][1]

Computes the intersection of all the passed-in arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `[array1, array2, ...]` *(Array)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of unique elements that are present  in **all** of the arrays.

#### Example
```js
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_lastarray--callbackn-thisarg"></a>`_.last(array [, callback|n, thisArg])`
<a href="#_lastarray--callbackn-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3548 "View in source") [&#x24C9;][1]

Gets the last element of the `array`. If a number `n` is passed, the last `n` elements of the `array` are returned. If a `callback` function is passed, the last elements the `callback` returns truthy for are returned. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

 If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback|n]` *(Function|Object|Number|String)*: The function called per element or the number of elements to return. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the last element(s) of `array`.

#### Example
```js
_.last([1, 2, 3]);
// => 3

_.last([1, 2, 3], 2);
// => [2, 3]

_.last([1, 2, 3], function(num) {
  return num > 1;
});
// => [2, 3]

var food = [
  { 'name': 'beet',   'organic': false },
  { 'name': 'carrot', 'organic': true }
];

// using "_.pluck" callback shorthand
_.last(food, 'organic');
// => [{ 'name': 'carrot', 'organic': true }]

var food = [
  { 'name': 'banana', 'type': 'fruit' },
  { 'name': 'beet',   'type': 'vegetable' },
  { 'name': 'carrot', 'type': 'vegetable' }
];

// using "_.where" callback shorthand
_.last(food, { 'type': 'vegetable' });
// => [{ 'name': 'beet', 'type': 'vegetable' }, { 'name': 'carrot', 'type': 'vegetable' }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_lastindexofarray-value--fromindexarraylength-1"></a>`_.lastIndexOf(array, value [, fromIndex=array.length-1])`
<a href="#_lastindexofarray-value--fromindexarraylength-1">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3589 "View in source") [&#x24C9;][1]

Gets the index at which the last occurrence of `value` is found using strict equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the offset from the end of the collection.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(Mixed)*: The value to search for.
3. `[fromIndex=array.length-1]` *(Number)*: The index to search from.

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

### <a id="_objectkeys--values"></a>`_.object(keys [, values=[]])`
<a href="#_objectkeys--values">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3619 "View in source") [&#x24C9;][1]

Creates an object composed from arrays of `keys` and `values`. Pass either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`, or two arrays, one of `keys` and one of corresponding `values`.

#### Arguments
1. `keys` *(Array)*: The array of keys.
2. `[values=[]]` *(Array)*: The array of values.

#### Returns
*(Object)*: Returns an object composed of the given keys and  corresponding values.

#### Example
```js
_.object(['moe', 'larry'], [30, 40]);
// => { 'moe': 30, 'larry': 40 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_rangestart0-end--step1"></a>`_.range([start=0], end [, step=1])`
<a href="#_rangestart0-end--step1">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3663 "View in source") [&#x24C9;][1]

Creates an array of numbers *(positive and/or negative)* progressing from `start` up to but not including `end`.

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

### <a id="_restarray--callbackn1-thisarg"></a>`_.rest(array [, callback|n=1, thisArg])`
<a href="#_restarray--callbackn1-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3741 "View in source") [&#x24C9;][1]

The opposite of `_.initial`, this method gets all but the first value of `array`. If a number `n` is passed, the first `n` values are excluded from the result. If a `callback` function is passed, the first elements the `callback` returns truthy for are excluded from the result. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*drop, tail*

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback|n=1]` *(Function|Object|Number|String)*: The function called per element or the number of elements to exclude. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a slice of `array`.

#### Example
```js
_.rest([1, 2, 3]);
// => [2, 3]

_.rest([1, 2, 3], 2);
// => [3]

_.rest([1, 2, 3], function(num) {
  return num < 3;
});
// => [3]

var food = [
  { 'name': 'banana', 'organic': true },
  { 'name': 'beet',   'organic': false },
];

// using "_.pluck" callback shorthand
_.rest(food, 'organic');
// => [{ 'name': 'beet', 'organic': false }]

var food = [
  { 'name': 'apple',  'type': 'fruit' },
  { 'name': 'banana', 'type': 'fruit' },
  { 'name': 'beet',   'type': 'vegetable' }
];

// using "_.where" callback shorthand
_.rest(food, { 'type': 'fruit' });
// => [{ 'name': 'beet', 'type': 'vegetable' }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_sortedindexarray-value--callbackidentity-thisarg"></a>`_.sortedIndex(array, value [, callback=identity, thisArg])`
<a href="#_sortedindexarray-value--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3805 "View in source") [&#x24C9;][1]

Uses a binary search to determine the smallest index at which the `value` should be inserted into `array` in order to maintain the sort order of the sorted `array`. If `callback` is passed, it will be executed for `value` and each element in `array` to compute their sort ranking. The `callback` is bound to `thisArg` and invoked with one argument; *(value)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `value` *(Mixed)*: The value to evaluate.
3. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Number)*: Returns the index at which the value should be inserted  into `array`.

#### Example
```js
_.sortedIndex([20, 30, 50], 40);
// => 2

// using "_.pluck" callback shorthand
_.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
// => 2

var dict = {
  'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
};

_.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
  return dict.wordToNumber[word];
});
// => 2

_.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
  return this.wordToNumber[word];
}, dict);
// => 2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_unionarray1-array2-"></a>`_.union([array1, array2, ...])`
<a href="#_unionarray1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3837 "View in source") [&#x24C9;][1]

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
<a href="#_uniqarray--issortedfalse-callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3884 "View in source") [&#x24C9;][1]

Creates a duplicate-value-free version of the `array` using strict equality for comparisons, i.e. `===`. If the `array` is already sorted, passing `true` for `isSorted` will run a faster algorithm. If `callback` is passed, each element of `array` is passed through a callback` before uniqueness is computed. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*unique*

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[isSorted=false]` *(Boolean)*: A flag to indicate that the `array` is already sorted.
3. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

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

// using "_.pluck" callback shorthand
_.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_withoutarray--value1-value2-"></a>`_.without(array [, value1, value2, ...])`
<a href="#_withoutarray--value1-value2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3943 "View in source") [&#x24C9;][1]

Creates an array with all occurrences of the passed values removed using strict equality for comparisons, i.e. `===`.

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

### <a id="_ziparray1-array2-"></a>`_.zip([array1, array2, ...])`
<a href="#_ziparray1-array2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3974 "View in source") [&#x24C9;][1]

Groups the elements of each array at their corresponding indexes. Useful for separate data sources that are coordinated through matching array indexes. For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix in a similar fashion.

#### Arguments
1. `[array1, array2, ...]` *(Array)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of grouped elements.

#### Example
```js
_.zip(['moe', 'larry'], [30, 40], [true, false]);
// => [['moe', 30, true], ['larry', 40, false]]
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Chaining” Methods`

<!-- div -->

### <a id="_value"></a>`_(value)`
<a href="#_value">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L272 "View in source") [&#x24C9;][1]

Creates a `lodash` object, that wraps the given `value`, to enable method chaining.

In addition to Lo-Dash methods, wrappers also have the following `Array` methods:<br>
`concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`, and `unshift`

The chainable wrapper functions are:<br>
`after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`, `compose`, `concat`, `countBy`, `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`, `forEach`, `forIn`, `forOwn`, `functions`, `groupBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`, `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `push`, `range`, `reject`, `rest`, `reverse`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `union`, `uniq`, `unshift`, `values`, `where`, `without`, `wrap`, and `zip`

The non-chainable wrapper functions are:<br>
`clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `has`, `identity`, `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`, `lastIndexOf`, `mixin`, `noConflict`, `pop`, `random`, `reduce`, `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `template`, `unescape`, and `uniqueId`

The wrapper functions `first` and `last` return wrapped values when `n` is passed, otherwise they return unwrapped values.

#### Arguments
1. `value` *(Mixed)*: The value to wrap in a `lodash` instance.

#### Returns
*(Object)*: Returns a `lodash` instance.

* * *

<!-- /div -->


<!-- div -->

### <a id="_tapvalue-interceptor"></a>`_.tap(value, interceptor)`
<a href="#_tapvalue-interceptor">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4874 "View in source") [&#x24C9;][1]

Invokes `interceptor` with the `value` as the first argument, and then returns `value`. The purpose of this method is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.

#### Arguments
1. `value` *(Mixed)*: The value to pass to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.

#### Returns
*(Mixed)*: Returns `value`.

#### Example
```js
_([1, 2, 3, 4])
 .filter(function(num) { return num % 2 == 0; })
 .tap(alert)
 .map(function(num) { return num * num; })
 .value();
// => // [2, 4] (alerted)
// => [4, 16]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_prototypetostring"></a>`_.prototype.toString()`
<a href="#_prototypetostring">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4891 "View in source") [&#x24C9;][1]

Produces the `toString` result of the wrapped value.

#### Returns
*(String)*: Returns the string result.

#### Example
```js
_([1, 2, 3]).toString();
// => '1,2,3'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_prototypevalueof"></a>`_.prototype.valueOf()`
<a href="#_prototypevalueof">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4908 "View in source") [&#x24C9;][1]

Extracts the wrapped value.

#### Aliases
*value*

#### Returns
*(Mixed)*: Returns the wrapped value.

#### Example
```js
_([1, 2, 3]).valueOf();
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Collections” Methods`

<!-- div -->

### <a id="_atcollection--index1-index2-"></a>`_.at(collection [, index1, index2, ...])`
<a href="#_atcollection--index1-index2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2167 "View in source") [&#x24C9;][1]

Creates an array of elements from the specified indexes, or keys, of the `collection`. Indexes may be specified as individual arguments or as arrays of indexes.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[index1, index2, ...]` *(Array|Number|String)*: The indexes of `collection` to retrieve, either as individual arguments or arrays.

#### Returns
*(Array)*: Returns a new array of elements corresponding to the  provided indexes.

#### Example
```js
_.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
// => ['a', 'c', 'e']

_.at(['moe', 'larry', 'curly'], 0, 2);
// => ['moe', 'curly']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_containscollection-target--fromindex0"></a>`_.contains(collection, target [, fromIndex=0])`
<a href="#_containscollection-target--fromindex0">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2209 "View in source") [&#x24C9;][1]

Checks if a given `target` element is present in a `collection` using strict equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the offset from the end of the collection.

#### Aliases
*include*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `target` *(Mixed)*: The value to check for.
3. `[fromIndex=0]` *(Number)*: The index to search from.

#### Returns
*(Boolean)*: Returns `true` if the `target` element is found, else `false`.

#### Example
```js
_.contains([1, 2, 3], 1);
// => true

_.contains([1, 2, 3], 1, 2);
// => false

_.contains({ 'name': 'moe', 'age': 40 }, 'moe');
// => true

_.contains('curly', 'ur');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_countbycollection--callbackidentity-thisarg"></a>`_.countBy(collection [, callback=identity, thisArg])`
<a href="#_countbycollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2263 "View in source") [&#x24C9;][1]

Creates an object composed of keys returned from running each element of the `collection` through the given `callback`. The corresponding value of each key is the number of times the key was returned by the `callback`. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

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

### <a id="_everycollection--callbackidentity-thisarg"></a>`_.every(collection [, callback=identity, thisArg])`
<a href="#_everycollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2315 "View in source") [&#x24C9;][1]

Checks if the `callback` returns a truthy value for **all** elements of a `collection`. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*all*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Boolean)*: Returns `true` if all elements pass the callback check,  else `false`.

#### Example
```js
_.every([true, 1, null, 'yes'], Boolean);
// => false

var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

// using "_.pluck" callback shorthand
_.every(stooges, 'age');
// => true

// using "_.where" callback shorthand
_.every(stooges, { 'age': 50 });
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_filtercollection--callbackidentity-thisarg"></a>`_.filter(collection [, callback=identity, thisArg])`
<a href="#_filtercollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2376 "View in source") [&#x24C9;][1]

Examines each element in a `collection`, returning an array of all elements the `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*select*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of elements that passed the callback check.

#### Example
```js
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => [2, 4, 6]

var food = [
  { 'name': 'apple',  'organic': false, 'type': 'fruit' },
  { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
];

// using "_.pluck" callback shorthand
_.filter(food, 'organic');
// => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]

// using "_.where" callback shorthand
_.filter(food, { 'type': 'fruit' });
// => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_findcollection--callbackidentity-thisarg"></a>`_.find(collection [, callback=identity, thisArg])`
<a href="#_findcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2443 "View in source") [&#x24C9;][1]

Examines each element in a `collection`, returning the first that the `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*detect*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the element that passed the callback check,  else `undefined`.

#### Example
```js
var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => 2

var food = [
  { 'name': 'apple',  'organic': false, 'type': 'fruit' },
  { 'name': 'banana', 'organic': true,  'type': 'fruit' },
  { 'name': 'beet',   'organic': false, 'type': 'vegetable' },
  { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
];

// using "_.where" callback shorthand
var veggie = _.find(food, { 'type': 'vegetable' });
// => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }

// using "_.pluck" callback shorthand
var healthy = _.find(food, 'organic');
// => { 'name': 'banana', 'organic': true, 'type': 'fruit' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_foreachcollection--callbackidentity-thisarg"></a>`_.forEach(collection [, callback=identity, thisArg])`
<a href="#_foreachcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2478 "View in source") [&#x24C9;][1]

Iterates over a `collection`, executing the `callback` for each element in the `collection`. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Aliases
*each*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array, Object, String)*: Returns `collection`.

#### Example
```js
_([1, 2, 3]).forEach(alert).join(',');
// => alerts each number and returns '1,2,3'

_.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
// => alerts each number value (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_groupbycollection--callbackidentity-thisarg"></a>`_.groupBy(collection [, callback=identity, thisArg])`
<a href="#_groupbycollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2528 "View in source") [&#x24C9;][1]

Creates an object composed of keys returned from running each element of the `collection` through the `callback`. The corresponding value of each key is an array of elements passed to `callback` that returned the key. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
_.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
// => { '4': [4.2], '6': [6.1, 6.4] }

_.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
// => { '4': [4.2], '6': [6.1, 6.4] }

// using "_.pluck" callback shorthand
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_invokecollection-methodname--arg1-arg2-"></a>`_.invoke(collection, methodName [, arg1, arg2, ...])`
<a href="#_invokecollection-methodname--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2561 "View in source") [&#x24C9;][1]

Invokes the method named by `methodName` on each element in the `collection`, returning an array of the results of each invoked method. Additional arguments will be passed to each invoked method. If `methodName` is a function, it will be invoked for, and `this` bound to, each element in the `collection`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `methodName` *(Function|String)*: The name of the method to invoke or the function invoked per iteration.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to invoke the method with.

#### Returns
*(Array)*: Returns a new array of the results of each invoked method.

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

### <a id="_mapcollection--callbackidentity-thisarg"></a>`_.map(collection [, callback=identity, thisArg])`
<a href="#_mapcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2613 "View in source") [&#x24C9;][1]

Creates an array of values by running each element in the `collection` through the `callback`. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*collect*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of the results of each `callback` execution.

#### Example
```js
_.map([1, 2, 3], function(num) { return num * 3; });
// => [3, 6, 9]

_.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
// => [3, 6, 9] (order is not guaranteed)

var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

// using "_.pluck" callback shorthand
_.map(stooges, 'name');
// => ['moe', 'larry']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_maxcollection--callbackidentity-thisarg"></a>`_.max(collection [, callback=identity, thisArg])`
<a href="#_maxcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2670 "View in source") [&#x24C9;][1]

Retrieves the maximum value of an `array`. If `callback` is passed, it will be executed for each value in the `array` to generate the criterion by which the value is ranked. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the maximum value.

#### Example
```js
_.max([4, 2, 8, 6]);
// => 8

var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

_.max(stooges, function(stooge) { return stooge.age; });
// => { 'name': 'larry', 'age': 50 };

// using "_.pluck" callback shorthand
_.max(stooges, 'age');
// => { 'name': 'larry', 'age': 50 };
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_mincollection--callbackidentity-thisarg"></a>`_.min(collection [, callback=identity, thisArg])`
<a href="#_mincollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2739 "View in source") [&#x24C9;][1]

Retrieves the minimum value of an `array`. If `callback` is passed, it will be executed for each value in the `array` to generate the criterion by which the value is ranked. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the minimum value.

#### Example
```js
_.min([4, 2, 8, 6]);
// => 2

var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

_.min(stooges, function(stooge) { return stooge.age; });
// => { 'name': 'moe', 'age': 40 };

// using "_.pluck" callback shorthand
_.min(stooges, 'age');
// => { 'name': 'moe', 'age': 40 };
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_pluckcollection-property"></a>`_.pluck(collection, property)`
<a href="#_pluckcollection-property">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2789 "View in source") [&#x24C9;][1]

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
  { 'name': 'larry', 'age': 50 }
];

_.pluck(stooges, 'name');
// => ['moe', 'larry']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_reducecollection--callbackidentity-accumulator-thisarg"></a>`_.reduce(collection [, callback=identity, accumulator, thisArg])`
<a href="#_reducecollection--callbackidentity-accumulator-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2821 "View in source") [&#x24C9;][1]

Reduces a `collection` to a value that is the accumulated result of running each element in the `collection` through the `callback`, where each successive `callback` execution consumes the return value of the previous execution. If `accumulator` is not passed, the first element of the `collection` will be used as the initial `accumulator` value. The `callback` is bound to `thisArg` and invoked with four arguments; *(accumulator, value, index|key, collection)*.

#### Aliases
*foldl, inject*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[accumulator]` *(Mixed)*: Initial value of the accumulator.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the accumulated value.

#### Example
```js
var sum = _.reduce([1, 2, 3], function(sum, num) {
  return sum + num;
});
// => 6

var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
  result[key] = num * 3;
  return result;
}, {});
// => { 'a': 3, 'b': 6, 'c': 9 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_reducerightcollection--callbackidentity-accumulator-thisarg"></a>`_.reduceRight(collection [, callback=identity, accumulator, thisArg])`
<a href="#_reducerightcollection--callbackidentity-accumulator-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2864 "View in source") [&#x24C9;][1]

This method is similar to `_.reduce`, except that it iterates over a `collection` from right to left.

#### Aliases
*foldr*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[accumulator]` *(Mixed)*: Initial value of the accumulator.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

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
<a href="#_rejectcollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2924 "View in source") [&#x24C9;][1]

The opposite of `_.filter`, this method returns the elements of a `collection` that `callback` does **not** return truthy for.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of elements that did **not** pass the  callback check.

#### Example
```js
var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
// => [1, 3, 5]

var food = [
  { 'name': 'apple',  'organic': false, 'type': 'fruit' },
  { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
];

// using "_.pluck" callback shorthand
_.reject(food, 'organic');
// => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]

// using "_.where" callback shorthand
_.reject(food, { 'type': 'fruit' });
// => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_shufflecollection"></a>`_.shuffle(collection)`
<a href="#_shufflecollection">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2945 "View in source") [&#x24C9;][1]

Creates an array of shuffled `array` values, using a version of the Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to shuffle.

#### Returns
*(Array)*: Returns a new shuffled collection.

#### Example
```js
_.shuffle([1, 2, 3, 4, 5, 6]);
// => [4, 1, 6, 3, 5, 2]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_sizecollection"></a>`_.size(collection)`
<a href="#_sizecollection">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2978 "View in source") [&#x24C9;][1]

Gets the size of the `collection` by returning `collection.length` for arrays and array-like objects or the number of own enumerable properties for objects.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to inspect.

#### Returns
*(Number)*: Returns `collection.length` or number of own enumerable properties.

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
<a href="#_somecollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3025 "View in source") [&#x24C9;][1]

Checks if the `callback` returns a truthy value for **any** element of a `collection`. The function returns as soon as it finds passing value, and does not iterate over the entire `collection`. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Aliases
*any*

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Boolean)*: Returns `true` if any element passes the callback check,  else `false`.

#### Example
```js
_.some([null, 0, 'yes', false], Boolean);
// => true

var food = [
  { 'name': 'apple',  'organic': false, 'type': 'fruit' },
  { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
];

// using "_.pluck" callback shorthand
_.some(food, 'organic');
// => true

// using "_.where" callback shorthand
_.some(food, { 'type': 'meat' });
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_sortbycollection--callbackidentity-thisarg"></a>`_.sortBy(collection [, callback=identity, thisArg])`
<a href="#_sortbycollection--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3081 "View in source") [&#x24C9;][1]

Creates an array of elements, sorted in ascending order by the results of running each element in the `collection` through the `callback`. This method performs a stable sort, that is, it will preserve the original sort order of equal elements. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is passed for `callback`, the created "_.pluck" style callback will return the property value of the given element.

If an object is passed for `callback`, the created "_.where" style callback will return `true` for elements that have the propeties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|String)*: The function called per iteration. If a property name or object is passed, it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of sorted elements.

#### Example
```js
_.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
// => [3, 1, 2]

_.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
// => [3, 1, 2]

// using "_.pluck" callback shorthand
_.sortBy(['banana', 'strawberry', 'apple'], 'length');
// => ['apple', 'banana', 'strawberry']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_toarraycollection"></a>`_.toArray(collection)`
<a href="#_toarraycollection">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3116 "View in source") [&#x24C9;][1]

Converts the `collection` to an array.

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

### <a id="_wherecollection-properties"></a>`_.where(collection, properties)`
<a href="#_wherecollection-properties">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L3148 "View in source") [&#x24C9;][1]

Examines each element in a `collection`, returning an array of all elements that have the given `properties`. When checking `properties`, this method performs a deep comparison between values to determine if they are equivalent to each other.

#### Arguments
1. `collection` *(Array|Object|String)*: The collection to iterate over.
2. `properties` *(Object)*: The object of property values to filter by.

#### Returns
*(Array)*: Returns a new array of elements that have the given `properties`.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

_.where(stooges, { 'age': 40 });
// => [{ 'name': 'moe', 'age': 40 }]
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Functions” Methods`

<!-- div -->

### <a id="_aftern-func"></a>`_.after(n, func)`
<a href="#_aftern-func">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4007 "View in source") [&#x24C9;][1]

Creates a function that is restricted to executing `func` only after it is called `n` times. The `func` is executed with the `this` binding of the created function.

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
<a href="#_bindfunc--thisarg-arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4040 "View in source") [&#x24C9;][1]

Creates a function that, when called, invokes `func` with the `this` binding of `thisArg` and prepends any additional `bind` arguments to those passed to the bound function.

#### Arguments
1. `func` *(Function)*: The function to bind.
2. `[thisArg]` *(Mixed)*: The `this` binding of `func`.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to be partially applied.

#### Returns
*(Function)*: Returns the new bound function.

#### Example
```js
var func = function(greeting) {
  return greeting + ' ' + this.name;
};

func = _.bind(func, { 'name': 'moe' }, 'hi');
func();
// => 'hi moe'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_bindallobject--methodname1-methodname2-"></a>`_.bindAll(object [, methodName1, methodName2, ...])`
<a href="#_bindallobject--methodname1-methodname2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4071 "View in source") [&#x24C9;][1]

Binds methods on `object` to `object`, overwriting the existing method. Method names may be specified as individual arguments or as arrays of method names. If no method names are provided, all the function properties of `object` will be bound.

#### Arguments
1. `object` *(Object)*: The object to bind and assign the bound methods to.
2. `[methodName1, methodName2, ...]` *(String)*: Method names on the object to bind.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var view = {
 'label': 'docs',
 'onClick': function() { alert('clicked ' + this.label); }
};

_.bindAll(view);
jQuery('#docs').on('click', view.onClick);
// => alerts 'clicked docs', when the button is clicked
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_bindkeyobject-key--arg1-arg2-"></a>`_.bindKey(object, key [, arg1, arg2, ...])`
<a href="#_bindkeyobject-key--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4117 "View in source") [&#x24C9;][1]

Creates a function that, when called, invokes the method at `object[key]` and prepends any additional `bindKey` arguments to those passed to the bound function. This method differs from `_.bind` by allowing bound functions to reference methods that will be redefined or don't yet exist. See http://michaux.ca/articles/lazy-function-definition-pattern.

#### Arguments
1. `object` *(Object)*: The object the method belongs to.
2. `key` *(String)*: The key of the method.
3. `[arg1, arg2, ...]` *(Mixed)*: Arguments to be partially applied.

#### Returns
*(Function)*: Returns the new bound function.

#### Example
```js
var object = {
  'name': 'moe',
  'greet': function(greeting) {
    return greeting + ' ' + this.name;
  }
};

var func = _.bindKey(object, 'greet', 'hi');
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

### <a id="_composefunc1-func2-"></a>`_.compose([func1, func2, ...])`
<a href="#_composefunc1-func2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4140 "View in source") [&#x24C9;][1]

Creates a function that is the composition of the passed functions, where each function consumes the return value of the function that follows. For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`. Each function is executed with the `this` binding of the composed function.

#### Arguments
1. `[func1, func2, ...]` *(Function)*: Functions to compose.

#### Returns
*(Function)*: Returns the new composed function.

#### Example
```js
var greet = function(name) { return 'hi ' + name; };
var exclaim = function(statement) { return statement + '!'; };
var welcome = _.compose(exclaim, greet);
welcome('moe');
// => 'hi moe!'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_debouncefunc-wait-immediate"></a>`_.debounce(func, wait, immediate)`
<a href="#_debouncefunc-wait-immediate">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4173 "View in source") [&#x24C9;][1]

Creates a function that will delay the execution of `func` until after `wait` milliseconds have elapsed since the last time it was invoked. Pass `true` for `immediate` to cause debounce to invoke `func` on the leading, instead of the trailing, edge of the `wait` timeout. Subsequent calls to the debounced function will return the result of the last `func` call.

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

### <a id="_deferfunc--arg1-arg2-"></a>`_.defer(func [, arg1, arg2, ...])`
<a href="#_deferfunc--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4237 "View in source") [&#x24C9;][1]

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
<a href="#_delayfunc-wait--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4217 "View in source") [&#x24C9;][1]

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

### <a id="_memoizefunc--resolver"></a>`_.memoize(func [, resolver])`
<a href="#_memoizefunc--resolver">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4265 "View in source") [&#x24C9;][1]

Creates a function that memoizes the result of `func`. If `resolver` is passed, it will be used to determine the cache key for storing the result based on the arguments passed to the memoized function. By default, the first argument passed to the memoized function is used as the cache key. The `func` is executed with the `this` binding of the memoized function.

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

### <a id="_oncefunc"></a>`_.once(func)`
<a href="#_oncefunc">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4292 "View in source") [&#x24C9;][1]

Creates a function that is restricted to execute `func` once. Repeat calls to the function will return the value of the first call. The `func` is executed with the `this` binding of the created function.

#### Arguments
1. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
var initialize = _.once(createApplication);
initialize();
initialize();
// `initialize` executes `createApplication` once
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_partialfunc--arg1-arg2-"></a>`_.partial(func [, arg1, arg2, ...])`
<a href="#_partialfunc--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4327 "View in source") [&#x24C9;][1]

Creates a function that, when called, invokes `func` with any additional `partial` arguments prepended to those passed to the new function. This method is similar to `_.bind`, except it does **not** alter the `this` binding.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to be partially applied.

#### Returns
*(Function)*: Returns the new partially applied function.

#### Example
```js
var greet = function(greeting, name) { return greeting + ' ' + name; };
var hi = _.partial(greet, 'hi');
hi('moe');
// => 'hi moe'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_partialrightfunc--arg1-arg2-"></a>`_.partialRight(func [, arg1, arg2, ...])`
<a href="#_partialrightfunc--arg1-arg2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4358 "View in source") [&#x24C9;][1]

This method is similar to `_.partial`, except that `partial` arguments are appended to those passed to the new function.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[arg1, arg2, ...]` *(Mixed)*: Arguments to be partially applied.

#### Returns
*(Function)*: Returns the new partially applied function.

#### Example
```js
var defaultsDeep = _.partialRight(_.merge, _.defaults);

var options = {
  'variable': 'data',
  'imports': { 'jq': $ }
};

defaultsDeep(options, _.templateSettings);

options.variable
// => 'data'

options.imports
// => { '_': _, 'jq': $ }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_throttlefunc-wait"></a>`_.throttle(func, wait)`
<a href="#_throttlefunc-wait">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4380 "View in source") [&#x24C9;][1]

Creates a function that, when executed, will only call the `func` function at most once per every `wait` milliseconds. If the throttled function is invoked more than once during the `wait` timeout, `func` will also be called on the trailing edge of the timeout. Subsequent calls to the throttled function will return the result of the last `func` call.

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

### <a id="_wrapvalue-wrapper"></a>`_.wrap(value, wrapper)`
<a href="#_wrapvalue-wrapper">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4433 "View in source") [&#x24C9;][1]

Creates a function that passes `value` to the `wrapper` function as its first argument. Additional arguments passed to the function are appended to those passed to the `wrapper` function. The `wrapper` is executed with the `this` binding of the created function.

#### Arguments
1. `value` *(Mixed)*: The value to wrap.
2. `wrapper` *(Function)*: The wrapper function.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var hello = function(name) { return 'hello ' + name; };
hello = _.wrap(hello, function(func) {
  return 'before, ' + func('moe') + ', after';
});
hello();
// => 'before, hello moe, after'
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Objects” Methods`

<!-- div -->

### <a id="_assignobject--source1-source2--callback-thisarg"></a>`_.assign(object [, source1, source2, ..., callback, thisArg])`
<a href="#_assignobject--source1-source2--callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1062 "View in source") [&#x24C9;][1]

Assigns own enumerable properties of source object(s) to the destination object. Subsequent sources will overwrite propery assignments of previous sources. If a `callback` function is passed, it will be executed to produce the assigned values. The `callback` is bound to `thisArg` and invoked with two arguments; *(objectValue, sourceValue)*.

#### Aliases
*extend*

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source1, source2, ...]` *(Object)*: The source objects.
3. `[callback]` *(Function)*: The function to customize assigning values.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns the destination object.

#### Example
```js
_.assign({ 'name': 'moe' }, { 'age': 40 });
// => { 'name': 'moe', 'age': 40 }

var defaults = _.partialRight(_.assign, function(a, b) {
  return typeof a == 'undefined' ? b : a;
});

var food = { 'name': 'apple' };
defaults(food, { 'name': 'banana', 'type': 'fruit' });
// => { 'name': 'apple', 'type': 'fruit' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_clonevalue--deepfalse-callback-thisarg"></a>`_.clone(value [, deep=false, callback, thisArg])`
<a href="#_clonevalue--deepfalse-callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1117 "View in source") [&#x24C9;][1]

Creates a clone of `value`. If `deep` is `true`, nested objects will also be cloned, otherwise they will be assigned by reference. If a `callback` function is passed, it will be executed to produce the cloned values. If `callback` returns `undefined`, cloning will be handled by the method instead. The `callback` is bound to `thisArg` and invoked with one argument; *(value)*.

#### Arguments
1. `value` *(Mixed)*: The value to clone.
2. `[deep=false]` *(Boolean)*: A flag to indicate a deep clone.
3. `[callback]` *(Function)*: The function to customize cloning values.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the cloned `value`.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

var shallow = _.clone(stooges);
shallow[0] === stooges[0];
// => true

var deep = _.clone(stooges, true);
deep[0] === stooges[0];
// => false

_.mixin({
  'clone': _.partialRight(_.clone, function(value) {
    return _.isElement(value) ? value.cloneNode(false) : undefined;
  })
});

var clone = _.clone(document.body);
clone.childNodes.length;
// => 0
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_clonedeepvalue--callback-thisarg"></a>`_.cloneDeep(value [, callback, thisArg])`
<a href="#_clonedeepvalue--callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1242 "View in source") [&#x24C9;][1]

Creates a deep clone of `value`. If a `callback` function is passed, it will be executed to produce the cloned values. If `callback` returns the value it was passed, cloning will be handled by the method instead. The `callback` is bound to `thisArg` and invoked with one argument; *(value)*.

Note: This function is loosely based on the structured clone algorithm. Functions and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and objects created by constructors other than `Object` are cloned to plain `Object` objects. See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.

#### Arguments
1. `value` *(Mixed)*: The value to deep clone.
2. `[callback]` *(Function)*: The function to customize cloning values.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Mixed)*: Returns the deep cloned `value`.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

var deep = _.cloneDeep(stooges);
deep[0] === stooges[0];
// => false

var view = {
  'label': 'docs',
  'node': element
};

var clone = _.cloneDeep(view, function(value) {
  return _.isElement(value) ? value.cloneNode(true) : value;
});

clone.node == view.node;
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_defaultsobject--source1-source2-"></a>`_.defaults(object [, source1, source2, ...])`
<a href="#_defaultsobject--source1-source2-">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1266 "View in source") [&#x24C9;][1]

Assigns own enumerable properties of source object(s) to the destination object for all destination properties that resolve to `undefined`. Once a property is set, additional defaults of the same property will be ignored.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source1, source2, ...]` *(Object)*: The source objects.

#### Returns
*(Object)*: Returns the destination object.

#### Example
```js
var food = { 'name': 'apple' };
_.defaults(food, { 'name': 'banana', 'type': 'fruit' });
// => { 'name': 'apple', 'type': 'fruit' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forinobject--callbackidentity-thisarg"></a>`_.forIn(object [, callback=identity, thisArg])`
<a href="#_forinobject--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L882 "View in source") [&#x24C9;][1]

Iterates over `object`'s own and inherited enumerable properties, executing the `callback` for each property. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

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

### <a id="_forownobject--callbackidentity-thisarg"></a>`_.forOwn(object [, callback=identity, thisArg])`
<a href="#_forownobject--callbackidentity-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L907 "View in source") [&#x24C9;][1]

Iterates over an object's own enumerable properties, executing the `callback` for each property. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

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
<a href="#_functionsobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1283 "View in source") [&#x24C9;][1]

Creates a sorted array of all enumerable properties, own and inherited, of `object` that have function values.

#### Aliases
*methods*

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

### <a id="_hasobject-property"></a>`_.has(object, property)`
<a href="#_hasobject-property">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1308 "View in source") [&#x24C9;][1]

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

### <a id="_invertobject"></a>`_.invert(object)`
<a href="#_invertobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1325 "View in source") [&#x24C9;][1]

Creates an object composed of the inverted keys and values of the given `object`.

#### Arguments
1. `object` *(Object)*: The object to invert.

#### Returns
*(Object)*: Returns the created inverted object.

#### Example
```js
_.invert({ 'first': 'moe', 'second': 'larry' });
// => { 'moe': 'first', 'larry': 'second' } (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isargumentsvalue"></a>`_.isArguments(value)`
<a href="#_isargumentsvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L843 "View in source") [&#x24C9;][1]

Checks if `value` is an `arguments` object.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is an `arguments` object, else `false`.

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
<a href="#_isarrayvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L925 "View in source") [&#x24C9;][1]

Checks if `value` is an array.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is an array, else `false`.

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
<a href="#_isbooleanvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1351 "View in source") [&#x24C9;][1]

Checks if `value` is a boolean value.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a boolean value, else `false`.

#### Example
```js
_.isBoolean(null);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isdatevalue"></a>`_.isDate(value)`
<a href="#_isdatevalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1368 "View in source") [&#x24C9;][1]

Checks if `value` is a date.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a date, else `false`.

#### Example
```js
_.isDate(new Date);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_iselementvalue"></a>`_.isElement(value)`
<a href="#_iselementvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1385 "View in source") [&#x24C9;][1]

Checks if `value` is a DOM element.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a DOM element, else `false`.

#### Example
```js
_.isElement(document.body);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isemptyvalue"></a>`_.isEmpty(value)`
<a href="#_isemptyvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1410 "View in source") [&#x24C9;][1]

Checks if `value` is empty. Arrays, strings, or `arguments` objects with a length of `0` and objects with no own enumerable properties are considered "empty".

#### Arguments
1. `value` *(Array|Object|String)*: The value to inspect.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is empty, else `false`.

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

### <a id="_isequala-b--callback-thisarg"></a>`_.isEqual(a, b [, callback, thisArg])`
<a href="#_isequala-b--callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1469 "View in source") [&#x24C9;][1]

Performs a deep comparison between two values to determine if they are equivalent to each other. If `callback` is passed, it will be executed to compare values. If `callback` returns `undefined`, comparisons will be handled by the method instead. The `callback` is bound to `thisArg` and invoked with two arguments; *(a, b)*.

#### Arguments
1. `a` *(Mixed)*: The value to compare.
2. `b` *(Mixed)*: The other value to compare.
3. `[callback]` *(Function)*: The function to customize comparing values.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Boolean)*: Returns `true`, if the values are equvalent, else `false`.

#### Example
```js
var moe = { 'name': 'moe', 'age': 40 };
var copy = { 'name': 'moe', 'age': 40 };

moe == copy;
// => false

_.isEqual(moe, copy);
// => true

var words = ['hello', 'goodbye'];
var otherWords = ['hi', 'goodbye'];

_.isEqual(words, otherWords, function(a, b) {
  var reGreet = /^(?:hello|hi)$/i,
      aGreet = _.isString(a) && reGreet.test(a),
      bGreet = _.isString(b) && reGreet.test(b);

  return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
});
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isfinitevalue"></a>`_.isFinite(value)`
<a href="#_isfinitevalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1650 "View in source") [&#x24C9;][1]

Checks if `value` is, or can be coerced to, a finite number.

Note: This is not the same as native `isFinite`, which will return true for booleans and empty strings. See http://es5.github.com/#x15.1.2.5.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is finite, else `false`.

#### Example
```js
_.isFinite(-101);
// => true

_.isFinite('10');
// => true

_.isFinite(true);
// => false

_.isFinite('');
// => false

_.isFinite(Infinity);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isfunctionvalue"></a>`_.isFunction(value)`
<a href="#_isfunctionvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1667 "View in source") [&#x24C9;][1]

Checks if `value` is a function.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a function, else `false`.

#### Example
```js
_.isFunction(_);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isnanvalue"></a>`_.isNaN(value)`
<a href="#_isnanvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1730 "View in source") [&#x24C9;][1]

Checks if `value` is `NaN`.

Note: This is not the same as native `isNaN`, which will return `true` for `undefined` and other values. See http://es5.github.com/#x15.1.2.4.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is `NaN`, else `false`.

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
<a href="#_isnullvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1752 "View in source") [&#x24C9;][1]

Checks if `value` is `null`.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is `null`, else `false`.

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
<a href="#_isnumbervalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1769 "View in source") [&#x24C9;][1]

Checks if `value` is a number.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a number, else `false`.

#### Example
```js
_.isNumber(8.4 * 5);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isobjectvalue"></a>`_.isObject(value)`
<a href="#_isobjectvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1697 "View in source") [&#x24C9;][1]

Checks if `value` is the language type of Object. *(e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)*

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is an object, else `false`.

#### Example
```js
_.isObject({});
// => true

_.isObject([1, 2, 3]);
// => true

_.isObject(1);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isplainobjectvalue"></a>`_.isPlainObject(value)`
<a href="#_isplainobjectvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1797 "View in source") [&#x24C9;][1]

Checks if a given `value` is an object created by the `Object` constructor.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if `value` is a plain object, else `false`.

#### Example
```js
function Stooge(name, age) {
  this.name = name;
  this.age = age;
}

_.isPlainObject(new Stooge('moe', 40));
// => false

_.isPlainObject([1, 2, 3]);
// => false

_.isPlainObject({ 'name': 'moe', 'age': 40 });
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isregexpvalue"></a>`_.isRegExp(value)`
<a href="#_isregexpvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1822 "View in source") [&#x24C9;][1]

Checks if `value` is a regular expression.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a regular expression, else `false`.

#### Example
```js
_.isRegExp(/moe/);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isstringvalue"></a>`_.isString(value)`
<a href="#_isstringvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1839 "View in source") [&#x24C9;][1]

Checks if `value` is a string.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is a string, else `false`.

#### Example
```js
_.isString('moe');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isundefinedvalue"></a>`_.isUndefined(value)`
<a href="#_isundefinedvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1856 "View in source") [&#x24C9;][1]

Checks if `value` is `undefined`.

#### Arguments
1. `value` *(Mixed)*: The value to check.

#### Returns
*(Boolean)*: Returns `true`, if the `value` is `undefined`, else `false`.

#### Example
```js
_.isUndefined(void 0);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_keysobject"></a>`_.keys(object)`
<a href="#_keysobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L944 "View in source") [&#x24C9;][1]

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

### <a id="_mergeobject--source1-source2--callback-thisarg"></a>`_.merge(object [, source1, source2, ..., callback, thisArg])`
<a href="#_mergeobject--source1-source2--callback-thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L1916 "View in source") [&#x24C9;][1]

Recursively merges own enumerable properties of the source object(s), that don't resolve to `undefined`, into the destination object. Subsequent sources will overwrite propery assignments of previous sources. If a `callback` function is passed, it will be executed to produce the merged values of the destination and source properties. If `callback` returns `undefined`, merging will be handled by the method instead. The `callback` is bound to `thisArg` and invoked with two arguments; *(objectValue, sourceValue)*.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source1, source2, ...]` *(Object)*: The source objects.
3. `[callback]` *(Function)*: The function to customize merging properties.
4. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns the destination object.

#### Example
```js
var names = {
  'stooges': [
    { 'name': 'moe' },
    { 'name': 'larry' }
  ]
};

var ages = {
  'stooges': [
    { 'age': 40 },
    { 'age': 50 }
  ]
};

_.merge(names, ages);
// => { 'stooges': [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }] }

var food = {
  'fruits': ['apple'],
  'vegetables': ['beet']
};

var otherFood = {
  'fruits': ['banana'],
  'vegetables': ['carrot']
};

_.merge(food, otherFood, function(a, b) {
  return _.isArray(a) ? a.concat(b) : undefined;
});
// => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_omitobject-callback-prop1-prop2--thisarg"></a>`_.omit(object, callback|[prop1, prop2, ..., thisArg])`
<a href="#_omitobject-callback-prop1-prop2--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2023 "View in source") [&#x24C9;][1]

Creates a shallow clone of `object` excluding the specified properties. Property names may be specified as individual arguments or as arrays of property names. If a `callback` function is passed, it will be executed for each property in the `object`, omitting the properties `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, key, object)*.

#### Arguments
1. `object` *(Object)*: The source object.
2. `callback|[prop1, prop2, ...]` *(Function|String)*: The properties to omit or the function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns an object without the omitted properties.

#### Example
```js
_.omit({ 'name': 'moe', 'age': 40 }, 'age');
// => { 'name': 'moe' }

_.omit({ 'name': 'moe', 'age': 40 }, function(value) {
  return typeof value == 'number';
});
// => { 'name': 'moe' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_pairsobject"></a>`_.pairs(object)`
<a href="#_pairsobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2057 "View in source") [&#x24C9;][1]

Creates a two dimensional array of the given object's key-value pairs, i.e. `[[key1, value1], [key2, value2]]`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns new array of key-value pairs.

#### Example
```js
_.pairs({ 'moe': 30, 'larry': 40 });
// => [['moe', 30], ['larry', 40]] (order is not guaranteed)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_pickobject-callback-prop1-prop2--thisarg"></a>`_.pick(object, callback|[prop1, prop2, ..., thisArg])`
<a href="#_pickobject-callback-prop1-prop2--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2095 "View in source") [&#x24C9;][1]

Creates a shallow clone of `object` composed of the specified properties. Property names may be specified as individual arguments or as arrays of property names. If `callback` is passed, it will be executed for each property in the `object`, picking the properties `callback` returns truthy for. The `callback` is bound to `thisArg` and invoked with three arguments; *(value, key, object)*.

#### Arguments
1. `object` *(Object)*: The source object.
2. `callback|[prop1, prop2, ...]` *(Array|Function|String)*: The function called per iteration or properties to pick, either as individual arguments or arrays.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns an object composed of the picked properties.

#### Example
```js
_.pick({ 'name': 'moe', '_userid': 'moe1' }, 'name');
// => { 'name': 'moe' }

_.pick({ 'name': 'moe', '_userid': 'moe1' }, function(value, key) {
  return key.charAt(0) != '_';
});
// => { 'name': 'moe' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_valuesobject"></a>`_.values(object)`
<a href="#_valuesobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L2132 "View in source") [&#x24C9;][1]

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


<!-- /div -->


<!-- div -->

## `“Utilities” Methods`

<!-- div -->

### <a id="_escapestring"></a>`_.escape(string)`
<a href="#_escapestring">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4457 "View in source") [&#x24C9;][1]

Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their corresponding HTML entities.

#### Arguments
1. `string` *(String)*: The string to escape.

#### Returns
*(String)*: Returns the escaped string.

#### Example
```js
_.escape('Moe, Larry & Curly');
// => 'Moe, Larry &amp; Curly'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_identityvalue"></a>`_.identity(value)`
<a href="#_identityvalue">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4475 "View in source") [&#x24C9;][1]

This function returns the first argument passed to it.

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

### <a id="_mixinobject"></a>`_.mixin(object)`
<a href="#_mixinobject">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4501 "View in source") [&#x24C9;][1]

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

_.capitalize('moe');
// => 'Moe'

_('moe').capitalize();
// => 'Moe'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_noconflict"></a>`_.noConflict()`
<a href="#_noconflict">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4525 "View in source") [&#x24C9;][1]

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

### <a id="_randommin0-max1"></a>`_.random([min=0, max=1])`
<a href="#_randommin0-max1">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4548 "View in source") [&#x24C9;][1]

Produces a random number between `min` and `max` *(inclusive)*. If only one argument is passed, a number between `0` and the given number will be returned.

#### Arguments
1. `[min=0]` *(Number)*: The minimum possible value.
2. `[max=1]` *(Number)*: The maximum possible value.

#### Returns
*(Number)*: Returns a random number.

#### Example
```js
_.random(0, 5);
// => a number between 0 and 5

_.random(5);
// => also a number between 0 and 5
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_resultobject-property"></a>`_.result(object, property)`
<a href="#_resultobject-property">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4586 "View in source") [&#x24C9;][1]

Resolves the value of `property` on `object`. If `property` is a function, it will be invoked and its result returned, else the property value is returned. If `object` is falsey, then `null` is returned.

#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `property` *(String)*: The property to get the value of.

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

### <a id="_templatetext-data-options"></a>`_.template(text, data, options)`
<a href="#_templatetext-data-options">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4674 "View in source") [&#x24C9;][1]

A micro-templating method that handles arbitrary delimiters, preserves whitespace, and correctly escapes quotes within interpolated code.

Note: In the development build, `_.template` utilizes sourceURLs for easier debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl

Note: Lo-Dash may be used in Chrome extensions by either creating a `lodash csp` build and using precompiled templates, or loading Lo-Dash in a sandbox.

For more information on precompiling templates see:<br>
http://lodash.com/#custom-builds

For more information on Chrome extension sandboxes see:<br>
http://developer.chrome.com/stable/extensions/sandboxingEval.html

#### Arguments
1. `text` *(String)*: The template text.
2. `data` *(Obect)*: The data object used to populate the text.
3. `options` *(Object)*: The options object. escape - The "escape" delimiter regexp. evaluate - The "evaluate" delimiter regexp. interpolate - The "interpolate" delimiter regexp. sourceURL - The sourceURL of the template's compiled source. variable - The data object variable name.

#### Returns
*(Function, String)*: Returns a compiled function when no `data` object  is given, else it returns the interpolated text.

#### Example
```js
// using a compiled template
var compiled = _.template('hello <%= name %>');
compiled({ 'name': 'moe' });
// => 'hello moe'

var list = '<% _.forEach(people, function(name) { %><li><%= name %></li><% }); %>';
_.template(list, { 'people': ['moe', 'larry'] });
// => '<li>moe</li><li>larry</li>'

// using the "escape" delimiter to escape HTML in data property values
_.template('<b><%- value %></b>', { 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'

// using the ES6 delimiter as an alternative to the default "interpolate" delimiter
_.template('hello ${ name }', { 'name': 'curly' });
// => 'hello curly'

// using the internal `print` function in "evaluate" delimiters
_.template('<% print("hello " + epithet); %>!', { 'epithet': 'stooge' });
// => 'hello stooge!'

// using custom template delimiters
_.templateSettings = {
  'interpolate': /{{([\s\S]+?)}}/g
};

_.template('hello {{ name }}!', { 'name': 'mustache' });
// => 'hello mustache!'

// using the `sourceURL` option to specify a custom sourceURL for the template
var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector

// using the `variable` option to ensure a with-statement isn't used in the compiled template
var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
compiled.source;
// => function(data) {
  var __t, __p = '', __e = _.escape;
  __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
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

### <a id="_timesn-callback--thisarg"></a>`_.times(n, callback [, thisArg])`
<a href="#_timesn-callback--thisarg">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4800 "View in source") [&#x24C9;][1]

Executes the `callback` function `n` times, returning an array of the results of each `callback` execution. The `callback` is bound to `thisArg` and invoked with one argument; *(index)*.

#### Arguments
1. `n` *(Number)*: The number of times to execute the callback.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(Mixed)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of the results of each `callback` execution.

#### Example
```js
var diceRolls = _.times(3, _.partial(_.random, 1, 6));
// => [3, 6, 4]

_.times(3, function(n) { mage.castSpell(n); });
// => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively

_.times(3, function(n) { this.cast(n); }, mage);
// => also calls `mage.castSpell(n)` three times
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_unescapestring"></a>`_.unescape(string)`
<a href="#_unescapestring">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4826 "View in source") [&#x24C9;][1]

The opposite of `_.escape`, this method converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their corresponding characters.

#### Arguments
1. `string` *(String)*: The string to unescape.

#### Returns
*(String)*: Returns the unescaped string.

#### Example
```js
_.unescape('Moe, Larry &amp; Curly');
// => 'Moe, Larry & Curly'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_uniqueidprefix"></a>`_.uniqueId([prefix])`
<a href="#_uniqueidprefix">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L4846 "View in source") [&#x24C9;][1]

Generates a unique ID. If `prefix` is passed, the ID will be appended to it.

#### Arguments
1. `[prefix]` *(String)*: The value to prefix the ID with.

#### Returns
*(String)*: Returns the unique ID.

#### Example
```js
_.uniqueId('contact_');
// => 'contact_104'

_.uniqueId();
// => '105'
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Methods`

<!-- div -->

### <a id="_templatesettingsimports_"></a>`_.templateSettings.imports._`
<a href="#_templatesettingsimports_">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L341 "View in source") [&#x24C9;][1]

A reference to the `lodash` function.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Properties`

<!-- div -->

### <a id="_version"></a>`_.VERSION`
<a href="#_version">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L5076 "View in source") [&#x24C9;][1]

*(String)*: The semantic version number.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettings"></a>`_.templateSettings`
<a href="#_templatesettings">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L293 "View in source") [&#x24C9;][1]

*(Object)*: By default, the template delimiters used by Lo-Dash are similar to those in embedded Ruby *(ERB)*. Change the following template settings to use alternative delimiters.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsescape"></a>`_.templateSettings.escape`
<a href="#_templatesettingsescape">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L301 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect `data` property values to be HTML-escaped.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsevaluate"></a>`_.templateSettings.evaluate`
<a href="#_templatesettingsevaluate">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L309 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect code to be evaluated.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsinterpolate"></a>`_.templateSettings.interpolate`
<a href="#_templatesettingsinterpolate">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L317 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect `data` property values to inject.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsvariable"></a>`_.templateSettings.variable`
<a href="#_templatesettingsvariable">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L325 "View in source") [&#x24C9;][1]

*(String)*: Used to reference the data object in the template text.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsimports"></a>`_.templateSettings.imports`
<a href="#_templatesettingsimports">#</a> [&#x24C8;](https://github.com/bestiejs/lodash/blob/master/lodash.js#L333 "View in source") [&#x24C9;][1]

*(Object)*: Used to import variables into the compiled template.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Arrays "Jump back to the TOC."