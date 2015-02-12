# <a href="https://lodash.com/">lodash</a> <span>v3.2.0</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Array`
* <a href="#_chunkarray-size1">`_.chunk`</a>
* <a href="#_compactarray">`_.compact`</a>
* <a href="#_differencearray-values">`_.difference`</a>
* <a href="#_droparray-n1">`_.drop`</a>
* <a href="#_droprightarray-n1">`_.dropRight`</a>
* <a href="#_droprightwhilearray-predicate_identity-thisarg">`_.dropRightWhile`</a>
* <a href="#_dropwhilearray-predicate_identity-thisarg">`_.dropWhile`</a>
* <a href="#_fillarray-value-start0-endarraylength">`_.fill`</a>
* <a href="#_findindexarray-predicate_identity-thisarg">`_.findIndex`</a>
* <a href="#_findlastindexarray-predicate_identity-thisarg">`_.findLastIndex`</a>
* <a href="#_firstarray">`_.first`</a>
* <a href="#_flattenarray-isdeep">`_.flatten`</a>
* <a href="#_flattendeeparray">`_.flattenDeep`</a>
* <a href="#_firstarray" class="alias">`_.head` -> `first`</a>
* <a href="#_indexofarray-value-fromindex0">`_.indexOf`</a>
* <a href="#_initialarray">`_.initial`</a>
* <a href="#_intersectionarrays">`_.intersection`</a>
* <a href="#_lastarray">`_.last`</a>
* <a href="#_lastindexofarray-value-fromindexarraylength-1">`_.lastIndexOf`</a>
* <a href="#_zipobjectprops-values" class="alias">`_.object` -> `zipObject`</a>
* <a href="#_pullarray-values">`_.pull`</a>
* <a href="#_pullatarray-indexes">`_.pullAt`</a>
* <a href="#_removearray-predicate_identity-thisarg">`_.remove`</a>
* <a href="#_restarray">`_.rest`</a>
* <a href="#_slicearray-start0-endarraylength">`_.slice`</a>
* <a href="#_sortedindexarray-value-iteratee_identity-thisarg">`_.sortedIndex`</a>
* <a href="#_sortedlastindexarray-value-iteratee_identity-thisarg">`_.sortedLastIndex`</a>
* <a href="#_restarray" class="alias">`_.tail` -> `rest`</a>
* <a href="#_takearray-n1">`_.take`</a>
* <a href="#_takerightarray-n1">`_.takeRight`</a>
* <a href="#_takerightwhilearray-predicate_identity-thisarg">`_.takeRightWhile`</a>
* <a href="#_takewhilearray-predicate_identity-thisarg">`_.takeWhile`</a>
* <a href="#_unionarrays">`_.union`</a>
* <a href="#_uniqarray-issorted-iteratee-thisarg">`_.uniq`</a>
* <a href="#_uniqarray-issorted-iteratee-thisarg" class="alias">`_.unique` -> `uniq`</a>
* <a href="#_unziparray">`_.unzip`</a>
* <a href="#_withoutarray-values">`_.without`</a>
* <a href="#_xorarrays">`_.xor`</a>
* <a href="#_ziparrays">`_.zip`</a>
* <a href="#_zipobjectprops-values">`_.zipObject`</a>

<!-- /div -->

<!-- div -->

## `Chain`
* <a href="#_value">`_`</a>
* <a href="#_chainvalue">`_.chain`</a>
* <a href="#_tapvalue-interceptor-thisarg">`_.tap`</a>
* <a href="#_thruvalue-interceptor-thisarg">`_.thru`</a>
* <a href="#_prototypechain">`_.prototype.chain`</a>
* <a href="#_prototypecommit">`_.prototype.commit`</a>
* <a href="#_prototypeplant">`_.prototype.plant`</a>
* <a href="#_prototypereverse">`_.prototype.reverse`</a>
* <a href="#_prototypevalue" class="alias">`_.prototype.run` -> `value`</a>
* <a href="#_prototypevalue" class="alias">`_.prototype.toJSON` -> `value`</a>
* <a href="#_prototypetostring">`_.prototype.toString`</a>
* <a href="#_prototypevalue">`_.prototype.value`</a>
* <a href="#_prototypevalue" class="alias">`_.prototype.valueOf` -> `value`</a>

<!-- /div -->

<!-- div -->

## `Collection`
* <a href="#_everycollection-predicate_identity-thisarg" class="alias">`_.all` -> `every`</a>
* <a href="#_somecollection-predicate_identity-thisarg" class="alias">`_.any` -> `some`</a>
* <a href="#_atcollection-props">`_.at`</a>
* <a href="#_mapcollection-iteratee_identity-thisarg" class="alias">`_.collect` -> `map`</a>
* <a href="#_includescollection-target-fromindex0" class="alias">`_.contains` -> `includes`</a>
* <a href="#_countbycollection-iteratee_identity-thisarg">`_.countBy`</a>
* <a href="#_findcollection-predicate_identity-thisarg" class="alias">`_.detect` -> `find`</a>
* <a href="#_foreachcollection-iteratee_identity-thisarg" class="alias">`_.each` -> `forEach`</a>
* <a href="#_foreachrightcollection-iteratee_identity-thisarg" class="alias">`_.eachRight` -> `forEachRight`</a>
* <a href="#_everycollection-predicate_identity-thisarg">`_.every`</a>
* <a href="#_filtercollection-predicate_identity-thisarg">`_.filter`</a>
* <a href="#_findcollection-predicate_identity-thisarg">`_.find`</a>
* <a href="#_findlastcollection-predicate_identity-thisarg">`_.findLast`</a>
* <a href="#_findwherecollection-source">`_.findWhere`</a>
* <a href="#_reducecollection-iteratee_identity-accumulator-thisarg" class="alias">`_.foldl` -> `reduce`</a>
* <a href="#_reducerightcollection-iteratee_identity-accumulator-thisarg" class="alias">`_.foldr` -> `reduceRight`</a>
* <a href="#_foreachcollection-iteratee_identity-thisarg">`_.forEach`</a>
* <a href="#_foreachrightcollection-iteratee_identity-thisarg">`_.forEachRight`</a>
* <a href="#_groupbycollection-iteratee_identity-thisarg">`_.groupBy`</a>
* <a href="#_includescollection-target-fromindex0" class="alias">`_.include` -> `includes`</a>
* <a href="#_includescollection-target-fromindex0">`_.includes`</a>
* <a href="#_indexbycollection-iteratee_identity-thisarg">`_.indexBy`</a>
* <a href="#_reducecollection-iteratee_identity-accumulator-thisarg" class="alias">`_.inject` -> `reduce`</a>
* <a href="#_invokecollection-methodname-args">`_.invoke`</a>
* <a href="#_mapcollection-iteratee_identity-thisarg">`_.map`</a>
* <a href="#_maxcollection-iteratee-thisarg">`_.max`</a>
* <a href="#_mincollection-iteratee-thisarg">`_.min`</a>
* <a href="#_partitioncollection-predicate_identity-thisarg">`_.partition`</a>
* <a href="#_pluckcollection-key">`_.pluck`</a>
* <a href="#_reducecollection-iteratee_identity-accumulator-thisarg">`_.reduce`</a>
* <a href="#_reducerightcollection-iteratee_identity-accumulator-thisarg">`_.reduceRight`</a>
* <a href="#_rejectcollection-predicate_identity-thisarg">`_.reject`</a>
* <a href="#_samplecollection-n">`_.sample`</a>
* <a href="#_filtercollection-predicate_identity-thisarg" class="alias">`_.select` -> `filter`</a>
* <a href="#_shufflecollection">`_.shuffle`</a>
* <a href="#_sizecollection">`_.size`</a>
* <a href="#_somecollection-predicate_identity-thisarg">`_.some`</a>
* <a href="#_sortbycollection-iteratee_identity-thisarg">`_.sortBy`</a>
* <a href="#_sortbyallcollection-props">`_.sortByAll`</a>
* <a href="#_wherecollection-source">`_.where`</a>

<!-- /div -->

<!-- div -->

## `Date`
* <a href="#_now">`_.now`</a>

<!-- /div -->

<!-- div -->

## `Function`
* <a href="#_aftern-func">`_.after`</a>
* <a href="#_aryfunc-nfunclength">`_.ary`</a>
* <a href="#_flowrightfuncs" class="alias">`_.backflow` -> `flowRight`</a>
* <a href="#_beforen-func">`_.before`</a>
* <a href="#_bindfunc-thisarg-args">`_.bind`</a>
* <a href="#_bindallobject-methodnames">`_.bindAll`</a>
* <a href="#_bindkeyobject-key-args">`_.bindKey`</a>
* <a href="#_flowrightfuncs" class="alias">`_.compose` -> `flowRight`</a>
* <a href="#_curryfunc-arityfunclength">`_.curry`</a>
* <a href="#_curryrightfunc-arityfunclength">`_.curryRight`</a>
* <a href="#_debouncefunc-wait-options">`_.debounce`</a>
* <a href="#_deferfunc-args">`_.defer`</a>
* <a href="#_delayfunc-wait-args">`_.delay`</a>
* <a href="#_flowfuncs">`_.flow`</a>
* <a href="#_flowrightfuncs">`_.flowRight`</a>
* <a href="#_memoizefunc-resolver">`_.memoize`</a>
* <a href="#_negatepredicate">`_.negate`</a>
* <a href="#_oncefunc">`_.once`</a>
* <a href="#_partialfunc-args">`_.partial`</a>
* <a href="#_partialrightfunc-args">`_.partialRight`</a>
* <a href="#_reargfunc-indexes">`_.rearg`</a>
* <a href="#_spreadfunc">`_.spread`</a>
* <a href="#_throttlefunc-wait-options">`_.throttle`</a>
* <a href="#_wrapvalue-wrapper">`_.wrap`</a>

<!-- /div -->

<!-- div -->

## `Lang`
* <a href="#_clonevalue-isdeep-customizer-thisarg">`_.clone`</a>
* <a href="#_clonedeepvalue-customizer-thisarg">`_.cloneDeep`</a>
* <a href="#_isargumentsvalue">`_.isArguments`</a>
* <a href="#_isarrayvalue">`_.isArray`</a>
* <a href="#_isbooleanvalue">`_.isBoolean`</a>
* <a href="#_isdatevalue">`_.isDate`</a>
* <a href="#_iselementvalue">`_.isElement`</a>
* <a href="#_isemptyvalue">`_.isEmpty`</a>
* <a href="#_isequalvalue-other-customizer-thisarg">`_.isEqual`</a>
* <a href="#_iserrorvalue">`_.isError`</a>
* <a href="#_isfinitevalue">`_.isFinite`</a>
* <a href="#_isfunctionvalue">`_.isFunction`</a>
* <a href="#_ismatchobject-source-customizer-thisarg">`_.isMatch`</a>
* <a href="#_isnanvalue">`_.isNaN`</a>
* <a href="#_isnativevalue">`_.isNative`</a>
* <a href="#_isnullvalue">`_.isNull`</a>
* <a href="#_isnumbervalue">`_.isNumber`</a>
* <a href="#_isobjectvalue">`_.isObject`</a>
* <a href="#_isplainobjectvalue">`_.isPlainObject`</a>
* <a href="#_isregexpvalue">`_.isRegExp`</a>
* <a href="#_isstringvalue">`_.isString`</a>
* <a href="#_istypedarrayvalue">`_.isTypedArray`</a>
* <a href="#_isundefinedvalue">`_.isUndefined`</a>
* <a href="#_toarrayvalue">`_.toArray`</a>
* <a href="#_toplainobjectvalue">`_.toPlainObject`</a>

<!-- /div -->

<!-- div -->

## `Number`
* <a href="#_randommin0-max1-floating">`_.random`</a>

<!-- /div -->

<!-- div -->

## `Object`
* <a href="#_assignobject-sources-customizer-thisarg">`_.assign`</a>
* <a href="#_createprototype-properties">`_.create`</a>
* <a href="#_defaultsobject-sources">`_.defaults`</a>
* <a href="#_assignobject-sources-customizer-thisarg" class="alias">`_.extend` -> `assign`</a>
* <a href="#_findkeyobject-predicate_identity-thisarg">`_.findKey`</a>
* <a href="#_findlastkeyobject-predicate_identity-thisarg">`_.findLastKey`</a>
* <a href="#_forinobject-iteratee_identity-thisarg">`_.forIn`</a>
* <a href="#_forinrightobject-iteratee_identity-thisarg">`_.forInRight`</a>
* <a href="#_forownobject-iteratee_identity-thisarg">`_.forOwn`</a>
* <a href="#_forownrightobject-iteratee_identity-thisarg">`_.forOwnRight`</a>
* <a href="#_functionsobject">`_.functions`</a>
* <a href="#_hasobject-key">`_.has`</a>
* <a href="#_invertobject-multivalue">`_.invert`</a>
* <a href="#_keysobject">`_.keys`</a>
* <a href="#_keysinobject">`_.keysIn`</a>
* <a href="#_mapvaluesobject-iteratee_identity-thisarg">`_.mapValues`</a>
* <a href="#_mergeobject-sources-customizer-thisarg">`_.merge`</a>
* <a href="#_functionsobject" class="alias">`_.methods` -> `functions`</a>
* <a href="#_omitobject-predicate-thisarg">`_.omit`</a>
* <a href="#_pairsobject">`_.pairs`</a>
* <a href="#_pickobject-predicate-thisarg">`_.pick`</a>
* <a href="#_resultobject-key-defaultvalue">`_.result`</a>
* <a href="#_transformobject-iteratee_identity-accumulator-thisarg">`_.transform`</a>
* <a href="#_valuesobject">`_.values`</a>
* <a href="#_valuesinobject">`_.valuesIn`</a>

<!-- /div -->

<!-- div -->

## `String`
* <a href="#_camelcasestring">`_.camelCase`</a>
* <a href="#_capitalizestring">`_.capitalize`</a>
* <a href="#_deburrstring">`_.deburr`</a>
* <a href="#_endswithstring-target-positionstringlength">`_.endsWith`</a>
* <a href="#_escapestring">`_.escape`</a>
* <a href="#_escaperegexpstring">`_.escapeRegExp`</a>
* <a href="#_kebabcasestring">`_.kebabCase`</a>
* <a href="#_padstring-length0-chars">`_.pad`</a>
* <a href="#_padleftstring-length0-chars">`_.padLeft`</a>
* <a href="#_padrightstring-length0-chars">`_.padRight`</a>
* <a href="#_parseintstring-radix">`_.parseInt`</a>
* <a href="#_repeatstring-n0">`_.repeat`</a>
* <a href="#_snakecasestring">`_.snakeCase`</a>
* <a href="#_startcasestring">`_.startCase`</a>
* <a href="#_startswithstring-target-position0">`_.startsWith`</a>
* <a href="#_templatestring-options">`_.template`</a>
* <a href="#_trimstring-charswhitespace">`_.trim`</a>
* <a href="#_trimleftstring-charswhitespace">`_.trimLeft`</a>
* <a href="#_trimrightstring-charswhitespace">`_.trimRight`</a>
* <a href="#_truncstring-options-optionslength30-optionsomission-optionsseparator">`_.trunc`</a>
* <a href="#_unescapestring">`_.unescape`</a>
* <a href="#_wordsstring-pattern">`_.words`</a>

<!-- /div -->

<!-- div -->

## `Utility`
* <a href="#_attemptfunc">`_.attempt`</a>
* <a href="#_callbackfunc_identity-thisarg">`_.callback`</a>
* <a href="#_constantvalue">`_.constant`</a>
* <a href="#_identityvalue">`_.identity`</a>
* <a href="#_callbackfunc_identity-thisarg" class="alias">`_.iteratee` -> `callback`</a>
* <a href="#_matchessource">`_.matches`</a>
* <a href="#_matchespropertykey-value">`_.matchesProperty`</a>
* <a href="#_mixinobjectthis-source-options">`_.mixin`</a>
* <a href="#_noconflict">`_.noConflict`</a>
* <a href="#_noop">`_.noop`</a>
* <a href="#_propertykey">`_.property`</a>
* <a href="#_propertyofobject">`_.propertyOf`</a>
* <a href="#_rangestart0-end-step1">`_.range`</a>
* <a href="#_runincontextcontextroot">`_.runInContext`</a>
* <a href="#_timesn-iteratee_identity-thisarg">`_.times`</a>
* <a href="#_uniqueidprefix">`_.uniqueId`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#_templatesettingsimports_">`_.templateSettings.imports._`</a>

<!-- /div -->

<!-- div -->

## `Properties`
* <a href="#_version">`_.VERSION`</a>
* <a href="#_support">`_.support`</a>
* <a href="#_supportargstag">`_.support.argsTag`</a>
* <a href="#_supportenumerrorprops">`_.support.enumErrorProps`</a>
* <a href="#_supportenumprototypes">`_.support.enumPrototypes`</a>
* <a href="#_supportfuncdecomp">`_.support.funcDecomp`</a>
* <a href="#_supportfuncnames">`_.support.funcNames`</a>
* <a href="#_supportnodetag">`_.support.nodeTag`</a>
* <a href="#_supportnonenumshadows">`_.support.nonEnumShadows`</a>
* <a href="#_supportnonenumstrings">`_.support.nonEnumStrings`</a>
* <a href="#_supportownlast">`_.support.ownLast`</a>
* <a href="#_supportspliceobjects">`_.support.spliceObjects`</a>
* <a href="#_supportunindexedchars">`_.support.unindexedChars`</a>
* <a href="#_templatesettings">`_.templateSettings`</a>
* <a href="#_templatesettingsescape">`_.templateSettings.escape`</a>
* <a href="#_templatesettingsevaluate">`_.templateSettings.evaluate`</a>
* <a href="#_templatesettingsimports">`_.templateSettings.imports`</a>
* <a href="#_templatesettingsinterpolate">`_.templateSettings.interpolate`</a>
* <a href="#_templatesettingsvariable">`_.templateSettings.variable`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Array” Methods`

<!-- div -->

### <a id="_chunkarray-size1"></a>`_.chunk(array, [size=1])`
<a href="#_chunkarray-size1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4167 "View in source") [&#x24C9;][1]

Creates an array of elements split into groups the length of `size`.
If `collection` can't be split evenly, the final chunk will be the remaining
elements.

#### Arguments
1. `array` *(Array)*: The array to process.
2. `[size=1]` *(number)*: The length of each chunk.

#### Returns
*(Array)*:  Returns the new array containing chunks.

#### Example
```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_compactarray"></a>`_.compact(array)`
<a href="#_compactarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4198 "View in source") [&#x24C9;][1]

