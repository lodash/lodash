# Lo-Dash <span>v2.2.1</span>

<!-- div -->


<!-- div -->

## <a id="Arrays"></a>`Arrays`
* [`_.compact`](#_compactarray)
* [`_.difference`](#_differencearray--array)
* [`_.drop`](#_restarray--callback1--thisarg)
* [`_.findIndex`](#_findindexarray--callbackidentity--thisarg)
* [`_.findLastIndex`](#_findlastindexarray--callbackidentity--thisarg)
* [`_.first`](#_firstarray--callback--thisarg)
* [`_.flatten`](#_flattenarray--isshallowfalse--callbackidentity--thisarg)
* [`_.head`](#_firstarray--callback--thisarg)
* [`_.indexOf`](#_indexofarray-value--fromindex0)
* [`_.initial`](#_initialarray--callback1--thisarg)
* [`_.intersection`](#_intersectionarray)
* [`_.last`](#_lastarray--callback--thisarg)
* [`_.lastIndexOf`](#_lastindexofarray-value--fromindexarraylength-1)
* [`_.object`](#_zipobjectkeys--values)
* [`_.pull`](#_pullarray--value)
* [`_.range`](#_rangestart0-end--step1)
* [`_.remove`](#_removearray--callbackidentity--thisarg)
* [`_.rest`](#_restarray--callback1--thisarg)
* [`_.sortedIndex`](#_sortedindexarray-value--callbackidentity--thisarg)
* [`_.tail`](#_restarray--callback1--thisarg)
* [`_.take`](#_firstarray--callback--thisarg)
* [`_.union`](#_unionarray)
* [`_.uniq`](#_uniqarray--issortedfalse--callbackidentity--thisarg)
* [`_.unique`](#_uniqarray--issortedfalse--callbackidentity--thisarg)
* [`_.unzip`](#_ziparray)
* [`_.without`](#_withoutarray--value)
* [`_.zip`](#_ziparray)
* [`_.zipObject`](#_zipobjectkeys--values)

<!-- /div -->


<!-- div -->

## `Chaining`
* [`_`](#_value)
* [`_.chain`](#_chainvalue)
* [`_.tap`](#_tapvalue-interceptor)
* [`_.prototype.chain`](#_prototypechain)
* [`_.prototype.toString`](#_prototypetostring)
* [`_.prototype.value`](#_prototypevalueof)
* [`_.prototype.valueOf`](#_prototypevalueof)

<!-- /div -->


<!-- div -->

## `Collections`
* [`_.all`](#_everycollection--callbackidentity--thisarg)
* [`_.any`](#_somecollection--callbackidentity--thisarg)
* [`_.at`](#_atcollection--index)
* [`_.collect`](#_mapcollection--callbackidentity--thisarg)
* [`_.contains`](#_containscollection-target--fromindex0)
* [`_.countBy`](#_countbycollection--callbackidentity--thisarg)
* [`_.detect`](#_findcollection--callbackidentity--thisarg)
* [`_.each`](#_foreachcollection--callbackidentity--thisarg)
* [`_.eachRight`](#_foreachrightcollection--callbackidentity--thisarg)
* [`_.every`](#_everycollection--callbackidentity--thisarg)
* [`_.filter`](#_filtercollection--callbackidentity--thisarg)
* [`_.find`](#_findcollection--callbackidentity--thisarg)
* [`_.findLast`](#_findlastcollection--callbackidentity--thisarg)
* [`_.findWhere`](#_findcollection--callbackidentity--thisarg)
* [`_.foldl`](#_reducecollection--callbackidentity--accumulator--thisarg)
* [`_.foldr`](#_reducerightcollection--callbackidentity--accumulator--thisarg)
* [`_.forEach`](#_foreachcollection--callbackidentity--thisarg)
* [`_.forEachRight`](#_foreachrightcollection--callbackidentity--thisarg)
* [`_.groupBy`](#_groupbycollection--callbackidentity--thisarg)
* [`_.include`](#_containscollection-target--fromindex0)
* [`_.indexBy`](#_indexbycollection--callbackidentity--thisarg)
* [`_.inject`](#_reducecollection--callbackidentity--accumulator--thisarg)
* [`_.invoke`](#_invokecollection-methodname--arg)
* [`_.map`](#_mapcollection--callbackidentity--thisarg)
* [`_.max`](#_maxcollection--callbackidentity--thisarg)
* [`_.min`](#_mincollection--callbackidentity--thisarg)
* [`_.pluck`](#_pluckcollection-property)
* [`_.reduce`](#_reducecollection--callbackidentity--accumulator--thisarg)
* [`_.reduceRight`](#_reducerightcollection--callbackidentity--accumulator--thisarg)
* [`_.reject`](#_rejectcollection--callbackidentity--thisarg)
* [`_.sample`](#_samplecollection--n)
* [`_.select`](#_filtercollection--callbackidentity--thisarg)
* [`_.shuffle`](#_shufflecollection)
* [`_.size`](#_sizecollection)
* [`_.some`](#_somecollection--callbackidentity--thisarg)
* [`_.sortBy`](#_sortbycollection--callbackidentity--thisarg)
* [`_.toArray`](#_toarraycollection)
* [`_.where`](#_wherecollection-properties)

<!-- /div -->


<!-- div -->

## `Functions`
* [`_.after`](#_aftern-func)
* [`_.bind`](#_bindfunc--thisarg--arg)
* [`_.bindAll`](#_bindallobject--methodname)
* [`_.bindKey`](#_bindkeyobject-key--arg)
* [`_.compose`](#_composefunc)
* [`_.createCallback`](#_createcallbackfuncidentity--thisarg--argcount)
* [`_.curry`](#_curryfunc--arityfunclength)
* [`_.debounce`](#_debouncefunc-wait--options--optionsmaxwait)
* [`_.defer`](#_deferfunc--arg)
* [`_.delay`](#_delayfunc-wait--arg)
* [`_.memoize`](#_memoizefunc--resolver)
* [`_.once`](#_oncefunc)
* [`_.partial`](#_partialfunc--arg)
* [`_.partialRight`](#_partialrightfunc--arg)
* [`_.throttle`](#_throttlefunc-wait--options)
* [`_.wrap`](#_wrapvalue-wrapper)

<!-- /div -->


<!-- div -->

## `Objects`
* [`_.assign`](#_assignobject--source--callback--thisarg)
* [`_.clone`](#_clonevalue--deepfalse--callback--thisarg)
* [`_.cloneDeep`](#_clonedeepvalue--callback--thisarg)
* [`_.defaults`](#_defaultsobject--source)
* [`_.extend`](#_assignobject--source--callback--thisarg)
* [`_.findKey`](#_findkeyobject--callbackidentity--thisarg)
* [`_.findLastKey`](#_findlastkeyobject--callbackidentity--thisarg)
* [`_.forIn`](#_forinobject--callbackidentity--thisarg)
* [`_.forInRight`](#_forinrightobject--callbackidentity--thisarg)
* [`_.forOwn`](#_forownobject--callbackidentity--thisarg)
* [`_.forOwnRight`](#_forownrightobject--callbackidentity--thisarg)
* [`_.functions`](#_functionsobject)
* [`_.has`](#_hasobject-property)
* [`_.invert`](#_invertobject)
* [`_.isArguments`](#_isargumentsvalue)
* [`_.isArray`](#_isarrayvalue)
* [`_.isBoolean`](#_isbooleanvalue)
* [`_.isDate`](#_isdatevalue)
* [`_.isElement`](#_iselementvalue)
* [`_.isEmpty`](#_isemptyvalue)
* [`_.isEqual`](#_isequala-b--callback--thisarg)
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
* [`_.merge`](#_mergeobject--source--callback--thisarg)
* [`_.methods`](#_functionsobject)
* [`_.omit`](#_omitobject--callback--thisarg)
* [`_.pairs`](#_pairsobject)
* [`_.pick`](#_pickobject--callback--thisarg)
* [`_.transform`](#_transformcollection--callbackidentity--accumulator--thisarg)
* [`_.values`](#_valuesobject)

<!-- /div -->


<!-- div -->

## `Utilities`
* [`_.escape`](#_escapestring)
* [`_.identity`](#_identityvalue)
* [`_.mixin`](#_mixinobject-object)
* [`_.noConflict`](#_noconflict)
* [`_.parseInt`](#_parseintvalue--radix)
* [`_.random`](#_randommin0--max1--floatingfalse)
* [`_.result`](#_resultobject-property)
* [`_.runInContext`](#_runincontextcontextroot)
* [`_.template`](#_templatetext-data--options--optionsescape--optionsevaluate--optionsimports--optionsinterpolate--sourceurl--variable)
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
* [`_.support`](#_support)
* [`_.support.argsClass`](#_supportargsclass)
* [`_.support.argsObject`](#_supportargsobject)
* [`_.support.enumErrorProps`](#_supportenumerrorprops)
* [`_.support.enumPrototypes`](#_supportenumprototypes)
* [`_.support.fastBind`](#_supportfastbind)
* [`_.support.funcDecomp`](#_supportfuncdecomp)
* [`_.support.funcNames`](#_supportfuncnames)
* [`_.support.nonEnumArgs`](#_supportnonenumargs)
* [`_.support.nonEnumShadows`](#_supportnonenumshadows)
* [`_.support.ownLast`](#_supportownlast)
* [`_.support.spliceObjects`](#_supportspliceobjects)
* [`_.support.unindexedChars`](#_supportunindexedchars)
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
<a href="#_compactarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4188 "View in source") [&#x24C9;][1]

Creates an array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are all falsey.

#### Arguments
1. `array` *(Array)*: The array to compact.

#### Returns
*(Array)*: Returns a new array of filtered values.

#### Example
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_differencearray--array"></a>`_.difference(array, [array])`
<a href="#_differencearray--array">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4217 "View in source") [&#x24C9;][1]

Creates an array excluding all values of the provided arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[array]` *(...Array)*: The arrays of values to exclude.

#### Returns
*(Array)*: Returns a new array of filtered values.

#### Example
```js
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
// => [1, 3, 4]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_findindexarray--callbackidentity--thisarg"></a>`_.findIndex(array, [callback=identity], [thisArg])`
<a href="#_findindexarray--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4267 "View in source") [&#x24C9;][1]

This method is like `_.find` except that it returns the index of the first element that passes the callback check, instead of the element itself.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(number)*: Returns the index of the found element, else `-1`.

#### Example
```js
_.findIndex(['apple', 'banana', 'beet'], function(food) {
  return /^b/.test(food);
});
// => 1
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_findlastindexarray--callbackidentity--thisarg"></a>`_.findLastIndex(array, [callback=identity], [thisArg])`
<a href="#_findlastindexarray--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4300 "View in source") [&#x24C9;][1]

This method is like `_.findIndex` except that it iterates over elements of a `collection` from right to left.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(number)*: Returns the index of the found element, else `-1`.

#### Example
```js
_.findLastIndex(['apple', 'banana', 'beet'], function(food) {
  return /^b/.test(food);
});
// => 2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_firstarray--callback--thisarg"></a>`_.first(array, [callback], [thisArg])`
<a href="#_firstarray--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4367 "View in source") [&#x24C9;][1]

Gets the first element or first `n` elements of an array. If a callback is provided elements at the beginning of the array are returned as long as the callback returns truey. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.head, _.take*

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback]` *(Function|Object|number|string)*: The function called per element or the number of elements to return. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the first element(s) of `array`.

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

### <a id="_flattenarray--isshallowfalse--callbackidentity--thisarg"></a>`_.flatten(array, [isShallow=false], [callback=identity], [thisArg])`
<a href="#_flattenarray--isshallowfalse--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4427 "View in source") [&#x24C9;][1]

Flattens a nested array *(the nesting can be to any depth)*. If `isShallow` is truey, the array will only be flattened a single level. If a callback is provided each element of the array is passed through the callback before flattening. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to flatten.
2. `[isShallow=false]` *(boolean)*: A flag to restrict flattening to a single level.
3. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new flattened array.

#### Example
```js
_.flatten([1, [2], [3, [[4]]]]);
// => [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
// => [1, 2, 3, [[4]]];

var stooges = [
  { 'name': 'curly', 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] },
  { 'name': 'moe', 'quotes': ['Spread out!', 'You knucklehead!'] }
];

// using "_.pluck" callback shorthand
_.flatten(stooges, 'quotes');
// => ['Oh, a wise guy, eh?', 'Poifect!', 'Spread out!', 'You knucklehead!']
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_indexofarray-value--fromindex0"></a>`_.indexOf(array, value, [fromIndex=0])`
<a href="#_indexofarray-value--fromindex0">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4464 "View in source") [&#x24C9;][1]

Gets the index at which the first occurrence of `value` is found using strict equality for comparisons, i.e. `===`. If the array is already sorted providing `true` for `fromIndex` will run a faster binary search.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(\*)*: The value to search for.
3. `[fromIndex=0]` *(boolean|number)*: The index to search from or `true` to perform a binary search on a sorted array.

#### Returns
*(number)*: Returns the index of the matched value or `-1`.

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

### <a id="_initialarray--callback1--thisarg"></a>`_.initial(array, [callback=1], [thisArg])`
<a href="#_initialarray--callback1--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4530 "View in source") [&#x24C9;][1]

Gets all but the last element or last `n` elements of an array. If a callback is provided elements at the end of the array are excluded from the result as long as the callback returns truey. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback=1]` *(Function|Object|number|string)*: The function called per element or the number of elements to exclude. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_intersectionarray"></a>`_.intersection([array])`
<a href="#_intersectionarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4560 "View in source") [&#x24C9;][1]

Creates an array of unique values present in all provided arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `[array]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*: Returns an array of composite values.

#### Example
```js
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_lastarray--callback--thisarg"></a>`_.last(array, [callback], [thisArg])`
<a href="#_lastarray--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4660 "View in source") [&#x24C9;][1]

Gets the last element or last `n` elements of an array. If a callback is provided elements at the end of the array are returned as long as the callback returns truey. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback]` *(Function|Object|number|string)*: The function called per element or the number of elements to return. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the last element(s) of `array`.

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

### <a id="_lastindexofarray-value--fromindexarraylength-1"></a>`_.lastIndexOf(array, value, [fromIndex=array.length-1])`
<a href="#_lastindexofarray-value--fromindexarraylength-1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4699 "View in source") [&#x24C9;][1]

Gets the index at which the last occurrence of `value` is found using strict equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the offset from the end of the collection.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(\*)*: The value to search for.
3. `[fromIndex=array.length-1]` *(number)*: The index to search from.

#### Returns
*(number)*: Returns the index of the matched value or `-1`.

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

### <a id="_pullarray--value"></a>`_.pull(array, [value])`
<a href="#_pullarray--value">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4729 "View in source") [&#x24C9;][1]

Removes all provided values from the given array using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[value]` *(...\*)*: The values to remove.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = [1, 2, 3, 1, 2, 3];
_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_rangestart0-end--step1"></a>`_.range([start=0], end, [step=1])`
<a href="#_rangestart0-end--step1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4780 "View in source") [&#x24C9;][1]

Creates an array of numbers *(positive and/or negative)* progressing from `start` up to but not including `end`. If `start` is less than `stop` a zero-length range is created unless a negative `step` is specified.

#### Arguments
1. `[start=0]` *(number)*: The start of the range.
2. `end` *(number)*: The end of the range.
3. `[step=1]` *(number)*: The value to increment or decrement by.

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

_.range(1, 4, 0);
// => [1, 1, 1]

_.range(0);
// => []
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_removearray--callbackidentity--thisarg"></a>`_.remove(array, [callback=identity], [thisArg])`
<a href="#_removearray--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4833 "View in source") [&#x24C9;][1]

Removes all elements from an array that the callback returns truey for and returns an array of removed elements. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of removed elements.

#### Example
```js
var array = [1, 2, 3, 4, 5, 6];
var evens = _.remove(array, function(num) { return num % 2 == 0; });

console.log(array);
// => [1, 3, 5]

console.log(evens);
// => [2, 4, 6]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_restarray--callback1--thisarg"></a>`_.rest(array, [callback=1], [thisArg])`
<a href="#_restarray--callback1--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4907 "View in source") [&#x24C9;][1]

The opposite of `_.initial` this method gets all but the first element or first `n` elements of an array. If a callback function is provided elements at the beginning of the array are excluded from the result as long as the callback returns truey. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.drop, _.tail*

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[callback=1]` *(Function|Object|number|string)*: The function called per element or the number of elements to exclude. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_sortedindexarray-value--callbackidentity--thisarg"></a>`_.sortedIndex(array, value, [callback=identity], [thisArg])`
<a href="#_sortedindexarray-value--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4971 "View in source") [&#x24C9;][1]

Uses a binary search to determine the smallest index at which a value should be inserted into a given sorted array in order to maintain the sort order of the array. If a callback is provided it will be executed for `value` and each element of `array` to compute their sort ranking. The callback is bound to `thisArg` and invoked with one argument; *(value)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `value` *(\*)*: The value to evaluate.
3. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(number)*: Returns the index at which `value` should be inserted  into `array`.

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

### <a id="_unionarray"></a>`_.union([array])`
<a href="#_unionarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5002 "View in source") [&#x24C9;][1]

Creates an array of unique values, in order, of the provided arrays using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `[array]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*: Returns an array of composite values.

#### Example
```js
_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
// => [1, 2, 3, 101, 10]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_uniqarray--issortedfalse--callbackidentity--thisarg"></a>`_.uniq(array, [isSorted=false], [callback=identity], [thisArg])`
<a href="#_uniqarray--issortedfalse--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5050 "View in source") [&#x24C9;][1]

Creates a duplicate-value-free version of an array using strict equality for comparisons, i.e. `===`. If the array is sorted, providing `true` for `isSorted` will use a faster algorithm. If a callback is provided each element of `array` is passed through the callback before uniqueness is computed. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, array)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.unique*

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[isSorted=false]` *(boolean)*: A flag to indicate that `array` is sorted.
3. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a duplicate-value-free array.

#### Example
```js
_.uniq([1, 2, 1, 3, 1]);
// => [1, 2, 3]

_.uniq([1, 1, 2, 2, 3], true);
// => [1, 2, 3]

_.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
// => ['A', 'b', 'C']

_.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
// => [1, 2.5, 3]

// using "_.pluck" callback shorthand
_.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_withoutarray--value"></a>`_.without(array, [value])`
<a href="#_withoutarray--value">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5078 "View in source") [&#x24C9;][1]

Creates an array excluding all provided values using strict equality for comparisons, i.e. `===`.

#### Arguments
1. `array` *(Array)*: The array to filter.
2. `[value]` *(...\*)*: The values to exclude.

#### Returns
*(Array)*: Returns a new array of filtered values.

#### Example
```js
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
// => [2, 3, 4]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_ziparray"></a>`_.zip([array])`
<a href="#_ziparray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5098 "View in source") [&#x24C9;][1]

Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.

#### Aliases
*_.unzip*

#### Arguments
1. `[array]` *(...Array)*: Arrays to process.

#### Returns
*(Array)*: Returns a new array of grouped elements.

#### Example
```js
_.zip(['moe', 'larry'], [30, 40], [true, false]);
// => [['moe', 30, true], ['larry', 40, false]]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_zipobjectkeys--values"></a>`_.zipObject(keys, [values=[]])`
<a href="#_zipobjectkeys--values">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5128 "View in source") [&#x24C9;][1]

Creates an object composed from arrays of `keys` and `values`. Provide either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]` or two arrays, one of `keys` and one of corresponding `values`.

#### Aliases
*_.object*

#### Arguments
1. `keys` *(Array)*: The array of keys.
2. `[values=[]]` *(Array)*: The array of values.

#### Returns
*(Object)*: Returns an object composed of the given keys and  corresponding values.

#### Example
```js
_.zipObject(['moe', 'larry'], [30, 40]);
// => { 'moe': 30, 'larry': 40 }
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Chaining” Methods`

<!-- div -->

### <a id="_value"></a>`_(value)`
<a href="#_value">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L652 "View in source") [&#x24C9;][1]

Creates a `lodash` object which wraps the given value to enable intuitive method chaining.

In addition to Lo-Dash methods, wrappers also have the following `Array` methods:<br>
`concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`, and `unshift`

Chaining is supported in custom builds as long as the `value` method is implicitly or explicitly included in the build.

The chainable wrapper functions are:<br>
`after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`, `compose`, `concat`, `countBy`, `createCallback`, `curry`, `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`, `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`, `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`, `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`, `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`, and `zip`

The non-chainable wrapper functions are:<br>
`clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`, `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`, `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`, `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`, `template`, `unescape`, `uniqueId`, and `value`

The wrapper functions `first` and `last` return wrapped values when `n` is provided, otherwise they return unwrapped values.

Explicit chaining can be enabled by using the `_.chain` method.

#### Arguments
1. `value` *(\*)*: The value to wrap in a `lodash` instance.

#### Returns
*(Object)*: Returns a `lodash` instance.

#### Example
```js
var wrapped = _([1, 2, 3]);

// returns an unwrapped value
wrapped.reduce(function(sum, num) {
  return sum + num;
});
// => 6

// returns a wrapped value
var squares = wrapped.map(function(num) {
  return num * num;
});

_.isArray(squares);
// => false

_.isArray(squares.value());
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_chainvalue"></a>`_.chain(value)`
<a href="#_chainvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6351 "View in source") [&#x24C9;][1]

Creates a `lodash` object that wraps the given value with explicit method chaining enabled.

#### Arguments
1. `value` *(\*)*: The value to wrap.

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
    .sortBy('age')
    .map(function(stooge) { return stooge.name + ' is ' + stooge.age; })
    .first()
    .value();
// => 'moe is 40'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_tapvalue-interceptor"></a>`_.tap(value, interceptor)`
<a href="#_tapvalue-interceptor">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6379 "View in source") [&#x24C9;][1]

Invokes `interceptor` with the `value` as the first argument and then returns `value`. The purpose of this method is to "tap into" a method chain in order to perform operations on intermediate results within the chain.

#### Arguments
1. `value` *(\*)*: The value to provide to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.

#### Returns
*(\*)*: Returns `value`.

#### Example
```js
_([1, 2, 3, 4])
 .filter(function(num) { return num % 2 == 0; })
 .tap(function(array) { console.log(array); })
 .map(function(num) { return num * num; })
 .value();
// => // [2, 4] (logged)
// => [4, 16]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_prototypechain"></a>`_.prototype.chain()`
<a href="#_prototypechain">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6409 "View in source") [&#x24C9;][1]

Enables explicit method chaining on the wrapper object.

#### Returns
*(\*)*: Returns the wrapper object.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

// without explicit chaining
_(stooges).first();
// => { 'name': 'moe', 'age': 40 }

// with explicit chaining
_(stooges).chain()
  .first()
  .pick('age')
  .value()
// => { 'age': 40 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_prototypetostring"></a>`_.prototype.toString()`
<a href="#_prototypetostring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6426 "View in source") [&#x24C9;][1]

Produces the `toString` result of the wrapped value.

#### Returns
*(string)*: Returns the string result.

#### Example
```js
_([1, 2, 3]).toString();
// => '1,2,3'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_prototypevalueof"></a>`_.prototype.valueOf()`
<a href="#_prototypevalueof">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6443 "View in source") [&#x24C9;][1]

Extracts the wrapped value.

#### Aliases
*_.prototype.value*

#### Returns
*(\*)*: Returns the wrapped value.

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

### <a id="_atcollection--index"></a>`_.at(collection, [index])`
<a href="#_atcollection--index">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3042 "View in source") [&#x24C9;][1]

Creates an array of elements from the specified indexes, or keys, of the `collection`. Indexes may be specified as individual arguments or as arrays of indexes.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[index]` *(...(number|number[]|string|string[])*: The indexes of `collection` to retrieve, specified as individual indexes or arrays of indexes.

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

### <a id="_containscollection-target--fromindex0"></a>`_.contains(collection, target, [fromIndex=0])`
<a href="#_containscollection-target--fromindex0">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3085 "View in source") [&#x24C9;][1]

Checks if a given value is present in a collection using strict equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the offset from the end of the collection.

#### Aliases
*_.include*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `target` *(\*)*: The value to check for.
3. `[fromIndex=0]` *(number)*: The index to search from.

#### Returns
*(boolean)*: Returns `true` if the `target` element is found, else `false`.

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

### <a id="_countbycollection--callbackidentity--thisarg"></a>`_.countBy(collection, [callback=identity], [thisArg])`
<a href="#_countbycollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3140 "View in source") [&#x24C9;][1]

Creates an object composed of keys generated from the results of running each element of `collection` through the callback. The corresponding value of each key is the number of times the key was returned by the callback. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_everycollection--callbackidentity--thisarg"></a>`_.every(collection, [callback=identity], [thisArg])`
<a href="#_everycollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3185 "View in source") [&#x24C9;][1]

Checks if the given callback returns truey value for **all** elements of a collection. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.all*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(boolean)*: Returns `true` if all elements passed the callback check,  else `false`.

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

### <a id="_filtercollection--callbackidentity--thisarg"></a>`_.filter(collection, [callback=identity], [thisArg])`
<a href="#_filtercollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3246 "View in source") [&#x24C9;][1]

Iterates over elements of a collection, returning an array of all elements the callback returns truey for. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.select*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_findcollection--callbackidentity--thisarg"></a>`_.find(collection, [callback=identity], [thisArg])`
<a href="#_findcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3313 "View in source") [&#x24C9;][1]

Iterates over elements of a collection, returning the first element that the callback returns truey for. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.detect, _.findWhere*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the found element, else `undefined`.

#### Example
```js
_.find([1, 2, 3, 4], function(num) {
  return num % 2 == 0;
});
// => 2

var food = [
  { 'name': 'apple',  'organic': false, 'type': 'fruit' },
  { 'name': 'banana', 'organic': true,  'type': 'fruit' },
  { 'name': 'beet',   'organic': false, 'type': 'vegetable' }
];

// using "_.where" callback shorthand
_.find(food, { 'type': 'vegetable' });
// => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }

// using "_.pluck" callback shorthand
_.find(food, 'organic');
// => { 'name': 'banana', 'organic': true, 'type': 'fruit' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_findlastcollection--callbackidentity--thisarg"></a>`_.findLast(collection, [callback=identity], [thisArg])`
<a href="#_findlastcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3358 "View in source") [&#x24C9;][1]

This method is like `_.find` except that it iterates over elements of a `collection` from right to left.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the found element, else `undefined`.

#### Example
```js
_.findLast([1, 2, 3, 4], function(num) {
  return num % 2 == 1;
});
// => 3
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_foreachcollection--callbackidentity--thisarg"></a>`_.forEach(collection, [callback=identity], [thisArg])`
<a href="#_foreachcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3392 "View in source") [&#x24C9;][1]

Iterates over elements of a collection, executing the callback for each element. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Aliases
*_.each*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array, Object, string)*: Returns `collection`.

#### Example
```js
_([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
// => logs each number and returns '1,2,3'

_.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
// => logs each number and returns the object (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_foreachrightcollection--callbackidentity--thisarg"></a>`_.forEachRight(collection, [callback=identity], [thisArg])`
<a href="#_foreachrightcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3425 "View in source") [&#x24C9;][1]

This method is like `_.forEach` except that it iterates over elements of a `collection` from right to left.

#### Aliases
*_.eachRight*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array, Object, string)*: Returns `collection`.

#### Example
```js
_([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
// => logs each number from right to left and returns '3,2,1'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_groupbycollection--callbackidentity--thisarg"></a>`_.groupBy(collection, [callback=identity], [thisArg])`
<a href="#_groupbycollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3486 "View in source") [&#x24C9;][1]

Creates an object composed of keys generated from the results of running each element of a collection through the callback. The corresponding value of each key is an array of the elements responsible for generating the key. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_indexbycollection--callbackidentity--thisarg"></a>`_.indexBy(collection, [callback=identity], [thisArg])`
<a href="#_indexbycollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3529 "View in source") [&#x24C9;][1]

Creates an object composed of keys generated from the results of running each element of the collection through the given callback. The corresponding value of each key is the last element responsible for generating the key. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
var keys = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];

_.indexBy(keys, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }

_.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

_.indexBy(stooges, function(key) { this.fromCharCode(key.code); }, String);
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_invokecollection-methodname--arg"></a>`_.invoke(collection, methodName, [arg])`
<a href="#_invokecollection-methodname--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3555 "View in source") [&#x24C9;][1]

Invokes the method named by `methodName` on each element in the `collection` returning an array of the results of each invoked method. Additional arguments will be provided to each invoked method. If `methodName` is a function it will be invoked for, and `this` bound to, each element in the `collection`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `methodName` *(Function|string)*: The name of the method to invoke or the function invoked per iteration.
3. `[arg]` *(...\*)*: Arguments to invoke the method with.

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

### <a id="_mapcollection--callbackidentity--thisarg"></a>`_.map(collection, [callback=identity], [thisArg])`
<a href="#_mapcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3607 "View in source") [&#x24C9;][1]

Creates an array of values by running each element in the collection through the callback. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.collect*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of the results of each `callback` execution.

#### Example
```js
_.map([1, 2, 3], function(num) { return num * 3; });
// => [3, 6, 9]

_.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
// => [3, 6, 9] (property order is not guaranteed across environments)

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

### <a id="_maxcollection--callbackidentity--thisarg"></a>`_.max(collection, [callback=identity], [thisArg])`
<a href="#_maxcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3665 "View in source") [&#x24C9;][1]

Retrieves the maximum value of a collection. If the collection is empty or falsey `-Infinity` is returned. If a callback is provided it will be executed for each value in the collection to generate the criterion by which the value is ranked. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the maximum value.

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

### <a id="_mincollection--callbackidentity--thisarg"></a>`_.min(collection, [callback=identity], [thisArg])`
<a href="#_mincollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3735 "View in source") [&#x24C9;][1]

Retrieves the minimum value of a collection. If the collection is empty or falsey `Infinity` is returned. If a callback is provided it will be executed for each value in the collection to generate the criterion by which the value is ranked. The callback is bound to `thisArg` and invoked with three arguments; *(value, index, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the minimum value.

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
<a href="#_pluckcollection-property">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3785 "View in source") [&#x24C9;][1]

Retrieves the value of a specified property from all elements in the `collection`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `property` *(string)*: The property to pluck.

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

### <a id="_reducecollection--callbackidentity--accumulator--thisarg"></a>`_.reduce(collection, [callback=identity], [accumulator], [thisArg])`
<a href="#_reducecollection--callbackidentity--accumulator--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3817 "View in source") [&#x24C9;][1]

Reduces a collection to a value which is the accumulated result of running each element in the collection through the callback, where each successive callback execution consumes the return value of the previous execution. If `accumulator` is not provided the first element of the collection will be used as the initial `accumulator` value. The callback is bound to `thisArg` and invoked with four arguments; *(accumulator, value, index|key, collection)*.

#### Aliases
*_.foldl, _.inject*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[accumulator]` *(\*)*: Initial value of the accumulator.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the accumulated value.

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

### <a id="_reducerightcollection--callbackidentity--accumulator--thisarg"></a>`_.reduceRight(collection, [callback=identity], [accumulator], [thisArg])`
<a href="#_reducerightcollection--callbackidentity--accumulator--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3860 "View in source") [&#x24C9;][1]

This method is like `_.reduce` except that it iterates over elements of a `collection` from right to left.

#### Aliases
*_.foldr*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[accumulator]` *(\*)*: Initial value of the accumulator.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the accumulated value.

#### Example
```js
var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
// => [4, 5, 2, 3, 0, 1]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_rejectcollection--callbackidentity--thisarg"></a>`_.reject(collection, [callback=identity], [thisArg])`
<a href="#_rejectcollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3909 "View in source") [&#x24C9;][1]

The opposite of `_.filter` this method returns the elements of a collection that the callback does **not** return truey for.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns a new array of elements that failed the callback check.

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

### <a id="_samplecollection--n"></a>`_.sample(collection, [n])`
<a href="#_samplecollection--n">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3935 "View in source") [&#x24C9;][1]

Retrieves a random element or `n` random elements from a collection.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to sample.
2. `[n]` *(number)*: The number of elements to sample.

#### Returns
*(Array)*: Returns the random sample(s) of `collection`.

#### Example
```js
_.sample([1, 2, 3, 4]);
// => 2

_.sample([1, 2, 3, 4], 2);
// => [3, 1]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_shufflecollection"></a>`_.shuffle(collection)`
<a href="#_shufflecollection">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3964 "View in source") [&#x24C9;][1]

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to shuffle.

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
<a href="#_sizecollection">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3997 "View in source") [&#x24C9;][1]

Gets the size of the `collection` by returning `collection.length` for arrays and array-like objects or the number of own enumerable properties for objects.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to inspect.

#### Returns
*(number)*: Returns `collection.length` or number of own enumerable properties.

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

### <a id="_somecollection--callbackidentity--thisarg"></a>`_.some(collection, [callback=identity], [thisArg])`
<a href="#_somecollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4044 "View in source") [&#x24C9;][1]

Checks if the callback returns a truey value for **any** element of a collection. The function returns as soon as it finds a passing value and does not iterate over the entire collection. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Aliases
*_.any*

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(boolean)*: Returns `true` if any element passed the callback check,  else `false`.

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

### <a id="_sortbycollection--callbackidentity--thisarg"></a>`_.sortBy(collection, [callback=identity], [thisArg])`
<a href="#_sortbycollection--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4100 "View in source") [&#x24C9;][1]

Creates an array of elements, sorted in ascending order by the results of running each element in a collection through the callback. This method performs a stable sort, that is, it will preserve the original sort order of equal elements. The callback is bound to `thisArg` and invoked with three arguments; *(value, index|key, collection)*.

If a property name is provided for `callback` the created "_.pluck" style callback will return the property value of the given element.

If an object is provided for `callback` the created "_.where" style callback will return `true` for elements that have the properties of the given object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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
<a href="#_toarraycollection">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4136 "View in source") [&#x24C9;][1]

Converts the `collection` to an array.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to convert.

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
<a href="#_wherecollection-properties">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L4170 "View in source") [&#x24C9;][1]

Performs a deep comparison of each element in a `collection` to the given `properties` object, returning an array of all elements that have equivalent property values.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `properties` *(Object)*: The object of property values to filter by.

#### Returns
*(Array)*: Returns a new array of elements that have the given properties.

#### Example
```js
var stooges = [
  { 'name': 'curly', 'age': 30, 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] },
  { 'name': 'moe', 'age': 40, 'quotes': ['Spread out!', 'You knucklehead!'] }
];

_.where(stooges, { 'age': 40 });
// => [{ 'name': 'moe', 'age': 40, 'quotes': ['Spread out!', 'You knucklehead!'] }]

_.where(stooges, { 'quotes': ['Poifect!'] });
// => [{ 'name': 'curly', 'age': 30, 'quotes': ['Oh, a wise guy, eh?', 'Poifect!'] }]
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Functions” Methods`

<!-- div -->

### <a id="_aftern-func"></a>`_.after(n, func)`
<a href="#_aftern-func">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5170 "View in source") [&#x24C9;][1]

Creates a function that executes `func`, with  the `this` binding and arguments of the created function, only after being called `n` times.

#### Arguments
1. `n` *(number)*: The number of times the function must be called before `func` is executed.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
var saves = ['profile', 'settings'];

var done = _.after(saves.length, function() {
  console.log('Done saving!');
});

_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
// => logs 'Done saving!', after all saves have completed
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_bindfunc--thisarg--arg"></a>`_.bind(func, [thisArg], [arg])`
<a href="#_bindfunc--thisarg--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5203 "View in source") [&#x24C9;][1]

Creates a function that, when called, invokes `func` with the `this` binding of `thisArg` and prepends any additional `bind` arguments to those provided to the bound function.

#### Arguments
1. `func` *(Function)*: The function to bind.
2. `[thisArg]` *(\*)*: The `this` binding of `func`.
3. `[arg]` *(...\*)*: Arguments to be partially applied.

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

### <a id="_bindallobject--methodname"></a>`_.bindAll(object, [methodName])`
<a href="#_bindallobject--methodname">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5233 "View in source") [&#x24C9;][1]

Binds methods of an object to the object itself, overwriting the existing method. Method names may be specified as individual arguments or as arrays of method names. If no method names are provided all the function properties of `object` will be bound.

#### Arguments
1. `object` *(Object)*: The object to bind and assign the bound methods to.
2. `[methodName]` *(...string)*: The object method names to bind, specified as individual method names or arrays of method names.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var view = {
 'label': 'docs',
 'onClick': function() { console.log('clicked ' + this.label); }
};

_.bindAll(view);
jQuery('#docs').on('click', view.onClick);
// => logs 'clicked docs', when the button is clicked
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_bindkeyobject-key--arg"></a>`_.bindKey(object, key, [arg])`
<a href="#_bindkeyobject-key--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5279 "View in source") [&#x24C9;][1]

Creates a function that, when called, invokes the method at `object[key]` and prepends any additional `bindKey` arguments to those provided to the bound function. This method differs from `_.bind` by allowing bound functions to reference methods that will be redefined or don't yet exist. See http://michaux.ca/articles/lazy-function-definition-pattern.

#### Arguments
1. `object` *(Object)*: The object the method belongs to.
2. `key` *(string)*: The key of the method.
3. `[arg]` *(...\*)*: Arguments to be partially applied.

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

### <a id="_composefunc"></a>`_.compose([func])`
<a href="#_composefunc">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5315 "View in source") [&#x24C9;][1]

Creates a function that is the composition of the provided functions, where each function consumes the return value of the function that follows. For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`. Each function is executed with the `this` binding of the composed function.

#### Arguments
1. `[func]` *(...Function)*: Functions to compose.

#### Returns
*(Function)*: Returns the new composed function.

#### Example
```js
var realNameMap = {
  'curly': 'jerome'
};

var format = function(name) {
  name = realNameMap[name.toLowerCase()] || name;
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

var greet = function(formatted) {
  return 'Hiya ' + formatted + '!';
};

var welcome = _.compose(greet, format);
welcome('curly');
// => 'Hiya Jerome!'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_createcallbackfuncidentity--thisarg--argcount"></a>`_.createCallback([func=identity], [thisArg], [argCount])`
<a href="#_createcallbackfuncidentity--thisarg--argcount">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5366 "View in source") [&#x24C9;][1]

Produces a callback bound to an optional `thisArg`. If `func` is a property name the created callback will return the property value for a given element. If `func` is an object the created callback will return `true` for elements that contain the equivalent object properties, otherwise it will return `false`.

#### Arguments
1. `[func=identity]` *(\*)*: The value to convert to a callback.
2. `[thisArg]` *(\*)*: The `this` binding of the created callback.
3. `[argCount]` *(number)*: The number of arguments the callback accepts.

#### Returns
*(Function)*: Returns a callback function.

#### Example
```js
var stooges = [
  { 'name': 'moe', 'age': 40 },
  { 'name': 'larry', 'age': 50 }
];

// wrap to create custom callback shorthands
_.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
  var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
  return !match ? func(callback, thisArg) : function(object) {
    return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
  };
});

_.filter(stooges, 'age__gt45');
// => [{ 'name': 'larry', 'age': 50 }]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_curryfunc--arityfunclength"></a>`_.curry(func, [arity=func.length])`
<a href="#_curryfunc--arityfunclength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5431 "View in source") [&#x24C9;][1]

Creates a function which accepts one or more arguments of `func` that when invoked either executes `func` returning its result, if all `func` arguments have been provided, or returns a function that accepts one or more of the remaining `func` arguments, and so on. The arity of `func` can be specified if `func.length` is not sufficient.

#### Arguments
1. `func` *(Function)*: The function to curry.
2. `[arity=func.length]` *(number)*: The arity of `func`.

#### Returns
*(Function)*: Returns the new curried function.

#### Example
```js
var curried = _.curry(function(a, b, c) {
  console.log(a + b + c);
});

curried(1)(2)(3);
// => 6

curried(1, 2)(3);
// => 6

curried(1, 2, 3);
// => 6
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_debouncefunc-wait--options--optionsmaxwait"></a>`_.debounce(func, wait, [options], [options.maxWait])`
<a href="#_debouncefunc-wait--options--optionsmaxwait">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5475 "View in source") [&#x24C9;][1]

Creates a function that will delay the execution of `func` until after `wait` milliseconds have elapsed since the last time it was invoked. Provide an options object to indicate that `func` should be invoked on the leading and/or trailing edge of the `wait` timeout. Subsequent calls to the debounced function will return the result of the last `func` call.

Note: If `leading` and `trailing` options are `true` `func` will be called on the trailing edge of the timeout only if the the debounced function is invoked more than once during the `wait` timeout.

#### Arguments
1. `func` *(Function)*: The function to debounce.
2. `wait` *(number)*: The number of milliseconds to delay.
3. `[options]` *(Object)*: The options object.
4. `[options.leading=false]` *(boolean)*: Specify execution on the leading edge of the timeout.
5. `[options.maxWait]` *(number)*: The maximum time `func` is allowed to be delayed before it's called.
6. `[options.trailing=true]` *(boolean)*: Specify execution on the trailing edge of the timeout.

#### Returns
*(Function)*: Returns the new debounced function.

#### Example
```js
// avoid costly calculations while the window size is in flux
var lazyLayout = _.debounce(calculateLayout, 150);
jQuery(window).on('resize', lazyLayout);

// execute `sendMail` when the click event is fired, debouncing subsequent calls
jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
});

// ensure `batchLog` is executed once after 1 second of debounced calls
var source = new EventSource('/stream');
source.addEventListener('message', _.debounce(batchLog, 250, {
  'maxWait': 1000
}, false);
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_deferfunc--arg"></a>`_.defer(func, [arg])`
<a href="#_deferfunc--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5576 "View in source") [&#x24C9;][1]

Defers executing the `func` function until the current call stack has cleared. Additional arguments will be provided to `func` when it is invoked.

#### Arguments
1. `func` *(Function)*: The function to defer.
2. `[arg]` *(...\*)*: Arguments to invoke the function with.

#### Returns
*(number)*: Returns the timer id.

#### Example
```js
_.defer(function() { console.log('deferred'); });
// returns from the function before 'deferred' is logged
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_delayfunc-wait--arg"></a>`_.delay(func, wait, [arg])`
<a href="#_delayfunc-wait--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5610 "View in source") [&#x24C9;][1]

Executes the `func` function after `wait` milliseconds. Additional arguments will be provided to `func` when it is invoked.

#### Arguments
1. `func` *(Function)*: The function to delay.
2. `wait` *(number)*: The number of milliseconds to delay execution.
3. `[arg]` *(...\*)*: Arguments to invoke the function with.

#### Returns
*(number)*: Returns the timer id.

#### Example
```js
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
// => 'logged later' (Appears after one second.)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_memoizefunc--resolver"></a>`_.memoize(func, [resolver])`
<a href="#_memoizefunc--resolver">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5652 "View in source") [&#x24C9;][1]

Creates a function that memoizes the result of `func`. If `resolver` is provided it will be used to determine the cache key for storing the result based on the arguments provided to the memoized function. By default, the first argument provided to the memoized function is used as the cache key. The `func` is executed with the `this` binding of the memoized function. The result cache is exposed as the `cache` property on the memoized function.

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

var data = {
  'moe': { 'name': 'moe', 'age': 40 },
  'curly': { 'name': 'curly', 'age': 60 }
};

// modifying the result cache
var stooge = _.memoize(function(name) { return data[name]; }, _.identity);
stooge('curly');
// => { 'name': 'curly', 'age': 60 }

stooge.cache.curly.name = 'jerome';
stooge('curly');
// => { 'name': 'jerome', 'age': 60 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_oncefunc"></a>`_.once(func)`
<a href="#_oncefunc">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5685 "View in source") [&#x24C9;][1]

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

### <a id="_partialfunc--arg"></a>`_.partial(func, [arg])`
<a href="#_partialfunc--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5723 "View in source") [&#x24C9;][1]

Creates a function that, when called, invokes `func` with any additional `partial` arguments prepended to those provided to the new function. This method is similar to `_.bind` except it does **not** alter the `this` binding.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[arg]` *(...\*)*: Arguments to be partially applied.

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

### <a id="_partialrightfunc--arg"></a>`_.partialRight(func, [arg])`
<a href="#_partialrightfunc--arg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5754 "View in source") [&#x24C9;][1]

This method is like `_.partial` except that `partial` arguments are appended to those provided to the new function.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[arg]` *(...\*)*: Arguments to be partially applied.

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

### <a id="_throttlefunc-wait--options"></a>`_.throttle(func, wait, [options])`
<a href="#_throttlefunc-wait--options">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5789 "View in source") [&#x24C9;][1]

Creates a function that, when executed, will only call the `func` function at most once per every `wait` milliseconds. Provide an options object to indicate that `func` should be invoked on the leading and/or trailing edge of the `wait` timeout. Subsequent calls to the throttled function will return the result of the last `func` call.

Note: If `leading` and `trailing` options are `true` `func` will be called on the trailing edge of the timeout only if the the throttled function is invoked more than once during the `wait` timeout.

#### Arguments
1. `func` *(Function)*: The function to throttle.
2. `wait` *(number)*: The number of milliseconds to throttle executions to.
3. `[options]` *(Object)*: The options object.
4. `[options.leading=true]` *(boolean)*: Specify execution on the leading edge of the timeout.
5. `[options.trailing=true]` *(boolean)*: Specify execution on the trailing edge of the timeout.

#### Returns
*(Function)*: Returns the new throttled function.

#### Example
```js
// avoid excessively updating the position while scrolling
var throttled = _.throttle(updatePosition, 100);
jQuery(window).on('scroll', throttled);

// execute `renewToken` when the click event is fired, but not more than once every 5 minutes
jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
  'trailing': false
}));
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_wrapvalue-wrapper"></a>`_.wrap(value, wrapper)`
<a href="#_wrapvalue-wrapper">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5831 "View in source") [&#x24C9;][1]

Creates a function that provides `value` to the wrapper function as its first argument. Additional arguments provided to the function are appended to those provided to the wrapper function. The wrapper is executed with the `this` binding of the created function.

#### Arguments
1. `value` *(\*)*: The value to wrap.
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

### <a id="_assignobject--source--callback--thisarg"></a>`_.assign(object, [source], [callback], [thisArg])`
<a href="#_assignobject--source--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L1968 "View in source") [&#x24C9;][1]

Assigns own enumerable properties of source object(s) to the destination object. Subsequent sources will overwrite property assignments of previous sources. If a callback is provided it will be executed to produce the assigned values. The callback is bound to `thisArg` and invoked with two arguments; *(objectValue, sourceValue)*.

#### Aliases
*_.extend*

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source]` *(...Object)*: The source objects.
3. `[callback]` *(Function)*: The function to customize assigning values.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_clonevalue--deepfalse--callback--thisarg"></a>`_.clone(value, [deep=false], [callback], [thisArg])`
<a href="#_clonevalue--deepfalse--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2021 "View in source") [&#x24C9;][1]

Creates a clone of `value`. If `deep` is `true` nested objects will also be cloned, otherwise they will be assigned by reference. If a callback is provided it will be executed to produce the cloned values. If the callback returns `undefined` cloning will be handled by the method instead. The callback is bound to `thisArg` and invoked with one argument; *(value)*.

#### Arguments
1. `value` *(\*)*: The value to clone.
2. `[deep=false]` *(boolean)*: Specify a deep clone.
3. `[callback]` *(Function)*: The function to customize cloning values.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the cloned value.

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

### <a id="_clonedeepvalue--callback--thisarg"></a>`_.cloneDeep(value, [callback], [thisArg])`
<a href="#_clonedeepvalue--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2073 "View in source") [&#x24C9;][1]

Creates a deep clone of `value`. If a callback is provided it will be executed to produce the cloned values. If the callback returns `undefined` cloning will be handled by the method instead. The callback is bound to `thisArg` and invoked with one argument; *(value)*.

Note: This method is loosely based on the structured clone algorithm. Functions and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and objects created by constructors other than `Object` are cloned to plain `Object` objects. See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.

#### Arguments
1. `value` *(\*)*: The value to deep clone.
2. `[callback]` *(Function)*: The function to customize cloning values.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the deep cloned value.

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
  return _.isElement(value) ? value.cloneNode(true) : undefined;
});

clone.node == view.node;
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_defaultsobject--source"></a>`_.defaults(object, [source])`
<a href="#_defaultsobject--source">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2097 "View in source") [&#x24C9;][1]

Assigns own enumerable properties of source object(s) to the destination object for all destination properties that resolve to `undefined`. Once a property is set, additional defaults of the same property will be ignored.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source]` *(...Object)*: The source objects.

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

### <a id="_findkeyobject--callbackidentity--thisarg"></a>`_.findKey(object, [callback=identity], [thisArg])`
<a href="#_findkeyobject--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2119 "View in source") [&#x24C9;][1]

This method is like `_.findIndex` except that it returns the key of the first element that passes the callback check, instead of the element itself.

#### Arguments
1. `object` *(Object)*: The object to search.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(string, undefined)*: Returns the key of the found element, else `undefined`.

#### Example
```js
_.findKey({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, function(num) {
  return num % 2 == 0;
});
// => 'b' (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_findlastkeyobject--callbackidentity--thisarg"></a>`_.findLastKey(object, [callback=identity], [thisArg])`
<a href="#_findlastkeyobject--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2151 "View in source") [&#x24C9;][1]

This method is like `_.findKey` except that it iterates over elements of a `collection` in the opposite order.

#### Arguments
1. `object` *(Object)*: The object to search.
2. `[callback=identity]` *(Function|Object|string)*: The function called per iteration. If a property name or object is provided it will be used to create a "_.pluck" or "_.where" style callback, respectively.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(string, undefined)*: Returns the key of the found element, else `undefined`.

#### Example
```js
_.findLastKey({ 'a': 1, 'b': 2, 'c': 3, 'd': 4 }, function(num) {
  return num % 2 == 1;
});
// => returns `c`, assuming `_.findKey` returns `a`
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forinobject--callbackidentity--thisarg"></a>`_.forIn(object, [callback=identity], [thisArg])`
<a href="#_forinobject--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2192 "View in source") [&#x24C9;][1]

Iterates over own and inherited enumerable properties of an object, executing the callback for each property. The callback is bound to `thisArg` and invoked with three arguments; *(value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  console.log('Woof, woof!');
};

_.forIn(new Dog('Dagny'), function(value, key) {
  console.log(key);
});
// => logs 'bark' and 'name' (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forinrightobject--callbackidentity--thisarg"></a>`_.forInRight(object, [callback=identity], [thisArg])`
<a href="#_forinrightobject--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2222 "View in source") [&#x24C9;][1]

This method is like `_.forIn` except that it iterates over elements of a `collection` in the opposite order.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  console.log('Woof, woof!');
};

_.forInRight(new Dog('Dagny'), function(value, key) {
  console.log(key);
});
// => logs 'name' and 'bark' assuming `_.forIn ` logs 'bark' and 'name'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forownobject--callbackidentity--thisarg"></a>`_.forOwn(object, [callback=identity], [thisArg])`
<a href="#_forownobject--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2260 "View in source") [&#x24C9;][1]

Iterates over own enumerable properties of an object, executing the callback for each property. The callback is bound to `thisArg` and invoked with three arguments; *(value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
_.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
  console.log(key);
});
// => logs '0', '1', and 'length' (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_forownrightobject--callbackidentity--thisarg"></a>`_.forOwnRight(object, [callback=identity], [thisArg])`
<a href="#_forownrightobject--callbackidentity--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2280 "View in source") [&#x24C9;][1]

This method is like `_.forOwn` except that it iterates over elements of a `collection` in the opposite order.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
_.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
  console.log(key);
});
// => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_functionsobject"></a>`_.functions(object)`
<a href="#_functionsobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2309 "View in source") [&#x24C9;][1]

Creates a sorted array of property names of all enumerable properties, own and inherited, of `object` that have function values.

#### Aliases
*_.methods*

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns an array of property names that have function values.

#### Example
```js
_.functions(_);
// => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_hasobject-property"></a>`_.has(object, property)`
<a href="#_hasobject-property">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2334 "View in source") [&#x24C9;][1]

Checks if the specified object `property` exists and is a direct property, instead of an inherited property.

#### Arguments
1. `object` *(Object)*: The object to check.
2. `property` *(string)*: The property to check for.

#### Returns
*(boolean)*: Returns `true` if key is a direct property, else `false`.

#### Example
```js
_.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_invertobject"></a>`_.invert(object)`
<a href="#_invertobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2351 "View in source") [&#x24C9;][1]

Creates an object composed of the inverted keys and values of the given object.

#### Arguments
1. `object` *(Object)*: The object to invert.

#### Returns
*(Object)*: Returns the created inverted object.

#### Example
```js
_.invert({ 'first': 'moe', 'second': 'larry' });
// => { 'moe': 'first', 'larry': 'second' }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isargumentsvalue"></a>`_.isArguments(value)`
<a href="#_isargumentsvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L1793 "View in source") [&#x24C9;][1]

Checks if `value` is an `arguments` object.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is an `arguments` object, else `false`.

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
<a href="#_isarrayvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L1822 "View in source") [&#x24C9;][1]

Checks if `value` is an array.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is an array, else `false`.

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
<a href="#_isbooleanvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2377 "View in source") [&#x24C9;][1]

Checks if `value` is a boolean value.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a boolean value, else `false`.

#### Example
```js
_.isBoolean(null);
// => false
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isdatevalue"></a>`_.isDate(value)`
<a href="#_isdatevalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2394 "View in source") [&#x24C9;][1]

Checks if `value` is a date.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a date, else `false`.

#### Example
```js
_.isDate(new Date);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_iselementvalue"></a>`_.isElement(value)`
<a href="#_iselementvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2411 "View in source") [&#x24C9;][1]

Checks if `value` is a DOM element.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a DOM element, else `false`.

#### Example
```js
_.isElement(document.body);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isemptyvalue"></a>`_.isEmpty(value)`
<a href="#_isemptyvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2436 "View in source") [&#x24C9;][1]

Checks if `value` is empty. Arrays, strings, or `arguments` objects with a length of `0` and objects with no own enumerable properties are considered "empty".

#### Arguments
1. `value` *(Array|Object|string)*: The value to inspect.

#### Returns
*(boolean)*: Returns `true` if the `value` is empty, else `false`.

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

### <a id="_isequala-b--callback--thisarg"></a>`_.isEqual(a, b, [callback], [thisArg])`
<a href="#_isequala-b--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2493 "View in source") [&#x24C9;][1]

Performs a deep comparison between two values to determine if they are equivalent to each other. If a callback is provided it will be executed to compare values. If the callback returns `undefined` comparisons will be handled by the method instead. The callback is bound to `thisArg` and invoked with two arguments; *(a, b)*.

#### Arguments
1. `a` *(\*)*: The value to compare.
2. `b` *(\*)*: The other value to compare.
3. `[callback]` *(Function)*: The function to customize comparing values.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(boolean)*: Returns `true` if the values are equivalent, else `false`.

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
<a href="#_isfinitevalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2525 "View in source") [&#x24C9;][1]

Checks if `value` is, or can be coerced to, a finite number.

Note: This is not the same as native `isFinite` which will return true for booleans and empty strings. See http://es5.github.io/#x15.1.2.5.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is finite, else `false`.

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
<a href="#_isfunctionvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2542 "View in source") [&#x24C9;][1]

Checks if `value` is a function.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a function, else `false`.

#### Example
```js
_.isFunction(_);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isnanvalue"></a>`_.isNaN(value)`
<a href="#_isnanvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2605 "View in source") [&#x24C9;][1]

Checks if `value` is `NaN`.

Note: This is not the same as native `isNaN` which will return `true` for `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is `NaN`, else `false`.

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
<a href="#_isnullvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2627 "View in source") [&#x24C9;][1]

Checks if `value` is `null`.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is `null`, else `false`.

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
<a href="#_isnumbervalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2646 "View in source") [&#x24C9;][1]

Checks if `value` is a number.

Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a number, else `false`.

#### Example
```js
_.isNumber(8.4 * 5);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isobjectvalue"></a>`_.isObject(value)`
<a href="#_isobjectvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2572 "View in source") [&#x24C9;][1]

Checks if `value` is the language type of Object. *(e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)*

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is an object, else `false`.

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
<a href="#_isplainobjectvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2674 "View in source") [&#x24C9;][1]

Checks if `value` is an object created by the `Object` constructor.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a plain object, else `false`.

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
<a href="#_isregexpvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2699 "View in source") [&#x24C9;][1]

Checks if `value` is a regular expression.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a regular expression, else `false`.

#### Example
```js
_.isRegExp(/moe/);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isstringvalue"></a>`_.isString(value)`
<a href="#_isstringvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2716 "View in source") [&#x24C9;][1]

Checks if `value` is a string.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is a string, else `false`.

#### Example
```js
_.isString('moe');
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_isundefinedvalue"></a>`_.isUndefined(value)`
<a href="#_isundefinedvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2733 "View in source") [&#x24C9;][1]

Checks if `value` is `undefined`.

#### Arguments
1. `value` *(\*)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if the `value` is `undefined`, else `false`.

#### Example
```js
_.isUndefined(void 0);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_keysobject"></a>`_.keys(object)`
<a href="#_keysobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L1856 "View in source") [&#x24C9;][1]

Creates an array composed of the own enumerable property names of an object.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns an array of property names.

#### Example
```js
_.keys({ 'one': 1, 'two': 2, 'three': 3 });
// => ['one', 'two', 'three'] (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_mergeobject--source--callback--thisarg"></a>`_.merge(object, [source], [callback], [thisArg])`
<a href="#_mergeobject--source--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2788 "View in source") [&#x24C9;][1]

Recursively merges own enumerable properties of the source object(s), that don't resolve to `undefined` into the destination object. Subsequent sources will overwrite property assignments of previous sources. If a callback is provided it will be executed to produce the merged values of the destination and source properties. If the callback returns `undefined` merging will be handled by the method instead. The callback is bound to `thisArg` and invoked with two arguments; *(objectValue, sourceValue)*.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[source]` *(...Object)*: The source objects.
3. `[callback]` *(Function)*: The function to customize merging properties.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_omitobject--callback--thisarg"></a>`_.omit(object, [callback], [thisArg])`
<a href="#_omitobject--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2844 "View in source") [&#x24C9;][1]

Creates a shallow clone of `object` excluding the specified properties. Property names may be specified as individual arguments or as arrays of property names. If a callback is provided it will be executed for each property of `object` omitting the properties the callback returns truey for. The callback is bound to `thisArg` and invoked with three arguments; *(value, key, object)*.

#### Arguments
1. `object` *(Object)*: The source object.
2. `[callback]` *(Function|...string|string[])*: The properties to omit or the function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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
<a href="#_pairsobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2879 "View in source") [&#x24C9;][1]

Creates a two dimensional array of an object's key-value pairs, i.e. `[[key1, value1], [key2, value2]]`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns new array of key-value pairs.

#### Example
```js
_.pairs({ 'moe': 30, 'larry': 40 });
// => [['moe', 30], ['larry', 40]] (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_pickobject--callback--thisarg"></a>`_.pick(object, [callback], [thisArg])`
<a href="#_pickobject--callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2919 "View in source") [&#x24C9;][1]

Creates a shallow clone of `object` composed of the specified properties. Property names may be specified as individual arguments or as arrays of property names. If a callback is provided it will be executed for each property of `object` picking the properties the callback returns truey for. The callback is bound to `thisArg` and invoked with three arguments; *(value, key, object)*.

#### Arguments
1. `object` *(Object)*: The source object.
2. `[callback]` *(Function|...string|string[])*: The function called per iteration or property names to pick, specified as individual property names or arrays of property names.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

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

### <a id="_transformcollection--callbackidentity--accumulator--thisarg"></a>`_.transform(collection, [callback=identity], [accumulator], [thisArg])`
<a href="#_transformcollection--callbackidentity--accumulator--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L2974 "View in source") [&#x24C9;][1]

An alternative to `_.reduce` this method transforms `object` to a new `accumulator` object which is the result of running each of its elements through a callback, with each callback execution potentially mutating the `accumulator` object. The callback is bound to `thisArg` and invoked with four arguments; *(accumulator, value, key, object)*. Callbacks may exit iteration early by explicitly returning `false`.

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[callback=identity]` *(Function)*: The function called per iteration.
3. `[accumulator]` *(\*)*: The custom accumulator value.
4. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(\*)*: Returns the accumulated value.

#### Example
```js
var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
  num *= num;
  if (num % 2) {
    return result.push(num) < 3;
  }
});
// => [1, 9, 25]

var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
  result[key] = num * 3;
});
// => { 'a': 3, 'b': 6, 'c': 9 }
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_valuesobject"></a>`_.values(object)`
<a href="#_valuesobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L3007 "View in source") [&#x24C9;][1]

Creates an array composed of the own enumerable property values of `object`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns an array of property values.

#### Example
```js
_.values({ 'one': 1, 'two': 2, 'three': 3 });
// => [1, 2, 3] (property order is not guaranteed across environments)
```

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `“Utilities” Methods`

<!-- div -->

### <a id="_escapestring"></a>`_.escape(string)`
<a href="#_escapestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5858 "View in source") [&#x24C9;][1]

Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their corresponding HTML entities.

#### Arguments
1. `string` *(string)*: The string to escape.

#### Returns
*(string)*: Returns the escaped string.

#### Example
```js
_.escape('Moe, Larry & Curly');
// => 'Moe, Larry &amp; Curly'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_identityvalue"></a>`_.identity(value)`
<a href="#_identityvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5876 "View in source") [&#x24C9;][1]

This method returns the first argument provided to it.

#### Arguments
1. `value` *(\*)*: Any value.

#### Returns
*(\*)*: Returns `value`.

#### Example
```js
var moe = { 'name': 'moe' };
moe === _.identity(moe);
// => true
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_mixinobject-object"></a>`_.mixin(object, object)`
<a href="#_mixinobject-object">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5903 "View in source") [&#x24C9;][1]

Adds function properties of a source object to the `lodash` function and chainable wrapper.

#### Arguments
1. `object` *(Object)*: The object of function properties to add to `lodash`.
2. `object` *(Object)*: The object of function properties to add to `lodash`.

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
<a href="#_noconflict">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5944 "View in source") [&#x24C9;][1]

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

### <a id="_parseintvalue--radix"></a>`_.parseInt(value, [radix])`
<a href="#_parseintvalue--radix">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L5968 "View in source") [&#x24C9;][1]

Converts the given value into an integer of the specified radix. If `radix` is `undefined` or `0` a `radix` of `10` is used unless the `value` is a hexadecimal, in which case a `radix` of `16` is used.

Note: This method avoids differences in native ES3 and ES5 `parseInt` implementations. See http://es5.github.io/#E.

#### Arguments
1. `value` *(string)*: The value to parse.
2. `[radix]` *(number)*: The radix used to interpret the value to parse.

#### Returns
*(number)*: Returns the new integer value.

#### Example
```js
_.parseInt('08');
// => 8
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_randommin0--max1--floatingfalse"></a>`_.random([min=0], [max=1], [floating=false])`
<a href="#_randommin0--max1--floatingfalse">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6000 "View in source") [&#x24C9;][1]

Produces a random number between `min` and `max` *(inclusive)*. If only one argument is provided a number between `0` and the given number will be returned. If `floating` is truey or either `min` or `max` are floats a floating-point number will be returned instead of an integer.

#### Arguments
1. `[min=0]` *(number)*: The minimum possible value.
2. `[max=1]` *(number)*: The maximum possible value.
3. `[floating=false]` *(boolean)*: Specify returning a floating-point number.

#### Returns
*(number)*: Returns a random number.

#### Example
```js
_.random(0, 5);
// => an integer between 0 and 5

_.random(5);
// => also an integer between 0 and 5

_.random(5, true);
// => a floating-point number between 0 and 5

_.random(1.2, 5.2);
// => a floating-point number between 1.2 and 5.2
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_resultobject-property"></a>`_.result(object, property)`
<a href="#_resultobject-property">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6057 "View in source") [&#x24C9;][1]

Resolves the value of `property` on `object`. If `property` is a function it will be invoked with the `this` binding of `object` and its result returned, else the property value is returned. If `object` is falsey then `undefined` is returned.

#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `property` *(string)*: The property to get the value of.

#### Returns
*(\*)*: Returns the resolved value.

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

### <a id="_runincontextcontextroot"></a>`_.runInContext([context=root])`
<a href="#_runincontextcontextroot">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L471 "View in source") [&#x24C9;][1]

Create a new `lodash` function using the given context object.

#### Arguments
1. `[context=root]` *(Object)*: The context object.

#### Returns
*(Function)*: Returns the `lodash` function.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatetext-data--options--optionsescape--optionsevaluate--optionsimports--optionsinterpolate--sourceurl--variable"></a>`_.template(text, data, [options], [options.escape], [options.evaluate], [options.imports], [options.interpolate], [sourceURL], [variable])`
<a href="#_templatetext-data--options--optionsescape--optionsevaluate--optionsimports--optionsinterpolate--sourceurl--variable">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6150 "View in source") [&#x24C9;][1]

A micro-templating method that handles arbitrary delimiters, preserves whitespace, and correctly escapes quotes within interpolated code.

Note: In the development build, `_.template` utilizes sourceURLs for easier debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl

For more information on precompiling templates see:<br>
http://lodash.com/#custom-builds

For more information on Chrome extension sandboxes see:<br>
http://developer.chrome.com/stable/extensions/sandboxingEval.html

#### Arguments
1. `text` *(string)*: The template text.
2. `data` *(Object)*: The data object used to populate the text.
3. `[options]` *(Object)*: The options object.
4. `[options.escape]` *(RegExp)*: The "escape" delimiter.
5. `[options.evaluate]` *(RegExp)*: The "evaluate" delimiter.
6. `[options.imports]` *(Object)*: An object to import into the template as local variables.
7. `[options.interpolate]` *(RegExp)*: The "interpolate" delimiter.
8. `[sourceURL]` *(string)*: The sourceURL of the template's compiled source.
9. `[variable]` *(string)*: The data object variable name.

#### Returns
*(Function, string)*: Returns a compiled function when no `data` object  is given, else it returns the interpolated text.

#### Example
```js
// using the "interpolate" delimiter to create a compiled template
var compiled = _.template('hello <%= name %>');
compiled({ 'name': 'moe' });
// => 'hello moe'

// using the "escape" delimiter to escape HTML in data property values
_.template('<b><%- value %></b>', { 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'

// using the "evaluate" delimiter to generate HTML
var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
_.template(list, { 'people': ['moe', 'larry'] });
// => '<li>moe</li><li>larry</li>'

// using the ES6 delimiter as an alternative to the default "interpolate" delimiter
_.template('hello ${ name }', { 'name': 'curly' });
// => 'hello curly'

// using the internal `print` function in "evaluate" delimiters
_.template('<% print("hello " + name); %>!', { 'name': 'larry' });
// => 'hello larry!'

// using a custom template delimiters
_.templateSettings = {
  'interpolate': /{{([\s\S]+?)}}/g
};

_.template('hello {{ name }}!', { 'name': 'mustache' });
// => 'hello mustache!'

// using the `imports` option to import jQuery
var list = '<% $.each(people, function(name) { %><li><%- name %></li><% }); %>';
_.template(list, { 'people': ['moe', 'larry'] }, { 'imports': { '$': jQuery } });
// => '<li>moe</li><li>larry</li>'

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

### <a id="_timesn-callback--thisarg"></a>`_.times(n, callback, [thisArg])`
<a href="#_timesn-callback--thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6273 "View in source") [&#x24C9;][1]

Executes the callback `n` times, returning an array of the results of each callback execution. The callback is bound to `thisArg` and invoked with one argument; *(index)*.

#### Arguments
1. `n` *(number)*: The number of times to execute the callback.
2. `callback` *(Function)*: The function called per iteration.
3. `[thisArg]` *(\*)*: The `this` binding of `callback`.

#### Returns
*(Array)*: Returns an array of the results of each `callback` execution.

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
<a href="#_unescapestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6300 "View in source") [&#x24C9;][1]

The inverse of `_.escape` this method converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their corresponding characters.

#### Arguments
1. `string` *(string)*: The string to unescape.

#### Returns
*(string)*: Returns the unescaped string.

#### Example
```js
_.unescape('Moe, Larry &amp; Curly');
// => 'Moe, Larry & Curly'
```

* * *

<!-- /div -->


<!-- div -->

### <a id="_uniqueidprefix"></a>`_.uniqueId([prefix])`
<a href="#_uniqueidprefix">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6320 "View in source") [&#x24C9;][1]

Generates a unique ID. If `prefix` is provided the ID will be appended to it.

#### Arguments
1. `[prefix]` *(string)*: The value to prefix the ID with.

#### Returns
*(string)*: Returns the unique ID.

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
<a href="#_templatesettingsimports_">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L880 "View in source") [&#x24C9;][1]

A reference to the `lodash` function.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Properties`

<!-- div -->

### <a id="_version"></a>`_.VERSION`
<a href="#_version">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L6641 "View in source") [&#x24C9;][1]

*(string)*: The semantic version number.

* * *

<!-- /div -->


<!-- div -->

### <a id="_support"></a>`_.support`
<a href="#_support">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L681 "View in source") [&#x24C9;][1]

*(Object)*: An object used to flag environments features.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportargsclass"></a>`_.support.argsClass`
<a href="#_supportargsclass">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L698 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if an `arguments` object's [[Class]] is resolvable *(all but Firefox < `4`, IE < `9`)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportargsobject"></a>`_.support.argsObject`
<a href="#_supportargsobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L706 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `arguments` objects are `Object` objects *(all but Narwhal and Opera < `10.5`)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportenumerrorprops"></a>`_.support.enumErrorProps`
<a href="#_supportenumerrorprops">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L715 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `name` or `message` properties of `Error.prototype` are enumerable by default. *(IE < `9`, Safari < `5.1`)*

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportenumprototypes"></a>`_.support.enumPrototypes`
<a href="#_supportenumprototypes">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L728 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `prototype` properties are enumerable by default.

Firefox < `3.6`, Opera > `9.50` - Opera < `11.60`, and Safari < `5.1` *(if the prototype or a property on the prototype has been set)* incorrectly sets a function's `prototype` property [[Enumerable]] value to `true`.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportfastbind"></a>`_.support.fastBind`
<a href="#_supportfastbind">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L736 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `Function#bind` exists and is inferred to be fast *(all but V8)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportfuncdecomp"></a>`_.support.funcDecomp`
<a href="#_supportfuncdecomp">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L745 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if functions can be decompiled by `Function#toString` *(all but PS3 and older Opera mobile browsers & avoided in Windows `8` apps)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportfuncnames"></a>`_.support.funcNames`
<a href="#_supportfuncnames">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L753 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `Function#name` is supported *(all but IE)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportnonenumargs"></a>`_.support.nonEnumArgs`
<a href="#_supportnonenumargs">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L762 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `arguments` object indexes are non-enumerable *(Firefox < `4`, IE < `9`, PhantomJS, Safari < `5.1`)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportnonenumshadows"></a>`_.support.nonEnumShadows`
<a href="#_supportnonenumshadows">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L773 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if properties shadowing those on `Object.prototype` are non-enumerable.

In IE < `9` an objects own properties, shadowing non-enumerable ones, are made non-enumerable as well *(a.k.a the JScript [[DontEnum]] bug)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportownlast"></a>`_.support.ownLast`
<a href="#_supportownlast">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L781 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if own properties are iterated after inherited properties *(all but IE < `9`)*.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportspliceobjects"></a>`_.support.spliceObjects`
<a href="#_supportspliceobjects">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L795 "View in source") [&#x24C9;][1]

*(boolean)*: Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.

Firefox < `10`, IE compatibility mode, and IE < `9` have buggy Array `shift()` and `splice()` functions that fail to remove the last element, `value[0]`, of array-like objects even though the `length` property is set to `0`. The `shift()` method is buggy in IE `8` compatibility mode, while `splice()` is buggy regardless of mode in IE < `9` and buggy in compatibility mode in IE `9`.

* * *

<!-- /div -->


<!-- div -->

### <a id="_supportunindexedchars"></a>`_.support.unindexedChars`
<a href="#_supportunindexedchars">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L806 "View in source") [&#x24C9;][1]

*(boolean)*: Detect lack of support for accessing string characters by index.

IE < `8` can't access characters by index and IE `8` can only access characters by index on string literals.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettings"></a>`_.templateSettings`
<a href="#_templatesettings">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L832 "View in source") [&#x24C9;][1]

*(Object)*: By default, the template delimiters used by Lo-Dash are similar to those in embedded Ruby *(ERB)*. Change the following template settings to use alternative delimiters.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsescape"></a>`_.templateSettings.escape`
<a href="#_templatesettingsescape">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L840 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect `data` property values to be HTML-escaped.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsevaluate"></a>`_.templateSettings.evaluate`
<a href="#_templatesettingsevaluate">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L848 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect code to be evaluated.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsinterpolate"></a>`_.templateSettings.interpolate`
<a href="#_templatesettingsinterpolate">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L856 "View in source") [&#x24C9;][1]

*(RegExp)*: Used to detect `data` property values to inject.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsvariable"></a>`_.templateSettings.variable`
<a href="#_templatesettingsvariable">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L864 "View in source") [&#x24C9;][1]

*(string)*: Used to reference the data object in the template text.

* * *

<!-- /div -->


<!-- div -->

### <a id="_templatesettingsimports"></a>`_.templateSettings.imports`
<a href="#_templatesettingsimports">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/2.2.1/lodash.js#L872 "View in source") [&#x24C9;][1]

*(Object)*: Used to import variables into the compiled template.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Arrays "Jump back to the TOC."