Creates an array with all falsey values removed. The values `false`, `null`,
`0`, `""`, `undefined`, and `NaN` are falsey.

#### Arguments
1. `array` *(Array)*: The array to compact.

#### Returns
*(Array)*:  Returns the new array of filtered values.

#### Example
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_differencearray-values"></a>`_.difference(array, [values])`
<a href="#_differencearray-values">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4233 "View in source") [&#x24C9;][1]

Creates an array excluding all values of the provided arrays using
`SameValueZero` for equality comparisons.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[values]` *(...Array)*: The arrays of values to exclude.

#### Returns
*(Array)*:  Returns the new array of filtered values.

#### Example
```js
_.difference([1, 2, 3], [5, 2, 10]);
// => [1, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_droparray-n1"></a>`_.drop(array, [n=1])`
<a href="#_droparray-n1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4270 "View in source") [&#x24C9;][1]

Creates a slice of `array` with `n` elements dropped from the beginning.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to drop.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.drop([1, 2, 3]);
// => [2, 3]

_.drop([1, 2, 3], 2);
// => [3]

_.drop([1, 2, 3], 5);
// => []

_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_droprightarray-n1"></a>`_.dropRight(array, [n=1])`
<a href="#_droprightarray-n1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4305 "View in source") [&#x24C9;][1]

Creates a slice of `array` with `n` elements dropped from the end.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to drop.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.dropRight([1, 2, 3]);
// => [1, 2]

_.dropRight([1, 2, 3], 2);
// => [1]

_.dropRight([1, 2, 3], 5);
// => []

_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_droprightwhilearray-predicate_identity-thisarg"></a>`_.dropRightWhile(array, [predicate=_.identity], [thisArg])`
<a href="#_droprightwhilearray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4364 "View in source") [&#x24C9;][1]

Creates a slice of `array` excluding elements dropped from the end.
Elements are dropped until `predicate` returns falsey. The predicate is
bound to `thisArg` and invoked with three arguments; (value, index, array).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that match the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.dropRightWhile([1, 2, 3], function(n) { return n > 1; });
// => [1]

var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

// using the `_.matches` callback shorthand
_.pluck(_.dropRightWhile(users, { 'user': pebbles, 'active': false }), 'user');
// => ['barney', 'fred']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.dropRightWhile(users, 'active', false), 'user');
// => ['barney']

// using the `_.property` callback shorthand
_.pluck(_.dropRightWhile(users, 'active'), 'user');
// => ['barney', 'fred', 'pebbles']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_dropwhilearray-predicate_identity-thisarg"></a>`_.dropWhile(array, [predicate=_.identity], [thisArg])`
<a href="#_dropwhilearray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4421 "View in source") [&#x24C9;][1]

Creates a slice of `array` excluding elements dropped from the beginning.
Elements are dropped until `predicate` returns falsey. The predicate is
bound to `thisArg` and invoked with three arguments; (value, index, array).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.dropWhile([1, 2, 3], function(n) { return n < 3; });
// => [3]

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

// using the `_.matches` callback shorthand
_.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
// => ['fred', 'pebbles']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.dropWhile(users, 'active', false), 'user');
// => ['pebbles']

// using the `_.property` callback shorthand
_.pluck(_.dropWhile(users, 'active'), 'user');
// => ['barney', 'fred', 'pebbles']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_fillarray-value-start0-endarraylength"></a>`_.fill(array, value, [start=0], [end=array.length])`
<a href="#_fillarray-value-start0-endarraylength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4447 "View in source") [&#x24C9;][1]

Fills elements of `array` with `value` from `start` up to, but not
including, `end`.
<br>
<br>
**Note:** This method mutates `array`.

#### Arguments
1. `array` *(Array)*: The array to fill.
2. `value` *(&#42;)*: The value to fill `array` with.
3. `[start=0]` *(number)*: The start position.
4. `[end=array.length]` *(number)*: The end position.

#### Returns
*(Array)*:  Returns `array`.

* * *

<!-- /div -->

<!-- div -->

### <a id="_findindexarray-predicate_identity-thisarg"></a>`_.findIndex(array, [predicate=_.identity], [thisArg])`
<a href="#_findindexarray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4505 "View in source") [&#x24C9;][1]

This method is like `_.find` except that it returns the index of the first
element `predicate` returns truthy for, instead of the element itself.
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(number)*:  Returns the index of the found element, else `-1`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.findIndex(users, function(chr) { return chr.user == 'barney'; });
// => 0

// using the `_.matches` callback shorthand
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1

// using the `_.matchesProperty` callback shorthand
_.findIndex(users, 'active', false);
// => 0

// using the `_.property` callback shorthand
_.findIndex(users, 'active');
// => 2
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_findlastindexarray-predicate_identity-thisarg"></a>`_.findLastIndex(array, [predicate=_.identity], [thisArg])`
<a href="#_findlastindexarray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4564 "View in source") [&#x24C9;][1]

This method is like `_.findIndex` except that it iterates over elements
of `collection` from right to left.
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(number)*:  Returns the index of the found element, else `-1`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.findLastIndex(users, function(chr) { return chr.user == 'pebbles'; });
// => 2

// using the `_.matches` callback shorthand
_.findLastIndex(users, { user': 'barney', 'active': true });
// => 0

// using the `_.matchesProperty` callback shorthand
_.findLastIndex(users, 'active', false);
// => 1

// using the `_.property` callback shorthand
_.findLastIndex(users, 'active');
// => 0
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_firstarray"></a>`_.first(array)`
<a href="#_firstarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4592 "View in source") [&#x24C9;][1]

Gets the first element of `array`.

#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(&#42;)*:  Returns the first element of `array`.

#### Example
```js
_.first([1, 2, 3]);
// => 1

_.first([]);
// => undefined
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_flattenarray-isdeep"></a>`_.flatten(array, [isDeep])`
<a href="#_flattenarray-isdeep">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4616 "View in source") [&#x24C9;][1]

Flattens a nested array. If `isDeep` is `true` the array is recursively
flattened, otherwise it is only flattened a single level.

#### Arguments
1. `array` *(Array)*: The array to flatten.
2. `[isDeep]` *(boolean)*: Specify a deep flatten.

#### Returns
*(Array)*:  Returns the new flattened array.

#### Example
```js
_.flatten([1, [2], [3, [[4]]]]);
// => [1, 2, 3, [[4]]];

// using `isDeep`
_.flatten([1, [2], [3, [[4]]]], true);
// => [1, 2, 3, 4];
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_flattendeeparray"></a>`_.flattenDeep(array)`
<a href="#_flattendeeparray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4637 "View in source") [&#x24C9;][1]

Recursively flattens a nested array.

#### Arguments
1. `array` *(Array)*: The array to recursively flatten.

#### Returns
*(Array)*:  Returns the new flattened array.

#### Example
```js
_.flattenDeep([1, [2], [3, [[4]]]]);
// => [1, 2, 3, 4];
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_indexofarray-value-fromindex0"></a>`_.indexOf(array, value, [fromIndex=0])`
<a href="#_indexofarray-value-fromindex0">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4674 "View in source") [&#x24C9;][1]

Gets the index at which the first occurrence of `value` is found in `array`
using `SameValueZero` for equality comparisons. If `fromIndex` is negative,
it is used as the offset from the end of `array`. If `array` is sorted
providing `true` for `fromIndex` performs a faster binary search.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(&#42;)*: The value to search for.
3. `[fromIndex=0]` *(boolean|number)*: The index to search from or `true` to perform a binary search on a sorted array.

#### Returns
*(number)*:  Returns the index of the matched value, else `-1`.

#### Example
```js
_.indexOf([1, 2, 3, 1, 2, 3], 2);
// => 1

// using `fromIndex`
_.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
// => 4

// performing a binary search
_.indexOf([4, 4, 5, 5, 6, 6], 5, true);
// => 2
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_initialarray"></a>`_.initial(array)`
<a href="#_initialarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4703 "View in source") [&#x24C9;][1]

Gets all but the last element of `array`.

#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.initial([1, 2, 3]);
// => [1, 2]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_intersectionarrays"></a>`_.intersection([arrays])`
<a href="#_intersectionarrays">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4726 "View in source") [&#x24C9;][1]

Creates an array of unique values in all provided arrays using `SameValueZero`
for equality comparisons.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*:  Returns the new array of shared values.

#### Example
```js
_.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
// => [1, 2]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_lastarray"></a>`_.last(array)`
<a href="#_lastarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4781 "View in source") [&#x24C9;][1]

Gets the last element of `array`.

#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(&#42;)*:  Returns the last element of `array`.

#### Example
```js
_.last([1, 2, 3]);
// => 3
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_lastindexofarray-value-fromindexarraylength-1"></a>`_.lastIndexOf(array, value, [fromIndex=array.length-1])`
<a href="#_lastindexofarray-value-fromindexarraylength-1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4811 "View in source") [&#x24C9;][1]

This method is like `_.indexOf` except that it iterates over elements of
`array` from right to left.

#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(&#42;)*: The value to search for.
3. `[fromIndex=array.length-1]` *(boolean|number)*: The index to search from or `true` to perform a binary search on a sorted array.

#### Returns
*(number)*:  Returns the index of the matched value, else `-1`.

#### Example
```js
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
// => 4

// using `fromIndex`
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
// => 1

// performing a binary search
_.lastIndexOf([4, 4, 5, 5, 6, 6], 5, true);
// => 3
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_pullarray-values"></a>`_.pull(array, [values])`
<a href="#_pullarray-values">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4858 "View in source") [&#x24C9;][1]

Removes all provided values from `array` using `SameValueZero` for equality
comparisons.
<br>
<br>
**Notes:**
<br>
* Unlike `_.without`, this method mutates `array`.
<br>
* `SameValueZero` comparisons are like strict equality comparisons, e.g. `===`,
except that `NaN` matches `NaN`. See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[values]` *(...&#42;)*: The values to remove.

#### Returns
*(Array)*:  Returns `array`.

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

### <a id="_pullatarray-indexes"></a>`_.pullAt(array, [indexes])`
<a href="#_pullatarray-indexes">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4903 "View in source") [&#x24C9;][1]

Removes elements from `array` corresponding to the given indexes and returns
an array of the removed elements. Indexes may be specified as an array of
indexes or as individual arguments.
<br>
<br>
**Note:** Unlike `_.at`, this method mutates `array`.

#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[indexes]` *(...(number|number&#91;&#93;)*: The indexes of elements to remove, specified as individual indexes or arrays of indexes.

#### Returns
*(Array)*:  Returns the new array of removed elements.

#### Example
```js
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, [1, 3]);

console.log(array);
// => [5, 15]

console.log(evens);
// => [10, 20]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_removearray-predicate_identity-thisarg"></a>`_.remove(array, [predicate=_.identity], [thisArg])`
<a href="#_removearray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4944 "View in source") [&#x24C9;][1]

Removes all elements from `array` that `predicate` returns truthy for
and returns an array of the removed elements. The predicate is bound to
`thisArg` and invoked with three arguments; (value, index, array).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.
<br>
<br>
**Note:** Unlike `_.filter`, this method mutates `array`.

#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the new array of removed elements.

#### Example
```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) { return n % 2 == 0; });

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_restarray"></a>`_.rest(array)`
<a href="#_restarray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4975 "View in source") [&#x24C9;][1]

Gets all but the first element of `array`.

#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.rest([1, 2, 3]);
// => [2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_slicearray-start0-endarraylength"></a>`_.slice(array, [start=0], [end=array.length])`
<a href="#_slicearray-start0-endarraylength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L4993 "View in source") [&#x24C9;][1]

Creates a slice of `array` from `start` up to, but not including, `end`.
<br>
<br>
**Note:** This function is used instead of `Array#slice` to support node
lists in IE < 9 and to ensure dense arrays are returned.

#### Arguments
1. `array` *(Array)*: The array to slice.
2. `[start=0]` *(number)*: The start position.
3. `[end=array.length]` *(number)*: The end position.

#### Returns
*(Array)*:  Returns the slice of `array`.

* * *

<!-- /div -->

<!-- div -->

### <a id="_sortedindexarray-value-iteratee_identity-thisarg"></a>`_.sortedIndex(array, value, [iteratee=_.identity], [thisArg])`
<a href="#_sortedindexarray-value-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5053 "View in source") [&#x24C9;][1]

Uses a binary search to determine the lowest index at which `value` should
be inserted into `array` in order to maintain its sort order. If an iteratee
function is provided it is invoked for `value` and each element of `array`
to compute their sort ranking. The iteratee is bound to `thisArg` and
invoked with one argument; (value).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The sorted array to inspect.
2. `value` *(&#42;)*: The value to evaluate.
3. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
4. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(number)*:  Returns the index at which `value` should be inserted
into `array`.

#### Example
```js
_.sortedIndex([30, 50], 40);
// => 1

_.sortedIndex([4, 4, 5, 5, 6, 6], 5);
// => 2

var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };

// using an iteratee function
_.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
  return this.data[word];
}, dict);
// => 1

// using the `_.property` callback shorthand
_.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
// => 1
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_sortedlastindexarray-value-iteratee_identity-thisarg"></a>`_.sortedLastIndex(array, value, [iteratee=_.identity], [thisArg])`
<a href="#_sortedlastindexarray-value-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5080 "View in source") [&#x24C9;][1]

This method is like `_.sortedIndex` except that it returns the highest
index at which `value` should be inserted into `array` in order to
maintain its sort order.

#### Arguments
1. `array` *(Array)*: The sorted array to inspect.
2. `value` *(&#42;)*: The value to evaluate.
3. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
4. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(number)*:  Returns the index at which `value` should be inserted
into `array`.

#### Example
```js
_.sortedLastIndex([4, 4, 5, 5, 6, 6], 5);
// => 4
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_takearray-n1"></a>`_.take(array, [n=1])`
<a href="#_takearray-n1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5111 "View in source") [&#x24C9;][1]

Creates a slice of `array` with `n` elements taken from the beginning.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to take.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.take([1, 2, 3]);
// => [1]

_.take([1, 2, 3], 2);
// => [1, 2]

_.take([1, 2, 3], 5);
// => [1, 2, 3]

_.take([1, 2, 3], 0);
// => []
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_takerightarray-n1"></a>`_.takeRight(array, [n=1])`
<a href="#_takerightarray-n1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5146 "View in source") [&#x24C9;][1]

Creates a slice of `array` with `n` elements taken from the end.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to take.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.takeRight([1, 2, 3]);
// => [3]

_.takeRight([1, 2, 3], 2);
// => [2, 3]

_.takeRight([1, 2, 3], 5);
// => [1, 2, 3]

_.takeRight([1, 2, 3], 0);
// => []
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_takerightwhilearray-predicate_identity-thisarg"></a>`_.takeRightWhile(array, [predicate=_.identity], [thisArg])`
<a href="#_takerightwhilearray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5205 "View in source") [&#x24C9;][1]

Creates a slice of `array` with elements taken from the end. Elements are
taken until `predicate` returns falsey. The predicate is bound to `thisArg`
and invoked with three arguments; (value, index, array).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.takeRightWhile([1, 2, 3], function(n) { return n > 1; });
// => [2, 3]

var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

// using the `_.matches` callback shorthand
_.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
// => ['pebbles']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.takeRightWhile(users, 'active', false), 'user');
// => ['fred', 'pebbles']

// using the `_.property` callback shorthand
_.pluck(_.takeRightWhile(users, 'active'), 'user');
// => []
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_takewhilearray-predicate_identity-thisarg"></a>`_.takeWhile(array, [predicate=_.identity], [thisArg])`
<a href="#_takewhilearray-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5262 "View in source") [&#x24C9;][1]

Creates a slice of `array` with elements taken from the beginning. Elements
are taken until `predicate` returns falsey. The predicate is bound to
`thisArg` and invoked with three arguments; (value, index, array).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the slice of `array`.

#### Example
```js
_.takeWhile([1, 2, 3], function(n) { return n < 3; });
// => [1, 2]

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];

// using the `_.matches` callback shorthand
_.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
// => ['barney']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.takeWhile(users, 'active', false), 'user');
// => ['barney', 'fred']

// using the `_.property` callback shorthand
_.pluck(_.takeWhile(users, 'active'), 'user');
// => []
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_unionarrays"></a>`_.union([arrays])`
<a href="#_unionarrays">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5292 "View in source") [&#x24C9;][1]

Creates an array of unique values, in order, of the provided arrays using
`SameValueZero` for equality comparisons.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*:  Returns the new array of combined values.

#### Example
```js
_.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
// => [1, 2, 3, 5, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_uniqarray-issorted-iteratee-thisarg"></a>`_.uniq(array, [isSorted], [iteratee], [thisArg])`
<a href="#_uniqarray-issorted-iteratee-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5346 "View in source") [&#x24C9;][1]

Creates a duplicate-value-free version of an array using `SameValueZero`
for equality comparisons. Providing `true` for `isSorted` performs a faster
search algorithm for sorted arrays. If an iteratee function is provided it
is invoked for each value in the array to generate the criterion by which
uniqueness is computed. The `iteratee` is bound to `thisArg` and invoked
with three arguments; (value, index, array).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[isSorted]` *(boolean)*: Specify the array is sorted.
3. `[iteratee]` *(Function|Object|string)*: The function invoked per iteration.
4. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Array)*:  Returns the new duplicate-value-free array.

#### Example
```js
_.uniq([1, 2, 1]);
// => [1, 2]

// using `isSorted`
_.uniq([1, 1, 2], true);
// => [1, 2]

// using an iteratee function
_.uniq([1, 2.5, 1.5, 2], function(n) { return this.floor(n); }, Math);
// => [1, 2.5]

// using the `_.property` callback shorthand
_.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_unziparray"></a>`_.unzip(array)`
<a href="#_unziparray">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5384 "View in source") [&#x24C9;][1]

This method is like `_.zip` except that it accepts an array of grouped
elements and creates an array regrouping the elements to their pre-`_.zip`
configuration.

#### Arguments
1. `array` *(Array)*: The array of grouped elements to process.

#### Returns
*(Array)*:  Returns the new array of regrouped elements.

#### Example
```js
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]

_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_withoutarray-values"></a>`_.without(array, [values])`
<a href="#_withoutarray-values">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5415 "View in source") [&#x24C9;][1]

Creates an array excluding all provided values using `SameValueZero` for
equality comparisons.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `array` *(Array)*: The array to filter.
2. `[values]` *(...&#42;)*: The values to exclude.

#### Returns
*(Array)*:  Returns the new array of filtered values.

#### Example
```js
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
// => [2, 3, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_xorarrays"></a>`_.xor([arrays])`
<a href="#_xorarrays">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5437 "View in source") [&#x24C9;][1]

Creates an array that is the symmetric difference of the provided arrays.
See [Wikipedia](https://en.wikipedia.org/wiki/Symmetric_difference) for
more details.

#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*:  Returns the new array of values.

#### Example
```js
_.xor([1, 2, 3], [5, 2, 1, 4]);
// => [3, 5, 4]

_.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
// => [1, 4, 5]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_ziparrays"></a>`_.zip([arrays])`
<a href="#_ziparrays">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5467 "View in source") [&#x24C9;][1]

Creates an array of grouped elements, the first of which contains the first
elements of the given arrays, the second of which contains the second elements
of the given arrays, and so on.

#### Arguments
1. `[arrays]` *(...Array)*: The arrays to process.

#### Returns
*(Array)*:  Returns the new array of grouped elements.

#### Example
```js
_.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_zipobjectprops-values"></a>`_.zipObject(props, [values=[]])`
<a href="#_zipobjectprops-values">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5494 "View in source") [&#x24C9;][1]

Creates an object composed from arrays of property names and values. Provide
either a single two dimensional array, e.g. `[[key1, value1], [key2, value2]]`
or two arrays, one of property names and one of corresponding values.

#### Arguments
1. `props` *(Array)*: The property names.
2. `[values=[]]` *(Array)*: The property values.

#### Returns
*(Object)*:  Returns the new object.

#### Example
```js
_.zipObject(['fred', 'barney'], [30, 40]);
// => { 'fred': 30, 'barney': 40 }
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Chain” Methods`

<!-- div -->

### <a id="_value"></a>`._(value)`
<a href="#_value">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L920 "View in source") [&#x24C9;][1]

Creates a `lodash` object which wraps `value` to enable implicit chaining.
Methods that operate on and return arrays, collections, and functions can
be chained together. Methods that return a boolean or single value will
automatically end the chain returning the unwrapped value. Explicit chaining
may be enabled using `_.chain`. The execution of chained methods is lazy,
that is, execution is deferred until `_#value` is implicitly or explicitly
called.
<br>
<br>
Lazy evaluation allows several methods to support shortcut fusion. Shortcut
fusion is an optimization that merges iteratees to avoid creating intermediate
arrays and reduce the number of iteratee executions.
<br>
<br>
Chaining is supported in custom builds as long as the `_#value` method is
directly or indirectly included in the build.
<br>
<br>
In addition to lodash methods, wrappers also have the following `Array` methods:<br>
`concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
and `unshift`
<br>
<br>
The wrapper methods that support shortcut fusion are:<br>
`compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
`first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
`slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
and `where`
<br>
<br>
The chainable wrapper methods are:<br>
`after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
`callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
`countBy`, `create`, `curry`, `debounce`, `defaults`, `defer`, `delay`,
`difference`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `fill`,
`filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`, `forEach`,
`forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `functions`,
`groupBy`, `indexBy`, `initial`, `intersection`, `invert`, `invoke`, `keys`,
`keysIn`, `map`, `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`,
`mixin`, `negate`, `noop`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
`partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
`pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `reverse`,
`shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`, `splice`, `spread`,
`take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
`thru`, `times`, `toArray`, `toPlainObject`, `transform`, `union`, `uniq`,
`unshift`, `unzip`, `values`, `valuesIn`, `where`, `without`, `wrap`, `xor`,
`zip`, and `zipObject`
<br>
<br>
The wrapper methods that are **not** chainable by default are:<br>
`attempt`, `camelCase`, `capitalize`, `clone`, `cloneDeep`, `deburr`,
`endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
`findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`, `has`,
`identity`, `includes`, `indexOf`, `isArguments`, `isArray`, `isBoolean`,
`isDate`, `isElement`, `isEmpty`, `isEqual`, `isError`, `isFinite`,
`isFunction`, `isMatch`, `isNative`, `isNaN`, `isNull`, `isNumber`,
`isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`,
`isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `max`, `min`,
`noConflict`, `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`,
`random`, `reduce`, `reduceRight`, `repeat`, `result`, `runInContext`,
`shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`,
`startCase`, `startsWith`, `template`, `trim`, `trimLeft`, `trimRight`,
`trunc`, `unescape`, `uniqueId`, `value`, and `words`
<br>
<br>
The wrapper method `sample` will return a wrapped value when `n` is provided,
otherwise an unwrapped value is returned.

#### Arguments
1. `value` *(&#42;)*: The value to wrap in a `lodash` instance.

#### Returns
*(Object)*:  Returns the new `lodash` wrapper instance.

#### Example
```js
var wrapped = _([1, 2, 3]);

// returns an unwrapped value
wrapped.reduce(function(sum, n) { return sum + n; });
// => 6

// returns a wrapped value
var squares = wrapped.map(function(n) { return n * n; });

_.isArray(squares);
// => false

_.isArray(squares.value());
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_chainvalue"></a>`_.chain(value)`
<a href="#_chainvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5539 "View in source") [&#x24C9;][1]

Creates a `lodash` object that wraps `value` with explicit method
chaining enabled.

#### Arguments
1. `value` *(&#42;)*: The value to wrap.

#### Returns
*(Object)*:  Returns the new `lodash` wrapper instance.

#### Example
```js
var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];

var youngest = _.chain(users)
  .sortBy('age')
  .map(function(chr) { return chr.user + ' is ' + chr.age; })
  .first()
  .value();
// => 'pebbles is 1'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_tapvalue-interceptor-thisarg"></a>`_.tap(value, interceptor, [thisArg])`
<a href="#_tapvalue-interceptor-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5566 "View in source") [&#x24C9;][1]

This method invokes `interceptor` and returns `value`. The interceptor is
bound to `thisArg` and invoked with one argument; (value). The purpose of
this method is to "tap into" a method chain in order to perform operations
on intermediate results within the chain.

#### Arguments
1. `value` *(&#42;)*: The value to provide to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.
3. `[thisArg]` *(&#42;)*: The `this` binding of `interceptor`.

#### Returns
*(&#42;)*:  Returns `value`.

#### Example
```js
_([1, 2, 3])
 .tap(function(array) { array.pop(); })
 .reverse()
 .value();
// => [2, 1]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_thruvalue-interceptor-thisarg"></a>`_.thru(value, interceptor, [thisArg])`
<a href="#_thruvalue-interceptor-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5589 "View in source") [&#x24C9;][1]

This method is like `_.tap` except that it returns the result of `interceptor`.

#### Arguments
1. `value` *(&#42;)*: The value to provide to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.
3. `[thisArg]` *(&#42;)*: The `this` binding of `interceptor`.

#### Returns
*(&#42;)*:  Returns the result of `interceptor`.

#### Example
```js
_([1, 2, 3])
 .last()
 .thru(function(value) { return [value]; })
 .value();
// => [3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_prototypechain"></a>`_.prototype.chain()`
<a href="#_prototypechain">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5618 "View in source") [&#x24C9;][1]

Enables explicit method chaining on the wrapper object.

#### Returns
*(Object)*:  Returns the new `lodash` wrapper instance.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

// without explicit chaining
_(users).first();
// => { 'user': 'barney', 'age': 36 }

// with explicit chaining
_(users).chain()
  .first()
  .pick('user')
  .value();
// => { 'user': 'barney' }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_prototypecommit"></a>`_.prototype.commit()`
<a href="#_prototypecommit">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5647 "View in source") [&#x24C9;][1]

Executes the chained sequence and returns the wrapped result.

#### Returns
*(Object)*:  Returns the new `lodash` wrapper instance.

#### Example
```js
var array = [1, 2];
var wrapper = _(array).push(3);

console.log(array);
// => [1, 2]

wrapper = wrapper.commit();
console.log(array);
// => [1, 2, 3]

wrapper.last();
// => 3

console.log(array);
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_prototypeplant"></a>`_.prototype.plant()`
<a href="#_prototypeplant">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5674 "View in source") [&#x24C9;][1]

Creates a clone of the chained sequence planting `value` as the wrapped value.

#### Returns
*(Object)*:  Returns the new `lodash` wrapper instance.

#### Example
```js
var array = [1, 2];
var wrapper = _(array).map(function(value) {
  return Math.pow(value, 2);
});

var other = [3, 4];
var otherWrapper = wrapper.plant(other);

otherWrapper.value();
// => [9, 16]

wrapper.value();
// => [1, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_prototypereverse"></a>`_.prototype.reverse()`
<a href="#_prototypereverse">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5712 "View in source") [&#x24C9;][1]

Reverses the wrapped array so the first element becomes the last, the
second element becomes the second to last, and so on.
<br>
<br>
**Note:** This method mutates the wrapped array.

#### Returns
*(Object)*:  Returns the new reversed `lodash` wrapper instance.

#### Example
```js
var array = [1, 2, 3];

_(array).reverse().value()
// => [3, 2, 1]

console.log(array);
// => [3, 2, 1]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_prototypetostring"></a>`_.prototype.toString()`
<a href="#_prototypetostring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5737 "View in source") [&#x24C9;][1]

Produces the result of coercing the unwrapped value to a string.

#### Returns
*(string)*:  Returns the coerced string value.

#### Example
```js
_([1, 2, 3]).toString();
// => '1,2,3'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_prototypevalue"></a>`_.prototype.value()`
<a href="#_prototypevalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5754 "View in source") [&#x24C9;][1]

Executes the chained sequence to extract the unwrapped value.

#### Returns
*(&#42;)*:  Returns the resolved unwrapped value.

#### Example
```js
_([1, 2, 3]).value();
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Collection” Methods`

<!-- div -->

### <a id="_atcollection-props"></a>`_.at(collection, [props])`
<a href="#_atcollection-props">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5780 "View in source") [&#x24C9;][1]

Creates an array of elements corresponding to the given keys, or indexes,
of `collection`. Keys may be specified as individual arguments or as arrays
of keys.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[props]` *(...(number|number&#91;&#93;|string|string&#91;&#93;)*: The property names or indexes of elements to pick, specified individually or in arrays.

#### Returns
*(Array)*:  Returns the new array of picked elements.

#### Example
```js
_.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
// => ['a', 'c', 'e']

_.at(['fred', 'barney', 'pebbles'], 0, 2);
// => ['fred', 'pebbles']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_countbycollection-iteratee_identity-thisarg"></a>`_.countBy(collection, [iteratee=_.identity], [thisArg])`
<a href="#_countbycollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5876 "View in source") [&#x24C9;][1]

Creates an object composed of keys generated from the results of running
each element of `collection` through `iteratee`. The corresponding value
of each key is the number of times the key was returned by `iteratee`.
The `iteratee` is bound to `thisArg` and invoked with three arguments;
(value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns the composed aggregate object.

#### Example
```js
_.countBy([4.3, 6.1, 6.4], function(n) { return Math.floor(n); });
// => { '4': 1, '6': 2 }

_.countBy([4.3, 6.1, 6.4], function(n) { return this.floor(n); }, Math);
// => { '4': 1, '6': 2 }

_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_everycollection-predicate_identity-thisarg"></a>`_.every(collection, [predicate=_.identity], [thisArg])`
<a href="#_everycollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5928 "View in source") [&#x24C9;][1]

Checks if `predicate` returns truthy for **all** elements of `collection`.
The predicate is bound to `thisArg` and invoked with three arguments;
(value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(boolean)*:  Returns `true` if all elements pass the predicate check,
else `false`.

#### Example
```js
_.every([true, 1, null, 'yes'], Boolean);
// => false

var users = [
  { 'user': 'barney', 'active': false },
  { 'user': 'fred',   'active': false }
];

// using the `_.matches` callback shorthand
_.every(users, { 'user': 'barney', 'active': false });
// => false

// using the `_.matchesProperty` callback shorthand
_.every(users, 'active', false);
// => true

// using the `_.property` callback shorthand
_.every(users, 'active');
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_filtercollection-predicate_identity-thisarg"></a>`_.filter(collection, [predicate=_.identity], [thisArg])`
<a href="#_filtercollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5983 "View in source") [&#x24C9;][1]

Iterates over elements of `collection`, returning an array of all elements
`predicate` returns truthy for. The predicate is bound to `thisArg` and
invoked with three arguments; (value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the new filtered array.

#### Example
```js
var evens = _.filter([1, 2, 3, 4], function(n) { return n % 2 == 0; });
// => [2, 4]

var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// using the `_.matches` callback shorthand
_.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
// => ['barney']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.filter(users, 'active', false), 'user');
// => ['fred']

// using the `_.property` callback shorthand
_.pluck(_.filter(users, 'active'), 'user');
// => ['barney']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_findcollection-predicate_identity-thisarg"></a>`_.find(collection, [predicate=_.identity], [thisArg])`
<a href="#_findcollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6037 "View in source") [&#x24C9;][1]

Iterates over elements of `collection`, returning the first element
`predicate` returns truthy for. The predicate is bound to `thisArg` and
invoked with three arguments; (value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to search.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(&#42;)*:  Returns the matched element, else `undefined`.

#### Example
```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

_.result(_.find(users, function(chr) { return chr.age < 40; }), 'user');
// => 'barney'

// using the `_.matches` callback shorthand
_.result(_.find(users, { 'age': 1, 'active': true }), 'user');
// => 'pebbles'

// using the `_.matchesProperty` callback shorthand
_.result(_.find(users, 'active', false), 'user');
// => 'fred'

// using the `_.property` callback shorthand
_.result(_.find(users, 'active'), 'user');
// => 'barney'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_findlastcollection-predicate_identity-thisarg"></a>`_.findLast(collection, [predicate=_.identity], [thisArg])`
<a href="#_findlastcollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6063 "View in source") [&#x24C9;][1]

This method is like `_.find` except that it iterates over elements of
`collection` from right to left.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to search.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(&#42;)*:  Returns the matched element, else `undefined`.

#### Example
```js
_.findLast([1, 2, 3, 4], function(n) { return n % 2 == 1; });
// => 3
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_findwherecollection-source"></a>`_.findWhere(collection, source)`
<a href="#_findwherecollection-source">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6097 "View in source") [&#x24C9;][1]

Performs a deep comparison between each element in `collection` and the
source object, returning the first element that has equivalent property
values.
<br>
<br>
**Note:** This method supports comparing arrays, booleans, `Date` objects,
numbers, `Object` objects, regexes, and strings. Objects are compared by
their own, not inherited, enumerable properties. For comparing a single
own or inherited property value see `_.matchesProperty`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to search.
2. `source` *(Object)*: The object of property values to match.

#### Returns
*(&#42;)*:  Returns the matched element, else `undefined`.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

_.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
// => 'barney'

_.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
// => 'fred'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_foreachcollection-iteratee_identity-thisarg"></a>`_.forEach(collection, [iteratee=_.identity], [thisArg])`
<a href="#_foreachcollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6127 "View in source") [&#x24C9;][1]

Iterates over elements of `collection` invoking `iteratee` for each element.
The `iteratee` is bound to `thisArg` and invoked with three arguments;
(value, index|key, collection). Iterator functions may exit iteration early
by explicitly returning `false`.
<br>
<br>
**Note:** As with other "Collections" methods, objects with a `length` property
are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
may be used for object iteration.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Array|Object|string)*:  Returns `collection`.

#### Example
```js
_([1, 2, 3]).forEach(function(n) { console.log(n); }).value();
// => logs each value from left to right and returns the array

_.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(n, key) { console.log(n, key); });
// => logs each value-key pair and returns the object (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_foreachrightcollection-iteratee_identity-thisarg"></a>`_.forEachRight(collection, [iteratee=_.identity], [thisArg])`
<a href="#_foreachrightcollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6150 "View in source") [&#x24C9;][1]

This method is like `_.forEach` except that it iterates over elements of
`collection` from right to left.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Array|Object|string)*:  Returns `collection`.

#### Example
```js
_([1, 2, 3]).forEachRight(function(n) { console.log(n); }).join(',');
// => logs each value from right to left and returns the array
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_groupbycollection-iteratee_identity-thisarg"></a>`_.groupBy(collection, [iteratee=_.identity], [thisArg])`
<a href="#_groupbycollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6194 "View in source") [&#x24C9;][1]

Creates an object composed of keys generated from the results of running
each element of `collection` through `iteratee`. The corresponding value
of each key is an array of the elements responsible for generating the key.
The `iteratee` is bound to `thisArg` and invoked with three arguments;
(value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns the composed aggregate object.

#### Example
```js
_.groupBy([4.2, 6.1, 6.4], function(n) { return Math.floor(n); });
// => { '4': [4.2], '6': [6.1, 6.4] }

_.groupBy([4.2, 6.1, 6.4], function(n) { return this.floor(n); }, Math);
// => { '4': [4.2], '6': [6.1, 6.4] }

// using the `_.property` callback shorthand
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_includescollection-target-fromindex0"></a>`_.includes(collection, target, [fromIndex=0])`
<a href="#_includescollection-target-fromindex0">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L5820 "View in source") [&#x24C9;][1]

Checks if `value` is in `collection` using `SameValueZero` for equality
comparisons. If `fromIndex` is negative, it is used as the offset from
the end of `collection`.
<br>
<br>
**Note:** `SameValueZero` comparisons are like strict equality comparisons,
e.g. `===`, except that `NaN` matches `NaN`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
for more details.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to search.
2. `target` *(&#42;)*: The value to search for.
3. `[fromIndex=0]` *(number)*: The index to search from.

#### Returns
*(boolean)*:  Returns `true` if a matching element is found, else `false`.

#### Example
```js
_.includes([1, 2, 3], 1);
// => true

_.includes([1, 2, 3], 1, 2);
// => false

_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
// => true

_.includes('pebbles', 'eb');
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_indexbycollection-iteratee_identity-thisarg"></a>`_.indexBy(collection, [iteratee=_.identity], [thisArg])`
<a href="#_indexbycollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6244 "View in source") [&#x24C9;][1]

Creates an object composed of keys generated from the results of running
each element of `collection` through `iteratee`. The corresponding value
of each key is the last element responsible for generating the key. The
iteratee function is bound to `thisArg` and invoked with three arguments;
(value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns the composed aggregate object.

#### Example
```js
var keyData = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];

_.indexBy(keyData, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }

_.indexBy(keyData, function(object) { return String.fromCharCode(object.code); });
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

_.indexBy(keyData, function(object) { return this.fromCharCode(object.code); }, String);
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_invokecollection-methodname-args"></a>`_.invoke(collection, methodName, [args])`
<a href="#_invokecollection-methodname-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6270 "View in source") [&#x24C9;][1]

Invokes the method named by `methodName` on each element in `collection`,
returning an array of the results of each invoked method. Any additional
arguments are provided to each invoked method. If `methodName` is a function
it is invoked for, and `this` bound to, each element in `collection`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `methodName` *(Function|string)*: The name of the method to invoke or the function invoked per iteration.
3. `[args]` *(...&#42;)*: The arguments to invoke the method with.

#### Returns
*(Array)*:  Returns the array of results.

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

### <a id="_mapcollection-iteratee_identity-thisarg"></a>`_.map(collection, [iteratee=_.identity], [thisArg])`
<a href="#_mapcollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6326 "View in source") [&#x24C9;][1]

Creates an array of values by running each element in `collection` through
`iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
arguments; (value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.
<br>
<br>
Many lodash methods are guarded to work as interatees for methods like
`_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
<br>
<br>
The guarded methods are:<br>
`ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
`dropRight`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`, `slice`,
`sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`, `trimRight`,
`trunc`, `random`, `range`, `sample`, `uniq`, and `words`

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration. create a `_.property` or `_.matches` style callback respectively.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Array)*:  Returns the new mapped array.

#### Example
```js
_.map([1, 2, 3], function(n) { return n * 3; });
// => [3, 6, 9]

_.map({ 'one': 1, 'two': 2, 'three': 3 }, function(n) { return n * 3; });
// => [3, 6, 9] (iteration order is not guaranteed)

var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];

// using the `_.property` callback shorthand
_.map(users, 'user');
// => ['barney', 'fred']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_maxcollection-iteratee-thisarg"></a>`_.max(collection, [iteratee], [thisArg])`
<a href="#_maxcollection-iteratee-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6377 "View in source") [&#x24C9;][1]

Gets the maximum value of `collection`. If `collection` is empty or falsey
`-Infinity` is returned. If an iteratee function is provided it is invoked
for each value in `collection` to generate the criterion by which the value
is ranked. The `iteratee` is bound to `thisArg` and invoked with three
arguments; (value, index, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(&#42;)*:  Returns the maximum value.

#### Example
```js
_.max([4, 2, 8, 6]);
// => 8

_.max([]);
// => -Infinity

var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

_.max(users, function(chr) { return chr.age; });
// => { 'user': 'fred', 'age': 40 };

// using the `_.property` callback shorthand
_.max(users, 'age');
// => { 'user': 'fred', 'age': 40 };
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_mincollection-iteratee-thisarg"></a>`_.min(collection, [iteratee], [thisArg])`
<a href="#_mincollection-iteratee-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6424 "View in source") [&#x24C9;][1]

Gets the minimum value of `collection`. If `collection` is empty or falsey
`Infinity` is returned. If an iteratee function is provided it is invoked
for each value in `collection` to generate the criterion by which the value
is ranked. The `iteratee` is bound to `thisArg` and invoked with three
arguments; (value, index, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(&#42;)*:  Returns the minimum value.

#### Example
```js
_.min([4, 2, 8, 6]);
// => 2

_.min([]);
// => Infinity

var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

_.min(users, function(chr) { return chr.age; });
// => { 'user': 'barney', 'age': 36 };

// using the `_.property` callback shorthand
_.min(users, 'age');
// => { 'user': 'barney', 'age': 36 };
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_partitioncollection-predicate_identity-thisarg"></a>`_.partition(collection, [predicate=_.identity], [thisArg])`
<a href="#_partitioncollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6479 "View in source") [&#x24C9;][1]

Creates an array of elements split into two groups, the first of which
contains elements `predicate` returns truthy for, while the second of which
contains elements `predicate` returns falsey for. The predicate is bound
to `thisArg` and invoked with three arguments; (value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the array of grouped elements.

#### Example
```js
_.partition([1, 2, 3], function(n) { return n % 2; });
// => [[1, 3], [2]]

_.partition([1.2, 2.3, 3.4], function(n) { return this.floor(n) % 2; }, Math);
// => [[1, 3], [2]]

var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];

var mapper = function(array) { return _.pluck(array, 'user'); };

// using the `_.matches` callback shorthand
_.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
// => [['pebbles'], ['barney', 'fred']]

// using the `_.matchesProperty` callback shorthand
_.map(_.partition(users, 'active', false), mapper);
// => [['barney', 'pebbles'], ['fred']]

// using the `_.property` callback shorthand
_.map(_.partition(users, 'active'), mapper);
// => [['fred'], ['barney', 'pebbles']]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_pluckcollection-key"></a>`_.pluck(collection, key)`
<a href="#_pluckcollection-key">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6506 "View in source") [&#x24C9;][1]

Gets the value of `key` from all elements in `collection`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `key` *(string)*: The key of the property to pluck.

#### Returns
*(Array)*:  Returns the property values.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

_.pluck(users, 'user');
// => ['barney', 'fred']

var userIndex = _.indexBy(users, 'user');
_.pluck(userIndex, 'age');
// => [36, 40] (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_reducecollection-iteratee_identity-accumulator-thisarg"></a>`_.reduce(collection, [iteratee=_.identity], [accumulator], [thisArg])`
<a href="#_reducecollection-iteratee_identity-accumulator-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6544 "View in source") [&#x24C9;][1]

Reduces `collection` to a value which is the accumulated result of running
each element in `collection` through `iteratee`, where each successive
invocation is supplied the return value of the previous. If `accumulator`
is not provided the first element of `collection` is used as the initial
value. The `iteratee` is bound to `thisArg`and invoked with four arguments;
(accumulator, value, index|key, collection).
<br>
<br>
Many lodash methods are guarded to work as interatees for methods like
`_.reduce`, `_.reduceRight`, and `_.transform`.
<br>
<br>
The guarded methods are:<br>
`assign`, `defaults`, `merge`, and `sortAllBy`

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[accumulator]` *(&#42;)*: The initial value.
4. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(&#42;)*:  Returns the accumulated value.

#### Example
```js
var sum = _.reduce([1, 2, 3], function(sum, n) { return sum + n; });
// => 6

var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
  result[key] = n * 3;
  return result;
}, {});
// => { 'a': 3, 'b': 6, 'c': 9 } (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_reducerightcollection-iteratee_identity-accumulator-thisarg"></a>`_.reduceRight(collection, [iteratee=_.identity], [accumulator], [thisArg])`
<a href="#_reducerightcollection-iteratee_identity-accumulator-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6568 "View in source") [&#x24C9;][1]

This method is like `_.reduce` except that it iterates over elements of
`collection` from right to left.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[accumulator]` *(&#42;)*: The initial value.
4. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(&#42;)*:  Returns the accumulated value.

#### Example
```js
var array = [[0, 1], [2, 3], [4, 5]];
_.reduceRight(array, function(flattened, other) { return flattened.concat(other); }, []);
// => [4, 5, 2, 3, 0, 1]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_rejectcollection-predicate_identity-thisarg"></a>`_.reject(collection, [predicate=_.identity], [thisArg])`
<a href="#_rejectcollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6618 "View in source") [&#x24C9;][1]

The opposite of `_.filter`; this method returns the elements of `collection`
that `predicate` does **not** return truthy for.
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Array)*:  Returns the new filtered array.

#### Example
```js
var odds = _.reject([1, 2, 3, 4], function(n) { return n % 2 == 0; });
// => [1, 3]

var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];

// using the `_.matches` callback shorthand
_.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
// => ['barney']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.reject(users, 'active', false), 'user');
// => ['fred']

// using the `_.property` callback shorthand
_.pluck(_.reject(users, 'active'), 'user');
// => ['barney']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_samplecollection-n"></a>`_.sample(collection, [n])`
<a href="#_samplecollection-n">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6644 "View in source") [&#x24C9;][1]

Gets a random element or `n` random elements from a collection.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to sample.
2. `[n]` *(number)*: The number of elements to sample.

#### Returns
*(&#42;)*:  Returns the random sample(s).

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
<a href="#_shufflecollection">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6670 "View in source") [&#x24C9;][1]

Creates an array of shuffled values, using a version of the Fisher-Yates
shuffle. See [Wikipedia](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
for more details.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to shuffle.

#### Returns
*(Array)*:  Returns the new shuffled array.

#### Example
```js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_sizecollection"></a>`_.size(collection)`
<a href="#_sizecollection">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6707 "View in source") [&#x24C9;][1]

Gets the size of `collection` by returning `collection.length` for
array-like values or the number of own enumerable properties for objects.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to inspect.

#### Returns
*(number)*:  Returns the size of `collection`.

#### Example
```js
_.size([1, 2]);
// => 2

_.size({ 'one': 1, 'two': 2, 'three': 3 });
// => 3

_.size('pebbles');
// => 7
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_somecollection-predicate_identity-thisarg"></a>`_.some(collection, [predicate=_.identity], [thisArg])`
<a href="#_somecollection-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6761 "View in source") [&#x24C9;][1]

Checks if `predicate` returns truthy for **any** element of `collection`.
The function returns as soon as it finds a passing value and does not iterate
over the entire collection. The predicate is bound to `thisArg` and invoked
with three arguments; (value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(boolean)*:  Returns `true` if any element passes the predicate check,
else `false`.

#### Example
```js
_.some([null, 0, 'yes', false], Boolean);
// => true

var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];

// using the `_.matches` callback shorthand
_.some(users, { user': 'barney', 'active': false });
// => false

// using the `_.matchesProperty` callback shorthand
_.some(users, 'active', false);
// => true

// using the `_.property` callback shorthand
_.some(users, 'active');
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_sortbycollection-iteratee_identity-thisarg"></a>`_.sortBy(collection, [iteratee=_.identity], [thisArg])`
<a href="#_sortbycollection-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6814 "View in source") [&#x24C9;][1]

Creates an array of elements, sorted in ascending order by the results of
running each element in a collection through `iteratee`. This method performs
a stable sort, that is, it preserves the original sort order of equal elements.
The `iteratee` is bound to `thisArg` and invoked with three arguments;
(value, index|key, collection).
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Array|Function|Object|string)*: The function invoked per iteration. If a property name or an object is provided it is used to create a `_.property` or `_.matches` style callback respectively.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Array)*:  Returns the new sorted array.

#### Example
```js
_.sortBy([1, 2, 3], function(n) { return Math.sin(n); });
// => [3, 1, 2]

_.sortBy([1, 2, 3], function(n) { return this.sin(n); }, Math);
// => [3, 1, 2]

var users = [
  { 'user': 'fred' },
  { 'user': 'pebbles' },
  { 'user': 'barney' }
];

// using the `_.property` callback shorthand
_.pluck(_.sortBy(users, 'user'), 'user');
// => ['barney', 'fred', 'pebbles']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_sortbyallcollection-props"></a>`_.sortByAll(collection, props)`
<a href="#_sortbyallcollection-props">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6852 "View in source") [&#x24C9;][1]

This method is like `_.sortBy` except that it sorts by property names
instead of an iteratee function.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to iterate over.
2. `props` *(...(string|string&#91;&#93;)*: The property names to sort by, specified as individual property names or arrays of property names.

#### Returns
*(Array)*:  Returns the new sorted array.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 26 },
  { 'user': 'fred',   'age': 30 }
];

_.map(_.sortByAll(users, ['user', 'age']), _.values);
// => [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_wherecollection-source"></a>`_.where(collection, source)`
<a href="#_wherecollection-source">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6903 "View in source") [&#x24C9;][1]

Performs a deep comparison between each element in `collection` and the
source object, returning an array of all elements that have equivalent
property values.
<br>
<br>
**Note:** This method supports comparing arrays, booleans, `Date` objects,
numbers, `Object` objects, regexes, and strings. Objects are compared by
their own, not inherited, enumerable properties. For comparing a single
own or inherited property value see `_.matchesProperty`.

#### Arguments
1. `collection` *(Array|Object|string)*: The collection to search.
2. `source` *(Object)*: The object of property values to match.

#### Returns
*(Array)*:  Returns the new filtered array.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
  { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
];

_.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
// => ['barney']

_.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
// => ['fred']
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Date” Methods`

<!-- div -->

### <a id="_now"></a>`_.now`
<a href="#_now">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6921 "View in source") [&#x24C9;][1]

Gets the number of milliseconds that have elapsed since the Unix epoch
(1 January 1970 00:00:00 UTC).

#### Example
```js
_.defer(function(stamp) { console.log(_.now() - stamp); }, _.now());
// => logs the number of milliseconds it took for the deferred function to be invoked
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Function” Methods`

<!-- div -->

### <a id="_aftern-func"></a>`_.after(n, func)`
<a href="#_aftern-func">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6950 "View in source") [&#x24C9;][1]

The opposite of `_.before`; this method creates a function that invokes
`func` once it is called `n` or more times.

#### Arguments
1. `n` *(number)*: The number of calls before `func` is invoked.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*:  Returns the new restricted function.

#### Example
```js
var saves = ['profile', 'settings'];

var done = _.after(saves.length, function() {
  console.log('done saving!');
});

_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
// => logs 'done saving!' after the two async saves have completed
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_aryfunc-nfunclength"></a>`_.ary(func, [n=func.length])`
<a href="#_aryfunc-nfunclength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L6984 "View in source") [&#x24C9;][1]

Creates a function that accepts up to `n` arguments ignoring any
additional arguments.

#### Arguments
1. `func` *(Function)*: The function to cap arguments for.
2. `[n=func.length]` *(number)*: The arity cap.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_beforen-func"></a>`_.before(n, func)`
<a href="#_beforen-func">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7008 "View in source") [&#x24C9;][1]

Creates a function that invokes `func`, with the `this` binding and arguments
of the created function, while it is called less than `n` times. Subsequent
calls to the created function return the result of the last `func` invocation.

#### Arguments
1. `n` *(number)*: The number of calls at which `func` is no longer invoked.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*:  Returns the new restricted function.

#### Example
```js
jQuery('#add').on('click', _.before(5, addContactToList));
// => allows adding up to 4 contacts to the list
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_bindfunc-thisarg-args"></a>`_.bind(func, thisArg, [args])`
<a href="#_bindfunc-thisarg-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7064 "View in source") [&#x24C9;][1]

Creates a function that invokes `func` with the `this` binding of `thisArg`
and prepends any additional `_.bind` arguments to those provided to the
bound function.
<br>
<br>
The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
may be used as a placeholder for partially applied arguments.
<br>
<br>
**Note:** Unlike native `Function#bind` this method does not set the `length`
property of bound functions.

#### Arguments
1. `func` *(Function)*: The function to bind.
2. `thisArg` *(&#42;)*: The `this` binding of `func`.
3. `[args]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*:  Returns the new bound function.

#### Example
```js
var greet = function(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
};

var object = { 'user': 'fred' };

var bound = _.bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// using placeholders
var bound = _.bind(greet, object, _, '!');
bound('hi');
// => 'hi fred!'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_bindallobject-methodnames"></a>`_.bindAll(object, [methodNames])`
<a href="#_bindallobject-methodnames">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7101 "View in source") [&#x24C9;][1]

Binds methods of an object to the object itself, overwriting the existing
method. Method names may be specified as individual arguments or as arrays
of method names. If no method names are provided all enumerable function
properties, own and inherited, of `object` are bound.
<br>
<br>
**Note:** This method does not set the `length` property of bound functions.

#### Arguments
1. `object` *(Object)*: The object to bind and assign the bound methods to.
2. `[methodNames]` *(...(string|string&#91;&#93;)*: The object method names to bind, specified as individual method names or arrays of method names.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
var view = {
  'label': 'docs',
  'onClick': function() { console.log('clicked ' + this.label); }
};

_.bindAll(view);
jQuery('#docs').on('click', view.onClick);
// => logs 'clicked docs' when the element is clicked
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_bindkeyobject-key-args"></a>`_.bindKey(object, key, [args])`
<a href="#_bindkeyobject-key-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7153 "View in source") [&#x24C9;][1]

Creates a function that invokes the method at `object[key]` and prepends
any additional `_.bindKey` arguments to those provided to the bound function.
<br>
<br>
This method differs from `_.bind` by allowing bound functions to reference
methods that may be redefined or don't yet exist.
See [Peter Michaux's article](http://michaux.ca/articles/lazy-function-definition-pattern)
for more details.
<br>
<br>
The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for partially applied arguments.

#### Arguments
1. `object` *(Object)*: The object the method belongs to.
2. `key` *(string)*: The key of the method.
3. `[args]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*:  Returns the new bound function.

#### Example
```js
var object = {
  'user': 'fred',
  'greet': function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};

var bound = _.bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function(greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// using placeholders
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_curryfunc-arityfunclength"></a>`_.curry(func, [arity=func.length])`
<a href="#_curryfunc-arityfunclength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7204 "View in source") [&#x24C9;][1]

Creates a function that accepts one or more arguments of `func` that when
called either invokes `func` returning its result, if all `func` arguments
have been provided, or returns a function that accepts one or more of the
remaining `func` arguments, and so on. The arity of `func` may be specified
if `func.length` is not sufficient.
<br>
<br>
The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
may be used as a placeholder for provided arguments.
<br>
<br>
**Note:** This method does not set the `length` property of curried functions.

#### Arguments
1. `func` *(Function)*: The function to curry.
2. `[arity=func.length]` *(number)*: The arity of `func`.

#### Returns
*(Function)*:  Returns the new curried function.

#### Example
```js
var abc = function(a, b, c) {
  return [a, b, c];
};

var curried = _.curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// using placeholders
curried(1)(_, 3)(2);
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_curryrightfunc-arityfunclength"></a>`_.curryRight(func, [arity=func.length])`
<a href="#_curryrightfunc-arityfunclength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7250 "View in source") [&#x24C9;][1]

This method is like `_.curry` except that arguments are applied to `func`
in the manner of `_.partialRight` instead of `_.partial`.
<br>
<br>
The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for provided arguments.
<br>
<br>
**Note:** This method does not set the `length` property of curried functions.

#### Arguments
1. `func` *(Function)*: The function to curry.
2. `[arity=func.length]` *(number)*: The arity of `func`.

#### Returns
*(Function)*:  Returns the new curried function.

#### Example
```js
var abc = function(a, b, c) {
  return [a, b, c];
};

var curried = _.curryRight(abc);

curried(3)(2)(1);
// => [1, 2, 3]

curried(2, 3)(1);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// using placeholders
curried(3)(1, _)(2);
// => [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_debouncefunc-wait-options"></a>`_.debounce(func, wait, [options])`
<a href="#_debouncefunc-wait-options">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7321 "View in source") [&#x24C9;][1]

Creates a function that delays invoking `func` until after `wait` milliseconds
have elapsed since the last time it was invoked. The created function comes
with a `cancel` method to cancel delayed invocations. Provide an options
object to indicate that `func` should be invoked on the leading and/or
trailing edge of the `wait` timeout. Subsequent calls to the debounced
function return the result of the last `func` invocation.
<br>
<br>
**Note:** If `leading` and `trailing` options are `true`, `func` is invoked
on the trailing edge of the timeout only if the the debounced function is
invoked more than once during the `wait` timeout.
<br>
<br>
See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
for details over the differences between `_.debounce` and `_.throttle`.

#### Arguments
1. `func` *(Function)*: The function to debounce.
2. `wait` *(number)*: The number of milliseconds to delay.
3. `[options]` *(Object)*: The options object.
4. `[options.leading=false]` *(boolean)*: Specify invoking on the leading edge of the timeout.
5. `[options.maxWait]` *(number)*: The maximum time `func` is allowed to be delayed before it is invoked.
6. `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge of the timeout.

#### Returns
*(Function)*:  Returns the new debounced function.

#### Example
```js
// avoid costly calculations while the window size is in flux
jQuery(window).on('resize', _.debounce(calculateLayout, 150));

// invoke `sendMail` when the click event is fired, debouncing subsequent calls
jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));

// ensure `batchLog` is invoked once after 1 second of debounced calls
var source = new EventSource('/stream');
jQuery(source).on('message', _.debounce(batchLog, 250, {
  'maxWait': 1000
}));

// cancel a debounced call
var todoChanges = _.debounce(batchLog, 1000);
Object.observe(models.todo, todoChanges);

Object.observe(models, function(changes) {
  if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
    todoChanges.cancel();
  }
}, ['delete']);

// ...at some point `models.todo` is changed
models.todo.completed = true;

// ...before 1 second has passed `models.todo` is deleted
// which cancels the debounced `todoChanges` call
delete models.todo;
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_deferfunc-args"></a>`_.defer(func, [args])`
<a href="#_deferfunc-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7450 "View in source") [&#x24C9;][1]

Defers invoking the `func` until the current call stack has cleared. Any
additional arguments are provided to `func` when it is invoked.

#### Arguments
1. `func` *(Function)*: The function to defer.
2. `[args]` *(...&#42;)*: The arguments to invoke the function with.

#### Returns
*(number)*:  Returns the timer id.

#### Example
```js
_.defer(function(text) { console.log(text); }, 'deferred');
// logs 'deferred' after one or more milliseconds
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_delayfunc-wait-args"></a>`_.delay(func, wait, [args])`
<a href="#_delayfunc-wait-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7470 "View in source") [&#x24C9;][1]

Invokes `func` after `wait` milliseconds. Any additional arguments are
provided to `func` when it is invoked.

#### Arguments
1. `func` *(Function)*: The function to delay.
2. `wait` *(number)*: The number of milliseconds to delay invocation.
3. `[args]` *(...&#42;)*: The arguments to invoke the function with.

#### Returns
*(number)*:  Returns the timer id.

#### Example
```js
_.delay(function(text) { console.log(text); }, 1000, 'later');
// => logs 'later' after one second
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_flowfuncs"></a>`_.flow([funcs])`
<a href="#_flowfuncs">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7498 "View in source") [&#x24C9;][1]

Creates a function that returns the result of invoking the provided
functions with the `this` binding of the created function, where each
successive invocation is supplied the return value of the previous.

#### Arguments
1. `[funcs]` *(...Function)*: Functions to invoke.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
function add(x, y) {
  return x + y;
}

function square(n) {
  return n * n;
}

var addSquare = _.flow(add, square);
addSquare(1, 2);
// => 9
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_flowrightfuncs"></a>`_.flowRight([funcs])`
<a href="#_flowrightfuncs">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7543 "View in source") [&#x24C9;][1]

This method is like `_.flow` except that it creates a function that
invokes the provided functions from right to left.

#### Arguments
1. `[funcs]` *(...Function)*: Functions to invoke.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
function add(x, y) {
  return x + y;
}

function square(n) {
  return n * n;
}

var addSquare = _.flowRight(square, add);
addSquare(1, 2);
// => 9
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_memoizefunc-resolver"></a>`_.memoize(func, [resolver])`
<a href="#_memoizefunc-resolver">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7617 "View in source") [&#x24C9;][1]

Creates a function that memoizes the result of `func`. If `resolver` is
provided it determines the cache key for storing the result based on the
arguments provided to the memoized function. By default, the first argument
provided to the memoized function is coerced to a string and used as the
cache key. The `func` is invoked with the `this` binding of the memoized
function.
<br>
<br>
**Note:** The cache is exposed as the `cache` property on the memoized
function. Its creation may be customized by replacing the `_.memoize.Cache`
constructor with one whose instances implement the ES `Map` method interface
of `get`, `has`, and `set`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
for more details.

#### Arguments
1. `func` *(Function)*: The function to have its output memoized.
2. `[resolver]` *(Function)*: The function to resolve the cache key.

#### Returns
*(Function)*:  Returns the new memoizing function.

#### Example
```js
var upperCase = _.memoize(function(string) {
  return string.toUpperCase();
});

upperCase('fred');
// => 'FRED'

// modifying the result cache
upperCase.cache.set('fred', 'BARNEY');
upperCase('fred');
// => 'BARNEY'

// replacing `_.memoize.Cache`
var object = { 'user': 'fred' };
var other = { 'user': 'barney' };
var identity = _.memoize(_.identity);

identity(object);
// => { 'user': 'fred' }
identity(other);
// => { 'user': 'fred' }

_.memoize.Cache = WeakMap;
var identity = _.memoize(_.identity);

identity(object);
// => { 'user': 'fred' }
identity(other);
// => { 'user': 'barney' }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_negatepredicate"></a>`_.negate(predicate)`
<a href="#_negatepredicate">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7655 "View in source") [&#x24C9;][1]

Creates a function that negates the result of the predicate `func`. The
`func` predicate is invoked with the `this` binding and arguments of the
created function.

#### Arguments
1. `predicate` *(Function)*: The predicate to negate.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
function isEven(n) {
  return n % 2 == 0;
}

_.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
// => [1, 3, 5]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_oncefunc"></a>`_.once(func)`
<a href="#_oncefunc">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7681 "View in source") [&#x24C9;][1]

Creates a function that is restricted to invoking `func` once. Repeat calls
to the function return the value of the first call. The `func` is invoked
with the `this` binding of the created function.

#### Arguments
1. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*:  Returns the new restricted function.

#### Example
```js
var initialize = _.once(createApplication);
initialize();
initialize();
// `initialize` invokes `createApplication` once
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_partialfunc-args"></a>`_.partial(func, [args])`
<a href="#_partialfunc-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7717 "View in source") [&#x24C9;][1]

Creates a function that invokes `func` with `partial` arguments prepended
to those provided to the new function. This method is like `_.bind` except
it does **not** alter the `this` binding.
<br>
<br>
The `_.partial.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for partially applied arguments.
<br>
<br>
**Note:** This method does not set the `length` property of partially
applied functions.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[args]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*:  Returns the new partially applied function.

#### Example
```js
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};

var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'

// using placeholders
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_partialrightfunc-args"></a>`_.partialRight(func, [args])`
<a href="#_partialrightfunc-args">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7755 "View in source") [&#x24C9;][1]

This method is like `_.partial` except that partially applied arguments
are appended to those provided to the new function.
<br>
<br>
The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for partially applied arguments.
<br>
<br>
**Note:** This method does not set the `length` property of partially
applied functions.

#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[args]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*:  Returns the new partially applied function.

#### Example
```js
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};

var greetFred = _.partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'

// using placeholders
var sayHelloTo = _.partialRight(greet, 'hello', _);
sayHelloTo('fred');
// => 'hello fred'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_reargfunc-indexes"></a>`_.rearg(func, indexes)`
<a href="#_reargfunc-indexes">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7788 "View in source") [&#x24C9;][1]

Creates a function that invokes `func` with arguments arranged according
to the specified indexes where the argument value at the first index is
provided as the first argument, the argument value at the second index is
provided as the second argument, and so on.

#### Arguments
1. `func` *(Function)*: The function to rearrange arguments for.
2. `indexes` *(...(number|number&#91;&#93;)*: The arranged argument indexes, specified as individual indexes or arrays of indexes.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var rearged = _.rearg(function(a, b, c) {
  return [a, b, c];
}, 2, 0, 1);

rearged('b', 'c', 'a')
// => ['a', 'b', 'c']

var map = _.rearg(_.map, [1, 0]);
map(function(n) { return n * 3; }, [1, 2, 3]);
// => [3, 6, 9]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_spreadfunc"></a>`_.spread(func)`
<a href="#_spreadfunc">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7823 "View in source") [&#x24C9;][1]

Creates a function that invokes `func` with the `this` binding of the
created function and the array of arguments provided to the created
function much like [Function#apply](http://es5.github.io/#x15.3.4.3).

#### Arguments
1. `func` *(Function)*: The function to spread arguments over.

#### Returns
*(&#42;)*:  Returns the new function.

#### Example
```js
var spread = _.spread(function(who, what) {
  return who + ' says ' + what;
});

spread(['Fred', 'hello']);
// => 'Fred says hello'

// with a Promise
var numbers = Promise.all([
  Promise.resolve(40),
  Promise.resolve(36)
]);

numbers.then(_.spread(function(x, y) {
  return x + y;
}));
// => a Promise of 76
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_throttlefunc-wait-options"></a>`_.throttle(func, wait, [options])`
<a href="#_throttlefunc-wait-options">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7870 "View in source") [&#x24C9;][1]

Creates a function that only invokes `func` at most once per every `wait`
milliseconds. The created function comes with a `cancel` method to cancel
delayed invocations. Provide an options object to indicate that `func`
should be invoked on the leading and/or trailing edge of the `wait` timeout.
Subsequent calls to the throttled function return the result of the last
`func` call.
<br>
<br>
**Note:** If `leading` and `trailing` options are `true`, `func` is invoked
on the trailing edge of the timeout only if the the throttled function is
invoked more than once during the `wait` timeout.
<br>
<br>
See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
for details over the differences between `_.throttle` and `_.debounce`.

#### Arguments
1. `func` *(Function)*: The function to throttle.
2. `wait` *(number)*: The number of milliseconds to throttle invocations to.
3. `[options]` *(Object)*: The options object.
4. `[options.leading=true]` *(boolean)*: Specify invoking on the leading edge of the timeout.
5. `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge of the timeout.

#### Returns
*(Function)*:  Returns the new throttled function.

#### Example
```js
// avoid excessively updating the position while scrolling
jQuery(window).on('scroll', _.throttle(updatePosition, 100));

// invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
var throttled =  _.throttle(renewToken, 300000, { 'trailing': false })
jQuery('.interactive').on('click', throttled);

// cancel a trailing throttled call
jQuery(window).on('popstate', throttled.cancel);
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_wrapvalue-wrapper"></a>`_.wrap(value, wrapper)`
<a href="#_wrapvalue-wrapper">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7910 "View in source") [&#x24C9;][1]

Creates a function that provides `value` to the wrapper function as its
first argument. Any additional arguments provided to the function are
appended to those provided to the wrapper function. The wrapper is invoked
with the `this` binding of the created function.

#### Arguments
1. `value` *(&#42;)*: The value to wrap.
2. `wrapper` *(Function)*: The wrapper function.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var p = _.wrap(_.escape, function(func, text) {
  return '<p>' + func(text) + '</p>';
});

p('fred, barney, & pebbles');
// => '<p>fred, barney, &amp; pebbles</p>'
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Lang” Methods`

<!-- div -->

### <a id="_clonevalue-isdeep-customizer-thisarg"></a>`_.clone(value, [isDeep], [customizer], [thisArg])`
<a href="#_clonevalue-isdeep-customizer-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L7966 "View in source") [&#x24C9;][1]

Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
otherwise they are assigned by reference. If `customizer` is provided it is
invoked to produce the cloned values. If `customizer` returns `undefined`
cloning is handled by the method instead. The `customizer` is bound to
`thisArg` and invoked with two argument; (value [, index|key, object]).
<br>
<br>
**Note:** This method is loosely based on the structured clone algorithm.
The enumerable properties of `arguments` objects and objects created by
constructors other than `Object` are cloned to plain `Object` objects. An
empty object is returned for uncloneable values such as functions, DOM nodes,
Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
for more details.

#### Arguments
1. `value` *(&#42;)*: The value to clone.
2. `[isDeep]` *(boolean)*: Specify a deep clone.
3. `[customizer]` *(Function)*: The function to customize cloning values.
4. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(&#42;)*:  Returns the cloned value.

#### Example
```js
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];

var shallow = _.clone(users);
shallow[0] === users[0];
// => true

var deep = _.clone(users, true);
deep[0] === users[0];
// => false

// using a customizer callback
var body = _.clone(document.body, function(value) {
  return _.isElement(value) ? value.cloneNode(false) : undefined;
});

body === document.body
// => false
body.nodeName
// => BODY
body.childNodes.length;
// => 0
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_clonedeepvalue-customizer-thisarg"></a>`_.cloneDeep(value, [customizer], [thisArg])`
<a href="#_clonedeepvalue-customizer-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8020 "View in source") [&#x24C9;][1]

Creates a deep clone of `value`. If `customizer` is provided it is invoked
to produce the cloned values. If `customizer` returns `undefined` cloning
is handled by the method instead. The `customizer` is bound to `thisArg`
and invoked with two argument; (value [, index|key, object]).
<br>
<br>
**Note:** This method is loosely based on the structured clone algorithm.
The enumerable properties of `arguments` objects and objects created by
constructors other than `Object` are cloned to plain `Object` objects. An
empty object is returned for uncloneable values such as functions, DOM nodes,
Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
for more details.

#### Arguments
1. `value` *(&#42;)*: The value to deep clone.
2. `[customizer]` *(Function)*: The function to customize cloning values.
3. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(&#42;)*:  Returns the deep cloned value.

#### Example
```js
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];

var deep = _.cloneDeep(users);
deep[0] === users[0];
// => false

// using a customizer callback
var el = _.cloneDeep(document.body, function(value) {
  return _.isElement(value) ? value.cloneNode(true) : undefined;
});

body === document.body
// => false
body.nodeName
// => BODY
body.childNodes.length;
// => 20
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isargumentsvalue"></a>`_.isArguments(value)`
<a href="#_isargumentsvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8041 "View in source") [&#x24C9;][1]

Checks if `value` is classified as an `arguments` object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
(function() { return _.isArguments(arguments); })();
// => true

_.isArguments([1, 2, 3]);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isarrayvalue"></a>`_.isArray(value)`
<a href="#_isarrayvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8070 "View in source") [&#x24C9;][1]

Checks if `value` is classified as an `Array` object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isArray([1, 2, 3]);
// => true

(function() { return _.isArray(arguments); })();
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isbooleanvalue"></a>`_.isBoolean(value)`
<a href="#_isbooleanvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8090 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a boolean primitive or object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isBoolean(false);
// => true

_.isBoolean(null);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isdatevalue"></a>`_.isDate(value)`
<a href="#_isdatevalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8110 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a `Date` object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isDate(new Date);
// => true

_.isDate('Mon April 23 2012');
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_iselementvalue"></a>`_.isElement(value)`
<a href="#_iselementvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8130 "View in source") [&#x24C9;][1]

Checks if `value` is a DOM element.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is a DOM element, else `false`.

#### Example
```js
_.isElement(document.body);
// => true

_.isElement('<body>');
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isemptyvalue"></a>`_.isEmpty(value)`
<a href="#_isemptyvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8168 "View in source") [&#x24C9;][1]

Checks if a value is empty. A value is considered empty unless it is an
`arguments` object, array, string, or jQuery-like collection with a length
greater than `0` or an object with own enumerable properties.

#### Arguments
1. `value` *(Array|Object|string)*: The value to inspect.

#### Returns
*(boolean)*:  Returns `true` if `value` is empty, else `false`.

#### Example
```js
_.isEmpty(null);
// => true

_.isEmpty(true);
// => true

_.isEmpty(1);
// => true

_.isEmpty([1, 2, 3]);
// => false

_.isEmpty({ 'a': 1 });
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isequalvalue-other-customizer-thisarg"></a>`_.isEqual(value, other, [customizer], [thisArg])`
<a href="#_isequalvalue-other-customizer-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8221 "View in source") [&#x24C9;][1]

Performs a deep comparison between two values to determine if they are
equivalent. If `customizer` is provided it is invoked to compare values.
If `customizer` returns `undefined` comparisons are handled by the method
instead. The `customizer` is bound to `thisArg` and invoked with three
arguments; (value, other [, index|key]).
<br>
<br>
**Note:** This method supports comparing arrays, booleans, `Date` objects,
numbers, `Object` objects, regexes, and strings. Objects are compared by
their own, not inherited, enumerable properties. Functions and DOM nodes
are **not** supported. Provide a customizer function to extend support
for comparing other values.

#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.
3. `[customizer]` *(Function)*: The function to customize comparing values.
4. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(boolean)*:  Returns `true` if the values are equivalent, else `false`.

#### Example
```js
var object = { 'user': 'fred' };
var other = { 'user': 'fred' };

object == other;
// => false

_.isEqual(object, other);
// => true

// using a customizer callback
var array = ['hello', 'goodbye'];
var other = ['hi', 'goodbye'];

_.isEqual(array, other, function(value, other) {
  return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
});
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_iserrorvalue"></a>`_.isError(value)`
<a href="#_iserrorvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8247 "View in source") [&#x24C9;][1]

Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
`SyntaxError`, `TypeError`, or `URIError` object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is an error object, else `false`.

#### Example
```js
_.isError(new Error);
// => true

_.isError(Error);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isfinitevalue"></a>`_.isFinite(value)`
<a href="#_isfinitevalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8280 "View in source") [&#x24C9;][1]

Checks if `value` is a finite primitive number.
<br>
<br>
**Note:** This method is based on ES `Number.isFinite`. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite)
for more details.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is a finite number, else `false`.

#### Example
```js
_.isFinite(10);
// => true

_.isFinite('10');
// => false

_.isFinite(true);
// => false

_.isFinite(Object(10));
// => false

_.isFinite(Infinity);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isfunctionvalue"></a>`_.isFunction(value)`
<a href="#_isfunctionvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8300 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a `Function` object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isFunction(_);
// => true

_.isFunction(/abc/);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_ismatchobject-source-customizer-thisarg"></a>`_.isMatch(object, source, [customizer], [thisArg])`
<a href="#_ismatchobject-source-customizer-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8383 "View in source") [&#x24C9;][1]

Performs a deep comparison between `object` and `source` to determine if
`object` contains equivalent property values. If `customizer` is provided
it is invoked to compare values. If `customizer` returns `undefined`
comparisons are handled by the method instead. The `customizer` is bound
to `thisArg` and invoked with three arguments; (value, other, index|key).
<br>
<br>
**Note:** This method supports comparing properties of arrays, booleans,
`Date` objects, numbers, `Object` objects, regexes, and strings. Functions
and DOM nodes are **not** supported. Provide a customizer function to extend
support for comparing other values.

#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `source` *(Object)*: The object of property values to match.
3. `[customizer]` *(Function)*: The function to customize comparing values.
4. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(boolean)*:  Returns `true` if `object` is a match, else `false`.

#### Example
```js
var object = { 'user': 'fred', 'age': 40 };

_.isMatch(object, { 'age': 40 });
// => true

_.isMatch(object, { 'age': 36 });
// => false

// using a customizer callback
var object = { 'greeting': 'hello' };
var source = { 'greeting': 'hi' };

_.isMatch(object, source, function(value, other) {
  return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
});
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isnanvalue"></a>`_.isNaN(value)`
<a href="#_isnanvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8432 "View in source") [&#x24C9;][1]

Checks if `value` is `NaN`.
<br>
<br>
**Note:** This method is not the same as native `isNaN` which returns `true`
for `undefined` and other non-numeric values. See the [ES5 spec](https://es5.github.io/#x15.1.2.4)
for more details.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is `NaN`, else `false`.

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

### <a id="_isnativevalue"></a>`_.isNative(value)`
<a href="#_isnativevalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8454 "View in source") [&#x24C9;][1]

Checks if `value` is a native function.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is a native function, else `false`.

#### Example
```js
_.isNative(Array.prototype.push);
// => true

_.isNative(_);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isnullvalue"></a>`_.isNull(value)`
<a href="#_isnullvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8481 "View in source") [&#x24C9;][1]

Checks if `value` is `null`.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is `null`, else `false`.

#### Example
```js
_.isNull(null);
// => true

_.isNull(void 0);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isnumbervalue"></a>`_.isNumber(value)`
<a href="#_isnumbervalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8507 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a `Number` primitive or object.
<br>
<br>
**Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
as numbers, use the `_.isFinite` method.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isNumber(8.4);
// => true

_.isNumber(NaN);
// => true

_.isNumber('8.4');
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isobjectvalue"></a>`_.isObject(value)`
<a href="#_isobjectvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8337 "View in source") [&#x24C9;][1]

Checks if `value` is the language type of `Object`.
(e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
<br>
<br>
**Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is an object, else `false`.

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
<a href="#_isplainobjectvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8541 "View in source") [&#x24C9;][1]

Checks if `value` is a plain object, that is, an object created by the
`Object` constructor or one with a `[[Prototype]]` of `null`.
<br>
<br>
**Note:** This method assumes objects created by the `Object` constructor
have no inherited enumerable properties.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is a plain object, else `false`.

#### Example
```js
function Foo() {
  this.a = 1;
}

_.isPlainObject(new Foo);
// => false

_.isPlainObject([1, 2, 3]);
// => false

_.isPlainObject({ 'x': 0, 'y': 0 });
// => true

_.isPlainObject(Object.create(null));
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isregexpvalue"></a>`_.isRegExp(value)`
<a href="#_isregexpvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8569 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a `RegExp` object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isRegExp(/abc/);
// => true

_.isRegExp('/abc/');
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isstringvalue"></a>`_.isString(value)`
<a href="#_isstringvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8589 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a `String` primitive or object.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isString('abc');
// => true

_.isString(1);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_istypedarrayvalue"></a>`_.isTypedArray(value)`
<a href="#_istypedarrayvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8609 "View in source") [&#x24C9;][1]

Checks if `value` is classified as a typed array.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is correctly classified, else `false`.

#### Example
```js
_.isTypedArray(new Uint8Array);
// => true

_.isTypedArray([]);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_isundefinedvalue"></a>`_.isUndefined(value)`
<a href="#_isundefinedvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8629 "View in source") [&#x24C9;][1]

Checks if `value` is `undefined`.

#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*:  Returns `true` if `value` is `undefined`, else `false`.

#### Example
```js
_.isUndefined(void 0);
// => true

_.isUndefined(null);
// => false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_toarrayvalue"></a>`_.toArray(value)`
<a href="#_toarrayvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8646 "View in source") [&#x24C9;][1]

Converts `value` to an array.

#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(Array)*:  Returns the converted array.

#### Example
```js
(function() { return _.toArray(arguments).slice(1); })(1, 2, 3);
// => [2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_toplainobjectvalue"></a>`_.toPlainObject(value)`
<a href="#_toplainobjectvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8682 "View in source") [&#x24C9;][1]

Converts `value` to a plain object flattening inherited enumerable
properties of `value` to own properties of the plain object.

#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(Object)*:  Returns the converted plain object.

#### Example
```js
function Foo() {
  this.b = 2;
}

Foo.prototype.c = 3;

_.assign({ 'a': 1 }, new Foo);
// => { 'a': 1, 'b': 2 }

_.assign({ 'a': 1 }, _.toPlainObject(new Foo));
// => { 'a': 1, 'b': 2, 'c': 3 }
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Number” Methods`

<!-- div -->

### <a id="_randommin0-max1-floating"></a>`_.random([min=0], [max=1], [floating])`
<a href="#_randommin0-max1-floating">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9586 "View in source") [&#x24C9;][1]

Produces a random number between `min` and `max` (inclusive). If only one
argument is provided a number between `0` and the given number is returned.
If `floating` is `true`, or either `min` or `max` are floats, a floating-point
number is returned instead of an integer.

#### Arguments
1. `[min=0]` *(number)*: The minimum possible value.
2. `[max=1]` *(number)*: The maximum possible value.
3. `[floating]` *(boolean)*: Specify returning a floating-point number.

#### Returns
*(number)*:  Returns the random number.

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

<!-- /div -->

<!-- div -->

## `“Object” Methods`

<!-- div -->

### <a id="_assignobject-sources-customizer-thisarg"></a>`_.assign(object, [sources], [customizer], [thisArg])`
<a href="#_assignobject-sources-customizer-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8717 "View in source") [&#x24C9;][1]

Assigns own enumerable properties of source object(s) to the destination
object. Subsequent sources overwrite property assignments of previous sources.
If `customizer` is provided it is invoked to produce the assigned values.
The `customizer` is bound to `thisArg` and invoked with five arguments;
(objectValue, sourceValue, key, object, source).

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.
3. `[customizer]` *(Function)*: The function to customize assigning values.
4. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
_.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
// => { 'user': 'fred', 'age': 40 }

// using a customizer callback
var defaults = _.partialRight(_.assign, function(value, other) {
  return typeof value == 'undefined' ? other : value;
});

defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
// => { 'user': 'barney', 'age': 36 }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_createprototype-properties"></a>`_.create(prototype, [properties])`
<a href="#_createprototype-properties">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8751 "View in source") [&#x24C9;][1]

Creates an object that inherits from the given `prototype` object. If a
`properties` object is provided its own enumerable properties are assigned
to the created object.

#### Arguments
1. `prototype` *(Object)*: The object to inherit from.
2. `[properties]` *(Object)*: The properties to assign to the object.

#### Returns
*(Object)*:  Returns the new object.

#### Example
```js
function Shape() {
  this.x = 0;
  this.y = 0;
}

function Circle() {
  Shape.call(this);
}

Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });

var circle = new Circle;
circle instanceof Circle;
// => true

circle instanceof Shape;
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_defaultsobject-sources"></a>`_.defaults(object, [sources])`
<a href="#_defaultsobject-sources">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8775 "View in source") [&#x24C9;][1]

Assigns own enumerable properties of source object(s) to the destination
object for all destination properties that resolve to `undefined`. Once a
property is set, additional defaults of the same property are ignored.

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
_.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
// => { 'user': 'barney', 'age': 36 }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_findkeyobject-predicate_identity-thisarg"></a>`_.findKey(object, [predicate=_.identity], [thisArg])`
<a href="#_findkeyobject-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8830 "View in source") [&#x24C9;][1]

This method is like `_.findIndex` except that it returns the key of the
first element `predicate` returns truthy for, instead of the element itself.
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `object` *(Object)*: The object to search.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(string|undefined)*:  Returns the key of the matched element, else `undefined`.

#### Example
```js
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};

_.findKey(users, function(chr) { return chr.age < 40; });
// => 'barney' (iteration order is not guaranteed)

// using the `_.matches` callback shorthand
_.findKey(users, { 'age': 1, 'active': true });
// => 'pebbles'

// using the `_.matchesProperty` callback shorthand
_.findKey(users, 'active', false);
// => 'fred'

// using the `_.property` callback shorthand
_.findKey(users, 'active');
// => 'barney'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_findlastkeyobject-predicate_identity-thisarg"></a>`_.findLastKey(object, [predicate=_.identity], [thisArg])`
<a href="#_findlastkeyobject-predicate_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8881 "View in source") [&#x24C9;][1]

This method is like `_.findKey` except that it iterates over elements of
a collection in the opposite order.
<br>
<br>
If a property name is provided for `predicate` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `predicate` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `object` *(Object)*: The object to search.
2. `[predicate=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(string|undefined)*:  Returns the key of the matched element, else `undefined`.

#### Example
```js
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};

_.findLastKey(users, function(chr) { return chr.age < 40; });
// => returns `pebbles` assuming `_.findKey` returns `barney`

// using the `_.matches` callback shorthand
_.findLastKey(users, { 'age': 36, 'active': true });
// => 'barney'

// using the `_.matchesProperty` callback shorthand
_.findLastKey(users, 'active', false);
// => 'fred'

// using the `_.property` callback shorthand
_.findLastKey(users, 'active');
// => 'pebbles'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_forinobject-iteratee_identity-thisarg"></a>`_.forIn(object, [iteratee=_.identity], [thisArg])`
<a href="#_forinobject-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8913 "View in source") [&#x24C9;][1]

Iterates over own and inherited enumerable properties of an object invoking
`iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
with three arguments; (value, key, object). Iterator functions may exit
iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.forIn(new Foo, function(value, key) {
  console.log(key);
});
// => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_forinrightobject-iteratee_identity-thisarg"></a>`_.forInRight(object, [iteratee=_.identity], [thisArg])`
<a href="#_forinrightobject-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8945 "View in source") [&#x24C9;][1]

This method is like `_.forIn` except that it iterates over properties of
`object` in the opposite order.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.forInRight(new Foo, function(value, key) {
  console.log(key);
});
// => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_forownobject-iteratee_identity-thisarg"></a>`_.forOwn(object, [iteratee=_.identity], [thisArg])`
<a href="#_forownobject-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8970 "View in source") [&#x24C9;][1]

Iterates over own enumerable properties of an object invoking `iteratee`
for each property. The `iteratee` is bound to `thisArg` and invoked with
three arguments; (value, key, object). Iterator functions may exit iteration
early by explicitly returning `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
_.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
  console.log(key);
});
// => logs '0', '1', and 'length' (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_forownrightobject-iteratee_identity-thisarg"></a>`_.forOwnRight(object, [iteratee=_.identity], [thisArg])`
<a href="#_forownrightobject-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L8995 "View in source") [&#x24C9;][1]

This method is like `_.forOwn` except that it iterates over properties of
`object` in the opposite order.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
_.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(n, key) {
  console.log(key);
});
// => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_functionsobject"></a>`_.functions(object)`
<a href="#_functionsobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9015 "View in source") [&#x24C9;][1]

Creates an array of function property names from all enumerable properties,
own and inherited, of `object`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*:  Returns the new array of property names.

#### Example
```js
_.functions(_);
// => ['all', 'any', 'bind', ...]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_hasobject-key"></a>`_.has(object, key)`
<a href="#_hasobject-key">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9034 "View in source") [&#x24C9;][1]

Checks if `key` exists as a direct property of `object` instead of an
inherited property.

#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `key` *(string)*: The key to check.

#### Returns
*(boolean)*:  Returns `true` if `key` is a direct property, else `false`.

#### Example
```js
_.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_invertobject-multivalue"></a>`_.invert(object, [multiValue])`
<a href="#_invertobject-multivalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9063 "View in source") [&#x24C9;][1]

Creates an object composed of the inverted keys and values of `object`.
If `object` contains duplicate values, subsequent values overwrite property
assignments of previous values unless `multiValue` is `true`.

#### Arguments
1. `object` *(Object)*: The object to invert.
2. `[multiValue]` *(boolean)*: Allow multiple values per key.

#### Returns
*(Object)*:  Returns the new inverted object.

#### Example
```js
_.invert({ 'first': 'fred', 'second': 'barney' });
// => { 'fred': 'first', 'barney': 'second' }

// without `multiValue`
_.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' });
// => { 'fred': 'third', 'barney': 'second' }

// with `multiValue`
_.invert({ 'first': 'fred', 'second': 'barney', 'third': 'fred' }, true);
// => { 'fred': ['first', 'third'], 'barney': ['second'] }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_keysobject"></a>`_.keys(object)`
<a href="#_keysobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9117 "View in source") [&#x24C9;][1]

Creates an array of the own enumerable property names of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects. See the
[ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
for more details.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*:  Returns the array of property names.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.keys(new Foo);
// => ['a', 'b'] (iteration order is not guaranteed)

_.keys('hi');
// => ['0', '1']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_keysinobject"></a>`_.keysIn(object)`
<a href="#_keysinobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9151 "View in source") [&#x24C9;][1]

Creates an array of the own and inherited enumerable property names of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*:  Returns the array of property names.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.keysIn(new Foo);
// => ['a', 'b', 'c'] (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_mapvaluesobject-iteratee_identity-thisarg"></a>`_.mapValues(object, [iteratee=_.identity], [thisArg])`
<a href="#_mapvaluesobject-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9248 "View in source") [&#x24C9;][1]

Creates an object with the same keys as `object` and values generated by
running each own enumerable property of `object` through `iteratee`. The
iteratee function is bound to `thisArg` and invoked with three arguments;
(value, key, object).
<br>
<br>
If a property name is provided for `iteratee` the created `_.property`
style callback returns the property value of the given element.
<br>
<br>
If a value is also provided for `thisArg` the created `_.matchesProperty`
style callback returns `true` for elements that have a matching property
value, else `false`.
<br>
<br>
If an object is provided for `iteratee` the created `_.matches` style
callback returns `true` for elements that have the properties of the given
object, else `false`.

#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function|Object|string)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Object)*:  Returns the new mapped object.

#### Example
```js
_.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(n) { return n * 3; });
// => { 'a': 3, 'b': 6, 'c': 9 }

var users = {
  'fred':    { 'user': 'fred',    'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
};

// using the `_.property` callback shorthand
_.mapValues(users, 'age');
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_mergeobject-sources-customizer-thisarg"></a>`_.merge(object, [sources], [customizer], [thisArg])`
<a href="#_mergeobject-sources-customizer-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9304 "View in source") [&#x24C9;][1]

Recursively merges own enumerable properties of the source object(s), that
don't resolve to `undefined` into the destination object. Subsequent sources
overwrite property assignments of previous sources. If `customizer` is
provided it is invoked to produce the merged values of the destination and
source properties. If `customizer` returns `undefined` merging is handled
by the method instead. The `customizer` is bound to `thisArg` and invoked
with five arguments; (objectValue, sourceValue, key, object, source).

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.
3. `[customizer]` *(Function)*: The function to customize merging properties.
4. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(Object)*:  Returns `object`.

#### Example
```js
var users = {
  'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
};

var ages = {
  'data': [{ 'age': 36 }, { 'age': 40 }]
};

_.merge(users, ages);
// => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }

// using a customizer callback
var object = {
  'fruits': ['apple'],
  'vegetables': ['beet']
};

var other = {
  'fruits': ['banana'],
  'vegetables': ['carrot']
};

_.merge(object, other, function(a, b) {
  return _.isArray(a) ? a.concat(b) : undefined;
});
// => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_omitobject-predicate-thisarg"></a>`_.omit(object, [predicate], [thisArg])`
<a href="#_omitobject-predicate-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9334 "View in source") [&#x24C9;][1]

The opposite of `_.pick`; this method creates an object composed of the
own and inherited enumerable properties of `object` that are not omitted.
Property names may be specified as individual arguments or as arrays of
property names. If `predicate` is provided it is invoked for each property
of `object` omitting the properties `predicate` returns truthy for. The
predicate is bound to `thisArg` and invoked with three arguments;
(value, key, object).

#### Arguments
1. `object` *(Object)*: The source object.
2. `[predicate]` *(Function|...(string|string&#91;&#93;)*: The function invoked per iteration or property names to omit, specified as individual property names or arrays of property names.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Object)*:  Returns the new object.

#### Example
```js
var object = { 'user': 'fred', 'age': 40 };

_.omit(object, 'age');
// => { 'user': 'fred' }

_.omit(object, _.isNumber);
// => { 'user': 'fred' }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_pairsobject"></a>`_.pairs(object)`
<a href="#_pairsobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9362 "View in source") [&#x24C9;][1]

Creates a two dimensional array of the key-value pairs for `object`,
e.g. `[[key1, value1], [key2, value2]]`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*:  Returns the new array of key-value pairs.

#### Example
```js
_.pairs({ 'barney': 36, 'fred': 40 });
// => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_pickobject-predicate-thisarg"></a>`_.pick(object, [predicate], [thisArg])`
<a href="#_pickobject-predicate-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9401 "View in source") [&#x24C9;][1]

Creates an object composed of the picked `object` properties. Property
names may be specified as individual arguments or as arrays of property
names. If `predicate` is provided it is invoked for each property of `object`
picking the properties `predicate` returns truthy for. The predicate is
bound to `thisArg` and invoked with three arguments; (value, key, object).

#### Arguments
1. `object` *(Object)*: The source object.
2. `[predicate]` *(Function|...(string|string&#91;&#93;)*: The function invoked per iteration or property names to pick, specified as individual property names or arrays of property names.
3. `[thisArg]` *(&#42;)*: The `this` binding of `predicate`.

#### Returns
*(Object)*:  Returns the new object.

#### Example
```js
var object = { 'user': 'fred', 'age': 40 };

_.pick(object, 'user');
// => { 'user': 'fred' }

_.pick(object, _.isString);
// => { 'user': 'fred' }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_resultobject-key-defaultvalue"></a>`_.result(object, key, [defaultValue])`
<a href="#_resultobject-key-defaultvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9440 "View in source") [&#x24C9;][1]

Resolves the value of property `key` on `object`. If the value of `key` is
a function it is invoked with the `this` binding of `object` and its result
is returned, else the property value is returned. If the property value is
`undefined` the `defaultValue` is used in its place.

#### Arguments
1. `object` *(Object)*: The object to query.
2. `key` *(string)*: The key of the property to resolve.
3. `[defaultValue]` *(&#42;)*: The value returned if the property value resolves to `undefined`.

#### Returns
*(&#42;)*:  Returns the resolved value.

#### Example
```js
var object = { 'user': 'fred', 'age': _.constant(40) };

_.result(object, 'user');
// => 'fred'

_.result(object, 'age');
// => 40

_.result(object, 'status', 'busy');
// => 'busy'

_.result(object, 'status', _.constant('busy'));
// => 'busy'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_transformobject-iteratee_identity-accumulator-thisarg"></a>`_.transform(object, [iteratee=_.identity], [accumulator], [thisArg])`
<a href="#_transformobject-iteratee_identity-accumulator-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9479 "View in source") [&#x24C9;][1]

An alternative to `_.reduce`; this method transforms `object` to a new
`accumulator` object which is the result of running each of its own enumerable
properties through `iteratee`, with each invocation potentially mutating
the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
with four arguments; (accumulator, value, key, object). Iterator functions
may exit iteration early by explicitly returning `false`.

#### Arguments
1. `object` *(Array|Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[accumulator]` *(&#42;)*: The custom accumulator value.
4. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(&#42;)*:  Returns the accumulated value.

#### Example
```js
var squares = _.transform([1, 2, 3, 4, 5, 6], function(result, n) {
  n *= n;
  if (n % 2) {
    return result.push(n) < 3;
  }
});
// => [1, 9, 25]

var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, n, key) {
  result[key] = n * 3;
});
// => { 'a': 3, 'b': 6, 'c': 9 }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_valuesobject"></a>`_.values(object)`
<a href="#_valuesobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9526 "View in source") [&#x24C9;][1]

Creates an array of the own enumerable property values of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects.

#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*:  Returns the array of property values.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.values(new Foo);
// => [1, 2] (iteration order is not guaranteed)

_.values('hi');
// => ['h', 'i']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_valuesinobject"></a>`_.valuesIn(object)`
<a href="#_valuesinobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9553 "View in source") [&#x24C9;][1]

Creates an array of the own and inherited enumerable property values
of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects.

#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*:  Returns the array of property values.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.valuesIn(new Foo);
// => [1, 2, 3] (iteration order is not guaranteed)
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“String” Methods`

<!-- div -->

### <a id="_camelcasestring"></a>`_.camelCase([string=''])`
<a href="#_camelcasestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9643 "View in source") [&#x24C9;][1]

Converts `string` to camel case.
See [Wikipedia](https://en.wikipedia.org/wiki/CamelCase) for more details.

#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*:  Returns the camel cased string.

#### Example
```js
_.camelCase('Foo Bar');
// => 'fooBar'

_.camelCase('--foo-bar');
// => 'fooBar'

_.camelCase('__foo_bar__');
// => 'fooBar'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_capitalizestring"></a>`_.capitalize([string=''])`
<a href="#_capitalizestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9661 "View in source") [&#x24C9;][1]

Capitalizes the first character of `string`.

#### Arguments
1. `[string='']` *(string)*: The string to capitalize.

#### Returns
*(string)*:  Returns the capitalized string.

#### Example
```js
_.capitalize('fred');
// => 'Fred'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_deburrstring"></a>`_.deburr([string=''])`
<a href="#_deburrstring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9681 "View in source") [&#x24C9;][1]

Deburrs `string` by converting latin-1 supplementary letters to basic latin letters.
See [Wikipedia](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
for more details.

#### Arguments
1. `[string='']` *(string)*: The string to deburr.

#### Returns
*(string)*:  Returns the deburred string.

#### Example
```js
_.deburr('déjà vu');
// => 'deja vu'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_endswithstring-target-positionstringlength"></a>`_.endsWith([string=''], [target], [position=string.length])`
<a href="#_endswithstring-target-positionstringlength">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9707 "View in source") [&#x24C9;][1]

Checks if `string` ends with the given target string.

#### Arguments
1. `[string='']` *(string)*: The string to search.
2. `[target]` *(string)*: The string to search for.
3. `[position=string.length]` *(number)*: The position to search from.

#### Returns
*(boolean)*:  Returns `true` if `string` ends with `target`, else `false`.

#### Example
```js
_.endsWith('abc', 'c');
// => true

_.endsWith('abc', 'b');
// => false

_.endsWith('abc', 'b', 2);
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_escapestring"></a>`_.escape([string=''])`
<a href="#_escapestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9748 "View in source") [&#x24C9;][1]

Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
their corresponding HTML entities.
<br>
<br>
**Note:** No other characters are escaped. To escape additional characters
use a third-party library like [_he_](https://mths.be/he).
<br>
<br>
Though the ">" character is escaped for symmetry, characters like
">" and "/" don't require escaping in HTML and have no special meaning
unless they're part of a tag or unquoted attribute value.
See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
(under "semi-related fun fact") for more details.
<br>
<br>
Backticks are escaped because in Internet Explorer < 9, they can break out
of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
[#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
<br>
<br>
When working with HTML you should always quote attribute values to reduce
XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
for more details.

#### Arguments
1. `[string='']` *(string)*: The string to escape.

#### Returns
*(string)*:  Returns the escaped string.

#### Example
```js
_.escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_escaperegexpstring"></a>`_.escapeRegExp([string=''])`
<a href="#_escaperegexpstring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9770 "View in source") [&#x24C9;][1]

Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
"+", "(", ")", "[", "]", "{" and "}" in `string`.

#### Arguments
1. `[string='']` *(string)*: The string to escape.

#### Returns
*(string)*:  Returns the escaped string.

#### Example
```js
_.escapeRegExp('[lodash](https://lodash.com/)');
// => '\[lodash\]\(https://lodash\.com/\)'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_kebabcasestring"></a>`_.kebabCase([string=''])`
<a href="#_kebabcasestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9798 "View in source") [&#x24C9;][1]

Converts `string` to kebab case (a.k.a. spinal case).
See [Wikipedia](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) for
more details.

#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*:  Returns the kebab cased string.

#### Example
```js
_.kebabCase('Foo Bar');
// => 'foo-bar'

_.kebabCase('fooBar');
// => 'foo-bar'

_.kebabCase('__foo_bar__');
// => 'foo-bar'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_padstring-length0-chars"></a>`_.pad([string=''], [length=0], [chars=' '])`
<a href="#_padstring-length0-chars">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9825 "View in source") [&#x24C9;][1]

Pads `string` on the left and right sides if it is shorter then the given
padding length. The `chars` string may be truncated if the number of padding
characters can't be evenly divided by the padding length.

#### Arguments
1. `[string='']` *(string)*: The string to pad.
2. `[length=0]` *(number)*: The padding length.
3. `[chars=' ']` *(string)*: The string used as padding.

#### Returns
*(string)*:  Returns the padded string.

#### Example
```js
_.pad('abc', 8);
// => '  abc   '

_.pad('abc', 8, '_-');
// => '_-abc_-_'

_.pad('abc', 3);
// => 'abc'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_padleftstring-length0-chars"></a>`_.padLeft([string=''], [length=0], [chars=' '])`
<a href="#_padleftstring-length0-chars">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9864 "View in source") [&#x24C9;][1]

Pads `string` on the left side if it is shorter then the given padding
length. The `chars` string may be truncated if the number of padding
characters exceeds the padding length.

#### Arguments
1. `[string='']` *(string)*: The string to pad.
2. `[length=0]` *(number)*: The padding length.
3. `[chars=' ']` *(string)*: The string used as padding.

#### Returns
*(string)*:  Returns the padded string.

#### Example
```js
_.padLeft('abc', 6);
// => '   abc'

_.padLeft('abc', 6, '_-');
// => '_-_abc'

_.padLeft('abc', 3);
// => 'abc'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_padrightstring-length0-chars"></a>`_.padRight([string=''], [length=0], [chars=' '])`
<a href="#_padrightstring-length0-chars">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9892 "View in source") [&#x24C9;][1]

Pads `string` on the right side if it is shorter then the given padding
length. The `chars` string may be truncated if the number of padding
characters exceeds the padding length.

#### Arguments
1. `[string='']` *(string)*: The string to pad.
2. `[length=0]` *(number)*: The padding length.
3. `[chars=' ']` *(string)*: The string used as padding.

#### Returns
*(string)*:  Returns the padded string.

#### Example
```js
_.padRight('abc', 6);
// => 'abc   '

_.padRight('abc', 6, '_-');
// => 'abc_-_'

_.padRight('abc', 3);
// => 'abc'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_parseintstring-radix"></a>`_.parseInt(string, [radix])`
<a href="#_parseintstring-radix">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9920 "View in source") [&#x24C9;][1]

Converts `string` to an integer of the specified radix. If `radix` is
`undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
in which case a `radix` of `16` is used.
<br>
<br>
**Note:** This method aligns with the ES5 implementation of `parseInt`.
See the [ES5 spec](https://es5.github.io/#E) for more details.

#### Arguments
1. `string` *(string)*: The string to convert.
2. `[radix]` *(number)*: The radix to interpret `value` by.

#### Returns
*(number)*:  Returns the converted integer.

#### Example
```js
_.parseInt('08');
// => 8

_.map(['6', '08', '10'], _.parseInt);
// => [6, 8, 10]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_repeatstring-n0"></a>`_.repeat([string=''], [n=0])`
<a href="#_repeatstring-n0">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L9962 "View in source") [&#x24C9;][1]

Repeats the given string `n` times.

#### Arguments
1. `[string='']` *(string)*: The string to repeat.
2. `[n=0]` *(number)*: The number of times to repeat the string.

#### Returns
*(string)*:  Returns the repeated string.

#### Example
```js
_.repeat('*', 3);
// => '***'

_.repeat('abc', 2);
// => 'abcabc'

_.repeat('abc', 0);
// => ''
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_snakecasestring"></a>`_.snakeCase([string=''])`
<a href="#_snakecasestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10002 "View in source") [&#x24C9;][1]

Converts `string` to snake case.
See [Wikipedia](https://en.wikipedia.org/wiki/Snake_case) for more details.

#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*:  Returns the snake cased string.

#### Example
```js
_.snakeCase('Foo Bar');
// => 'foo_bar'

_.snakeCase('fooBar');
// => 'foo_bar'

_.snakeCase('--foo-bar');
// => 'foo_bar'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_startcasestring"></a>`_.startCase([string=''])`
<a href="#_startcasestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10027 "View in source") [&#x24C9;][1]

Converts `string` to start case.
See [Wikipedia](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage)
for more details.

#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*:  Returns the start cased string.

#### Example
```js
_.startCase('--foo-bar');
// => 'Foo Bar'

_.startCase('fooBar');
// => 'Foo Bar'

_.startCase('__foo_bar__');
// => 'Foo Bar'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_startswithstring-target-position0"></a>`_.startsWith([string=''], [target], [position=0])`
<a href="#_startswithstring-target-position0">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10052 "View in source") [&#x24C9;][1]

Checks if `string` starts with the given target string.

#### Arguments
1. `[string='']` *(string)*: The string to search.
2. `[target]` *(string)*: The string to search for.
3. `[position=0]` *(number)*: The position to search from.

#### Returns
*(boolean)*:  Returns `true` if `string` starts with `target`, else `false`.

#### Example
```js
_.startsWith('abc', 'a');
// => true

_.startsWith('abc', 'b');
// => false

_.startsWith('abc', 'b', 1);
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_templatestring-options"></a>`_.template([string=''], [options])`
<a href="#_templatestring-options">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10154 "View in source") [&#x24C9;][1]

Creates a compiled template function that can interpolate data properties
in "interpolate" delimiters, HTML-escape interpolated data properties in
"escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
properties may be accessed as free variables in the template. If a setting
object is provided it takes precedence over `_.templateSettings` values.
<br>
<br>
**Note:** In the development build `_.template` utilizes sourceURLs for easier debugging.
See the [HTML5 Rocks article on sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
for more details.
<br>
<br>
For more information on precompiling templates see
[lodash's custom builds documentation](https://lodash.com/custom-builds).
<br>
<br>
For more information on Chrome extension sandboxes see
[Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).

#### Arguments
1. `[string='']` *(string)*: The template string.
2. `[options]` *(Object)*: The options object.
3. `[options.escape]` *(RegExp)*: The HTML "escape" delimiter.
4. `[options.evaluate]` *(RegExp)*: The "evaluate" delimiter.
5. `[options.imports]` *(Object)*: An object to import into the template as free variables.
6. `[options.interpolate]` *(RegExp)*: The "interpolate" delimiter.
7. `[options.sourceURL]` *(string)*: The sourceURL of the template's compiled source.
8. `[options.variable]` *(string)*: The data object variable name.

#### Returns
*(Function)*:  Returns the compiled template function.

#### Example
```js
// using the "interpolate" delimiter to create a compiled template
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'

// using the HTML "escape" delimiter to escape data property values
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'

// using the "evaluate" delimiter to execute JavaScript and generate HTML
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'

// using the internal `print` function in "evaluate" delimiters
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'

// using the ES delimiter as an alternative to the default "interpolate" delimiter
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'

// using custom template delimiters
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'

// using backslashes to treat delimiters as plain text
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'

// using the `imports` option to import `jQuery` as `jq`
var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'

// using the `sourceURL` option to specify a custom sourceURL for the template
var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector

// using the `variable` option to ensure a with-statement isn't used in the compiled template
var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
compiled.source;
// => function(data) {
  var __t, __p = '';
  __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
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

### <a id="_trimstring-charswhitespace"></a>`_.trim([string=''], [chars=whitespace])`
<a href="#_trimstring-charswhitespace">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10281 "View in source") [&#x24C9;][1]

Removes leading and trailing whitespace or specified characters from `string`.

#### Arguments
1. `[string='']` *(string)*: The string to trim.
2. `[chars=whitespace]` *(string)*: The characters to trim.

#### Returns
*(string)*:  Returns the trimmed string.

#### Example
```js
_.trim('  abc  ');
// => 'abc'

_.trim('-_-abc-_-', '_-');
// => 'abc'

_.map(['  foo  ', '  bar  '], _.trim);
// => ['foo', 'bar]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_trimleftstring-charswhitespace"></a>`_.trimLeft([string=''], [chars=whitespace])`
<a href="#_trimleftstring-charswhitespace">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10312 "View in source") [&#x24C9;][1]

Removes leading whitespace or specified characters from `string`.

#### Arguments
1. `[string='']` *(string)*: The string to trim.
2. `[chars=whitespace]` *(string)*: The characters to trim.

#### Returns
*(string)*:  Returns the trimmed string.

#### Example
```js
_.trimLeft('  abc  ');
// => 'abc  '

_.trimLeft('-_-abc-_-', '_-');
// => 'abc-_-'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_trimrightstring-charswhitespace"></a>`_.trimRight([string=''], [chars=whitespace])`
<a href="#_trimrightstring-charswhitespace">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10342 "View in source") [&#x24C9;][1]

Removes trailing whitespace or specified characters from `string`.

#### Arguments
1. `[string='']` *(string)*: The string to trim.
2. `[chars=whitespace]` *(string)*: The characters to trim.

#### Returns
*(string)*:  Returns the trimmed string.

#### Example
```js
_.trimRight('  abc  ');
// => '  abc'

_.trimRight('-_-abc-_-', '_-');
// => '-_-abc'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_truncstring-options-optionslength30-optionsomission-optionsseparator"></a>`_.trunc([string=''], [options], [options.length=30], [options.omission='...'], [options.separator])`
<a href="#_truncstring-options-optionslength30-optionsomission-optionsseparator">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10386 "View in source") [&#x24C9;][1]

Truncates `string` if it is longer than the given maximum string length.
The last characters of the truncated string are replaced with the omission
string which defaults to "...".

#### Arguments
1. `[string='']` *(string)*: The string to truncate.
2. `[options]` *(Object|number)*: The options object or maximum string length.
3. `[options.length=30]` *(number)*: The maximum string length.
4. `[options.omission='...']` *(string)*: The string to indicate text is omitted.
5. `[options.separator]` *(RegExp|string)*: The separator pattern to truncate to.

#### Returns
*(string)*:  Returns the truncated string.

#### Example
```js
_.trunc('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'

_.trunc('hi-diddly-ho there, neighborino', 24);
// => 'hi-diddly-ho there, n...'

_.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': ' ' });
// => 'hi-diddly-ho there,...'

_.trunc('hi-diddly-ho there, neighborino', { 'length': 24, 'separator': /,? +/ });
//=> 'hi-diddly-ho there...'

_.trunc('hi-diddly-ho there, neighborino', { 'omission': ' [...]' });
// => 'hi-diddly-ho there, neig [...]'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_unescapestring"></a>`_.unescape([string=''])`
<a href="#_unescapestring">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10456 "View in source") [&#x24C9;][1]

The inverse of `_.escape`; this method converts the HTML entities
`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
corresponding characters.
<br>
<br>
**Note:** No other HTML entities are unescaped. To unescape additional HTML
entities use a third-party library like [_he_](https://mths.be/he).

#### Arguments
1. `[string='']` *(string)*: The string to unescape.

#### Returns
*(string)*:  Returns the unescaped string.

#### Example
```js
_.unescape('fred, barney, &amp; pebbles');
// => 'fred, barney, & pebbles'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_wordsstring-pattern"></a>`_.words([string=''], [pattern])`
<a href="#_wordsstring-pattern">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10481 "View in source") [&#x24C9;][1]

Splits `string` into an array of its words.

#### Arguments
1. `[string='']` *(string)*: The string to inspect.
2. `[pattern]` *(RegExp|string)*: The pattern to match words.

#### Returns
*(Array)*:  Returns the words of `string`.

#### Example
```js
_.words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

_.words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Utility” Methods`

<!-- div -->

### <a id="_attemptfunc"></a>`_.attempt(func)`
<a href="#_attemptfunc">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10511 "View in source") [&#x24C9;][1]

Attempts to invoke `func`, returning either the result or the caught error
object. Any additional arguments are provided to `func` when it is invoked.

#### Arguments
1. `func` *(&#42;)*: The function to attempt.

#### Returns
*(&#42;)*:  Returns the `func` result or error object.

#### Example
```js
// avoid throwing errors for invalid selectors
var elements = _.attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');

if (_.isError(elements)) {
  elements = [];
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_callbackfunc_identity-thisarg"></a>`_.callback([func=_.identity], [thisArg])`
<a href="#_callbackfunc_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10555 "View in source") [&#x24C9;][1]

Creates a function that invokes `func` with the `this` binding of `thisArg`
and arguments of the created function. If `func` is a property name the
created callback returns the property value for a given element. If `func`
is an object the created callback returns `true` for elements that contain
the equivalent object properties, otherwise it returns `false`.

#### Arguments
1. `[func=_.identity]` *(&#42;)*: The value to convert to a callback.
2. `[thisArg]` *(&#42;)*: The `this` binding of `func`.

#### Returns
*(Function)*:  Returns the callback.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

// wrap to create custom callback shorthands
_.callback = _.wrap(_.callback, function(callback, func, thisArg) {
  var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
  if (!match) {
    return callback(func, thisArg);
  }
  return function(object) {
    return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
  };
});

_.filter(users, 'age__gt36');
// => [{ 'user': 'fred', 'age': 40 }]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_constantvalue"></a>`_.constant(value)`
<a href="#_constantvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10579 "View in source") [&#x24C9;][1]

Creates a function that returns `value`.

#### Arguments
1. `value` *(&#42;)*: The value to return from the new function.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var object = { 'user': 'fred' };
var getter = _.constant(object);
getter() === object;
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_identityvalue"></a>`_.identity(value)`
<a href="#_identityvalue">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10599 "View in source") [&#x24C9;][1]

This method returns the first argument provided to it.

#### Arguments
1. `value` *(&#42;)*: Any value.

#### Returns
*(&#42;)*:  Returns `value`.

#### Example
```js
var object = { 'user': 'fred' };
_.identity(object) === object;
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_matchessource"></a>`_.matches(source)`
<a href="#_matchessource">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10628 "View in source") [&#x24C9;][1]

Creates a function which performs a deep comparison between a given object
and `source`, returning `true` if the given object has equivalent property
values, else `false`.
<br>
<br>
**Note:** This method supports comparing arrays, booleans, `Date` objects,
numbers, `Object` objects, regexes, and strings. Objects are compared by
their own, not inherited, enumerable properties. For comparing a single
own or inherited property value see `_.matchesProperty`.

#### Arguments
1. `source` *(Object)*: The object of property values to match.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

_.filter(users, _.matches({ 'age': 40, 'active': false }));
// => [{ 'user': 'fred', 'age': 40, 'active': false }]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_matchespropertykey-value"></a>`_.matchesProperty(key, value)`
<a href="#_matchespropertykey-value">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10657 "View in source") [&#x24C9;][1]

Creates a function which compares the property value of `key` on a given
object to `value`.
<br>
<br>
**Note:** This method supports comparing arrays, booleans, `Date` objects,
numbers, `Object` objects, regexes, and strings. Objects are compared by
their own, not inherited, enumerable properties.

#### Arguments
1. `key` *(string)*: The key of the property to get.
2. `value` *(&#42;)*: The value to compare.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' },
  { 'user': 'pebbles' }
];

_.find(users, _.matchesProperty('user', 'fred'));
// => { 'user': 'fred', 'age': 40 }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_mixinobjectthis-source-options"></a>`_.mixin([object=this], source, [options])`
<a href="#_mixinobjectthis-source-options">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10697 "View in source") [&#x24C9;][1]

Adds all own enumerable function properties of a source object to the
destination object. If `object` is a function then methods are added to
its prototype as well.

#### Arguments
1. `[object=this]` *(Function|Object)*: object The destination object.
2. `source` *(Object)*: The object of functions to add.
3. `[options]` *(Object)*: The options object.
4. `[options.chain=true]` *(boolean)*: Specify whether the functions added are chainable.

#### Returns
*(Function|Object)*:  Returns `object`.

#### Example
```js
function vowels(string) {
  return _.filter(string, function(v) {
    return /[aeiou]/i.test(v);
  });
}

// use `_.runInContext` to avoid potential conflicts (esp. in Node.js)
var _ = require('lodash').runInContext();

_.mixin({ 'vowels': vowels });
_.vowels('fred');
// => ['e']

_('fred').vowels().value();
// => ['e']

_.mixin({ 'vowels': vowels }, { 'chain': false });
_('fred').vowels();
// => ['e']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_noconflict"></a>`_.noConflict()`
<a href="#_noconflict">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10760 "View in source") [&#x24C9;][1]

Reverts the `_` variable to its previous value and returns a reference to
the `lodash` function.

#### Returns
*(Function)*:  Returns the `lodash` function.

#### Example
```js
var lodash = _.noConflict();
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_noop"></a>`_.noop()`
<a href="#_noop">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10777 "View in source") [&#x24C9;][1]

A no-operation function.

#### Example
```js
var object = { 'user': 'fred' };
_.noop(object) === undefined;
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_propertykey"></a>`_.property(key)`
<a href="#_propertykey">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10804 "View in source") [&#x24C9;][1]

Creates a function which returns the property value of `key` on a given object.

#### Arguments
1. `key` *(string)*: The key of the property to get.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var users = [
  { 'user': 'fred' },
  { 'user': 'barney' }
];

var getName = _.property('user');

_.map(users, getName);
// => ['fred', barney']

_.pluck(_.sortBy(users, getName), 'user');
// => ['barney', 'fred']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_propertyofobject"></a>`_.propertyOf(object)`
<a href="#_propertyofobject">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10827 "View in source") [&#x24C9;][1]

The inverse of `_.property`; this method creates a function which returns
the property value of a given key on `object`.

#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Function)*:  Returns the new function.

#### Example
```js
var object = { 'user': 'fred', 'age': 40, 'active': true };
_.map(['active', 'user'], _.propertyOf(object));
// => [true, 'fred']

var object = { 'a': 3, 'b': 1, 'c': 2 };
_.sortBy(['a', 'b', 'c'], _.propertyOf(object));
// => ['b', 'c', 'a']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_rangestart0-end-step1"></a>`_.range([start=0], end, [step=1])`
<a href="#_rangestart0-end-step1">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10865 "View in source") [&#x24C9;][1]

Creates an array of numbers (positive and/or negative) progressing from
`start` up to, but not including, `end`. If `start` is less than `end` a
zero-length range is created unless a negative `step` is specified.

#### Arguments
1. `[start=0]` *(number)*: The start of the range.
2. `end` *(number)*: The end of the range.
3. `[step=1]` *(number)*: The value to increment or decrement by.

#### Returns
*(Array)*:  Returns the new array of numbers.

#### Example
```js
_.range(4);
// => [0, 1, 2, 3]

_.range(1, 5);
// => [1, 2, 3, 4]

_.range(0, 20, 5);
// => [0, 5, 10, 15]

_.range(0, -4, -1);
// => [0, -1, -2, -3]

_.range(1, 4, 0);
// => [1, 1, 1]

_.range(0);
// => []
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_runincontextcontextroot"></a>`_.runInContext([context=root])`
<a href="#_runincontextcontextroot">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L689 "View in source") [&#x24C9;][1]

Create a new pristine `lodash` function using the given `context` object.

#### Arguments
1. `[context=root]` *(Object)*: The context object.

#### Returns
*(Function)*:  Returns a new `lodash` function.

#### Example
```js
_.mixin({ 'add': function(a, b) { return a + b; } });

var lodash = _.runInContext();
lodash.mixin({ 'sub': function(a, b) { return a - b; } });

_.isFunction(_.add);
// => true
_.isFunction(_.sub);
// => false

lodash.isFunction(lodash.add);
// => false
lodash.isFunction(lodash.sub);
// => true

// using `context` to mock `Date#getTime` use in `_.now`
var mock = _.runInContext({
  'Date': function() {
    return { 'getTime': getTimeMock };
  }
});

// or creating a suped-up `defer` in Node.js
var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_timesn-iteratee_identity-thisarg"></a>`_.times(n, [iteratee=_.identity], [thisArg])`
<a href="#_timesn-iteratee_identity-thisarg">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10914 "View in source") [&#x24C9;][1]

Invokes the iteratee function `n` times, returning an array of the results
of each invocation. The `iteratee` is bound to `thisArg` and invoked with
one argument; (index).

#### Arguments
1. `n` *(number)*: The number of times to invoke `iteratee`.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[thisArg]` *(&#42;)*: The `this` binding of `iteratee`.

#### Returns
*(Array)*:  Returns the array of results.

#### Example
```js
var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
// => [3, 6, 4]

_.times(3, function(n) { mage.castSpell(n); });
// => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2` respectively

_.times(3, function(n) { this.cast(n); }, mage);
// => also invokes `mage.castSpell(n)` three times
```
* * *

<!-- /div -->

<!-- div -->

### <a id="_uniqueidprefix"></a>`_.uniqueId([prefix])`
<a href="#_uniqueidprefix">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L10952 "View in source") [&#x24C9;][1]

Generates a unique ID. If `prefix` is provided the ID is appended to it.

#### Arguments
1. `[prefix]` *(string)*: The value to prefix the ID with.

#### Returns
*(string)*:  Returns the unique ID.

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
<a href="#_templatesettingsimports_">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1164 "View in source") [&#x24C9;][1]

A reference to the `lodash` function.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

### <a id="_version"></a>`_.VERSION`
<a href="#_version">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L11220 "View in source") [&#x24C9;][1]

(string): The semantic version number.

* * *

<!-- /div -->

<!-- div -->

### <a id="_support"></a>`_.support`
<a href="#_support">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L953 "View in source") [&#x24C9;][1]

(Object): An object environment feature flags.

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportargstag"></a>`_.support.argsTag`
<a href="#_supportargstag">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L970 "View in source") [&#x24C9;][1]

(boolean): Detect if the `toStringTag` of `arguments` objects is resolvable
(all but Firefox < 4, IE < 9).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportenumerrorprops"></a>`_.support.enumErrorProps`
<a href="#_supportenumerrorprops">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L979 "View in source") [&#x24C9;][1]

(boolean): Detect if `name` or `message` properties of `Error.prototype` are
enumerable by default (IE < 9, Safari < 5.1).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportenumprototypes"></a>`_.support.enumPrototypes`
<a href="#_supportenumprototypes">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L993 "View in source") [&#x24C9;][1]

(boolean): Detect if `prototype` properties are enumerable by default.
<br>
<br>
Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
(if the prototype or a property on the prototype has been set)
incorrectly set the `[[Enumerable]]` value of a function's `prototype`
property to `true`.

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportfuncdecomp"></a>`_.support.funcDecomp`
<a href="#_supportfuncdecomp">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1003 "View in source") [&#x24C9;][1]

(boolean): Detect if functions can be decompiled by `Function#toString`
(all but Firefox OS certified apps, older Opera mobile browsers, and
the PlayStation 3; forced `false` for Windows 8 apps).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportfuncnames"></a>`_.support.funcNames`
<a href="#_supportfuncnames">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1011 "View in source") [&#x24C9;][1]

(boolean): Detect if `Function#name` is supported (all but IE).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportnodetag"></a>`_.support.nodeTag`
<a href="#_supportnodetag">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1019 "View in source") [&#x24C9;][1]

(boolean): Detect if the `toStringTag` of DOM nodes is resolvable (all but IE < 9).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportnonenumshadows"></a>`_.support.nonEnumShadows`
<a href="#_supportnonenumshadows">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1040 "View in source") [&#x24C9;][1]

(boolean): Detect if properties shadowing those on `Object.prototype` are
non-enumerable.
<br>
<br>
In IE < 9 an object's own properties, shadowing non-enumerable ones,
are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportnonenumstrings"></a>`_.support.nonEnumStrings`
<a href="#_supportnonenumstrings">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1028 "View in source") [&#x24C9;][1]

(boolean): Detect if string indexes are non-enumerable
(IE < 9, RingoJS, Rhino, Narwhal).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportownlast"></a>`_.support.ownLast`
<a href="#_supportownlast">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1048 "View in source") [&#x24C9;][1]

(boolean): Detect if own properties are iterated after inherited properties (IE < 9).

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportspliceobjects"></a>`_.support.spliceObjects`
<a href="#_supportspliceobjects">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1063 "View in source") [&#x24C9;][1]

(boolean): Detect if `Array#shift` and `Array#splice` augment array-like objects
correctly.
<br>
<br>
Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array `shift()`
and `splice()` functions that fail to remove the last element, `value[0]`,
of array-like objects even though the `length` property is set to `0`.
The `shift()` method is buggy in compatibility modes of IE 8, while `splice()`
is buggy regardless of mode in IE < 9.

* * *

<!-- /div -->

<!-- div -->

### <a id="_supportunindexedchars"></a>`_.support.unindexedChars`
<a href="#_supportunindexedchars">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1074 "View in source") [&#x24C9;][1]

(boolean): Detect lack of support for accessing string characters by index.
<br>
<br>
IE < 8 can't access characters by index. IE 8 can only access characters
by index on string literals, not string objects.

* * *

<!-- /div -->

<!-- div -->

### <a id="_templatesettings"></a>`_.templateSettings`
<a href="#_templatesettings">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1116 "View in source") [&#x24C9;][1]

(Object): By default, the template delimiters used by lodash are like those in
embedded Ruby (ERB). Change the following template settings to use
alternative delimiters.

* * *

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsescape"></a>`_.templateSettings.escape`
<a href="#_templatesettingsescape">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1124 "View in source") [&#x24C9;][1]

(RegExp): Used to detect `data` property values to be HTML-escaped.

* * *

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsevaluate"></a>`_.templateSettings.evaluate`
<a href="#_templatesettingsevaluate">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1132 "View in source") [&#x24C9;][1]

(RegExp): Used to detect code to be evaluated.

* * *

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsimports"></a>`_.templateSettings.imports`
<a href="#_templatesettingsimports">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1156 "View in source") [&#x24C9;][1]

(Object): Used to import variables into the compiled template.

* * *

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsinterpolate"></a>`_.templateSettings.interpolate`
<a href="#_templatesettingsinterpolate">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1140 "View in source") [&#x24C9;][1]

(RegExp): Used to detect `data` property values to inject.

* * *

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsvariable"></a>`_.templateSettings.variable`
<a href="#_templatesettingsvariable">#</a> [&#x24C8;](https://github.com/lodash/lodash/blob/3.2.0/lodash.src.js#L1148 "View in source") [&#x24C9;][1]

(string): Used to reference the data object in the template text.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #array "Jump back to the TOC."
