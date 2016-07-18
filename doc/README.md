# <a href="https://lodash.com/">lodash</a> <span>v4.14.0</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Array`
* <a href="#_chunkarray-size1">`_.chunk`</a>
* <a href="#_compactarray">`_.compact`</a>
* <a href="#_concatarray-values">`_.concat`</a>
* <a href="#_differencearray-values">`_.difference`</a>
* <a href="#_differencebyarray-values-iteratee_identity">`_.differenceBy`</a>
* <a href="#_differencewitharray-values-comparator">`_.differenceWith`</a>
* <a href="#_droparray-n1">`_.drop`</a>
* <a href="#_droprightarray-n1">`_.dropRight`</a>
* <a href="#_droprightwhilearray-predicate_identity">`_.dropRightWhile`</a>
* <a href="#_dropwhilearray-predicate_identity">`_.dropWhile`</a>
* <a href="#_fillarray-value-start0-endarraylength">`_.fill`</a>
* <a href="#_findindexarray-predicate_identity-fromindex0">`_.findIndex`</a>
* <a href="#_findlastindexarray-predicate_identity-fromindexarraylength-1">`_.findLastIndex`</a>
* <a href="#_headarray" class="alias">`_.first` -> `head`</a>
* <a href="#_flattenarray">`_.flatten`</a>
* <a href="#_flattendeeparray">`_.flattenDeep`</a>
* <a href="#_flattendeptharray-depth1">`_.flattenDepth`</a>
* <a href="#_frompairspairs">`_.fromPairs`</a>
* <a href="#_headarray">`_.head`</a>
* <a href="#_indexofarray-value-fromindex0">`_.indexOf`</a>
* <a href="#_initialarray">`_.initial`</a>
* <a href="#_intersectionarrays">`_.intersection`</a>
* <a href="#_intersectionbyarrays-iteratee_identity">`_.intersectionBy`</a>
* <a href="#_intersectionwitharrays-comparator">`_.intersectionWith`</a>
* <a href="#_joinarray-separator-">`_.join`</a>
* <a href="#_lastarray">`_.last`</a>
* <a href="#_lastindexofarray-value-fromindexarraylength-1">`_.lastIndexOf`</a>
* <a href="#_ntharray-n0">`_.nth`</a>
* <a href="#_pullarray-values">`_.pull`</a>
* <a href="#_pullallarray-values">`_.pullAll`</a>
* <a href="#_pullallbyarray-values-iteratee_identity">`_.pullAllBy`</a>
* <a href="#_pullallwitharray-values-comparator">`_.pullAllWith`</a>
* <a href="#_pullatarray-indexes">`_.pullAt`</a>
* <a href="#_removearray-predicate_identity">`_.remove`</a>
* <a href="#_reversearray">`_.reverse`</a>
* <a href="#_slicearray-start0-endarraylength">`_.slice`</a>
* <a href="#_sortedindexarray-value">`_.sortedIndex`</a>
* <a href="#_sortedindexbyarray-value-iteratee_identity">`_.sortedIndexBy`</a>
* <a href="#_sortedindexofarray-value">`_.sortedIndexOf`</a>
* <a href="#_sortedlastindexarray-value">`_.sortedLastIndex`</a>
* <a href="#_sortedlastindexbyarray-value-iteratee_identity">`_.sortedLastIndexBy`</a>
* <a href="#_sortedlastindexofarray-value">`_.sortedLastIndexOf`</a>
* <a href="#_sorteduniqarray">`_.sortedUniq`</a>
* <a href="#_sorteduniqbyarray-iteratee">`_.sortedUniqBy`</a>
* <a href="#_tailarray">`_.tail`</a>
* <a href="#_takearray-n1">`_.take`</a>
* <a href="#_takerightarray-n1">`_.takeRight`</a>
* <a href="#_takerightwhilearray-predicate_identity">`_.takeRightWhile`</a>
* <a href="#_takewhilearray-predicate_identity">`_.takeWhile`</a>
* <a href="#_unionarrays">`_.union`</a>
* <a href="#_unionbyarrays-iteratee_identity">`_.unionBy`</a>
* <a href="#_unionwitharrays-comparator">`_.unionWith`</a>
* <a href="#_uniqarray">`_.uniq`</a>
* <a href="#_uniqbyarray-iteratee_identity">`_.uniqBy`</a>
* <a href="#_uniqwitharray-comparator">`_.uniqWith`</a>
* <a href="#_unziparray">`_.unzip`</a>
* <a href="#_unzipwitharray-iteratee_identity">`_.unzipWith`</a>
* <a href="#_withoutarray-values">`_.without`</a>
* <a href="#_xorarrays">`_.xor`</a>
* <a href="#_xorbyarrays-iteratee_identity">`_.xorBy`</a>
* <a href="#_xorwitharrays-comparator">`_.xorWith`</a>
* <a href="#_ziparrays">`_.zip`</a>
* <a href="#_zipobjectprops-values">`_.zipObject`</a>
* <a href="#_zipobjectdeepprops-values">`_.zipObjectDeep`</a>
* <a href="#_zipwitharrays-iteratee_identity">`_.zipWith`</a>

<!-- /div -->

<!-- div -->

## `Collection`
* <a href="#_countbycollection-iteratee_identity">`_.countBy`</a>
* <a href="#_foreachcollection-iteratee_identity" class="alias">`_.each` -> `forEach`</a>
* <a href="#_foreachrightcollection-iteratee_identity" class="alias">`_.eachRight` -> `forEachRight`</a>
* <a href="#_everycollection-predicate_identity">`_.every`</a>
* <a href="#_filtercollection-predicate_identity">`_.filter`</a>
* <a href="#_findcollection-predicate_identity-fromindex0">`_.find`</a>
* <a href="#_findlastcollection-predicate_identity-fromindexcollectionlength-1">`_.findLast`</a>
* <a href="#_flatmapcollection-iteratee_identity">`_.flatMap`</a>
* <a href="#_flatmapdeepcollection-iteratee_identity">`_.flatMapDeep`</a>
* <a href="#_flatmapdepthcollection-iteratee_identity-depth1">`_.flatMapDepth`</a>
* <a href="#_foreachcollection-iteratee_identity">`_.forEach`</a>
* <a href="#_foreachrightcollection-iteratee_identity">`_.forEachRight`</a>
* <a href="#_groupbycollection-iteratee_identity">`_.groupBy`</a>
* <a href="#_includescollection-value-fromindex0">`_.includes`</a>
* <a href="#_invokemapcollection-path-args">`_.invokeMap`</a>
* <a href="#_keybycollection-iteratee_identity">`_.keyBy`</a>
* <a href="#_mapcollection-iteratee_identity">`_.map`</a>
* <a href="#_orderbycollection-iteratees_identity-orders">`_.orderBy`</a>
* <a href="#_partitioncollection-predicate_identity">`_.partition`</a>
* <a href="#_reducecollection-iteratee_identity-accumulator">`_.reduce`</a>
* <a href="#_reducerightcollection-iteratee_identity-accumulator">`_.reduceRight`</a>
* <a href="#_rejectcollection-predicate_identity">`_.reject`</a>
* <a href="#_samplecollection">`_.sample`</a>
* <a href="#_samplesizecollection-n1">`_.sampleSize`</a>
* <a href="#_shufflecollection">`_.shuffle`</a>
* <a href="#_sizecollection">`_.size`</a>
* <a href="#_somecollection-predicate_identity">`_.some`</a>
* <a href="#_sortbycollection-iteratees_identity">`_.sortBy`</a>

<!-- /div -->

<!-- div -->

## `Date`
* <a href="#_now">`_.now`</a>

<!-- /div -->

<!-- div -->

## `Function`
* <a href="#_aftern-func">`_.after`</a>
* <a href="#_aryfunc-nfunclength">`_.ary`</a>
* <a href="#_beforen-func">`_.before`</a>
* <a href="#_bindfunc-thisarg-partials">`_.bind`</a>
* <a href="#_bindkeyobject-key-partials">`_.bindKey`</a>
* <a href="#_curryfunc-arityfunclength">`_.curry`</a>
* <a href="#_curryrightfunc-arityfunclength">`_.curryRight`</a>
* <a href="#_debouncefunc-wait0-options-optionsleadingfalse-optionsmaxwait-optionstrailingtrue">`_.debounce`</a>
* <a href="#_deferfunc-args">`_.defer`</a>
* <a href="#_delayfunc-wait-args">`_.delay`</a>
* <a href="#_flipfunc">`_.flip`</a>
* <a href="#_memoizefunc-resolver">`_.memoize`</a>
* <a href="#_negatepredicate">`_.negate`</a>
* <a href="#_oncefunc">`_.once`</a>
* <a href="#_overargsfunc-transforms_identity">`_.overArgs`</a>
* <a href="#_partialfunc-partials">`_.partial`</a>
* <a href="#_partialrightfunc-partials">`_.partialRight`</a>
* <a href="#_reargfunc-indexes">`_.rearg`</a>
* <a href="#_restfunc-startfunclength-1">`_.rest`</a>
* <a href="#_spreadfunc-start0">`_.spread`</a>
* <a href="#_throttlefunc-wait0-options-optionsleadingtrue-optionstrailingtrue">`_.throttle`</a>
* <a href="#_unaryfunc">`_.unary`</a>
* <a href="#_wrapvalue-wrapperidentity">`_.wrap`</a>

<!-- /div -->

<!-- div -->

## `Lang`
* <a href="#_castarrayvalue">`_.castArray`</a>
* <a href="#_clonevalue">`_.clone`</a>
* <a href="#_clonedeepvalue">`_.cloneDeep`</a>
* <a href="#_clonedeepwithvalue-customizer">`_.cloneDeepWith`</a>
* <a href="#_clonewithvalue-customizer">`_.cloneWith`</a>
* <a href="#_conformstoobject-source">`_.conformsTo`</a>
* <a href="#_eqvalue-other">`_.eq`</a>
* <a href="#_gtvalue-other">`_.gt`</a>
* <a href="#_gtevalue-other">`_.gte`</a>
* <a href="#_isargumentsvalue">`_.isArguments`</a>
* <a href="#_isarrayvalue">`_.isArray`</a>
* <a href="#_isarraybuffervalue">`_.isArrayBuffer`</a>
* <a href="#_isarraylikevalue">`_.isArrayLike`</a>
* <a href="#_isarraylikeobjectvalue">`_.isArrayLikeObject`</a>
* <a href="#_isbooleanvalue">`_.isBoolean`</a>
* <a href="#_isbuffervalue">`_.isBuffer`</a>
* <a href="#_isdatevalue">`_.isDate`</a>
* <a href="#_iselementvalue">`_.isElement`</a>
* <a href="#_isemptyvalue">`_.isEmpty`</a>
* <a href="#_isequalvalue-other">`_.isEqual`</a>
* <a href="#_isequalwithvalue-other-customizer">`_.isEqualWith`</a>
* <a href="#_iserrorvalue">`_.isError`</a>
* <a href="#_isfinitevalue">`_.isFinite`</a>
* <a href="#_isfunctionvalue">`_.isFunction`</a>
* <a href="#_isintegervalue">`_.isInteger`</a>
* <a href="#_islengthvalue">`_.isLength`</a>
* <a href="#_ismapvalue">`_.isMap`</a>
* <a href="#_ismatchobject-source">`_.isMatch`</a>
* <a href="#_ismatchwithobject-source-customizer">`_.isMatchWith`</a>
* <a href="#_isnanvalue">`_.isNaN`</a>
* <a href="#_isnativevalue">`_.isNative`</a>
* <a href="#_isnilvalue">`_.isNil`</a>
* <a href="#_isnullvalue">`_.isNull`</a>
* <a href="#_isnumbervalue">`_.isNumber`</a>
* <a href="#_isobjectvalue">`_.isObject`</a>
* <a href="#_isobjectlikevalue">`_.isObjectLike`</a>
* <a href="#_isplainobjectvalue">`_.isPlainObject`</a>
* <a href="#_isregexpvalue">`_.isRegExp`</a>
* <a href="#_issafeintegervalue">`_.isSafeInteger`</a>
* <a href="#_issetvalue">`_.isSet`</a>
* <a href="#_isstringvalue">`_.isString`</a>
* <a href="#_issymbolvalue">`_.isSymbol`</a>
* <a href="#_istypedarrayvalue">`_.isTypedArray`</a>
* <a href="#_isundefinedvalue">`_.isUndefined`</a>
* <a href="#_isweakmapvalue">`_.isWeakMap`</a>
* <a href="#_isweaksetvalue">`_.isWeakSet`</a>
* <a href="#_ltvalue-other">`_.lt`</a>
* <a href="#_ltevalue-other">`_.lte`</a>
* <a href="#_toarrayvalue">`_.toArray`</a>
* <a href="#_tofinitevalue">`_.toFinite`</a>
* <a href="#_tointegervalue">`_.toInteger`</a>
* <a href="#_tolengthvalue">`_.toLength`</a>
* <a href="#_tonumbervalue">`_.toNumber`</a>
* <a href="#_toplainobjectvalue">`_.toPlainObject`</a>
* <a href="#_tosafeintegervalue">`_.toSafeInteger`</a>
* <a href="#_tostringvalue">`_.toString`</a>

<!-- /div -->

<!-- div -->

## `Math`
* <a href="#_addaugend-addend">`_.add`</a>
* <a href="#_ceilnumber-precision0">`_.ceil`</a>
* <a href="#_dividedividend-divisor">`_.divide`</a>
* <a href="#_floornumber-precision0">`_.floor`</a>
* <a href="#_maxarray">`_.max`</a>
* <a href="#_maxbyarray-iteratee_identity">`_.maxBy`</a>
* <a href="#_meanarray">`_.mean`</a>
* <a href="#_meanbyarray-iteratee_identity">`_.meanBy`</a>
* <a href="#_minarray">`_.min`</a>
* <a href="#_minbyarray-iteratee_identity">`_.minBy`</a>
* <a href="#_multiplymultiplier-multiplicand">`_.multiply`</a>
* <a href="#_roundnumber-precision0">`_.round`</a>
* <a href="#_subtractminuend-subtrahend">`_.subtract`</a>
* <a href="#_sumarray">`_.sum`</a>
* <a href="#_sumbyarray-iteratee_identity">`_.sumBy`</a>

<!-- /div -->

<!-- div -->

## `Number`
* <a href="#_clampnumber-lower-upper">`_.clamp`</a>
* <a href="#_inrangenumber-start0-end">`_.inRange`</a>
* <a href="#_randomlower0-upper1-floating">`_.random`</a>

<!-- /div -->

<!-- div -->

## `Object`
* <a href="#_assignobject-sources">`_.assign`</a>
* <a href="#_assigninobject-sources">`_.assignIn`</a>
* <a href="#_assigninwithobject-sources-customizer">`_.assignInWith`</a>
* <a href="#_assignwithobject-sources-customizer">`_.assignWith`</a>
* <a href="#_atobject-paths">`_.at`</a>
* <a href="#_createprototype-properties">`_.create`</a>
* <a href="#_defaultsobject-sources">`_.defaults`</a>
* <a href="#_defaultsdeepobject-sources">`_.defaultsDeep`</a>
* <a href="#_topairsobject" class="alias">`_.entries` -> `toPairs`</a>
* <a href="#_topairsinobject" class="alias">`_.entriesIn` -> `toPairsIn`</a>
* <a href="#_assigninobject-sources" class="alias">`_.extend` -> `assignIn`</a>
* <a href="#_assigninwithobject-sources-customizer" class="alias">`_.extendWith` -> `assignInWith`</a>
* <a href="#_findkeyobject-predicate_identity">`_.findKey`</a>
* <a href="#_findlastkeyobject-predicate_identity">`_.findLastKey`</a>
* <a href="#_forinobject-iteratee_identity">`_.forIn`</a>
* <a href="#_forinrightobject-iteratee_identity">`_.forInRight`</a>
* <a href="#_forownobject-iteratee_identity">`_.forOwn`</a>
* <a href="#_forownrightobject-iteratee_identity">`_.forOwnRight`</a>
* <a href="#_functionsobject">`_.functions`</a>
* <a href="#_functionsinobject">`_.functionsIn`</a>
* <a href="#_getobject-path-defaultvalue">`_.get`</a>
* <a href="#_hasobject-path">`_.has`</a>
* <a href="#_hasinobject-path">`_.hasIn`</a>
* <a href="#_invertobject">`_.invert`</a>
* <a href="#_invertbyobject-iteratee_identity">`_.invertBy`</a>
* <a href="#_invokeobject-path-args">`_.invoke`</a>
* <a href="#_keysobject">`_.keys`</a>
* <a href="#_keysinobject">`_.keysIn`</a>
* <a href="#_mapkeysobject-iteratee_identity">`_.mapKeys`</a>
* <a href="#_mapvaluesobject-iteratee_identity">`_.mapValues`</a>
* <a href="#_mergeobject-sources">`_.merge`</a>
* <a href="#_mergewithobject-sources-customizer">`_.mergeWith`</a>
* <a href="#_omitobject-props">`_.omit`</a>
* <a href="#_omitbyobject-predicate_identity">`_.omitBy`</a>
* <a href="#_pickobject-props">`_.pick`</a>
* <a href="#_pickbyobject-predicate_identity">`_.pickBy`</a>
* <a href="#_resultobject-path-defaultvalue">`_.result`</a>
* <a href="#_setobject-path-value">`_.set`</a>
* <a href="#_setwithobject-path-value-customizer">`_.setWith`</a>
* <a href="#_topairsobject">`_.toPairs`</a>
* <a href="#_topairsinobject">`_.toPairsIn`</a>
* <a href="#_transformobject-iteratee_identity-accumulator">`_.transform`</a>
* <a href="#_unsetobject-path">`_.unset`</a>
* <a href="#_updateobject-path-updater">`_.update`</a>
* <a href="#_updatewithobject-path-updater-customizer">`_.updateWith`</a>
* <a href="#_valuesobject">`_.values`</a>
* <a href="#_valuesinobject">`_.valuesIn`</a>

<!-- /div -->

<!-- div -->

## `Seq`
* <a href="#_value">`_`</a>
* <a href="#_chainvalue">`_.chain`</a>
* <a href="#_tapvalue-interceptor">`_.tap`</a>
* <a href="#_thruvalue-interceptor">`_.thru`</a>
* <a href="#_prototypesymboliterator">`_.prototype[Symbol.iterator]`</a>
* <a href="#_prototypeatpaths">`_.prototype.at`</a>
* <a href="#_prototypechain">`_.prototype.chain`</a>
* <a href="#_prototypecommit">`_.prototype.commit`</a>
* <a href="#_prototypenext">`_.prototype.next`</a>
* <a href="#_prototypeplantvalue">`_.prototype.plant`</a>
* <a href="#_prototypereverse">`_.prototype.reverse`</a>
* <a href="#_prototypevalue" class="alias">`_.prototype.toJSON` -> `value`</a>
* <a href="#_prototypevalue">`_.prototype.value`</a>
* <a href="#_prototypevalue" class="alias">`_.prototype.valueOf` -> `value`</a>

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
* <a href="#_lowercasestring">`_.lowerCase`</a>
* <a href="#_lowerfirststring">`_.lowerFirst`</a>
* <a href="#_padstring-length0-chars">`_.pad`</a>
* <a href="#_padendstring-length0-chars">`_.padEnd`</a>
* <a href="#_padstartstring-length0-chars">`_.padStart`</a>
* <a href="#_parseintstring-radix10">`_.parseInt`</a>
* <a href="#_repeatstring-n1">`_.repeat`</a>
* <a href="#_replacestring-pattern-replacement">`_.replace`</a>
* <a href="#_snakecasestring">`_.snakeCase`</a>
* <a href="#_splitstring-separator-limit">`_.split`</a>
* <a href="#_startcasestring">`_.startCase`</a>
* <a href="#_startswithstring-target-position0">`_.startsWith`</a>
* <a href="#_templatestring-options-optionsescape_templatesettingsescape-optionsevaluate_templatesettingsevaluate-optionsimports_templatesettingsimports-optionsinterpolate_templatesettingsinterpolate-optionssourceurllodashtemplatesourcesn-optionsvariableobj">`_.template`</a>
* <a href="#_tolowerstring">`_.toLower`</a>
* <a href="#_toupperstring">`_.toUpper`</a>
* <a href="#_trimstring-charswhitespace">`_.trim`</a>
* <a href="#_trimendstring-charswhitespace">`_.trimEnd`</a>
* <a href="#_trimstartstring-charswhitespace">`_.trimStart`</a>
* <a href="#_truncatestring-options-optionslength30-optionsomission-optionsseparator">`_.truncate`</a>
* <a href="#_unescapestring">`_.unescape`</a>
* <a href="#_uppercasestring">`_.upperCase`</a>
* <a href="#_upperfirststring">`_.upperFirst`</a>
* <a href="#_wordsstring-pattern">`_.words`</a>

<!-- /div -->

<!-- div -->

## `Util`
* <a href="#_attemptfunc-args">`_.attempt`</a>
* <a href="#_bindallobject-methodnames">`_.bindAll`</a>
* <a href="#_condpairs">`_.cond`</a>
* <a href="#_conformssource">`_.conforms`</a>
* <a href="#_constantvalue">`_.constant`</a>
* <a href="#_defaulttovalue-defaultvalue">`_.defaultTo`</a>
* <a href="#_flowfuncs">`_.flow`</a>
* <a href="#_flowrightfuncs">`_.flowRight`</a>
* <a href="#_identityvalue">`_.identity`</a>
* <a href="#_iterateefunc_identity">`_.iteratee`</a>
* <a href="#_matchessource">`_.matches`</a>
* <a href="#_matchespropertypath-srcvalue">`_.matchesProperty`</a>
* <a href="#_methodpath-args">`_.method`</a>
* <a href="#_methodofobject-args">`_.methodOf`</a>
* <a href="#_mixinobjectlodash-source-options-optionschaintrue">`_.mixin`</a>
* <a href="#_noconflict">`_.noConflict`</a>
* <a href="#_noop">`_.noop`</a>
* <a href="#_nthargn0">`_.nthArg`</a>
* <a href="#_overiteratees_identity">`_.over`</a>
* <a href="#_overeverypredicates_identity">`_.overEvery`</a>
* <a href="#_oversomepredicates_identity">`_.overSome`</a>
* <a href="#_propertypath">`_.property`</a>
* <a href="#_propertyofobject">`_.propertyOf`</a>
* <a href="#_rangestart0-end-step1">`_.range`</a>
* <a href="#_rangerightstart0-end-step1">`_.rangeRight`</a>
* <a href="#_runincontextcontextroot">`_.runInContext`</a>
* <a href="#_stubarray">`_.stubArray`</a>
* <a href="#_stubfalse">`_.stubFalse`</a>
* <a href="#_stubobject">`_.stubObject`</a>
* <a href="#_stubstring">`_.stubString`</a>
* <a href="#_stubtrue">`_.stubTrue`</a>
* <a href="#_timesn-iteratee_identity">`_.times`</a>
* <a href="#_topathvalue">`_.toPath`</a>
* <a href="#_uniqueidprefix">`_.uniqueId`</a>

<!-- /div -->

<!-- div -->

## `Properties`
* <a href="#_version">`_.VERSION`</a>
* <a href="#_templatesettings">`_.templateSettings`</a>
* <a href="#_templatesettingsescape">`_.templateSettings.escape`</a>
* <a href="#_templatesettingsevaluate">`_.templateSettings.evaluate`</a>
* <a href="#_templatesettingsimports">`_.templateSettings.imports`</a>
* <a href="#_templatesettingsinterpolate">`_.templateSettings.interpolate`</a>
* <a href="#_templatesettingsvariable">`_.templateSettings.variable`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#_templatesettingsimports_">`_.templateSettings.imports._`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Array” Methods`

<!-- div -->

### <a id="_chunkarray-size1"></a>`_.chunk(array, [size=1])`
[#](#_chunkarray-size1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6318) [npm package](https://www.npmjs.com/package/lodash.chunk) [&#x24C9;][1]

Creates an array of elements split into groups the length of `size`.
If `array` can't be split evenly, the final chunk will be the remaining
elements.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to process.
2. `[size=1]` *(number)*: The length of each chunk

#### Returns
*(Array)*: Returns the new array of chunks.

#### Example
```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
---

<!-- /div -->

<!-- div -->

### <a id="_compactarray"></a>`_.compact(array)`
[#](#_compactarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6353) [npm package](https://www.npmjs.com/package/lodash.compact) [&#x24C9;][1]

Creates an array with all falsey values removed. The values `false`, `null`,
`0`, `""`, `undefined`, and `NaN` are falsey.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to compact.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_concatarray-values"></a>`_.concat(array, [values])`
[#](#_concatarray-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6390) [npm package](https://www.npmjs.com/package/lodash.concat) [&#x24C9;][1]

Creates a new array concatenating `array` with any additional arrays
and/or values.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to concatenate.
2. `[values]` *(...&#42;)*: The values to concatenate.

#### Returns
*(Array)*: Returns the new concatenated array.

#### Example
```js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
// => [1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_differencearray-values"></a>`_.difference(array, [values])`
[#](#_differencearray-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6425) [npm package](https://www.npmjs.com/package/lodash.difference) [&#x24C9;][1]

Creates an array of `array` values not included in the other given arrays
using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons. The order of result values is determined by the
order they occur in the first array.
<br>
<br>
**Note:** Unlike `_.pullAll`, this method returns a new array.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[values]` *(...Array)*: The values to exclude.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
_.difference([2, 1], [2, 3]);
// => [1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_differencebyarray-values-iteratee_identity"></a>`_.differenceBy(array, [values], [iteratee=_.identity])`
[#](#_differencebyarray-values-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6456) [npm package](https://www.npmjs.com/package/lodash.differenceby) [&#x24C9;][1]

This method is like `_.difference` except that it accepts `iteratee` which
is invoked for each element of `array` and `values` to generate the criterion
by which they're compared. Result values are chosen from the first array.
The iteratee is invoked with one argument: *(value)*.
<br>
<br>
**Note:** Unlike `_.pullAllBy`, this method returns a new array.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[values]` *(...Array)*: The values to exclude.
3. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]

// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_differencewitharray-values-comparator"></a>`_.differenceWith(array, [values], [comparator])`
[#](#_differencewitharray-values-comparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6489) [npm package](https://www.npmjs.com/package/lodash.differencewith) [&#x24C9;][1]

This method is like `_.difference` except that it accepts `comparator`
which is invoked to compare elements of `array` to `values`. Result values
are chosen from the first array. The comparator is invoked with two arguments:<br>
*(arrVal, othVal)*.
<br>
<br>
**Note:** Unlike `_.pullAllWith`, this method returns a new array.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[values]` *(...Array)*: The values to exclude.
3. `[comparator]` *(Function)*: The comparator invoked per element.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_droparray-n1"></a>`_.drop(array, [n=1])`
[#](#_droparray-n1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6524) [npm package](https://www.npmjs.com/package/lodash.drop) [&#x24C9;][1]

Creates a slice of `array` with `n` elements dropped from the beginning.

#### Since
0.5.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to drop.

#### Returns
*(Array)*: Returns the slice of `array`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_droprightarray-n1"></a>`_.dropRight(array, [n=1])`
[#](#_droprightarray-n1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6558) [npm package](https://www.npmjs.com/package/lodash.dropright) [&#x24C9;][1]

Creates a slice of `array` with `n` elements dropped from the end.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to drop.

#### Returns
*(Array)*: Returns the slice of `array`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_droprightwhilearray-predicate_identity"></a>`_.dropRightWhile(array, [predicate=_.identity])`
[#](#_droprightwhilearray-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6603) [npm package](https://www.npmjs.com/package/lodash.droprightwhile) [&#x24C9;][1]

Creates a slice of `array` excluding elements dropped from the end.
Elements are dropped until `predicate` returns falsey. The predicate is
invoked with three arguments: *(value, index, array)*.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the slice of `array`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']

// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']

// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```
---

<!-- /div -->

<!-- div -->

### <a id="_dropwhilearray-predicate_identity"></a>`_.dropWhile(array, [predicate=_.identity])`
[#](#_dropwhilearray-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6645) [npm package](https://www.npmjs.com/package/lodash.dropwhile) [&#x24C9;][1]

Creates a slice of `array` excluding elements dropped from the beginning.
Elements are dropped until `predicate` returns falsey. The predicate is
invoked with three arguments: *(value, index, array)*.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the slice of `array`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']

// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']

// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']

// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```
---

<!-- /div -->

<!-- div -->

### <a id="_fillarray-value-start0-endarraylength"></a>`_.fill(array, value, [start=0], [end=array.length])`
[#](#_fillarray-value-start0-endarraylength) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6680) [npm package](https://www.npmjs.com/package/lodash.fill) [&#x24C9;][1]

Fills elements of `array` with `value` from `start` up to, but not
including, `end`.
<br>
<br>
**Note:** This method mutates `array`.

#### Since
3.2.0
#### Arguments
1. `array` *(Array)*: The array to fill.
2. `value` *(&#42;)*: The value to fill `array` with.
3. `[start=0]` *(number)*: The start position.
4. `[end=array.length]` *(number)*: The end position.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = [1, 2, 3];

_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```
---

<!-- /div -->

<!-- div -->

### <a id="_findindexarray-predicate_identity-fromindex0"></a>`_.findIndex(array, [predicate=_.identity], [fromIndex=0])`
[#](#_findindexarray-predicate_identity-fromindex0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6728) [npm package](https://www.npmjs.com/package/lodash.findindex) [&#x24C9;][1]

This method is like `_.find` except that it returns the index of the first
element `predicate` returns truthy for instead of the element itself.

#### Since
1.1.0
#### Arguments
1. `array` *(Array)*: The array to search.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.
3. `[fromIndex=0]` *(number)*: The index to search from.

#### Returns
*(number)*: Returns the index of the found element, else `-1`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0

// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1

// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0

// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```
---

<!-- /div -->

<!-- div -->

### <a id="_findlastindexarray-predicate_identity-fromindexarraylength-1"></a>`_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])`
[#](#_findlastindexarray-predicate_identity-fromindexarraylength-1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6776) [npm package](https://www.npmjs.com/package/lodash.findlastindex) [&#x24C9;][1]

This method is like `_.findIndex` except that it iterates over elements
of `collection` from right to left.

#### Since
2.0.0
#### Arguments
1. `array` *(Array)*: The array to search.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.
3. `[fromIndex=array.length-1]` *(number)*: The index to search from.

#### Returns
*(number)*: Returns the index of the found element, else `-1`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2

// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0

// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2

// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```
---

<!-- /div -->

<!-- div -->

### <a id="_flattenarray"></a>`_.flatten(array)`
[#](#_flattenarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6805) [npm package](https://www.npmjs.com/package/lodash.flatten) [&#x24C9;][1]

Flattens `array` a single level deep.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to flatten.

#### Returns
*(Array)*: Returns the new flattened array.

#### Example
```js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```
---

<!-- /div -->

<!-- div -->

### <a id="_flattendeeparray"></a>`_.flattenDeep(array)`
[#](#_flattendeeparray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6824) [npm package](https://www.npmjs.com/package/lodash.flattendeep) [&#x24C9;][1]

Recursively flattens `array`.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to flatten.

#### Returns
*(Array)*: Returns the new flattened array.

#### Example
```js
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```
---

<!-- /div -->

<!-- div -->

### <a id="_flattendeptharray-depth1"></a>`_.flattenDepth(array, [depth=1])`
[#](#_flattendeptharray-depth1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6849) [npm package](https://www.npmjs.com/package/lodash.flattendepth) [&#x24C9;][1]

Recursively flatten `array` up to `depth` times.

#### Since
4.4.0
#### Arguments
1. `array` *(Array)*: The array to flatten.
2. `[depth=1]` *(number)*: The maximum recursion depth.

#### Returns
*(Array)*: Returns the new flattened array.

#### Example
```js
var array = [1, [2, [3, [4]], 5]];

_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]

_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```
---

<!-- /div -->

<!-- div -->

### <a id="_frompairspairs"></a>`_.fromPairs(pairs)`
[#](#_frompairspairs) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6873) [npm package](https://www.npmjs.com/package/lodash.frompairs) [&#x24C9;][1]

The inverse of `_.toPairs`; this method returns an object composed
from key-value `pairs`.

#### Since
4.0.0
#### Arguments
1. `pairs` *(Array)*: The key-value pairs.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
_.fromPairs([['a', 1], ['b', 2]]);
// => { 'a': 1, 'b': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_headarray"></a>`_.head(array)`
[#](#_headarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6903) [npm package](https://www.npmjs.com/package/lodash.head) [&#x24C9;][1]

Gets the first element of `array`.

#### Since
0.1.0
#### Aliases
*_.first*

#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(&#42;)*: Returns the first element of `array`.

#### Example
```js
_.head([1, 2, 3]);
// => 1

_.head([]);
// => undefined
```
---

<!-- /div -->

<!-- div -->

### <a id="_indexofarray-value-fromindex0"></a>`_.indexOf(array, value, [fromIndex=0])`
[#](#_indexofarray-value-fromindex0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6930) [npm package](https://www.npmjs.com/package/lodash.indexof) [&#x24C9;][1]

Gets the index at which the first occurrence of `value` is found in `array`
using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons. If `fromIndex` is negative, it's used as the
offset from the end of `array`.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(&#42;)*: The value to search for.
3. `[fromIndex=0]` *(number)*: The index to search from.

#### Returns
*(number)*: Returns the index of the matched value, else `-1`.

#### Example
```js
_.indexOf([1, 2, 1, 2], 2);
// => 1

// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_initialarray"></a>`_.initial(array)`
[#](#_initialarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6956) [npm package](https://www.npmjs.com/package/lodash.initial) [&#x24C9;][1]

Gets all but the last element of `array`.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(Array)*: Returns the slice of `array`.

#### Example
```js
_.initial([1, 2, 3]);
// => [1, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_intersectionarrays"></a>`_.intersection([arrays])`
[#](#_intersectionarrays) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L6977) [npm package](https://www.npmjs.com/package/lodash.intersection) [&#x24C9;][1]

Creates an array of unique values that are included in all given arrays
using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons. The order of result values is determined by the
order they occur in the first array.

#### Since
0.1.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*: Returns the new array of intersecting values.

#### Example
```js
_.intersection([2, 1], [2, 3]);
// => [2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_intersectionbyarrays-iteratee_identity"></a>`_.intersectionBy([arrays], [iteratee=_.identity])`
[#](#_intersectionbyarrays-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7006) [npm package](https://www.npmjs.com/package/lodash.intersectionby) [&#x24C9;][1]

This method is like `_.intersection` except that it accepts `iteratee`
which is invoked for each element of each `arrays` to generate the criterion
by which they're compared. Result values are chosen from the first array.
The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns the new array of intersecting values.

#### Example
```js
_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [2.1]

// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_intersectionwitharrays-comparator"></a>`_.intersectionWith([arrays], [comparator])`
[#](#_intersectionwitharrays-comparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7041) [npm package](https://www.npmjs.com/package/lodash.intersectionwith) [&#x24C9;][1]

This method is like `_.intersection` except that it accepts `comparator`
which is invoked to compare elements of `arrays`. Result values are chosen
from the first array. The comparator is invoked with two arguments:<br>
*(arrVal, othVal)*.

#### Since
4.0.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.
2. `[comparator]` *(Function)*: The comparator invoked per element.

#### Returns
*(Array)*: Returns the new array of intersecting values.

#### Example
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_joinarray-separator-"></a>`_.join(array, [separator=','])`
[#](#_joinarray-separator-) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7070) [npm package](https://www.npmjs.com/package/lodash.join) [&#x24C9;][1]

Converts all elements in `array` into a string separated by `separator`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to convert.
2. `[separator=',']` *(string)*: The element separator.

#### Returns
*(string)*: Returns the joined string.

#### Example
```js
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
```
---

<!-- /div -->

<!-- div -->

### <a id="_lastarray"></a>`_.last(array)`
[#](#_lastarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7088) [npm package](https://www.npmjs.com/package/lodash.last) [&#x24C9;][1]

Gets the last element of `array`.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(&#42;)*: Returns the last element of `array`.

#### Example
```js
_.last([1, 2, 3]);
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_lastindexofarray-value-fromindexarraylength-1"></a>`_.lastIndexOf(array, value, [fromIndex=array.length-1])`
[#](#_lastindexofarray-value-fromindexarraylength-1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7114) [npm package](https://www.npmjs.com/package/lodash.lastindexof) [&#x24C9;][1]

This method is like `_.indexOf` except that it iterates over elements of
`array` from right to left.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(&#42;)*: The value to search for.
3. `[fromIndex=array.length-1]` *(number)*: The index to search from.

#### Returns
*(number)*: Returns the index of the matched value, else `-1`.

#### Example
```js
_.lastIndexOf([1, 2, 1, 2], 2);
// => 3

// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1
```
---

<!-- /div -->

<!-- div -->

### <a id="_ntharray-n0"></a>`_.nth(array, [n=0])`
[#](#_ntharray-n0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7160) [npm package](https://www.npmjs.com/package/lodash.nth) [&#x24C9;][1]

Gets the element at index `n` of `array`. If `n` is negative, the nth
element from the end is returned.

#### Since
4.11.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=0]` *(number)*: The index of the element to return.

#### Returns
*(&#42;)*: Returns the nth element of `array`.

#### Example
```js
var array = ['a', 'b', 'c', 'd'];

_.nth(array, 1);
// => 'b'

_.nth(array, -2);
// => 'c';
```
---

<!-- /div -->

<!-- div -->

### <a id="_pullarray-values"></a>`_.pull(array, [values])`
[#](#_pullarray-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7187) [npm package](https://www.npmjs.com/package/lodash.pull) [&#x24C9;][1]

Removes all given values from `array` using
[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons.
<br>
<br>
**Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
to remove elements from an array by predicate.

#### Since
2.0.0
#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[values]` *(...&#42;)*: The values to remove.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = ['a', 'b', 'c', 'a', 'b', 'c'];

_.pull(array, 'a', 'c');
console.log(array);
// => ['b', 'b']
```
---

<!-- /div -->

<!-- div -->

### <a id="_pullallarray-values"></a>`_.pullAll(array, values)`
[#](#_pullallarray-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7209) [npm package](https://www.npmjs.com/package/lodash.pullall) [&#x24C9;][1]

This method is like `_.pull` except that it accepts an array of values to remove.
<br>
<br>
**Note:** Unlike `_.difference`, this method mutates `array`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to modify.
2. `values` *(Array)*: The values to remove.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = ['a', 'b', 'c', 'a', 'b', 'c'];

_.pullAll(array, ['a', 'c']);
console.log(array);
// => ['b', 'b']
```
---

<!-- /div -->

<!-- div -->

### <a id="_pullallbyarray-values-iteratee_identity"></a>`_.pullAllBy(array, values, [iteratee=_.identity])`
[#](#_pullallbyarray-values-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7239) [npm package](https://www.npmjs.com/package/lodash.pullallby) [&#x24C9;][1]

This method is like `_.pullAll` except that it accepts `iteratee` which is
invoked for each element of `array` and `values` to generate the criterion
by which they're compared. The iteratee is invoked with one argument: *(value)*.
<br>
<br>
**Note:** Unlike `_.differenceBy`, this method mutates `array`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to modify.
2. `values` *(Array)*: The values to remove.
3. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];

_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);
// => [{ 'x': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_pullallwitharray-values-comparator"></a>`_.pullAllWith(array, values, [comparator])`
[#](#_pullallwitharray-values-comparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7268) [npm package](https://www.npmjs.com/package/lodash.pullallwith) [&#x24C9;][1]

This method is like `_.pullAll` except that it accepts `comparator` which
is invoked to compare elements of `array` to `values`. The comparator is
invoked with two arguments: *(arrVal, othVal)*.
<br>
<br>
**Note:** Unlike `_.differenceWith`, this method mutates `array`.

#### Since
4.6.0
#### Arguments
1. `array` *(Array)*: The array to modify.
2. `values` *(Array)*: The values to remove.
3. `[comparator]` *(Function)*: The comparator invoked per element.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];

_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_pullatarray-indexes"></a>`_.pullAt(array, [indexes])`
[#](#_pullatarray-indexes) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7298) [npm package](https://www.npmjs.com/package/lodash.pullat) [&#x24C9;][1]

Removes elements from `array` corresponding to `indexes` and returns an
array of removed elements.
<br>
<br>
**Note:** Unlike `_.at`, this method mutates `array`.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[indexes]` *(...(number|number&#91;&#93;))*: The indexes of elements to remove.

#### Returns
*(Array)*: Returns the new array of removed elements.

#### Example
```js
var array = ['a', 'b', 'c', 'd'];
var pulled = _.pullAt(array, [1, 3]);

console.log(array);
// => ['a', 'c']

console.log(pulled);
// => ['b', 'd']
```
---

<!-- /div -->

<!-- div -->

### <a id="_removearray-predicate_identity"></a>`_.remove(array, [predicate=_.identity])`
[#](#_removearray-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7340) [npm package](https://www.npmjs.com/package/lodash.remove) [&#x24C9;][1]

Removes all elements from `array` that `predicate` returns truthy for
and returns an array of the removed elements. The predicate is invoked
with three arguments: *(value, index, array)*.
<br>
<br>
**Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
to pull elements from an array by value.

#### Since
2.0.0
#### Arguments
1. `array` *(Array)*: The array to modify.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the new array of removed elements.

#### Example
```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]
```
---

<!-- /div -->

<!-- div -->

### <a id="_reversearray"></a>`_.reverse(array)`
[#](#_reversearray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7384) [npm package](https://www.npmjs.com/package/lodash.reverse) [&#x24C9;][1]

Reverses `array` so that the first element becomes the last, the second
element becomes the second to last, and so on.
<br>
<br>
**Note:** This method mutates `array` and is based on
[`Array#reverse`](https://mdn.io/Array/reverse).

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to modify.

#### Returns
*(Array)*: Returns `array`.

#### Example
```js
var array = [1, 2, 3];

_.reverse(array);
// => [3, 2, 1]

console.log(array);
// => [3, 2, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_slicearray-start0-endarraylength"></a>`_.slice(array, [start=0], [end=array.length])`
[#](#_slicearray-start0-endarraylength) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7404) [npm package](https://www.npmjs.com/package/lodash.slice) [&#x24C9;][1]

Creates a slice of `array` from `start` up to, but not including, `end`.
<br>
<br>
**Note:** This method is used instead of
[`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
returned.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to slice.
2. `[start=0]` *(number)*: The start position.
3. `[end=array.length]` *(number)*: The end position.

#### Returns
*(Array)*: Returns the slice of `array`.

---

<!-- /div -->

<!-- div -->

### <a id="_sortedindexarray-value"></a>`_.sortedIndex(array, value)`
[#](#_sortedindexarray-value) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7437) [npm package](https://www.npmjs.com/package/lodash.sortedindex) [&#x24C9;][1]

Uses a binary search to determine the lowest index at which `value`
should be inserted into `array` in order to maintain its sort order.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The sorted array to inspect.
2. `value` *(&#42;)*: The value to evaluate.

#### Returns
*(number)*: Returns the index at which `value` should be inserted into `array`.

#### Example
```js
_.sortedIndex([30, 50], 40);
// => 1
```
---

<!-- /div -->

<!-- div -->

### <a id="_sortedindexbyarray-value-iteratee_identity"></a>`_.sortedIndexBy(array, value, [iteratee=_.identity])`
[#](#_sortedindexbyarray-value-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7467) [npm package](https://www.npmjs.com/package/lodash.sortedindexby) [&#x24C9;][1]

This method is like `_.sortedIndex` except that it accepts `iteratee`
which is invoked for `value` and each element of `array` to compute their
sort ranking. The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The sorted array to inspect.
2. `value` *(&#42;)*: The value to evaluate.
3. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(number)*: Returns the index at which `value` should be inserted into `array`.

#### Example
```js
var objects = [{ 'x': 4 }, { 'x': 5 }];

_.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 0

// The `_.property` iteratee shorthand.
_.sortedIndexBy(objects, { 'x': 4 }, 'x');
// => 0
```
---

<!-- /div -->

<!-- div -->

### <a id="_sortedindexofarray-value"></a>`_.sortedIndexOf(array, value)`
[#](#_sortedindexofarray-value) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7487) [npm package](https://www.npmjs.com/package/lodash.sortedindexof) [&#x24C9;][1]

This method is like `_.indexOf` except that it performs a binary
search on a sorted `array`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(&#42;)*: The value to search for.

#### Returns
*(number)*: Returns the index of the matched value, else `-1`.

#### Example
```js
_.sortedIndexOf([4, 5, 5, 5, 6], 5);
// => 1
```
---

<!-- /div -->

<!-- div -->

### <a id="_sortedlastindexarray-value"></a>`_.sortedLastIndex(array, value)`
[#](#_sortedlastindexarray-value) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7516) [npm package](https://www.npmjs.com/package/lodash.sortedlastindex) [&#x24C9;][1]

This method is like `_.sortedIndex` except that it returns the highest
index at which `value` should be inserted into `array` in order to
maintain its sort order.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The sorted array to inspect.
2. `value` *(&#42;)*: The value to evaluate.

#### Returns
*(number)*: Returns the index at which `value` should be inserted into `array`.

#### Example
```js
_.sortedLastIndex([4, 5, 5, 5, 6], 5);
// => 4
```
---

<!-- /div -->

<!-- div -->

### <a id="_sortedlastindexbyarray-value-iteratee_identity"></a>`_.sortedLastIndexBy(array, value, [iteratee=_.identity])`
[#](#_sortedlastindexbyarray-value-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7546) [npm package](https://www.npmjs.com/package/lodash.sortedlastindexby) [&#x24C9;][1]

This method is like `_.sortedLastIndex` except that it accepts `iteratee`
which is invoked for `value` and each element of `array` to compute their
sort ranking. The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The sorted array to inspect.
2. `value` *(&#42;)*: The value to evaluate.
3. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(number)*: Returns the index at which `value` should be inserted into `array`.

#### Example
```js
var objects = [{ 'x': 4 }, { 'x': 5 }];

_.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 1

// The `_.property` iteratee shorthand.
_.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
// => 1
```
---

<!-- /div -->

<!-- div -->

### <a id="_sortedlastindexofarray-value"></a>`_.sortedLastIndexOf(array, value)`
[#](#_sortedlastindexofarray-value) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7566) [npm package](https://www.npmjs.com/package/lodash.sortedlastindexof) [&#x24C9;][1]

This method is like `_.lastIndexOf` except that it performs a binary
search on a sorted `array`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to search.
2. `value` *(&#42;)*: The value to search for.

#### Returns
*(number)*: Returns the index of the matched value, else `-1`.

#### Example
```js
_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_sorteduniqarray"></a>`_.sortedUniq(array)`
[#](#_sorteduniqarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7592) [npm package](https://www.npmjs.com/package/lodash.sorteduniq) [&#x24C9;][1]

This method is like `_.uniq` except that it's designed and optimized
for sorted arrays.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to inspect.

#### Returns
*(Array)*: Returns the new duplicate free array.

#### Example
```js
_.sortedUniq([1, 1, 2]);
// => [1, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_sorteduniqbyarray-iteratee"></a>`_.sortedUniqBy(array, [iteratee])`
[#](#_sorteduniqbyarray-iteratee) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7614) [npm package](https://www.npmjs.com/package/lodash.sorteduniqby) [&#x24C9;][1]

This method is like `_.uniqBy` except that it's designed and optimized
for sorted arrays.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[iteratee]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns the new duplicate free array.

#### Example
```js
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_tailarray"></a>`_.tail(array)`
[#](#_tailarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7634) [npm package](https://www.npmjs.com/package/lodash.tail) [&#x24C9;][1]

Gets all but the first element of `array`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to query.

#### Returns
*(Array)*: Returns the slice of `array`.

#### Example
```js
_.tail([1, 2, 3]);
// => [2, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_takearray-n1"></a>`_.take(array, [n=1])`
[#](#_takearray-n1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7663) [npm package](https://www.npmjs.com/package/lodash.take) [&#x24C9;][1]

Creates a slice of `array` with `n` elements taken from the beginning.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to take.

#### Returns
*(Array)*: Returns the slice of `array`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_takerightarray-n1"></a>`_.takeRight(array, [n=1])`
[#](#_takerightarray-n1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7696) [npm package](https://www.npmjs.com/package/lodash.takeright) [&#x24C9;][1]

Creates a slice of `array` with `n` elements taken from the end.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[n=1]` *(number)*: The number of elements to take.

#### Returns
*(Array)*: Returns the slice of `array`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_takerightwhilearray-predicate_identity"></a>`_.takeRightWhile(array, [predicate=_.identity])`
[#](#_takerightwhilearray-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7742) [npm package](https://www.npmjs.com/package/lodash.takerightwhile) [&#x24C9;][1]

Creates a slice of `array` with elements taken from the end. Elements are
taken until `predicate` returns falsey. The predicate is invoked with
three arguments: *(value, index, array)*.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the slice of `array`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.takeRightWhile(users, function(o) { return !o.active; });
// => objects for ['fred', 'pebbles']

// The `_.matches` iteratee shorthand.
_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['pebbles']

// The `_.matchesProperty` iteratee shorthand.
_.takeRightWhile(users, ['active', false]);
// => objects for ['fred', 'pebbles']

// The `_.property` iteratee shorthand.
_.takeRightWhile(users, 'active');
// => []
```
---

<!-- /div -->

<!-- div -->

### <a id="_takewhilearray-predicate_identity"></a>`_.takeWhile(array, [predicate=_.identity])`
[#](#_takewhilearray-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7784) [npm package](https://www.npmjs.com/package/lodash.takewhile) [&#x24C9;][1]

Creates a slice of `array` with elements taken from the beginning. Elements
are taken until `predicate` returns falsey. The predicate is invoked with
three arguments: *(value, index, array)*.

#### Since
3.0.0
#### Arguments
1. `array` *(Array)*: The array to query.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the slice of `array`.

#### Example
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];

_.takeWhile(users, function(o) { return !o.active; });
// => objects for ['barney', 'fred']

// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']

// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
// => []
```
---

<!-- /div -->

<!-- div -->

### <a id="_unionarrays"></a>`_.union([arrays])`
[#](#_unionarrays) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7806) [npm package](https://www.npmjs.com/package/lodash.union) [&#x24C9;][1]

Creates an array of unique values, in order, from all given arrays using
[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons.

#### Since
0.1.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*: Returns the new array of combined values.

#### Example
```js
_.union([2], [1, 2]);
// => [2, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_unionbyarrays-iteratee_identity"></a>`_.unionBy([arrays], [iteratee=_.identity])`
[#](#_unionbyarrays-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7834) [npm package](https://www.npmjs.com/package/lodash.unionby) [&#x24C9;][1]

This method is like `_.union` except that it accepts `iteratee` which is
invoked for each element of each `arrays` to generate the criterion by
which uniqueness is computed. Result values are chosen from the first
array in which the value occurs. The iteratee is invoked with one argument:<br>
*(value)*.

#### Since
4.0.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns the new array of combined values.

#### Example
```js
_.unionBy([2.1], [1.2, 2.3], Math.floor);
// => [2.1, 1.2]

// The `_.property` iteratee shorthand.
_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_unionwitharrays-comparator"></a>`_.unionWith([arrays], [comparator])`
[#](#_unionwitharrays-comparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7863) [npm package](https://www.npmjs.com/package/lodash.unionwith) [&#x24C9;][1]

This method is like `_.union` except that it accepts `comparator` which
is invoked to compare elements of `arrays`. Result values are chosen from
the first array in which the value occurs. The comparator is invoked
with two arguments: *(arrVal, othVal)*.

#### Since
4.0.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.
2. `[comparator]` *(Function)*: The comparator invoked per element.

#### Returns
*(Array)*: Returns the new array of combined values.

#### Example
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

_.unionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_uniqarray"></a>`_.uniq(array)`
[#](#_uniqarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7888) [npm package](https://www.npmjs.com/package/lodash.uniq) [&#x24C9;][1]

Creates a duplicate-free version of an array, using
[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons, in which only the first occurrence of each
element is kept.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to inspect.

#### Returns
*(Array)*: Returns the new duplicate free array.

#### Example
```js
_.uniq([2, 1, 2]);
// => [2, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_uniqbyarray-iteratee_identity"></a>`_.uniqBy(array, [iteratee=_.identity])`
[#](#_uniqbyarray-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7916) [npm package](https://www.npmjs.com/package/lodash.uniqby) [&#x24C9;][1]

This method is like `_.uniq` except that it accepts `iteratee` which is
invoked for each element in `array` to generate the criterion by which
uniqueness is computed. The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns the new duplicate free array.

#### Example
```js
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]

// The `_.property` iteratee shorthand.
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_uniqwitharray-comparator"></a>`_.uniqWith(array, [comparator])`
[#](#_uniqwitharray-comparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7941) [npm package](https://www.npmjs.com/package/lodash.uniqwith) [&#x24C9;][1]

This method is like `_.uniq` except that it accepts `comparator` which
is invoked to compare elements of `array`. The comparator is invoked with
two arguments: *(arrVal, othVal)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[comparator]` *(Function)*: The comparator invoked per element.

#### Returns
*(Array)*: Returns the new duplicate free array.

#### Example
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];

_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_unziparray"></a>`_.unzip(array)`
[#](#_unziparray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L7966) [npm package](https://www.npmjs.com/package/lodash.unzip) [&#x24C9;][1]

This method is like `_.zip` except that it accepts an array of grouped
elements and creates an array regrouping the elements to their pre-zip
configuration.

#### Since
1.2.0
#### Arguments
1. `array` *(Array)*: The array of grouped elements to process.

#### Returns
*(Array)*: Returns the new array of regrouped elements.

#### Example
```js
var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]

_.unzip(zipped);
// => [['a', 'b'], [1, 2], [true, false]]
```
---

<!-- /div -->

<!-- div -->

### <a id="_unzipwitharray-iteratee_identity"></a>`_.unzipWith(array, [iteratee=_.identity])`
[#](#_unzipwitharray-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8003) [npm package](https://www.npmjs.com/package/lodash.unzipwith) [&#x24C9;][1]

This method is like `_.unzip` except that it accepts `iteratee` to specify
how regrouped values should be combined. The iteratee is invoked with the
elements of each group: *(...group)*.

#### Since
3.8.0
#### Arguments
1. `array` *(Array)*: The array of grouped elements to process.
2. `[iteratee=_.identity]` *(Function)*: The function to combine regrouped values.

#### Returns
*(Array)*: Returns the new array of regrouped elements.

#### Example
```js
var zipped = _.zip([1, 2], [10, 20], [100, 200]);
// => [[1, 10, 100], [2, 20, 200]]

_.unzipWith(zipped, _.add);
// => [3, 30, 300]
```
---

<!-- /div -->

<!-- div -->

### <a id="_withoutarray-values"></a>`_.without(array, [values])`
[#](#_withoutarray-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8036) [npm package](https://www.npmjs.com/package/lodash.without) [&#x24C9;][1]

Creates an array excluding all given values using
[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
for equality comparisons.
<br>
<br>
**Note:** Unlike `_.pull`, this method returns a new array.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to inspect.
2. `[values]` *(...&#42;)*: The values to exclude.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
_.without([2, 1, 2, 3], 1, 2);
// => [3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_xorarrays"></a>`_.xor([arrays])`
[#](#_xorarrays) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8060) [npm package](https://www.npmjs.com/package/lodash.xor) [&#x24C9;][1]

Creates an array of unique values that is the
[symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
of the given arrays. The order of result values is determined by the order
they occur in the arrays.

#### Since
2.4.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
_.xor([2, 1], [2, 3]);
// => [1, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_xorbyarrays-iteratee_identity"></a>`_.xorBy([arrays], [iteratee=_.identity])`
[#](#_xorbyarrays-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8087) [npm package](https://www.npmjs.com/package/lodash.xorby) [&#x24C9;][1]

This method is like `_.xor` except that it accepts `iteratee` which is
invoked for each element of each `arrays` to generate the criterion by
which by which they're compared. The iteratee is invoked with one argument:<br>
*(value)*.

#### Since
4.0.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2, 3.4]

// The `_.property` iteratee shorthand.
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_xorwitharrays-comparator"></a>`_.xorWith([arrays], [comparator])`
[#](#_xorwitharrays-comparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8115) [npm package](https://www.npmjs.com/package/lodash.xorwith) [&#x24C9;][1]

This method is like `_.xor` except that it accepts `comparator` which is
invoked to compare elements of `arrays`. The comparator is invoked with
two arguments: *(arrVal, othVal)*.

#### Since
4.0.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to inspect.
2. `[comparator]` *(Function)*: The comparator invoked per element.

#### Returns
*(Array)*: Returns the new array of filtered values.

#### Example
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_ziparrays"></a>`_.zip([arrays])`
[#](#_ziparrays) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8139) [npm package](https://www.npmjs.com/package/lodash.zip) [&#x24C9;][1]

Creates an array of grouped elements, the first of which contains the
first elements of the given arrays, the second of which contains the
second elements of the given arrays, and so on.

#### Since
0.1.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to process.

#### Returns
*(Array)*: Returns the new array of grouped elements.

#### Example
```js
_.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]
```
---

<!-- /div -->

<!-- div -->

### <a id="_zipobjectprops-values"></a>`_.zipObject([props=[]], [values=[]])`
[#](#_zipobjectprops-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8157) [npm package](https://www.npmjs.com/package/lodash.zipobject) [&#x24C9;][1]

This method is like `_.fromPairs` except that it accepts two arrays,
one of property identifiers and one of corresponding values.

#### Since
0.4.0
#### Arguments
1. `[props=[]]` *(Array)*: The property identifiers.
2. `[values=[]]` *(Array)*: The property values.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_zipobjectdeepprops-values"></a>`_.zipObjectDeep([props=[]], [values=[]])`
[#](#_zipobjectdeepprops-values) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8176) [npm package](https://www.npmjs.com/package/lodash.zipobjectdeep) [&#x24C9;][1]

This method is like `_.zipObject` except that it supports property paths.

#### Since
4.1.0
#### Arguments
1. `[props=[]]` *(Array)*: The property identifiers.
2. `[values=[]]` *(Array)*: The property values.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```
---

<!-- /div -->

<!-- div -->

### <a id="_zipwitharrays-iteratee_identity"></a>`_.zipWith([arrays], [iteratee=_.identity])`
[#](#_zipwitharrays-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8199) [npm package](https://www.npmjs.com/package/lodash.zipwith) [&#x24C9;][1]

This method is like `_.zip` except that it accepts `iteratee` to specify
how grouped values should be combined. The iteratee is invoked with the
elements of each group: *(...group)*.

#### Since
3.8.0
#### Arguments
1. `[arrays]` *(...Array)*: The arrays to process.
2. `[iteratee=_.identity]` *(Function)*: The function to combine grouped values.

#### Returns
*(Array)*: Returns the new array of grouped elements.

#### Example
```js
_.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
  return a + b + c;
});
// => [111, 222]
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Collection” Methods`

<!-- div -->

### <a id="_countbycollection-iteratee_identity"></a>`_.countBy(collection, [iteratee=_.identity])`
[#](#_countbycollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8580) [npm package](https://www.npmjs.com/package/lodash.countby) [&#x24C9;][1]

Creates an object composed of keys generated from the results of running
each element of `collection` thru `iteratee`. The corresponding value of
each key is the number of times the key was returned by `iteratee`. The
iteratee is invoked with one argument: *(value)*.

#### Since
0.5.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee to transform keys.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
_.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }

// The `_.property` iteratee shorthand.
_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_everycollection-predicate_identity"></a>`_.every(collection, [predicate=_.identity])`
[#](#_everycollection-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8621) [npm package](https://www.npmjs.com/package/lodash.every) [&#x24C9;][1]

Checks if `predicate` returns truthy for **all** elements of `collection`.
Iteration is stopped once `predicate` returns falsey. The predicate is
invoked with three arguments: *(value, index|key, collection)*.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(boolean)*: Returns `true` if all elements pass the predicate check, else `false`.

#### Example
```js
_.every([true, 1, null, 'yes'], Boolean);
// => false

var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false

// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_filtercollection-predicate_identity"></a>`_.filter(collection, [predicate=_.identity])`
[#](#_filtercollection-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8667) [npm package](https://www.npmjs.com/package/lodash.filter) [&#x24C9;][1]

Iterates over elements of `collection`, returning an array of all elements
`predicate` returns truthy for. The predicate is invoked with three
arguments: *(value, index|key, collection)*.
<br>
<br>
**Note:** Unlike `_.remove`, this method returns a new array.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the new filtered array.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']

// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
```
---

<!-- /div -->

<!-- div -->

### <a id="_findcollection-predicate_identity-fromindex0"></a>`_.find(collection, [predicate=_.identity], [fromIndex=0])`
[#](#_findcollection-predicate_identity-fromindex0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8709) [npm package](https://www.npmjs.com/package/lodash.find) [&#x24C9;][1]

Iterates over elements of `collection`, returning the first element
`predicate` returns truthy for. The predicate is invoked with three
arguments: *(value, index|key, collection)*.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to search.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.
3. `[fromIndex=0]` *(number)*: The index to search from.

#### Returns
*(&#42;)*: Returns the matched element, else `undefined`.

#### Example
```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'

// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'

// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'

// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'
```
---

<!-- /div -->

<!-- div -->

### <a id="_findlastcollection-predicate_identity-fromindexcollectionlength-1"></a>`_.findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])`
[#](#_findlastcollection-predicate_identity-fromindexcollectionlength-1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8731) [npm package](https://www.npmjs.com/package/lodash.findlast) [&#x24C9;][1]

This method is like `_.find` except that it iterates over elements of
`collection` from right to left.

#### Since
2.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to search.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.
3. `[fromIndex=collection.length-1]` *(number)*: The index to search from.

#### Returns
*(&#42;)*: Returns the matched element, else `undefined`.

#### Example
```js
_.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_flatmapcollection-iteratee_identity"></a>`_.flatMap(collection, [iteratee=_.identity])`
[#](#_flatmapcollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8755) [npm package](https://www.npmjs.com/package/lodash.flatmap) [&#x24C9;][1]

Creates a flattened array of values by running each element in `collection`
thru `iteratee` and flattening the mapped results. The iteratee is invoked
with three arguments: *(value, index|key, collection)*.

#### Since
4.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the new flattened array.

#### Example
```js
function duplicate(n) {
  return [n, n];
}

_.flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_flatmapdeepcollection-iteratee_identity"></a>`_.flatMapDeep(collection, [iteratee=_.identity])`
[#](#_flatmapdeepcollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8780) [npm package](https://www.npmjs.com/package/lodash.flatmapdeep) [&#x24C9;][1]

This method is like `_.flatMap` except that it recursively flattens the
mapped results.

#### Since
4.7.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the new flattened array.

#### Example
```js
function duplicate(n) {
  return [[[n, n]]];
}

_.flatMapDeep([1, 2], duplicate);
// => [1, 1, 2, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_flatmapdepthcollection-iteratee_identity-depth1"></a>`_.flatMapDepth(collection, [iteratee=_.identity], [depth=1])`
[#](#_flatmapdepthcollection-iteratee_identity-depth1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8806) [npm package](https://www.npmjs.com/package/lodash.flatmapdepth) [&#x24C9;][1]

This method is like `_.flatMap` except that it recursively flattens the
mapped results up to `depth` times.

#### Since
4.7.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[depth=1]` *(number)*: The maximum recursion depth.

#### Returns
*(Array)*: Returns the new flattened array.

#### Example
```js
function duplicate(n) {
  return [[[n, n]]];
}

_.flatMapDepth([1, 2], duplicate, 2);
// => [[1, 1], [2, 2]]
```
---

<!-- /div -->

<!-- div -->

### <a id="_foreachcollection-iteratee_identity"></a>`_.forEach(collection, [iteratee=_.identity])`
[#](#_foreachcollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8841) [npm package](https://www.npmjs.com/package/lodash.foreach) [&#x24C9;][1]

Iterates over elements of `collection` and invokes `iteratee` for each element.
The iteratee is invoked with three arguments: *(value, index|key, collection)*.
Iteratee functions may exit iteration early by explicitly returning `false`.
<br>
<br>
**Note:** As with other "Collections" methods, objects with a "length"
property are iterated like arrays. To avoid this behavior use `_.forIn`
or `_.forOwn` for object iteration.

#### Since
0.1.0
#### Aliases
*_.each*

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(&#42;)*: Returns `collection`.

#### Example
```js
_([1, 2]).forEach(function(value) {
  console.log(value);
});
// => Logs `1` then `2`.

_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```
---

<!-- /div -->

<!-- div -->

### <a id="_foreachrightcollection-iteratee_identity"></a>`_.forEachRight(collection, [iteratee=_.identity])`
[#](#_foreachrightcollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8866) [npm package](https://www.npmjs.com/package/lodash.foreachright) [&#x24C9;][1]

This method is like `_.forEach` except that it iterates over elements of
`collection` from right to left.

#### Since
2.0.0
#### Aliases
*_.eachRight*

#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(&#42;)*: Returns `collection`.

#### Example
```js
_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// => Logs `2` then `1`.
```
---

<!-- /div -->

<!-- div -->

### <a id="_groupbycollection-iteratee_identity"></a>`_.groupBy(collection, [iteratee=_.identity])`
[#](#_groupbycollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8895) [npm package](https://www.npmjs.com/package/lodash.groupby) [&#x24C9;][1]

Creates an object composed of keys generated from the results of running
each element of `collection` thru `iteratee`. The order of grouped values
is determined by the order they occur in `collection`. The corresponding
value of each key is an array of elements responsible for generating the
key. The iteratee is invoked with one argument: *(value)*.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee to transform keys.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }

// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```
---

<!-- /div -->

<!-- div -->

### <a id="_includescollection-value-fromindex0"></a>`_.includes(collection, value, [fromIndex=0])`
[#](#_includescollection-value-fromindex0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8933) [npm package](https://www.npmjs.com/package/lodash.includes) [&#x24C9;][1]

Checks if `value` is in `collection`. If `collection` is a string, it's
checked for a substring of `value`, otherwise
[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
is used for equality comparisons. If `fromIndex` is negative, it's used as
the offset from the end of `collection`.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object|string)*: The collection to search.
2. `value` *(&#42;)*: The value to search for.
3. `[fromIndex=0]` *(number)*: The index to search from.

#### Returns
*(boolean)*: Returns `true` if `value` is found, else `false`.

#### Example
```js
_.includes([1, 2, 3], 1);
// => true

_.includes([1, 2, 3], 1, 2);
// => false

_.includes({ 'a': 1, 'b': 2 }, 1);
// => true

_.includes('abcd', 'bc');
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_invokemapcollection-path-args"></a>`_.invokeMap(collection, path, [args])`
[#](#_invokemapcollection-path-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8969) [npm package](https://www.npmjs.com/package/lodash.invokemap) [&#x24C9;][1]

Invokes the method at `path` of each element in `collection`, returning
an array of the results of each invoked method. Any additional arguments
are provided to each invoked method. If `path` is a function, it's invoked
for, and `this` bound to, each element in `collection`.

#### Since
4.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `path` *(Array|Function|string)*: The path of the method to invoke or the function invoked per iteration.
3. `[args]` *(...&#42;)*: The arguments to invoke each method with.

#### Returns
*(Array)*: Returns the array of results.

#### Example
```js
_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]

_.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```
---

<!-- /div -->

<!-- div -->

### <a id="_keybycollection-iteratee_identity"></a>`_.keyBy(collection, [iteratee=_.identity])`
[#](#_keybycollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9011) [npm package](https://www.npmjs.com/package/lodash.keyby) [&#x24C9;][1]

Creates an object composed of keys generated from the results of running
each element of `collection` thru `iteratee`. The corresponding value of
each key is the last element responsible for generating the key. The
iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee to transform keys.

#### Returns
*(Object)*: Returns the composed aggregate object.

#### Example
```js
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];

_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
```
---

<!-- /div -->

<!-- div -->

### <a id="_mapcollection-iteratee_identity"></a>`_.map(collection, [iteratee=_.identity])`
[#](#_mapcollection-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9057) [npm package](https://www.npmjs.com/package/lodash.map) [&#x24C9;][1]

Creates an array of values by running each element in `collection` thru
`iteratee`. The iteratee is invoked with three arguments:<br>
*(value, index|key, collection)*.
<br>
<br>
Many lodash methods are guarded to work as iteratees for methods like
`_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
<br>
<br>
The guarded methods are:<br>
`ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
`fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
`sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
`template`, `trim`, `trimEnd`, `trimStart`, and `words`

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the new mapped array.

#### Example
```js
function square(n) {
  return n * n;
}

_.map([4, 8], square);
// => [16, 64]

_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)

var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];

// The `_.property` iteratee shorthand.
_.map(users, 'user');
// => ['barney', 'fred']
```
---

<!-- /div -->

<!-- div -->

### <a id="_orderbycollection-iteratees_identity-orders"></a>`_.orderBy(collection, [iteratees=[_.identity]], [orders])`
[#](#_orderbycollection-iteratees_identity-orders) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9091) [npm package](https://www.npmjs.com/package/lodash.orderby) [&#x24C9;][1]

This method is like `_.sortBy` except that it allows specifying the sort
orders of the iteratees to sort by. If `orders` is unspecified, all values
are sorted in ascending order. Otherwise, specify an order of "desc" for
descending or "asc" for ascending sort order of corresponding values.

#### Since
4.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratees=[_.identity]]` *(Array&#91;&#93;|Function&#91;&#93;|Object&#91;&#93;|string&#91;&#93;)*: The iteratees to sort by.
3. `[orders]` *(string&#91;&#93;)*: The sort orders of `iteratees`.

#### Returns
*(Array)*: Returns the new sorted array.

#### Example
```js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];

// Sort by `user` in ascending order and by `age` in descending order.
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```
---

<!-- /div -->

<!-- div -->

### <a id="_partitioncollection-predicate_identity"></a>`_.partition(collection, [predicate=_.identity])`
[#](#_partitioncollection-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9141) [npm package](https://www.npmjs.com/package/lodash.partition) [&#x24C9;][1]

Creates an array of elements split into two groups, the first of which
contains elements `predicate` returns truthy for, the second of which
contains elements `predicate` returns falsey for. The predicate is
invoked with one argument: *(value)*.

#### Since
3.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the array of grouped elements.

#### Example
```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];

_.partition(users, function(o) { return o.active; });
// => objects for [['fred'], ['barney', 'pebbles']]

// The `_.matches` iteratee shorthand.
_.partition(users, { 'age': 1, 'active': false });
// => objects for [['pebbles'], ['barney', 'fred']]

// The `_.matchesProperty` iteratee shorthand.
_.partition(users, ['active', false]);
// => objects for [['barney', 'pebbles'], ['fred']]

// The `_.property` iteratee shorthand.
_.partition(users, 'active');
// => objects for [['fred'], ['barney', 'pebbles']]
```
---

<!-- /div -->

<!-- div -->

### <a id="_reducecollection-iteratee_identity-accumulator"></a>`_.reduce(collection, [iteratee=_.identity], [accumulator])`
[#](#_reducecollection-iteratee_identity-accumulator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9182) [npm package](https://www.npmjs.com/package/lodash.reduce) [&#x24C9;][1]

Reduces `collection` to a value which is the accumulated result of running
each element in `collection` thru `iteratee`, where each successive
invocation is supplied the return value of the previous. If `accumulator`
is not given, the first element of `collection` is used as the initial
value. The iteratee is invoked with four arguments:<br>
*(accumulator, value, index|key, collection)*.
<br>
<br>
Many lodash methods are guarded to work as iteratees for methods like
`_.reduce`, `_.reduceRight`, and `_.transform`.
<br>
<br>
The guarded methods are:<br>
`assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
and `sortBy`

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[accumulator]` *(&#42;)*: The initial value.

#### Returns
*(&#42;)*: Returns the accumulated value.

#### Example
```js
_.reduce([1, 2], function(sum, n) {
  return sum + n;
}, 0);
// => 3

_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
  return result;
}, {});
// => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
```
---

<!-- /div -->

<!-- div -->

### <a id="_reducerightcollection-iteratee_identity-accumulator"></a>`_.reduceRight(collection, [iteratee=_.identity], [accumulator])`
[#](#_reducerightcollection-iteratee_identity-accumulator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9211) [npm package](https://www.npmjs.com/package/lodash.reduceright) [&#x24C9;][1]

This method is like `_.reduce` except that it iterates over elements of
`collection` from right to left.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[accumulator]` *(&#42;)*: The initial value.

#### Returns
*(&#42;)*: Returns the accumulated value.

#### Example
```js
var array = [[0, 1], [2, 3], [4, 5]];

_.reduceRight(array, function(flattened, other) {
  return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_rejectcollection-predicate_identity"></a>`_.reject(collection, [predicate=_.identity])`
[#](#_rejectcollection-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9252) [npm package](https://www.npmjs.com/package/lodash.reject) [&#x24C9;][1]

The opposite of `_.filter`; this method returns the elements of `collection`
that `predicate` does **not** return truthy for.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the new filtered array.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];

_.reject(users, function(o) { return !o.active; });
// => objects for ['fred']

// The `_.matches` iteratee shorthand.
_.reject(users, { 'age': 40, 'active': true });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.reject(users, ['active', false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
_.reject(users, 'active');
// => objects for ['barney']
```
---

<!-- /div -->

<!-- div -->

### <a id="_samplecollection"></a>`_.sample(collection)`
[#](#_samplecollection) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9271) [npm package](https://www.npmjs.com/package/lodash.sample) [&#x24C9;][1]

Gets a random element from `collection`.

#### Since
2.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to sample.

#### Returns
*(&#42;)*: Returns the random element.

#### Example
```js
_.sample([1, 2, 3, 4]);
// => 2
```
---

<!-- /div -->

<!-- div -->

### <a id="_samplesizecollection-n1"></a>`_.sampleSize(collection, [n=1])`
[#](#_samplesizecollection-n1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9298) [npm package](https://www.npmjs.com/package/lodash.samplesize) [&#x24C9;][1]

Gets `n` random elements at unique keys from `collection` up to the
size of `collection`.

#### Since
4.0.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to sample.
2. `[n=1]` *(number)*: The number of elements to sample.

#### Returns
*(Array)*: Returns the random elements.

#### Example
```js
_.sampleSize([1, 2, 3], 2);
// => [3, 1]

_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_shufflecollection"></a>`_.shuffle(collection)`
[#](#_shufflecollection) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9335) [npm package](https://www.npmjs.com/package/lodash.shuffle) [&#x24C9;][1]

Creates an array of shuffled values, using a version of the
[Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to shuffle.

#### Returns
*(Array)*: Returns the new shuffled array.

#### Example
```js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_sizecollection"></a>`_.size(collection)`
[#](#_sizecollection) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9360) [npm package](https://www.npmjs.com/package/lodash.size) [&#x24C9;][1]

Gets the size of `collection` by returning its length for array-like
values or the number of own enumerable string keyed properties for objects.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to inspect.

#### Returns
*(number)*: Returns the collection size.

#### Example
```js
_.size([1, 2, 3]);
// => 3

_.size({ 'a': 1, 'b': 2 });
// => 2

_.size('pebbles');
// => 7
```
---

<!-- /div -->

<!-- div -->

### <a id="_somecollection-predicate_identity"></a>`_.some(collection, [predicate=_.identity])`
[#](#_somecollection-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9413) [npm package](https://www.npmjs.com/package/lodash.some) [&#x24C9;][1]

Checks if `predicate` returns truthy for **any** element of `collection`.
Iteration is stopped once `predicate` returns truthy. The predicate is
invoked with three arguments: *(value, index|key, collection)*.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(boolean)*: Returns `true` if any element passes the predicate check, else `false`.

#### Example
```js
_.some([null, 0, 'yes', false], Boolean);
// => true

var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];

// The `_.matches` iteratee shorthand.
_.some(users, { 'user': 'barney', 'active': false });
// => false

// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_sortbycollection-iteratees_identity"></a>`_.sortBy(collection, [iteratees=[_.identity]])`
[#](#_sortbycollection-iteratees_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9455) [npm package](https://www.npmjs.com/package/lodash.sortby) [&#x24C9;][1]

Creates an array of elements, sorted in ascending order by the results of
running each element in a collection thru each iteratee. This method
performs a stable sort, that is, it preserves the original sort order of
equal elements. The iteratees are invoked with one argument: *(value)*.

#### Since
0.1.0
#### Arguments
1. `collection` *(Array|Object)*: The collection to iterate over.
2. `[iteratees=[_.identity]]` *(...(Function|Function&#91;&#93;))*: The iteratees to sort by.

#### Returns
*(Array)*: Returns the new sorted array.

#### Example
```js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];

_.sortBy(users, function(o) { return o.user; });
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]

_.sortBy(users, 'user', function(o) {
  return Math.floor(o.age / 10);
});
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Date” Methods`

<!-- div -->

### <a id="_now"></a>`_.now()`
[#](#_now) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9486) [npm package](https://www.npmjs.com/package/lodash.now) [&#x24C9;][1]

Gets the timestamp of the number of milliseconds that have elapsed since
the Unix epoch *(1 January `1970 00`:00:00 UTC)*.

#### Since
2.4.0
#### Returns
*(number)*: Returns the timestamp.

#### Example
```js
_.defer(function(stamp) {
  console.log(_.now() - stamp);
}, _.now());
// => Logs the number of milliseconds it took for the deferred invocation.
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Function” Methods`

<!-- div -->

### <a id="_aftern-func"></a>`_.after(n, func)`
[#](#_aftern-func) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9516) [npm package](https://www.npmjs.com/package/lodash.after) [&#x24C9;][1]

The opposite of `_.before`; this method creates a function that invokes
`func` once it's called `n` or more times.

#### Since
0.1.0
#### Arguments
1. `n` *(number)*: The number of calls before `func` is invoked.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
var saves = ['profile', 'settings'];

var done = _.after(saves.length, function() {
  console.log('done saving!');
});

_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
// => Logs 'done saving!' after the two async saves have completed.
```
---

<!-- /div -->

<!-- div -->

### <a id="_aryfunc-nfunclength"></a>`_.ary(func, [n=func.length])`
[#](#_aryfunc-nfunclength) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9545) [npm package](https://www.npmjs.com/package/lodash.ary) [&#x24C9;][1]

Creates a function that invokes `func`, with up to `n` arguments,
ignoring any additional arguments.

#### Since
3.0.0
#### Arguments
1. `func` *(Function)*: The function to cap arguments for.
2. `[n=func.length]` *(number)*: The arity cap.

#### Returns
*(Function)*: Returns the new capped function.

#### Example
```js
_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
```
---

<!-- /div -->

<!-- div -->

### <a id="_beforen-func"></a>`_.before(n, func)`
[#](#_beforen-func) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9568) [npm package](https://www.npmjs.com/package/lodash.before) [&#x24C9;][1]

Creates a function that invokes `func`, with the `this` binding and arguments
of the created function, while it's called less than `n` times. Subsequent
calls to the created function return the result of the last `func` invocation.

#### Since
3.0.0
#### Arguments
1. `n` *(number)*: The number of calls at which `func` is no longer invoked.
2. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
jQuery(element).on('click', _.before(5, addContactToList));
// => Allows adding up to 4 contacts to the list.
```
---

<!-- /div -->

<!-- div -->

### <a id="_bindfunc-thisarg-partials"></a>`_.bind(func, thisArg, [partials])`
[#](#_bindfunc-thisarg-partials) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9620) [npm package](https://www.npmjs.com/package/lodash.bind) [&#x24C9;][1]

Creates a function that invokes `func` with the `this` binding of `thisArg`
and `partials` prepended to the arguments it receives.
<br>
<br>
The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
may be used as a placeholder for partially applied arguments.
<br>
<br>
**Note:** Unlike native `Function#bind`, this method doesn't set the "length"
property of bound functions.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to bind.
2. `thisArg` *(&#42;)*: The `this` binding of `func`.
3. `[partials]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*: Returns the new bound function.

#### Example
```js
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

var object = { 'user': 'fred' };

var bound = _.bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// Bound with placeholders.
var bound = _.bind(greet, object, _, '!');
bound('hi');
// => 'hi fred!'
```
---

<!-- /div -->

<!-- div -->

### <a id="_bindkeyobject-key-partials"></a>`_.bindKey(object, key, [partials])`
[#](#_bindkeyobject-key-partials) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9674) [npm package](https://www.npmjs.com/package/lodash.bindkey) [&#x24C9;][1]

Creates a function that invokes the method at `object[key]` with `partials`
prepended to the arguments it receives.
<br>
<br>
This method differs from `_.bind` by allowing bound functions to reference
methods that may be redefined or don't yet exist. See
[Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
for more details.
<br>
<br>
The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for partially applied arguments.

#### Since
0.10.0
#### Arguments
1. `object` *(Object)*: The object to invoke the method on.
2. `key` *(string)*: The key of the method.
3. `[partials]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*: Returns the new bound function.

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

// Bound with placeholders.
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'
```
---

<!-- /div -->

<!-- div -->

### <a id="_curryfunc-arityfunclength"></a>`_.curry(func, [arity=func.length])`
[#](#_curryfunc-arityfunclength) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9724) [npm package](https://www.npmjs.com/package/lodash.curry) [&#x24C9;][1]

Creates a function that accepts arguments of `func` and either invokes
`func` returning its result, if at least `arity` number of arguments have
been provided, or returns a function that accepts the remaining `func`
arguments, and so on. The arity of `func` may be specified if `func.length`
is not sufficient.
<br>
<br>
The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
may be used as a placeholder for provided arguments.
<br>
<br>
**Note:** This method doesn't set the "length" property of curried functions.

#### Since
2.0.0
#### Arguments
1. `func` *(Function)*: The function to curry.
2. `[arity=func.length]` *(number)*: The arity of `func`.

#### Returns
*(Function)*: Returns the new curried function.

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

// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_curryrightfunc-arityfunclength"></a>`_.curryRight(func, [arity=func.length])`
[#](#_curryrightfunc-arityfunclength) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9769) [npm package](https://www.npmjs.com/package/lodash.curryright) [&#x24C9;][1]

This method is like `_.curry` except that arguments are applied to `func`
in the manner of `_.partialRight` instead of `_.partial`.
<br>
<br>
The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for provided arguments.
<br>
<br>
**Note:** This method doesn't set the "length" property of curried functions.

#### Since
3.0.0
#### Arguments
1. `func` *(Function)*: The function to curry.
2. `[arity=func.length]` *(number)*: The arity of `func`.

#### Returns
*(Function)*: Returns the new curried function.

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

// Curried with placeholders.
curried(3)(1, _)(2);
// => [1, 2, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_debouncefunc-wait0-options-optionsleadingfalse-optionsmaxwait-optionstrailingtrue"></a>`_.debounce(func, [wait=0], [options={}], [options.leading=false], [options.maxWait], [options.trailing=true])`
[#](#_debouncefunc-wait0-options-optionsleadingfalse-optionsmaxwait-optionstrailingtrue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9826) [npm package](https://www.npmjs.com/package/lodash.debounce) [&#x24C9;][1]

Creates a debounced function that delays invoking `func` until after `wait`
milliseconds have elapsed since the last time the debounced function was
invoked. The debounced function comes with a `cancel` method to cancel
delayed `func` invocations and a `flush` method to immediately invoke them.
Provide an options object to indicate whether `func` should be invoked on
the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
with the last arguments provided to the debounced function. Subsequent calls
to the debounced function return the result of the last `func` invocation.
<br>
<br>
**Note:** If `leading` and `trailing` options are `true`, `func` is invoked
on the trailing edge of the timeout only if the debounced function is
invoked more than once during the `wait` timeout.
<br>
<br>
See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
for details over the differences between `_.debounce` and `_.throttle`.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to debounce.
2. `[wait=0]` *(number)*: The number of milliseconds to delay.
3. `[options={}]` *(Object)*: The options object.
4. `[options.leading=false]` *(boolean)*: Specify invoking on the leading edge of the timeout.
5. `[options.maxWait]` *(number)*: The maximum time `func` is allowed to be delayed before it's invoked.
6. `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge of the timeout.

#### Returns
*(Function)*: Returns the new debounced function.

#### Example
```js
// Avoid costly calculations while the window size is in flux.
jQuery(window).on('resize', _.debounce(calculateLayout, 150));

// Invoke `sendMail` when clicked, debouncing subsequent calls.
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));

// Ensure `batchLog` is invoked once after 1 second of debounced calls.
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);

// Cancel the trailing debounced invocation.
jQuery(window).on('popstate', debounced.cancel);
```
---

<!-- /div -->

<!-- div -->

### <a id="_deferfunc-args"></a>`_.defer(func, [args])`
[#](#_deferfunc-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9966) [npm package](https://www.npmjs.com/package/lodash.defer) [&#x24C9;][1]

Defers invoking the `func` until the current call stack has cleared. Any
additional arguments are provided to `func` when it's invoked.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to defer.
2. `[args]` *(...&#42;)*: The arguments to invoke `func` with.

#### Returns
*(number)*: Returns the timer id.

#### Example
```js
_.defer(function(text) {
  console.log(text);
}, 'deferred');
// => Logs 'deferred' after one or more milliseconds.
```
---

<!-- /div -->

<!-- div -->

### <a id="_delayfunc-wait-args"></a>`_.delay(func, wait, [args])`
[#](#_delayfunc-wait-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L9989) [npm package](https://www.npmjs.com/package/lodash.delay) [&#x24C9;][1]

Invokes `func` after `wait` milliseconds. Any additional arguments are
provided to `func` when it's invoked.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to delay.
2. `wait` *(number)*: The number of milliseconds to delay invocation.
3. `[args]` *(...&#42;)*: The arguments to invoke `func` with.

#### Returns
*(number)*: Returns the timer id.

#### Example
```js
_.delay(function(text) {
  console.log(text);
}, 1000, 'later');
// => Logs 'later' after one second.
```
---

<!-- /div -->

<!-- div -->

### <a id="_flipfunc"></a>`_.flip(func)`
[#](#_flipfunc) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10011) [npm package](https://www.npmjs.com/package/lodash.flip) [&#x24C9;][1]

Creates a function that invokes `func` with arguments reversed.

#### Since
4.0.0
#### Arguments
1. `func` *(Function)*: The function to flip arguments for.

#### Returns
*(Function)*: Returns the new flipped function.

#### Example
```js
var flipped = _.flip(function() {
  return _.toArray(arguments);
});

flipped('a', 'b', 'c', 'd');
// => ['d', 'c', 'b', 'a']
```
---

<!-- /div -->

<!-- div -->

### <a id="_memoizefunc-resolver"></a>`_.memoize(func, [resolver])`
[#](#_memoizefunc-resolver) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10059) [npm package](https://www.npmjs.com/package/lodash.memoize) [&#x24C9;][1]

Creates a function that memoizes the result of `func`. If `resolver` is
provided, it determines the cache key for storing the result based on the
arguments provided to the memoized function. By default, the first argument
provided to the memoized function is used as the map cache key. The `func`
is invoked with the `this` binding of the memoized function.
<br>
<br>
**Note:** The cache is exposed as the `cache` property on the memoized
function. Its creation may be customized by replacing the `_.memoize.Cache`
constructor with one whose instances implement the
[`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
method interface of `delete`, `get`, `has`, and `set`.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to have its output memoized.
2. `[resolver]` *(Function)*: The function to resolve the cache key.

#### Returns
*(Function)*: Returns the new memoized function.

#### Example
```js
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };

var values = _.memoize(_.values);
values(object);
// => [1, 2]

values(other);
// => [3, 4]

object.a = 2;
values(object);
// => [1, 2]

// Modify the result cache.
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']

// Replace `_.memoize.Cache`.
_.memoize.Cache = WeakMap;
```
---

<!-- /div -->

<!-- div -->

### <a id="_negatepredicate"></a>`_.negate(predicate)`
[#](#_negatepredicate) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10102) [npm package](https://www.npmjs.com/package/lodash.negate) [&#x24C9;][1]

Creates a function that negates the result of the predicate `func`. The
`func` predicate is invoked with the `this` binding and arguments of the
created function.

#### Since
3.0.0
#### Arguments
1. `predicate` *(Function)*: The predicate to negate.

#### Returns
*(Function)*: Returns the new negated function.

#### Example
```js
function isEven(n) {
  return n % 2 == 0;
}

_.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
// => [1, 3, 5]
```
---

<!-- /div -->

<!-- div -->

### <a id="_oncefunc"></a>`_.once(func)`
[#](#_oncefunc) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10136) [npm package](https://www.npmjs.com/package/lodash.once) [&#x24C9;][1]

Creates a function that is restricted to invoking `func` once. Repeat calls
to the function return the value of the first invocation. The `func` is
invoked with the `this` binding and arguments of the created function.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to restrict.

#### Returns
*(Function)*: Returns the new restricted function.

#### Example
```js
var initialize = _.once(createApplication);
initialize();
initialize();
// => `createApplication` is invoked once
```
---

<!-- /div -->

<!-- div -->

### <a id="_overargsfunc-transforms_identity"></a>`_.overArgs(func, [transforms=[_.identity]])`
[#](#_overargsfunc-transforms_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10171) [npm package](https://www.npmjs.com/package/lodash.overargs) [&#x24C9;][1]

Creates a function that invokes `func` with its arguments transformed.

#### Since
4.0.0
#### Arguments
1. `func` *(Function)*: The function to wrap.
2. `[transforms=[_.identity]]` *(...(Function|Function&#91;&#93;))*: The argument transforms.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
function doubled(n) {
  return n * 2;
}

function square(n) {
  return n * n;
}

var func = _.overArgs(function(x, y) {
  return [x, y];
}, [square, doubled]);

func(9, 3);
// => [81, 6]

func(10, 5);
// => [100, 10]
```
---

<!-- /div -->

<!-- div -->

### <a id="_partialfunc-partials"></a>`_.partial(func, [partials])`
[#](#_partialfunc-partials) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10221) [npm package](https://www.npmjs.com/package/lodash.partial) [&#x24C9;][1]

Creates a function that invokes `func` with `partials` prepended to the
arguments it receives. This method is like `_.bind` except it does **not**
alter the `this` binding.
<br>
<br>
The `_.partial.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for partially applied arguments.
<br>
<br>
**Note:** This method doesn't set the "length" property of partially
applied functions.

#### Since
0.2.0
#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[partials]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*: Returns the new partially applied function.

#### Example
```js
function greet(greeting, name) {
  return greeting + ' ' + name;
}

var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'

// Partially applied with placeholders.
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```
---

<!-- /div -->

<!-- div -->

### <a id="_partialrightfunc-partials"></a>`_.partialRight(func, [partials])`
[#](#_partialrightfunc-partials) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10258) [npm package](https://www.npmjs.com/package/lodash.partialright) [&#x24C9;][1]

This method is like `_.partial` except that partially applied arguments
are appended to the arguments it receives.
<br>
<br>
The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
builds, may be used as a placeholder for partially applied arguments.
<br>
<br>
**Note:** This method doesn't set the "length" property of partially
applied functions.

#### Since
1.0.0
#### Arguments
1. `func` *(Function)*: The function to partially apply arguments to.
2. `[partials]` *(...&#42;)*: The arguments to be partially applied.

#### Returns
*(Function)*: Returns the new partially applied function.

#### Example
```js
function greet(greeting, name) {
  return greeting + ' ' + name;
}

var greetFred = _.partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'

// Partially applied with placeholders.
var sayHelloTo = _.partialRight(greet, 'hello', _);
sayHelloTo('fred');
// => 'hello fred'
```
---

<!-- /div -->

<!-- div -->

### <a id="_reargfunc-indexes"></a>`_.rearg(func, indexes)`
[#](#_reargfunc-indexes) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10285) [npm package](https://www.npmjs.com/package/lodash.rearg) [&#x24C9;][1]

Creates a function that invokes `func` with arguments arranged according
to the specified `indexes` where the argument value at the first index is
provided as the first argument, the argument value at the second index is
provided as the second argument, and so on.

#### Since
3.0.0
#### Arguments
1. `func` *(Function)*: The function to rearrange arguments for.
2. `indexes` *(...(number|number&#91;&#93;))*: The arranged argument indexes.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var rearged = _.rearg(function(a, b, c) {
  return [a, b, c];
}, [2, 0, 1]);

rearged('b', 'c', 'a')
// => ['a', 'b', 'c']
```
---

<!-- /div -->

<!-- div -->

### <a id="_restfunc-startfunclength-1"></a>`_.rest(func, [start=func.length-1])`
[#](#_restfunc-startfunclength-1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10314) [npm package](https://www.npmjs.com/package/lodash.rest) [&#x24C9;][1]

Creates a function that invokes `func` with the `this` binding of the
created function and arguments from `start` and beyond provided as
an array.
<br>
<br>
**Note:** This method is based on the
[rest parameter](https://mdn.io/rest_parameters).

#### Since
4.0.0
#### Arguments
1. `func` *(Function)*: The function to apply a rest parameter to.
2. `[start=func.length-1]` *(number)*: The start position of the rest parameter.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var say = _.rest(function(what, names) {
  return what + ' ' + _.initial(names).join(', ') +
    (_.size(names) > 1 ? ', & ' : '') + _.last(names);
});

say('hello', 'fred', 'barney', 'pebbles');
// => 'hello fred, barney, & pebbles'
```
---

<!-- /div -->

<!-- div -->

### <a id="_spreadfunc-start0"></a>`_.spread(func, [start=0])`
[#](#_spreadfunc-start0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10356) [npm package](https://www.npmjs.com/package/lodash.spread) [&#x24C9;][1]

Creates a function that invokes `func` with the `this` binding of the
create function and an array of arguments much like
[`Function#apply`](http://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply).
<br>
<br>
**Note:** This method is based on the
[spread operator](https://mdn.io/spread_operator).

#### Since
3.2.0
#### Arguments
1. `func` *(Function)*: The function to spread arguments over.
2. `[start=0]` *(number)*: The start position of the spread.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var say = _.spread(function(who, what) {
  return who + ' says ' + what;
});

say(['fred', 'hello']);
// => 'fred says hello'

var numbers = Promise.all([
  Promise.resolve(40),
  Promise.resolve(36)
]);

numbers.then(_.spread(function(x, y) {
  return x + y;
}));
// => a Promise of 76
```
---

<!-- /div -->

<!-- div -->

### <a id="_throttlefunc-wait0-options-optionsleadingtrue-optionstrailingtrue"></a>`_.throttle(func, [wait=0], [options={}], [options.leading=true], [options.trailing=true])`
[#](#_throttlefunc-wait0-options-optionsleadingtrue-optionstrailingtrue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10413) [npm package](https://www.npmjs.com/package/lodash.throttle) [&#x24C9;][1]

Creates a throttled function that only invokes `func` at most once per
every `wait` milliseconds. The throttled function comes with a `cancel`
method to cancel delayed `func` invocations and a `flush` method to
immediately invoke them. Provide an options object to indicate whether
`func` should be invoked on the leading and/or trailing edge of the `wait`
timeout. The `func` is invoked with the last arguments provided to the
throttled function. Subsequent calls to the throttled function return the
result of the last `func` invocation.
<br>
<br>
**Note:** If `leading` and `trailing` options are `true`, `func` is
invoked on the trailing edge of the timeout only if the throttled function
is invoked more than once during the `wait` timeout.
<br>
<br>
See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
for details over the differences between `_.throttle` and `_.debounce`.

#### Since
0.1.0
#### Arguments
1. `func` *(Function)*: The function to throttle.
2. `[wait=0]` *(number)*: The number of milliseconds to throttle invocations to.
3. `[options={}]` *(Object)*: The options object.
4. `[options.leading=true]` *(boolean)*: Specify invoking on the leading edge of the timeout.
5. `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge of the timeout.

#### Returns
*(Function)*: Returns the new throttled function.

#### Example
```js
// Avoid excessively updating the position while scrolling.
jQuery(window).on('scroll', _.throttle(updatePosition, 100));

// Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);

// Cancel the trailing throttled invocation.
jQuery(window).on('popstate', throttled.cancel);
```
---

<!-- /div -->

<!-- div -->

### <a id="_unaryfunc"></a>`_.unary(func)`
[#](#_unaryfunc) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10446) [npm package](https://www.npmjs.com/package/lodash.unary) [&#x24C9;][1]

Creates a function that accepts up to one argument, ignoring any
additional arguments.

#### Since
4.0.0
#### Arguments
1. `func` *(Function)*: The function to cap arguments for.

#### Returns
*(Function)*: Returns the new capped function.

#### Example
```js
_.map(['6', '8', '10'], _.unary(parseInt));
// => [6, 8, 10]
```
---

<!-- /div -->

<!-- div -->

### <a id="_wrapvalue-wrapperidentity"></a>`_.wrap(value, [wrapper=identity])`
[#](#_wrapvalue-wrapperidentity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10472) [npm package](https://www.npmjs.com/package/lodash.wrap) [&#x24C9;][1]

Creates a function that provides `value` to `wrapper` as its first
argument. Any additional arguments provided to the function are appended
to those provided to the `wrapper`. The wrapper is invoked with the `this`
binding of the created function.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to wrap.
2. `[wrapper=identity]` *(Function)*: The wrapper function.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var p = _.wrap(_.escape, function(func, text) {
  return '<p>' + func(text) + '</p>';
});

p('fred, barney, & pebbles');
// => '<p>fred, barney, &amp; pebbles</p>'
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Lang” Methods`

<!-- div -->

### <a id="_castarrayvalue"></a>`_.castArray(value)`
[#](#_castarrayvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10512) [npm package](https://www.npmjs.com/package/lodash.castarray) [&#x24C9;][1]

Casts `value` as an array if it's not one.

#### Since
4.4.0
#### Arguments
1. `value` *(&#42;)*: The value to inspect.

#### Returns
*(Array)*: Returns the cast array.

#### Example
```js
_.castArray(1);
// => [1]

_.castArray({ 'a': 1 });
// => [{ 'a': 1 }]

_.castArray('abc');
// => ['abc']

_.castArray(null);
// => [null]

_.castArray(undefined);
// => [undefined]

_.castArray();
// => []

var array = [1, 2, 3];
console.log(_.castArray(array) === array);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_clonevalue"></a>`_.clone(value)`
[#](#_clonevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10546) [npm package](https://www.npmjs.com/package/lodash.clone) [&#x24C9;][1]

Creates a shallow clone of `value`.
<br>
<br>
**Note:** This method is loosely based on the
[structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
and supports cloning arrays, array buffers, booleans, date objects, maps,
numbers, `Object` objects, regexes, sets, strings, symbols, and typed
arrays. The own enumerable properties of `arguments` objects are cloned
as plain objects. An empty object is returned for uncloneable values such
as error objects, functions, DOM nodes, and WeakMaps.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to clone.

#### Returns
*(&#42;)*: Returns the cloned value.

#### Example
```js
var objects = [{ 'a': 1 }, { 'b': 2 }];

var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_clonedeepvalue"></a>`_.cloneDeep(value)`
[#](#_clonedeepvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10603) [npm package](https://www.npmjs.com/package/lodash.clonedeep) [&#x24C9;][1]

This method is like `_.clone` except that it recursively clones `value`.

#### Since
1.0.0
#### Arguments
1. `value` *(&#42;)*: The value to recursively clone.

#### Returns
*(&#42;)*: Returns the deep cloned value.

#### Example
```js
var objects = [{ 'a': 1 }, { 'b': 2 }];

var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_clonedeepwithvalue-customizer"></a>`_.cloneDeepWith(value, [customizer])`
[#](#_clonedeepwithvalue-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10635) [npm package](https://www.npmjs.com/package/lodash.clonedeepwith) [&#x24C9;][1]

This method is like `_.cloneWith` except that it recursively clones `value`.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to recursively clone.
2. `[customizer]` *(Function)*: The function to customize cloning.

#### Returns
*(&#42;)*: Returns the deep cloned value.

#### Example
```js
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(true);
  }
}

var el = _.cloneDeepWith(document.body, customizer);

console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 20
```
---

<!-- /div -->

<!-- div -->

### <a id="_clonewithvalue-customizer"></a>`_.cloneWith(value, [customizer])`
[#](#_clonewithvalue-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10581) [npm package](https://www.npmjs.com/package/lodash.clonewith) [&#x24C9;][1]

This method is like `_.clone` except that it accepts `customizer` which
is invoked to produce the cloned value. If `customizer` returns `undefined`,
cloning is handled by the method instead. The `customizer` is invoked with
up to four arguments; *(value [, index|key, object, stack])*.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to clone.
2. `[customizer]` *(Function)*: The function to customize cloning.

#### Returns
*(&#42;)*: Returns the cloned value.

#### Example
```js
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(false);
  }
}

var el = _.cloneWith(document.body, customizer);

console.log(el === document.body);
// => false
console.log(el.nodeName);
// => 'BODY'
console.log(el.childNodes.length);
// => 0
```
---

<!-- /div -->

<!-- div -->

### <a id="_conformstoobject-source"></a>`_.conformsTo(object, source)`
[#](#_conformstoobject-source) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10661) [npm package](https://www.npmjs.com/package/lodash.conformsto) [&#x24C9;][1]

Checks if `object` conforms to `source` by invoking the predicate properties
of `source` with the corresponding property values of `object`. This method
is equivalent to a `_.conforms` function when `source` is partially applied.

#### Since
4.14.0
#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `source` *(Object)*: The object of property predicates to conform to.

#### Returns
*(boolean)*: Returns `true` if `object` conforms, else `false`.

#### Example
```js
var object = { 'a': 1, 'b': 2 };

_.conformsTo(object, { 'b': function(n) { return n > 1; } });
// => true

_.conformsTo(object, { 'b': function(n) { return n > 2; } });
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_eqvalue-other"></a>`_.eq(value, other)`
[#](#_eqvalue-other) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10697) [npm package](https://www.npmjs.com/package/lodash.eq) [&#x24C9;][1]

Performs a
[`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
comparison between two values to determine if they are equivalent.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.

#### Returns
*(boolean)*: Returns `true` if the values are equivalent, else `false`.

#### Example
```js
var object = { 'a': 1 };
var other = { 'a': 1 };

_.eq(object, object);
// => true

_.eq(object, other);
// => false

_.eq('a', 'a');
// => true

_.eq('a', Object('a'));
// => false

_.eq(NaN, NaN);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_gtvalue-other"></a>`_.gt(value, other)`
[#](#_gtvalue-other) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10724) [npm package](https://www.npmjs.com/package/lodash.gt) [&#x24C9;][1]

Checks if `value` is greater than `other`.

#### Since
3.9.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.

#### Returns
*(boolean)*: Returns `true` if `value` is greater than `other`, else `false`.

#### Example
```js
_.gt(3, 1);
// => true

_.gt(3, 3);
// => false

_.gt(1, 3);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_gtevalue-other"></a>`_.gte(value, other)`
[#](#_gtevalue-other) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10749) [npm package](https://www.npmjs.com/package/lodash.gte) [&#x24C9;][1]

Checks if `value` is greater than or equal to `other`.

#### Since
3.9.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.

#### Returns
*(boolean)*: Returns `true` if `value` is greater than or equal to `other`, else `false`.

#### Example
```js
_.gte(3, 1);
// => true

_.gte(3, 3);
// => true

_.gte(1, 3);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isargumentsvalue"></a>`_.isArguments(value)`
[#](#_isargumentsvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10771) [npm package](https://www.npmjs.com/package/lodash.isarguments) [&#x24C9;][1]

Checks if `value` is likely an `arguments` object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an `arguments` object, else `false`.

#### Example
```js
_.isArguments(function() { return arguments; }());
// => true

_.isArguments([1, 2, 3]);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isarrayvalue"></a>`_.isArray(value)`
[#](#_isarrayvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10800) [npm package](https://www.npmjs.com/package/lodash.isarray) [&#x24C9;][1]

Checks if `value` is classified as an `Array` object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an array, else `false`.

#### Example
```js
_.isArray([1, 2, 3]);
// => true

_.isArray(document.body.children);
// => false

_.isArray('abc');
// => false

_.isArray(_.noop);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isarraybuffervalue"></a>`_.isArrayBuffer(value)`
[#](#_isarraybuffervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10819) [npm package](https://www.npmjs.com/package/lodash.isarraybuffer) [&#x24C9;][1]

Checks if `value` is classified as an `ArrayBuffer` object.

#### Since
4.3.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an array buffer, else `false`.

#### Example
```js
_.isArrayBuffer(new ArrayBuffer(2));
// => true

_.isArrayBuffer(new Array(2));
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isarraylikevalue"></a>`_.isArrayLike(value)`
[#](#_isarraylikevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10846) [npm package](https://www.npmjs.com/package/lodash.isarraylike) [&#x24C9;][1]

Checks if `value` is array-like. A value is considered array-like if it's
not a function and has a `value.length` that's an integer greater than or
equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is array-like, else `false`.

#### Example
```js
_.isArrayLike([1, 2, 3]);
// => true

_.isArrayLike(document.body.children);
// => true

_.isArrayLike('abc');
// => true

_.isArrayLike(_.noop);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isarraylikeobjectvalue"></a>`_.isArrayLikeObject(value)`
[#](#_isarraylikeobjectvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10875) [npm package](https://www.npmjs.com/package/lodash.isarraylikeobject) [&#x24C9;][1]

This method is like `_.isArrayLike` except that it also checks if `value`
is an object.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an array-like object, else `false`.

#### Example
```js
_.isArrayLikeObject([1, 2, 3]);
// => true

_.isArrayLikeObject(document.body.children);
// => true

_.isArrayLikeObject('abc');
// => false

_.isArrayLikeObject(_.noop);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isbooleanvalue"></a>`_.isBoolean(value)`
[#](#_isbooleanvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10896) [npm package](https://www.npmjs.com/package/lodash.isboolean) [&#x24C9;][1]

Checks if `value` is classified as a boolean primitive or object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a boolean, else `false`.

#### Example
```js
_.isBoolean(false);
// => true

_.isBoolean(null);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isbuffervalue"></a>`_.isBuffer(value)`
[#](#_isbuffervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10918) [npm package](https://www.npmjs.com/package/lodash.isbuffer) [&#x24C9;][1]

Checks if `value` is a buffer.

#### Since
4.3.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a buffer, else `false`.

#### Example
```js
_.isBuffer(new Buffer(2));
// => true

_.isBuffer(new Uint8Array(2));
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isdatevalue"></a>`_.isDate(value)`
[#](#_isdatevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10937) [npm package](https://www.npmjs.com/package/lodash.isdate) [&#x24C9;][1]

Checks if `value` is classified as a `Date` object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a date object, else `false`.

#### Example
```js
_.isDate(new Date);
// => true

_.isDate('Mon April 23 2012');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_iselementvalue"></a>`_.isElement(value)`
[#](#_iselementvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10957) [npm package](https://www.npmjs.com/package/lodash.iselement) [&#x24C9;][1]

Checks if `value` is likely a DOM element.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a DOM element, else `false`.

#### Example
```js
_.isElement(document.body);
// => true

_.isElement('<body>');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isemptyvalue"></a>`_.isEmpty(value)`
[#](#_isemptyvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L10994) [npm package](https://www.npmjs.com/package/lodash.isempty) [&#x24C9;][1]

Checks if `value` is an empty object, collection, map, or set.
<br>
<br>
Objects are considered empty if they have no own enumerable string keyed
properties.
<br>
<br>
Array-like values such as `arguments` objects, arrays, buffers, strings, or
jQuery-like collections are considered empty if they have a `length` of `0`.
Similarly, maps and sets are considered empty if they have a `size` of `0`.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is empty, else `false`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_isequalvalue-other"></a>`_.isEqual(value, other)`
[#](#_isequalvalue-other) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11043) [npm package](https://www.npmjs.com/package/lodash.isequal) [&#x24C9;][1]

Performs a deep comparison between two values to determine if they are
equivalent.
<br>
<br>
**Note:** This method supports comparing arrays, array buffers, booleans,
date objects, error objects, maps, numbers, `Object` objects, regexes,
sets, strings, symbols, and typed arrays. `Object` objects are compared
by their own, not inherited, enumerable properties. Functions and DOM
nodes are **not** supported.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.

#### Returns
*(boolean)*: Returns `true` if the values are equivalent, else `false`.

#### Example
```js
var object = { 'a': 1 };
var other = { 'a': 1 };

_.isEqual(object, other);
// => true

object === other;
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isequalwithvalue-other-customizer"></a>`_.isEqualWith(value, other, [customizer])`
[#](#_isequalwithvalue-other-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11080) [npm package](https://www.npmjs.com/package/lodash.isequalwith) [&#x24C9;][1]

This method is like `_.isEqual` except that it accepts `customizer` which
is invoked to compare values. If `customizer` returns `undefined`, comparisons
are handled by the method instead. The `customizer` is invoked with up to
six arguments: *(objValue, othValue [, index|key, object, other, stack])*.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.
3. `[customizer]` *(Function)*: The function to customize comparisons.

#### Returns
*(boolean)*: Returns `true` if the values are equivalent, else `false`.

#### Example
```js
function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, othValue) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
    return true;
  }
}

var array = ['hello', 'goodbye'];
var other = ['hi', 'goodbye'];

_.isEqualWith(array, other, customizer);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_iserrorvalue"></a>`_.isError(value)`
[#](#_iserrorvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11105) [npm package](https://www.npmjs.com/package/lodash.iserror) [&#x24C9;][1]

Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
`SyntaxError`, `TypeError`, or `URIError` object.

#### Since
3.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an error object, else `false`.

#### Example
```js
_.isError(new Error);
// => true

_.isError(Error);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isfinitevalue"></a>`_.isFinite(value)`
[#](#_isfinitevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11140) [npm package](https://www.npmjs.com/package/lodash.isfinite) [&#x24C9;][1]

Checks if `value` is a finite primitive number.
<br>
<br>
**Note:** This method is based on
[`Number.isFinite`](https://mdn.io/Number/isFinite).

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a finite number, else `false`.

#### Example
```js
_.isFinite(3);
// => true

_.isFinite(Number.MIN_VALUE);
// => true

_.isFinite(Infinity);
// => false

_.isFinite('3');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isfunctionvalue"></a>`_.isFunction(value)`
[#](#_isfunctionvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11161) [npm package](https://www.npmjs.com/package/lodash.isfunction) [&#x24C9;][1]

Checks if `value` is classified as a `Function` object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a function, else `false`.

#### Example
```js
_.isFunction(_);
// => true

_.isFunction(/abc/);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isintegervalue"></a>`_.isInteger(value)`
[#](#_isintegervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11195) [npm package](https://www.npmjs.com/package/lodash.isinteger) [&#x24C9;][1]

Checks if `value` is an integer.
<br>
<br>
**Note:** This method is based on
[`Number.isInteger`](https://mdn.io/Number/isInteger).

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an integer, else `false`.

#### Example
```js
_.isInteger(3);
// => true

_.isInteger(Number.MIN_VALUE);
// => false

_.isInteger(Infinity);
// => false

_.isInteger('3');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_islengthvalue"></a>`_.isLength(value)`
[#](#_islengthvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11226) [npm package](https://www.npmjs.com/package/lodash.islength) [&#x24C9;][1]

Checks if `value` is a valid array-like length.
<br>
<br>
**Note:** This function is loosely based on
[`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a valid length, else `false`.

#### Example
```js
_.isLength(3);
// => true

_.isLength(Number.MIN_VALUE);
// => false

_.isLength(Infinity);
// => false

_.isLength('3');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_ismapvalue"></a>`_.isMap(value)`
[#](#_ismapvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11306) [npm package](https://www.npmjs.com/package/lodash.ismap) [&#x24C9;][1]

Checks if `value` is classified as a `Map` object.

#### Since
4.3.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a map, else `false`.

#### Example
```js
_.isMap(new Map);
// => true

_.isMap(new WeakMap);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_ismatchobject-source"></a>`_.isMatch(object, source)`
[#](#_ismatchobject-source) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11332) [npm package](https://www.npmjs.com/package/lodash.ismatch) [&#x24C9;][1]

Performs a partial deep comparison between `object` and `source` to
determine if `object` contains equivalent property values. This method is
equivalent to a `_.matches` function when `source` is partially applied.
<br>
<br>
**Note:** This method supports comparing the same values as `_.isEqual`.

#### Since
3.0.0
#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `source` *(Object)*: The object of property values to match.

#### Returns
*(boolean)*: Returns `true` if `object` is a match, else `false`.

#### Example
```js
var object = { 'a': 1, 'b': 2 };

_.isMatch(object, { 'b': 2 });
// => true

_.isMatch(object, { 'b': 1 });
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_ismatchwithobject-source-customizer"></a>`_.isMatchWith(object, source, [customizer])`
[#](#_ismatchwithobject-source-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11368) [npm package](https://www.npmjs.com/package/lodash.ismatchwith) [&#x24C9;][1]

This method is like `_.isMatch` except that it accepts `customizer` which
is invoked to compare values. If `customizer` returns `undefined`, comparisons
are handled by the method instead. The `customizer` is invoked with five
arguments: *(objValue, srcValue, index|key, object, source)*.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The object to inspect.
2. `source` *(Object)*: The object of property values to match.
3. `[customizer]` *(Function)*: The function to customize comparisons.

#### Returns
*(boolean)*: Returns `true` if `object` is a match, else `false`.

#### Example
```js
function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, srcValue) {
  if (isGreeting(objValue) && isGreeting(srcValue)) {
    return true;
  }
}

var object = { 'greeting': 'hello' };
var source = { 'greeting': 'hi' };

_.isMatchWith(object, source, customizer);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_isnanvalue"></a>`_.isNaN(value)`
[#](#_isnanvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11401) [npm package](https://www.npmjs.com/package/lodash.isnan) [&#x24C9;][1]

Checks if `value` is `NaN`.
<br>
<br>
**Note:** This method is based on
[`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
`undefined` and other non-number values.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is `NaN`, else `false`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_isnativevalue"></a>`_.isNative(value)`
[#](#_isnativevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11434) [npm package](https://www.npmjs.com/package/lodash.isnative) [&#x24C9;][1]

Checks if `value` is a pristine native function.
<br>
<br>
**Note:** This method can't reliably detect native functions in the presence
of the core-js package because core-js circumvents this kind of detection.
Despite multiple requests, the core-js maintainer has made it clear: any
attempt to fix the detection will be obstructed. As a result, we're left
with little choice but to throw an error. Unfortunately, this also affects
packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
which rely on core-js.

#### Since
3.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a native function, else `false`.

#### Example
```js
_.isNative(Array.prototype.push);
// => true

_.isNative(_);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isnilvalue"></a>`_.isNil(value)`
[#](#_isnilvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11482) [npm package](https://www.npmjs.com/package/lodash.isnil) [&#x24C9;][1]

Checks if `value` is `null` or `undefined`.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is nullish, else `false`.

#### Example
```js
_.isNil(null);
// => true

_.isNil(void 0);
// => true

_.isNil(NaN);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isnullvalue"></a>`_.isNull(value)`
[#](#_isnullvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11458) [npm package](https://www.npmjs.com/package/lodash.isnull) [&#x24C9;][1]

Checks if `value` is `null`.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is `null`, else `false`.

#### Example
```js
_.isNull(null);
// => true

_.isNull(void 0);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isnumbervalue"></a>`_.isNumber(value)`
[#](#_isnumbervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11512) [npm package](https://www.npmjs.com/package/lodash.isnumber) [&#x24C9;][1]

Checks if `value` is classified as a `Number` primitive or object.
<br>
<br>
**Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
classified as numbers, use the `_.isFinite` method.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a number, else `false`.

#### Example
```js
_.isNumber(3);
// => true

_.isNumber(Number.MIN_VALUE);
// => true

_.isNumber(Infinity);
// => true

_.isNumber('3');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isobjectvalue"></a>`_.isObject(value)`
[#](#_isobjectvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11256) [npm package](https://www.npmjs.com/package/lodash.isobject) [&#x24C9;][1]

Checks if `value` is the
[language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
of `Object`. *(e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)*

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is an object, else `false`.

#### Example
```js
_.isObject({});
// => true

_.isObject([1, 2, 3]);
// => true

_.isObject(_.noop);
// => true

_.isObject(null);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isobjectlikevalue"></a>`_.isObjectLike(value)`
[#](#_isobjectlikevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11285) [npm package](https://www.npmjs.com/package/lodash.isobjectlike) [&#x24C9;][1]

Checks if `value` is object-like. A value is object-like if it's not `null`
and has a `typeof` result of "object".

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is object-like, else `false`.

#### Example
```js
_.isObjectLike({});
// => true

_.isObjectLike([1, 2, 3]);
// => true

_.isObjectLike(_.noop);
// => false

_.isObjectLike(null);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isplainobjectvalue"></a>`_.isPlainObject(value)`
[#](#_isplainobjectvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11546) [npm package](https://www.npmjs.com/package/lodash.isplainobject) [&#x24C9;][1]

Checks if `value` is a plain object, that is, an object created by the
`Object` constructor or one with a `[[Prototype]]` of `null`.

#### Since
0.8.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a plain object, else `false`.

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
---

<!-- /div -->

<!-- div -->

### <a id="_isregexpvalue"></a>`_.isRegExp(value)`
[#](#_isregexpvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11577) [npm package](https://www.npmjs.com/package/lodash.isregexp) [&#x24C9;][1]

Checks if `value` is classified as a `RegExp` object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a regexp, else `false`.

#### Example
```js
_.isRegExp(/abc/);
// => true

_.isRegExp('/abc/');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_issafeintegervalue"></a>`_.isSafeInteger(value)`
[#](#_issafeintegervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11607) [npm package](https://www.npmjs.com/package/lodash.issafeinteger) [&#x24C9;][1]

Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
double precision number which isn't the result of a rounded unsafe integer.
<br>
<br>
**Note:** This method is based on
[`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a safe integer, else `false`.

#### Example
```js
_.isSafeInteger(3);
// => true

_.isSafeInteger(Number.MIN_VALUE);
// => false

_.isSafeInteger(Infinity);
// => false

_.isSafeInteger('3');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_issetvalue"></a>`_.isSet(value)`
[#](#_issetvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11628) [npm package](https://www.npmjs.com/package/lodash.isset) [&#x24C9;][1]

Checks if `value` is classified as a `Set` object.

#### Since
4.3.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a set, else `false`.

#### Example
```js
_.isSet(new Set);
// => true

_.isSet(new WeakSet);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isstringvalue"></a>`_.isString(value)`
[#](#_isstringvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11647) [npm package](https://www.npmjs.com/package/lodash.isstring) [&#x24C9;][1]

Checks if `value` is classified as a `String` primitive or object.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a string, else `false`.

#### Example
```js
_.isString('abc');
// => true

_.isString(1);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_issymbolvalue"></a>`_.isSymbol(value)`
[#](#_issymbolvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11669) [npm package](https://www.npmjs.com/package/lodash.issymbol) [&#x24C9;][1]

Checks if `value` is classified as a `Symbol` primitive or object.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a symbol, else `false`.

#### Example
```js
_.isSymbol(Symbol.iterator);
// => true

_.isSymbol('abc');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_istypedarrayvalue"></a>`_.isTypedArray(value)`
[#](#_istypedarrayvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11691) [npm package](https://www.npmjs.com/package/lodash.istypedarray) [&#x24C9;][1]

Checks if `value` is classified as a typed array.

#### Since
3.0.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a typed array, else `false`.

#### Example
```js
_.isTypedArray(new Uint8Array);
// => true

_.isTypedArray([]);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isundefinedvalue"></a>`_.isUndefined(value)`
[#](#_isundefinedvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11710) [npm package](https://www.npmjs.com/package/lodash.isundefined) [&#x24C9;][1]

Checks if `value` is `undefined`.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is `undefined`, else `false`.

#### Example
```js
_.isUndefined(void 0);
// => true

_.isUndefined(null);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isweakmapvalue"></a>`_.isWeakMap(value)`
[#](#_isweakmapvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11731) [npm package](https://www.npmjs.com/package/lodash.isweakmap) [&#x24C9;][1]

Checks if `value` is classified as a `WeakMap` object.

#### Since
4.3.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a weak map, else `false`.

#### Example
```js
_.isWeakMap(new WeakMap);
// => true

_.isWeakMap(new Map);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_isweaksetvalue"></a>`_.isWeakSet(value)`
[#](#_isweaksetvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11752) [npm package](https://www.npmjs.com/package/lodash.isweakset) [&#x24C9;][1]

Checks if `value` is classified as a `WeakSet` object.

#### Since
4.3.0
#### Arguments
1. `value` *(&#42;)*: The value to check.

#### Returns
*(boolean)*: Returns `true` if `value` is a weak set, else `false`.

#### Example
```js
_.isWeakSet(new WeakSet);
// => true

_.isWeakSet(new Set);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_ltvalue-other"></a>`_.lt(value, other)`
[#](#_ltvalue-other) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11779) [npm package](https://www.npmjs.com/package/lodash.lt) [&#x24C9;][1]

Checks if `value` is less than `other`.

#### Since
3.9.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.

#### Returns
*(boolean)*: Returns `true` if `value` is less than `other`, else `false`.

#### Example
```js
_.lt(1, 3);
// => true

_.lt(3, 3);
// => false

_.lt(3, 1);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_ltevalue-other"></a>`_.lte(value, other)`
[#](#_ltevalue-other) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11804) [npm package](https://www.npmjs.com/package/lodash.lte) [&#x24C9;][1]

Checks if `value` is less than or equal to `other`.

#### Since
3.9.0
#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.

#### Returns
*(boolean)*: Returns `true` if `value` is less than or equal to `other`, else `false`.

#### Example
```js
_.lte(1, 3);
// => true

_.lte(3, 3);
// => true

_.lte(3, 1);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_toarrayvalue"></a>`_.toArray(value)`
[#](#_toarrayvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11831) [npm package](https://www.npmjs.com/package/lodash.toarray) [&#x24C9;][1]

Converts `value` to an array.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(Array)*: Returns the converted array.

#### Example
```js
_.toArray({ 'a': 1, 'b': 2 });
// => [1, 2]

_.toArray('abc');
// => ['a', 'b', 'c']

_.toArray(1);
// => []

_.toArray(null);
// => []
```
---

<!-- /div -->

<!-- div -->

### <a id="_tofinitevalue"></a>`_.toFinite(value)`
[#](#_tofinitevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11870) [npm package](https://www.npmjs.com/package/lodash.tofinite) [&#x24C9;][1]

Converts `value` to a finite number.

#### Since
4.12.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(number)*: Returns the converted number.

#### Example
```js
_.toFinite(3.2);
// => 3.2

_.toFinite(Number.MIN_VALUE);
// => 5e-324

_.toFinite(Infinity);
// => 1.7976931348623157e+308

_.toFinite('3.2');
// => 3.2
```
---

<!-- /div -->

<!-- div -->

### <a id="_tointegervalue"></a>`_.toInteger(value)`
[#](#_tointegervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11908) [npm package](https://www.npmjs.com/package/lodash.tointeger) [&#x24C9;][1]

Converts `value` to an integer.
<br>
<br>
**Note:** This method is loosely based on
[`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(number)*: Returns the converted integer.

#### Example
```js
_.toInteger(3.2);
// => 3

_.toInteger(Number.MIN_VALUE);
// => 0

_.toInteger(Infinity);
// => 1.7976931348623157e+308

_.toInteger('3.2');
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_tolengthvalue"></a>`_.toLength(value)`
[#](#_tolengthvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11942) [npm package](https://www.npmjs.com/package/lodash.tolength) [&#x24C9;][1]

Converts `value` to an integer suitable for use as the length of an
array-like object.
<br>
<br>
**Note:** This method is based on
[`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(number)*: Returns the converted integer.

#### Example
```js
_.toLength(3.2);
// => 3

_.toLength(Number.MIN_VALUE);
// => 0

_.toLength(Infinity);
// => 4294967295

_.toLength('3.2');
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_tonumbervalue"></a>`_.toNumber(value)`
[#](#_tonumbervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L11969) [npm package](https://www.npmjs.com/package/lodash.tonumber) [&#x24C9;][1]

Converts `value` to a number.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to process.

#### Returns
*(number)*: Returns the number.

#### Example
```js
_.toNumber(3.2);
// => 3.2

_.toNumber(Number.MIN_VALUE);
// => 5e-324

_.toNumber(Infinity);
// => Infinity

_.toNumber('3.2');
// => 3.2
```
---

<!-- /div -->

<!-- div -->

### <a id="_toplainobjectvalue"></a>`_.toPlainObject(value)`
[#](#_toplainobjectvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12014) [npm package](https://www.npmjs.com/package/lodash.toplainobject) [&#x24C9;][1]

Converts `value` to a plain object flattening inherited enumerable string
keyed properties of `value` to own properties of the plain object.

#### Since
3.0.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(Object)*: Returns the converted plain object.

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
---

<!-- /div -->

<!-- div -->

### <a id="_tosafeintegervalue"></a>`_.toSafeInteger(value)`
[#](#_tosafeintegervalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12042) [npm package](https://www.npmjs.com/package/lodash.tosafeinteger) [&#x24C9;][1]

Converts `value` to a safe integer. A safe integer can be compared and
represented correctly.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(number)*: Returns the converted integer.

#### Example
```js
_.toSafeInteger(3.2);
// => 3

_.toSafeInteger(Number.MIN_VALUE);
// => 0

_.toSafeInteger(Infinity);
// => 9007199254740991

_.toSafeInteger('3.2');
// => 3
```
---

<!-- /div -->

<!-- div -->

### <a id="_tostringvalue"></a>`_.toString(value)`
[#](#_tostringvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12067) [npm package](https://www.npmjs.com/package/lodash.tostring) [&#x24C9;][1]

Converts `value` to a string. An empty string is returned for `null`
and `undefined` values. The sign of `-0` is preserved.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to process.

#### Returns
*(string)*: Returns the string.

#### Example
```js
_.toString(null);
// => ''

_.toString(-0);
// => '-0'

_.toString([1, 2, 3]);
// => '1,2,3'
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Math” Methods`

<!-- div -->

### <a id="_addaugend-addend"></a>`_.add(augend, addend)`
[#](#_addaugend-addend) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15671) [npm package](https://www.npmjs.com/package/lodash.add) [&#x24C9;][1]

Adds two numbers.

#### Since
3.4.0
#### Arguments
1. `augend` *(number)*: The first number in an addition.
2. `addend` *(number)*: The second number in an addition.

#### Returns
*(number)*: Returns the total.

#### Example
```js
_.add(6, 4);
// => 10
```
---

<!-- /div -->

<!-- div -->

### <a id="_ceilnumber-precision0"></a>`_.ceil(number, [precision=0])`
[#](#_ceilnumber-precision0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15696) [npm package](https://www.npmjs.com/package/lodash.ceil) [&#x24C9;][1]

Computes `number` rounded up to `precision`.

#### Since
3.10.0
#### Arguments
1. `number` *(number)*: The number to round up.
2. `[precision=0]` *(number)*: The precision to round up to.

#### Returns
*(number)*: Returns the rounded up number.

#### Example
```js
_.ceil(4.006);
// => 5

_.ceil(6.004, 2);
// => 6.01

_.ceil(6040, -2);
// => 6100
```
---

<!-- /div -->

<!-- div -->

### <a id="_dividedividend-divisor"></a>`_.divide(dividend, divisor)`
[#](#_dividedividend-divisor) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15713) [npm package](https://www.npmjs.com/package/lodash.divide) [&#x24C9;][1]

Divide two numbers.

#### Since
4.7.0
#### Arguments
1. `dividend` *(number)*: The first number in a division.
2. `divisor` *(number)*: The second number in a division.

#### Returns
*(number)*: Returns the quotient.

#### Example
```js
_.divide(6, 4);
// => 1.5
```
---

<!-- /div -->

<!-- div -->

### <a id="_floornumber-precision0"></a>`_.floor(number, [precision=0])`
[#](#_floornumber-precision0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15738) [npm package](https://www.npmjs.com/package/lodash.floor) [&#x24C9;][1]

Computes `number` rounded down to `precision`.

#### Since
3.10.0
#### Arguments
1. `number` *(number)*: The number to round down.
2. `[precision=0]` *(number)*: The precision to round down to.

#### Returns
*(number)*: Returns the rounded down number.

#### Example
```js
_.floor(4.006);
// => 4

_.floor(0.046, 2);
// => 0.04

_.floor(4060, -2);
// => 4000
```
---

<!-- /div -->

<!-- div -->

### <a id="_maxarray"></a>`_.max(array)`
[#](#_maxarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15758) [npm package](https://www.npmjs.com/package/lodash.max) [&#x24C9;][1]

Computes the maximum value of `array`. If `array` is empty or falsey,
`undefined` is returned.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.

#### Returns
*(&#42;)*: Returns the maximum value.

#### Example
```js
_.max([4, 2, 8, 6]);
// => 8

_.max([]);
// => undefined
```
---

<!-- /div -->

<!-- div -->

### <a id="_maxbyarray-iteratee_identity"></a>`_.maxBy(array, [iteratee=_.identity])`
[#](#_maxbyarray-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15787) [npm package](https://www.npmjs.com/package/lodash.maxby) [&#x24C9;][1]

This method is like `_.max` except that it accepts `iteratee` which is
invoked for each element in `array` to generate the criterion by which
the value is ranked. The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(&#42;)*: Returns the maximum value.

#### Example
```js
var objects = [{ 'n': 1 }, { 'n': 2 }];

_.maxBy(objects, function(o) { return o.n; });
// => { 'n': 2 }

// The `_.property` iteratee shorthand.
_.maxBy(objects, 'n');
// => { 'n': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_meanarray"></a>`_.mean(array)`
[#](#_meanarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15807) [npm package](https://www.npmjs.com/package/lodash.mean) [&#x24C9;][1]

Computes the mean of the values in `array`.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.

#### Returns
*(number)*: Returns the mean.

#### Example
```js
_.mean([4, 2, 8, 6]);
// => 5
```
---

<!-- /div -->

<!-- div -->

### <a id="_meanbyarray-iteratee_identity"></a>`_.meanBy(array, [iteratee=_.identity])`
[#](#_meanbyarray-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15834) [npm package](https://www.npmjs.com/package/lodash.meanby) [&#x24C9;][1]

This method is like `_.mean` except that it accepts `iteratee` which is
invoked for each element in `array` to generate the value to be averaged.
The iteratee is invoked with one argument: *(value)*.

#### Since
4.7.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(number)*: Returns the mean.

#### Example
```js
var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];

_.meanBy(objects, function(o) { return o.n; });
// => 5

// The `_.property` iteratee shorthand.
_.meanBy(objects, 'n');
// => 5
```
---

<!-- /div -->

<!-- div -->

### <a id="_minarray"></a>`_.min(array)`
[#](#_minarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15856) [npm package](https://www.npmjs.com/package/lodash.min) [&#x24C9;][1]

Computes the minimum value of `array`. If `array` is empty or falsey,
`undefined` is returned.

#### Since
0.1.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.

#### Returns
*(&#42;)*: Returns the minimum value.

#### Example
```js
_.min([4, 2, 8, 6]);
// => 2

_.min([]);
// => undefined
```
---

<!-- /div -->

<!-- div -->

### <a id="_minbyarray-iteratee_identity"></a>`_.minBy(array, [iteratee=_.identity])`
[#](#_minbyarray-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15885) [npm package](https://www.npmjs.com/package/lodash.minby) [&#x24C9;][1]

This method is like `_.min` except that it accepts `iteratee` which is
invoked for each element in `array` to generate the criterion by which
the value is ranked. The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(&#42;)*: Returns the minimum value.

#### Example
```js
var objects = [{ 'n': 1 }, { 'n': 2 }];

_.minBy(objects, function(o) { return o.n; });
// => { 'n': 1 }

// The `_.property` iteratee shorthand.
_.minBy(objects, 'n');
// => { 'n': 1 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_multiplymultiplier-multiplicand"></a>`_.multiply(multiplier, multiplicand)`
[#](#_multiplymultiplier-multiplicand) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15906) [npm package](https://www.npmjs.com/package/lodash.multiply) [&#x24C9;][1]

Multiply two numbers.

#### Since
4.7.0
#### Arguments
1. `multiplier` *(number)*: The first number in a multiplication.
2. `multiplicand` *(number)*: The second number in a multiplication.

#### Returns
*(number)*: Returns the product.

#### Example
```js
_.multiply(6, 4);
// => 24
```
---

<!-- /div -->

<!-- div -->

### <a id="_roundnumber-precision0"></a>`_.round(number, [precision=0])`
[#](#_roundnumber-precision0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15931) [npm package](https://www.npmjs.com/package/lodash.round) [&#x24C9;][1]

Computes `number` rounded to `precision`.

#### Since
3.10.0
#### Arguments
1. `number` *(number)*: The number to round.
2. `[precision=0]` *(number)*: The precision to round to.

#### Returns
*(number)*: Returns the rounded number.

#### Example
```js
_.round(4.006);
// => 4

_.round(4.006, 2);
// => 4.01

_.round(4060, -2);
// => 4100
```
---

<!-- /div -->

<!-- div -->

### <a id="_subtractminuend-subtrahend"></a>`_.subtract(minuend, subtrahend)`
[#](#_subtractminuend-subtrahend) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15948) [npm package](https://www.npmjs.com/package/lodash.subtract) [&#x24C9;][1]

Subtract two numbers.

#### Since
4.0.0
#### Arguments
1. `minuend` *(number)*: The first number in a subtraction.
2. `subtrahend` *(number)*: The second number in a subtraction.

#### Returns
*(number)*: Returns the difference.

#### Example
```js
_.subtract(6, 4);
// => 2
```
---

<!-- /div -->

<!-- div -->

### <a id="_sumarray"></a>`_.sum(array)`
[#](#_sumarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15966) [npm package](https://www.npmjs.com/package/lodash.sum) [&#x24C9;][1]

Computes the sum of the values in `array`.

#### Since
3.4.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.

#### Returns
*(number)*: Returns the sum.

#### Example
```js
_.sum([4, 2, 8, 6]);
// => 20
```
---

<!-- /div -->

<!-- div -->

### <a id="_sumbyarray-iteratee_identity"></a>`_.sumBy(array, [iteratee=_.identity])`
[#](#_sumbyarray-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15995) [npm package](https://www.npmjs.com/package/lodash.sumby) [&#x24C9;][1]

This method is like `_.sum` except that it accepts `iteratee` which is
invoked for each element in `array` to generate the value to be summed.
The iteratee is invoked with one argument: *(value)*.

#### Since
4.0.0
#### Arguments
1. `array` *(Array)*: The array to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(number)*: Returns the sum.

#### Example
```js
var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];

_.sumBy(objects, function(o) { return o.n; });
// => 20

// The `_.property` iteratee shorthand.
_.sumBy(objects, 'n');
// => 20
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Number” Methods`

<!-- div -->

### <a id="_clampnumber-lower-upper"></a>`_.clamp(number, [lower], upper)`
[#](#_clampnumber-lower-upper) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13470) [npm package](https://www.npmjs.com/package/lodash.clamp) [&#x24C9;][1]

Clamps `number` within the inclusive `lower` and `upper` bounds.

#### Since
4.0.0
#### Arguments
1. `number` *(number)*: The number to clamp.
2. `[lower]` *(number)*: The lower bound.
3. `upper` *(number)*: The upper bound.

#### Returns
*(number)*: Returns the clamped number.

#### Example
```js
_.clamp(-10, -5, 5);
// => -5

_.clamp(10, -5, 5);
// => 5
```
---

<!-- /div -->

<!-- div -->

### <a id="_inrangenumber-start0-end"></a>`_.inRange(number, [start=0], end)`
[#](#_inrangenumber-start0-end) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13524) [npm package](https://www.npmjs.com/package/lodash.inrange) [&#x24C9;][1]

Checks if `n` is between `start` and up to, but not including, `end`. If
`end` is not specified, it's set to `start` with `start` then set to `0`.
If `start` is greater than `end` the params are swapped to support
negative ranges.

#### Since
3.3.0
#### Arguments
1. `number` *(number)*: The number to check.
2. `[start=0]` *(number)*: The start of the range.
3. `end` *(number)*: The end of the range.

#### Returns
*(boolean)*: Returns `true` if `number` is in the range, else `false`.

#### Example
```js
_.inRange(3, 2, 4);
// => true

_.inRange(4, 8);
// => true

_.inRange(4, 2);
// => false

_.inRange(2, 2);
// => false

_.inRange(1.2, 2);
// => true

_.inRange(5.2, 4);
// => false

_.inRange(-3, -2, -6);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_randomlower0-upper1-floating"></a>`_.random([lower=0], [upper=1], [floating])`
[#](#_randomlower0-upper1-floating) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13567) [npm package](https://www.npmjs.com/package/lodash.random) [&#x24C9;][1]

Produces a random number between the inclusive `lower` and `upper` bounds.
If only one argument is provided a number between `0` and the given number
is returned. If `floating` is `true`, or either `lower` or `upper` are
floats, a floating-point number is returned instead of an integer.
<br>
<br>
**Note:** JavaScript follows the IEEE-754 standard for resolving
floating-point values which can produce unexpected results.

#### Since
0.7.0
#### Arguments
1. `[lower=0]` *(number)*: The lower bound.
2. `[upper=1]` *(number)*: The upper bound.
3. `[floating]` *(boolean)*: Specify returning a floating-point number.

#### Returns
*(number)*: Returns the random number.

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
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Object” Methods`

<!-- div -->

### <a id="_assignobject-sources"></a>`_.assign(object, [sources])`
[#](#_assignobject-sources) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12105) [npm package](https://www.npmjs.com/package/lodash.assign) [&#x24C9;][1]

Assigns own enumerable string keyed properties of source objects to the
destination object. Source objects are applied from left to right.
Subsequent sources overwrite property assignments of previous sources.
<br>
<br>
**Note:** This method mutates `object` and is loosely based on
[`Object.assign`](https://mdn.io/Object/assign).

#### Since
0.10.0
#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Foo() {
  this.a = 1;
}

function Bar() {
  this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;

_.assign({ 'a': 0 }, new Foo, new Bar);
// => { 'a': 1, 'c': 3 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_assigninobject-sources"></a>`_.assignIn(object, [sources])`
[#](#_assigninobject-sources) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12148) [npm package](https://www.npmjs.com/package/lodash.assignin) [&#x24C9;][1]

This method is like `_.assign` except that it iterates over own and
inherited source properties.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.0.0
#### Aliases
*_.extend*

#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Foo() {
  this.a = 1;
}

function Bar() {
  this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;

_.assignIn({ 'a': 0 }, new Foo, new Bar);
// => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_assigninwithobject-sources-customizer"></a>`_.assignInWith(object, sources, [customizer])`
[#](#_assigninwithobject-sources-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12187) [npm package](https://www.npmjs.com/package/lodash.assigninwith) [&#x24C9;][1]

This method is like `_.assignIn` except that it accepts `customizer`
which is invoked to produce the assigned values. If `customizer` returns
`undefined`, assignment is handled by the method instead. The `customizer`
is invoked with five arguments: *(objValue, srcValue, key, object, source)*.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.0.0
#### Aliases
*_.extendWith*

#### Arguments
1. `object` *(Object)*: The destination object.
2. `sources` *(...Object)*: The source objects.
3. `[customizer]` *(Function)*: The function to customize assigned values.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function customizer(objValue, srcValue) {
  return _.isUndefined(objValue) ? srcValue : objValue;
}

var defaults = _.partialRight(_.assignInWith, customizer);

defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_assignwithobject-sources-customizer"></a>`_.assignWith(object, sources, [customizer])`
[#](#_assignwithobject-sources-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12219) [npm package](https://www.npmjs.com/package/lodash.assignwith) [&#x24C9;][1]

This method is like `_.assign` except that it accepts `customizer`
which is invoked to produce the assigned values. If `customizer` returns
`undefined`, assignment is handled by the method instead. The `customizer`
is invoked with five arguments: *(objValue, srcValue, key, object, source)*.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The destination object.
2. `sources` *(...Object)*: The source objects.
3. `[customizer]` *(Function)*: The function to customize assigned values.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function customizer(objValue, srcValue) {
  return _.isUndefined(objValue) ? srcValue : objValue;
}

var defaults = _.partialRight(_.assignWith, customizer);

defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_atobject-paths"></a>`_.at(object, [paths])`
[#](#_atobject-paths) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12240) [npm package](https://www.npmjs.com/package/lodash.at) [&#x24C9;][1]

Creates an array of values corresponding to `paths` of `object`.

#### Since
1.0.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[paths]` *(...(string|string&#91;&#93;))*: The property paths of elements to pick.

#### Returns
*(Array)*: Returns the picked values.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

_.at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
```
---

<!-- /div -->

<!-- div -->

### <a id="_createprototype-properties"></a>`_.create(prototype, [properties])`
[#](#_createprototype-properties) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12278) [npm package](https://www.npmjs.com/package/lodash.create) [&#x24C9;][1]

Creates an object that inherits from the `prototype` object. If a
`properties` object is given, its own enumerable string keyed properties
are assigned to the created object.

#### Since
2.3.0
#### Arguments
1. `prototype` *(Object)*: The object to inherit from.
2. `[properties]` *(Object)*: The properties to assign to the object.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
function Shape() {
  this.x = 0;
  this.y = 0;
}

function Circle() {
  Shape.call(this);
}

Circle.prototype = _.create(Shape.prototype, {
  'constructor': Circle
});

var circle = new Circle;
circle instanceof Circle;
// => true

circle instanceof Shape;
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_defaultsobject-sources"></a>`_.defaults(object, [sources])`
[#](#_defaultsobject-sources) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12304) [npm package](https://www.npmjs.com/package/lodash.defaults) [&#x24C9;][1]

Assigns own and inherited enumerable string keyed properties of source
objects to the destination object for all destination properties that
resolve to `undefined`. Source objects are applied from left to right.
Once a property is set, additional values of the same property are ignored.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
_.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
// => { 'a': 1, 'b': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_defaultsdeepobject-sources"></a>`_.defaultsDeep(object, [sources])`
[#](#_defaultsdeepobject-sources) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12328) [npm package](https://www.npmjs.com/package/lodash.defaultsdeep) [&#x24C9;][1]

This method is like `_.defaults` except that it recursively assigns
default properties.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
3.10.0
#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
_.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
// => { 'a': { 'b': 2, 'c': 3 } }
```
---

<!-- /div -->

<!-- div -->

### <a id="_findkeyobject-predicate_identity"></a>`_.findKey(object, [predicate=_.identity])`
[#](#_findkeyobject-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12368) [npm package](https://www.npmjs.com/package/lodash.findkey) [&#x24C9;][1]

This method is like `_.find` except that it returns the key of the first
element `predicate` returns truthy for instead of the element itself.

#### Since
1.1.0
#### Arguments
1. `object` *(Object)*: The object to search.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(&#42;)*: Returns the key of the matched element, else `undefined`.

#### Example
```js
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};

_.findKey(users, function(o) { return o.age < 40; });
// => 'barney' (iteration order is not guaranteed)

// The `_.matches` iteratee shorthand.
_.findKey(users, { 'age': 1, 'active': true });
// => 'pebbles'

// The `_.matchesProperty` iteratee shorthand.
_.findKey(users, ['active', false]);
// => 'fred'

// The `_.property` iteratee shorthand.
_.findKey(users, 'active');
// => 'barney'
```
---

<!-- /div -->

<!-- div -->

### <a id="_findlastkeyobject-predicate_identity"></a>`_.findLastKey(object, [predicate=_.identity])`
[#](#_findlastkeyobject-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12407) [npm package](https://www.npmjs.com/package/lodash.findlastkey) [&#x24C9;][1]

This method is like `_.findKey` except that it iterates over elements of
a collection in the opposite order.

#### Since
2.0.0
#### Arguments
1. `object` *(Object)*: The object to search.
2. `[predicate=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(&#42;)*: Returns the key of the matched element, else `undefined`.

#### Example
```js
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};

_.findLastKey(users, function(o) { return o.age < 40; });
// => returns 'pebbles' assuming `_.findKey` returns 'barney'

// The `_.matches` iteratee shorthand.
_.findLastKey(users, { 'age': 36, 'active': true });
// => 'barney'

// The `_.matchesProperty` iteratee shorthand.
_.findLastKey(users, ['active', false]);
// => 'fred'

// The `_.property` iteratee shorthand.
_.findLastKey(users, 'active');
// => 'pebbles'
```
---

<!-- /div -->

<!-- div -->

### <a id="_forinobject-iteratee_identity"></a>`_.forIn(object, [iteratee=_.identity])`
[#](#_forinobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12439) [npm package](https://www.npmjs.com/package/lodash.forin) [&#x24C9;][1]

Iterates over own and inherited enumerable string keyed properties of an
object and invokes `iteratee` for each property. The iteratee is invoked
with three arguments: *(value, key, object)*. Iteratee functions may exit
iteration early by explicitly returning `false`.

#### Since
0.3.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Object)*: Returns `object`.

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
// => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
```
---

<!-- /div -->

<!-- div -->

### <a id="_forinrightobject-iteratee_identity"></a>`_.forInRight(object, [iteratee=_.identity])`
[#](#_forinrightobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12471) [npm package](https://www.npmjs.com/package/lodash.forinright) [&#x24C9;][1]

This method is like `_.forIn` except that it iterates over properties of
`object` in the opposite order.

#### Since
2.0.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Object)*: Returns `object`.

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
// => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
```
---

<!-- /div -->

<!-- div -->

### <a id="_forownobject-iteratee_identity"></a>`_.forOwn(object, [iteratee=_.identity])`
[#](#_forownobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12505) [npm package](https://www.npmjs.com/package/lodash.forown) [&#x24C9;][1]

Iterates over own enumerable string keyed properties of an object and
invokes `iteratee` for each property. The iteratee is invoked with three
arguments: *(value, key, object)*. Iteratee functions may exit iteration
early by explicitly returning `false`.

#### Since
0.3.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.forOwn(new Foo, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```
---

<!-- /div -->

<!-- div -->

### <a id="_forownrightobject-iteratee_identity"></a>`_.forOwnRight(object, [iteratee=_.identity])`
[#](#_forownrightobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12535) [npm package](https://www.npmjs.com/package/lodash.forownright) [&#x24C9;][1]

This method is like `_.forOwn` except that it iterates over properties of
`object` in the opposite order.

#### Since
2.0.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.forOwnRight(new Foo, function(value, key) {
  console.log(key);
});
// => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
```
---

<!-- /div -->

<!-- div -->

### <a id="_functionsobject"></a>`_.functions(object)`
[#](#_functionsobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12562) [npm package](https://www.npmjs.com/package/lodash.functions) [&#x24C9;][1]

Creates an array of function property names from own enumerable properties
of `object`.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns the function names.

#### Example
```js
function Foo() {
  this.a = _.constant('a');
  this.b = _.constant('b');
}

Foo.prototype.c = _.constant('c');

_.functions(new Foo);
// => ['a', 'b']
```
---

<!-- /div -->

<!-- div -->

### <a id="_functionsinobject"></a>`_.functionsIn(object)`
[#](#_functionsinobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12589) [npm package](https://www.npmjs.com/package/lodash.functionsin) [&#x24C9;][1]

Creates an array of function property names from own and inherited
enumerable properties of `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The object to inspect.

#### Returns
*(Array)*: Returns the function names.

#### Example
```js
function Foo() {
  this.a = _.constant('a');
  this.b = _.constant('b');
}

Foo.prototype.c = _.constant('c');

_.functionsIn(new Foo);
// => ['a', 'b', 'c']
```
---

<!-- /div -->

<!-- div -->

### <a id="_getobject-path-defaultvalue"></a>`_.get(object, path, [defaultValue])`
[#](#_getobject-path-defaultvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12618) [npm package](https://www.npmjs.com/package/lodash.get) [&#x24C9;][1]

Gets the value at `path` of `object`. If the resolved value is
`undefined`, the `defaultValue` is returned in its place.

#### Since
3.7.0
#### Arguments
1. `object` *(Object)*: The object to query.
2. `path` *(Array|string)*: The path of the property to get.
3. `[defaultValue]` *(&#42;)*: The value returned for `undefined` resolved values.

#### Returns
*(&#42;)*: Returns the resolved value.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };

_.get(object, 'a[0].b.c');
// => 3

_.get(object, ['a', '0', 'b', 'c']);
// => 3

_.get(object, 'a.b.c', 'default');
// => 'default'
```
---

<!-- /div -->

<!-- div -->

### <a id="_hasobject-path"></a>`_.has(object, path)`
[#](#_hasobject-path) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12650) [npm package](https://www.npmjs.com/package/lodash.has) [&#x24C9;][1]

Checks if `path` is a direct property of `object`.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The object to query.
2. `path` *(Array|string)*: The path to check.

#### Returns
*(boolean)*: Returns `true` if `path` exists, else `false`.

#### Example
```js
var object = { 'a': { 'b': 2 } };
var other = _.create({ 'a': _.create({ 'b': 2 }) });

_.has(object, 'a');
// => true

_.has(object, 'a.b');
// => true

_.has(object, ['a', 'b']);
// => true

_.has(other, 'a');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_hasinobject-path"></a>`_.hasIn(object, path)`
[#](#_hasinobject-path) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12680) [npm package](https://www.npmjs.com/package/lodash.hasin) [&#x24C9;][1]

Checks if `path` is a direct or inherited property of `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The object to query.
2. `path` *(Array|string)*: The path to check.

#### Returns
*(boolean)*: Returns `true` if `path` exists, else `false`.

#### Example
```js
var object = _.create({ 'a': _.create({ 'b': 2 }) });

_.hasIn(object, 'a');
// => true

_.hasIn(object, 'a.b');
// => true

_.hasIn(object, ['a', 'b']);
// => true

_.hasIn(object, 'b');
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_invertobject"></a>`_.invert(object)`
[#](#_invertobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12702) [npm package](https://www.npmjs.com/package/lodash.invert) [&#x24C9;][1]

Creates an object composed of the inverted keys and values of `object`.
If `object` contains duplicate values, subsequent values overwrite
property assignments of previous values.

#### Since
0.7.0
#### Arguments
1. `object` *(Object)*: The object to invert.

#### Returns
*(Object)*: Returns the new inverted object.

#### Example
```js
var object = { 'a': 1, 'b': 2, 'c': 1 };

_.invert(object);
// => { '1': 'c', '2': 'b' }
```
---

<!-- /div -->

<!-- div -->

### <a id="_invertbyobject-iteratee_identity"></a>`_.invertBy(object, [iteratee=_.identity])`
[#](#_invertbyobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12732) [npm package](https://www.npmjs.com/package/lodash.invertby) [&#x24C9;][1]

This method is like `_.invert` except that the inverted object is generated
from the results of running each element of `object` thru `iteratee`. The
corresponding inverted value of each inverted key is an array of keys
responsible for generating the inverted value. The iteratee is invoked
with one argument: *(value)*.

#### Since
4.1.0
#### Arguments
1. `object` *(Object)*: The object to invert.
2. `[iteratee=_.identity]` *(Function)*: The iteratee invoked per element.

#### Returns
*(Object)*: Returns the new inverted object.

#### Example
```js
var object = { 'a': 1, 'b': 2, 'c': 1 };

_.invertBy(object);
// => { '1': ['a', 'c'], '2': ['b'] }

_.invertBy(object, function(value) {
  return 'group' + value;
});
// => { 'group1': ['a', 'c'], 'group2': ['b'] }
```
---

<!-- /div -->

<!-- div -->

### <a id="_invokeobject-path-args"></a>`_.invoke(object, path, [args])`
[#](#_invokeobject-path-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12758) [npm package](https://www.npmjs.com/package/lodash.invoke) [&#x24C9;][1]

Invokes the method at `path` of `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The object to query.
2. `path` *(Array|string)*: The path of the method to invoke.
3. `[args]` *(...&#42;)*: The arguments to invoke the method with.

#### Returns
*(&#42;)*: Returns the result of the invoked method.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };

_.invoke(object, 'a[0].b.c.slice', 1, 3);
// => [2, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_keysobject"></a>`_.keys(object)`
[#](#_keysobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12788) [npm package](https://www.npmjs.com/package/lodash.keys) [&#x24C9;][1]

Creates an array of the own enumerable property names of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects. See the
[ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
for more details.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*: Returns the array of property names.

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
---

<!-- /div -->

<!-- div -->

### <a id="_keysinobject"></a>`_.keysIn(object)`
[#](#_keysinobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12831) [npm package](https://www.npmjs.com/package/lodash.keysin) [&#x24C9;][1]

Creates an array of the own and inherited enumerable property names of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects.

#### Since
3.0.0
#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*: Returns the array of property names.

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
---

<!-- /div -->

<!-- div -->

### <a id="_mapkeysobject-iteratee_identity"></a>`_.mapKeys(object, [iteratee=_.identity])`
[#](#_mapkeysobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12872) [npm package](https://www.npmjs.com/package/lodash.mapkeys) [&#x24C9;][1]

The opposite of `_.mapValues`; this method creates an object with the
same values as `object` and keys generated by running each own enumerable
string keyed property of `object` thru `iteratee`. The iteratee is invoked
with three arguments: *(value, key, object)*.

#### Since
3.8.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Object)*: Returns the new mapped object.

#### Example
```js
_.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
  return key + value;
});
// => { 'a1': 1, 'b2': 2 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_mapvaluesobject-iteratee_identity"></a>`_.mapValues(object, [iteratee=_.identity])`
[#](#_mapvaluesobject-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12910) [npm package](https://www.npmjs.com/package/lodash.mapvalues) [&#x24C9;][1]

Creates an object with the same keys as `object` and values generated
by running each own enumerable string keyed property of `object` thru
`iteratee`. The iteratee is invoked with three arguments:<br>
*(value, key, object)*.

#### Since
2.4.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Object)*: Returns the new mapped object.

#### Example
```js
var users = {
  'fred':    { 'user': 'fred',    'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
};

_.mapValues(users, function(o) { return o.age; });
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)

// The `_.property` iteratee shorthand.
_.mapValues(users, 'age');
// => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
```
---

<!-- /div -->

<!-- div -->

### <a id="_mergeobject-sources"></a>`_.merge(object, [sources])`
[#](#_mergeobject-sources) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12951) [npm package](https://www.npmjs.com/package/lodash.merge) [&#x24C9;][1]

This method is like `_.assign` except that it recursively merges own and
inherited enumerable string keyed properties of source objects into the
destination object. Source properties that resolve to `undefined` are
skipped if a destination value exists. Array and plain object properties
are merged recursively. Other objects and value types are overridden by
assignment. Source objects are applied from left to right. Subsequent
sources overwrite property assignments of previous sources.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
0.5.0
#### Arguments
1. `object` *(Object)*: The destination object.
2. `[sources]` *(...Object)*: The source objects.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};

var other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};

_.merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
```
---

<!-- /div -->

<!-- div -->

### <a id="_mergewithobject-sources-customizer"></a>`_.mergeWith(object, sources, customizer)`
[#](#_mergewithobject-sources-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L12986) [npm package](https://www.npmjs.com/package/lodash.mergewith) [&#x24C9;][1]

This method is like `_.merge` except that it accepts `customizer` which
is invoked to produce the merged values of the destination and source
properties. If `customizer` returns `undefined`, merging is handled by the
method instead. The `customizer` is invoked with seven arguments:<br>
*(objValue, srcValue, key, object, source, stack)*.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The destination object.
2. `sources` *(...Object)*: The source objects.
3. `customizer` *(Function)*: The function to customize assigned values.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

var object = { 'a': [1], 'b': [2] };
var other = { 'a': [3], 'b': [4] };

_.mergeWith(object, other, customizer);
// => { 'a': [1, 3], 'b': [2, 4] }
```
---

<!-- /div -->

<!-- div -->

### <a id="_omitobject-props"></a>`_.omit(object, [props])`
[#](#_omitobject-props) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13009) [npm package](https://www.npmjs.com/package/lodash.omit) [&#x24C9;][1]

The opposite of `_.pick`; this method creates an object composed of the
own and inherited enumerable string keyed properties of `object` that are
not omitted.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The source object.
2. `[props]` *(...(string|string&#91;&#93;))*: The property identifiers to omit.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
var object = { 'a': 1, 'b': '2', 'c': 3 };

_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```
---

<!-- /div -->

<!-- div -->

### <a id="_omitbyobject-predicate_identity"></a>`_.omitBy(object, [predicate=_.identity])`
[#](#_omitbyobject-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13037) [npm package](https://www.npmjs.com/package/lodash.omitby) [&#x24C9;][1]

The opposite of `_.pickBy`; this method creates an object composed of
the own and inherited enumerable string keyed properties of `object` that
`predicate` doesn't return truthy for. The predicate is invoked with two
arguments: *(value, key)*.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The source object.
2. `[predicate=_.identity]` *(Function)*: The function invoked per property.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
var object = { 'a': 1, 'b': '2', 'c': 3 };

_.omitBy(object, _.isNumber);
// => { 'b': '2' }
```
---

<!-- /div -->

<!-- div -->

### <a id="_pickobject-props"></a>`_.pick(object, [props])`
[#](#_pickobject-props) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13058) [npm package](https://www.npmjs.com/package/lodash.pick) [&#x24C9;][1]

Creates an object composed of the picked `object` properties.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The source object.
2. `[props]` *(...(string|string&#91;&#93;))*: The property identifiers to pick.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
var object = { 'a': 1, 'b': '2', 'c': 3 };

_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_pickbyobject-predicate_identity"></a>`_.pickBy(object, [predicate=_.identity])`
[#](#_pickbyobject-predicate_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13080) [npm package](https://www.npmjs.com/package/lodash.pickby) [&#x24C9;][1]

Creates an object composed of the `object` properties `predicate` returns
truthy for. The predicate is invoked with two arguments: *(value, key)*.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The source object.
2. `[predicate=_.identity]` *(Function)*: The function invoked per property.

#### Returns
*(Object)*: Returns the new object.

#### Example
```js
var object = { 'a': 1, 'b': '2', 'c': 3 };

_.pickBy(object, _.isNumber);
// => { 'a': 1, 'c': 3 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_resultobject-path-defaultvalue"></a>`_.result(object, path, [defaultValue])`
[#](#_resultobject-path-defaultvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13113) [npm package](https://www.npmjs.com/package/lodash.result) [&#x24C9;][1]

This method is like `_.get` except that if the resolved value is a
function it's invoked with the `this` binding of its parent object and
its result is returned.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The object to query.
2. `path` *(Array|string)*: The path of the property to resolve.
3. `[defaultValue]` *(&#42;)*: The value returned for `undefined` resolved values.

#### Returns
*(&#42;)*: Returns the resolved value.

#### Example
```js
var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };

_.result(object, 'a[0].b.c1');
// => 3

_.result(object, 'a[0].b.c2');
// => 4

_.result(object, 'a[0].b.c3', 'default');
// => 'default'

_.result(object, 'a[0].b.c3', _.constant('default'));
// => 'default'
```
---

<!-- /div -->

<!-- div -->

### <a id="_setobject-path-value"></a>`_.set(object, path, value)`
[#](#_setobject-path-value) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13163) [npm package](https://www.npmjs.com/package/lodash.set) [&#x24C9;][1]

Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
it's created. Arrays are created for missing index properties while objects
are created for all other missing properties. Use `_.setWith` to customize
`path` creation.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
3.7.0
#### Arguments
1. `object` *(Object)*: The object to modify.
2. `path` *(Array|string)*: The path of the property to set.
3. `value` *(&#42;)*: The value to set.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };

_.set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// => 4

_.set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// => 5
```
---

<!-- /div -->

<!-- div -->

### <a id="_setwithobject-path-value-customizer"></a>`_.setWith(object, path, value, [customizer])`
[#](#_setwithobject-path-value-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13191) [npm package](https://www.npmjs.com/package/lodash.setwith) [&#x24C9;][1]

This method is like `_.set` except that it accepts `customizer` which is
invoked to produce the objects of `path`.  If `customizer` returns `undefined`
path creation is handled by the method instead. The `customizer` is invoked
with three arguments: *(nsValue, key, nsObject)*.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The object to modify.
2. `path` *(Array|string)*: The path of the property to set.
3. `value` *(&#42;)*: The value to set.
4. `[customizer]` *(Function)*: The function to customize assigned values.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var object = {};

_.setWith(object, '[0][1]', 'a', Object);
// => { '0': { '1': 'a' } }
```
---

<!-- /div -->

<!-- div -->

### <a id="_topairsobject"></a>`_.toPairs(object)`
[#](#_topairsobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13220) [npm package](https://www.npmjs.com/package/lodash.topairs) [&#x24C9;][1]

Creates an array of own enumerable string keyed-value pairs for `object`
which can be consumed by `_.fromPairs`. If `object` is a map or set, its
entries are returned.

#### Since
4.0.0
#### Aliases
*_.entries*

#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*: Returns the key-value pairs.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.toPairs(new Foo);
// => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
```
---

<!-- /div -->

<!-- div -->

### <a id="_topairsinobject"></a>`_.toPairsIn(object)`
[#](#_topairsinobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13246) [npm package](https://www.npmjs.com/package/lodash.topairsin) [&#x24C9;][1]

Creates an array of own and inherited enumerable string keyed-value pairs
for `object` which can be consumed by `_.fromPairs`. If `object` is a map
or set, its entries are returned.

#### Since
4.0.0
#### Aliases
*_.entriesIn*

#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*: Returns the key-value pairs.

#### Example
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.toPairsIn(new Foo);
// => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
```
---

<!-- /div -->

<!-- div -->

### <a id="_transformobject-iteratee_identity-accumulator"></a>`_.transform(object, [iteratee=_.identity], [accumulator])`
[#](#_transformobject-iteratee_identity-accumulator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13278) [npm package](https://www.npmjs.com/package/lodash.transform) [&#x24C9;][1]

An alternative to `_.reduce`; this method transforms `object` to a new
`accumulator` object which is the result of running each of its own
enumerable string keyed properties thru `iteratee`, with each invocation
potentially mutating the `accumulator` object. If `accumulator` is not
provided, a new object with the same `[[Prototype]]` will be used. The
iteratee is invoked with four arguments: *(accumulator, value, key, object)*.
Iteratee functions may exit iteration early by explicitly returning `false`.

#### Since
1.3.0
#### Arguments
1. `object` *(Object)*: The object to iterate over.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.
3. `[accumulator]` *(&#42;)*: The custom accumulator value.

#### Returns
*(&#42;)*: Returns the accumulated value.

#### Example
```js
_.transform([2, 3, 4], function(result, n) {
  result.push(n *= n);
  return n % 2 == 0;
}, []);
// => [4, 9]

_.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
}, {});
// => { '1': ['a', 'c'], '2': ['b'] }
```
---

<!-- /div -->

<!-- div -->

### <a id="_unsetobject-path"></a>`_.unset(object, path)`
[#](#_unsetobject-path) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13327) [npm package](https://www.npmjs.com/package/lodash.unset) [&#x24C9;][1]

Removes the property at `path` of `object`.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.0.0
#### Arguments
1. `object` *(Object)*: The object to modify.
2. `path` *(Array|string)*: The path of the property to unset.

#### Returns
*(boolean)*: Returns `true` if the property is deleted, else `false`.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': 7 } }] };
_.unset(object, 'a[0].b.c');
// => true

console.log(object);
// => { 'a': [{ 'b': {} }] };

_.unset(object, ['a', '0', 'b', 'c']);
// => true

console.log(object);
// => { 'a': [{ 'b': {} }] };
```
---

<!-- /div -->

<!-- div -->

### <a id="_updateobject-path-updater"></a>`_.update(object, path, updater)`
[#](#_updateobject-path-updater) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13358) [npm package](https://www.npmjs.com/package/lodash.update) [&#x24C9;][1]

This method is like `_.set` except that accepts `updater` to produce the
value to set. Use `_.updateWith` to customize `path` creation. The `updater`
is invoked with one argument: *(value)*.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.6.0
#### Arguments
1. `object` *(Object)*: The object to modify.
2. `path` *(Array|string)*: The path of the property to set.
3. `updater` *(Function)*: The function to produce the updated value.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };

_.update(object, 'a[0].b.c', function(n) { return n * n; });
console.log(object.a[0].b.c);
// => 9

_.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
console.log(object.x[0].y.z);
// => 0
```
---

<!-- /div -->

<!-- div -->

### <a id="_updatewithobject-path-updater-customizer"></a>`_.updateWith(object, path, updater, [customizer])`
[#](#_updatewithobject-path-updater-customizer) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13386) [npm package](https://www.npmjs.com/package/lodash.updatewith) [&#x24C9;][1]

This method is like `_.update` except that it accepts `customizer` which is
invoked to produce the objects of `path`.  If `customizer` returns `undefined`
path creation is handled by the method instead. The `customizer` is invoked
with three arguments: *(nsValue, key, nsObject)*.
<br>
<br>
**Note:** This method mutates `object`.

#### Since
4.6.0
#### Arguments
1. `object` *(Object)*: The object to modify.
2. `path` *(Array|string)*: The path of the property to set.
3. `updater` *(Function)*: The function to produce the updated value.
4. `[customizer]` *(Function)*: The function to customize assigned values.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var object = {};

_.updateWith(object, '[0][1]', _.constant('a'), Object);
// => { '0': { '1': 'a' } }
```
---

<!-- /div -->

<!-- div -->

### <a id="_valuesobject"></a>`_.values(object)`
[#](#_valuesobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13417) [npm package](https://www.npmjs.com/package/lodash.values) [&#x24C9;][1]

Creates an array of the own enumerable string keyed property values of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*: Returns the array of property values.

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
---

<!-- /div -->

<!-- div -->

### <a id="_valuesinobject"></a>`_.valuesIn(object)`
[#](#_valuesinobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13445) [npm package](https://www.npmjs.com/package/lodash.valuesin) [&#x24C9;][1]

Creates an array of the own and inherited enumerable string keyed property
values of `object`.
<br>
<br>
**Note:** Non-object values are coerced to objects.

#### Since
3.0.0
#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Array)*: Returns the array of property values.

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
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Seq” Methods`

<!-- div -->

### <a id="_value"></a>`_(value)`
[#](#_value) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1521)  [&#x24C9;][1]

Creates a `lodash` object which wraps `value` to enable implicit method
chain sequences. Methods that operate on and return arrays, collections,
and functions can be chained together. Methods that retrieve a single value
or may return a primitive value will automatically end the chain sequence
and return the unwrapped value. Otherwise, the value must be unwrapped
with `_#value`.
<br>
<br>
Explicit chain sequences, which must be unwrapped with `_#value`, may be
enabled using `_.chain`.
<br>
<br>
The execution of chained methods is lazy, that is, it's deferred until
`_#value` is implicitly or explicitly called.
<br>
<br>
Lazy evaluation allows several methods to support shortcut fusion.
Shortcut fusion is an optimization to merge iteratee calls; this avoids
the creation of intermediate arrays and can greatly reduce the number of
iteratee executions. Sections of a chain sequence qualify for shortcut
fusion if the section is applied to an array of at least `200` elements
and any iteratees accept only one argument. The heuristic for whether a
section qualifies for shortcut fusion is subject to change.
<br>
<br>
Chaining is supported in custom builds as long as the `_#value` method is
directly or indirectly included in the build.
<br>
<br>
In addition to lodash methods, wrappers have `Array` and `String` methods.
<br>
<br>
The wrapper `Array` methods are:<br>
`concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
<br>
<br>
The wrapper `String` methods are:<br>
`replace` and `split`
<br>
<br>
The wrapper methods that support shortcut fusion are:<br>
`at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
`findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
`tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
<br>
<br>
The chainable wrapper methods are:<br>
`after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
`before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
`commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
`curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
`difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
`dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
`flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
`flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
`functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
`intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
`keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
`memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
`nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
`overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
`pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
`pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
`remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
`slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
`takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
`toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
`union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
`unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
`valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
`zipObject`, `zipObjectDeep`, and `zipWith`
<br>
<br>
The wrapper methods that are **not** chainable by default are:<br>
`add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
`cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
`defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
`escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
`findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
`forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
`hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
`isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
`isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
`isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
`isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
`isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
`isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
`isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
`lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
`min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
`padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
`repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
`snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
`sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
`stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
`template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
`toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
`trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
`upperFirst`, `value`, and `words`

#### Arguments
1. `value` *(&#42;)*: The value to wrap in a `lodash` instance.

#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
function square(n) {
  return n * n;
}

var wrapped = _([1, 2, 3]);

// Returns an unwrapped value.
wrapped.reduce(_.add);
// => 6

// Returns a wrapped value.
var squares = wrapped.map(square);

_.isArray(squares);
// => false

_.isArray(squares.value());
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_chainvalue"></a>`_.chain(value)`
[#](#_chainvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8238)  [&#x24C9;][1]

Creates a `lodash` wrapper instance that wraps `value` with explicit method
chain sequences enabled. The result of such sequences must be unwrapped
with `_#value`.

#### Since
1.3.0
#### Arguments
1. `value` *(&#42;)*: The value to wrap.

#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
var users = [
  { 'user': 'barney',  'age': 36 },
  { 'user': 'fred',    'age': 40 },
  { 'user': 'pebbles', 'age': 1 }
];

var youngest = _
  .chain(users)
  .sortBy('age')
  .map(function(o) {
    return o.user + ' is ' + o.age;
  })
  .head()
  .value();
// => 'pebbles is 1'
```
---

<!-- /div -->

<!-- div -->

### <a id="_tapvalue-interceptor"></a>`_.tap(value, interceptor)`
[#](#_tapvalue-interceptor) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8267)  [&#x24C9;][1]

This method invokes `interceptor` and returns `value`. The interceptor
is invoked with one argument; *(value)*. The purpose of this method is to
"tap into" a method chain sequence in order to modify intermediate results.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: The value to provide to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.

#### Returns
*(&#42;)*: Returns `value`.

#### Example
```js
_([1, 2, 3])
 .tap(function(array) {
   // Mutate input array.
   array.pop();
 })
 .reverse()
 .value();
// => [2, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_thruvalue-interceptor"></a>`_.thru(value, interceptor)`
[#](#_thruvalue-interceptor) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8295)  [&#x24C9;][1]

This method is like `_.tap` except that it returns the result of `interceptor`.
The purpose of this method is to "pass thru" values replacing intermediate
results in a method chain sequence.

#### Since
3.0.0
#### Arguments
1. `value` *(&#42;)*: The value to provide to `interceptor`.
2. `interceptor` *(Function)*: The function to invoke.

#### Returns
*(&#42;)*: Returns the result of `interceptor`.

#### Example
```js
_('  abc  ')
 .chain()
 .trim()
 .thru(function(value) {
   return [value];
 })
 .value();
// => ['abc']
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypesymboliterator"></a>`_.prototype[Symbol.iterator]()`
[#](#_prototypesymboliterator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8451)  [&#x24C9;][1]

Enables the wrapper to be iterable.

#### Since
4.0.0
#### Returns
*(Object)*: Returns the wrapper object.

#### Example
```js
var wrapped = _([1, 2]);

wrapped[Symbol.iterator]() === wrapped;
// => true

Array.from(wrapped);
// => [1, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypeatpaths"></a>`_.prototype.at([paths])`
[#](#_prototypeatpaths) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8315)  [&#x24C9;][1]

This method is the wrapper version of `_.at`.

#### Since
1.0.0
#### Arguments
1. `[paths]` *(...(string|string&#91;&#93;))*: The property paths of elements to pick.

#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

_(object).at(['a[0].b.c', 'a[1]']).value();
// => [3, 4]
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypechain"></a>`_.prototype.chain()`
[#](#_prototypechain) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8367)  [&#x24C9;][1]

Creates a `lodash` wrapper instance with explicit method chain sequences enabled.

#### Since
0.1.0
#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

// A sequence without explicit chaining.
_(users).head();
// => { 'user': 'barney', 'age': 36 }

// A sequence with explicit chaining.
_(users)
  .chain()
  .head()
  .pick('user')
  .value();
// => { 'user': 'barney' }
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypecommit"></a>`_.prototype.commit()`
[#](#_prototypecommit) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8397)  [&#x24C9;][1]

Executes the chain sequence and returns the wrapped result.

#### Since
3.2.0
#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
var array = [1, 2];
var wrapped = _(array).push(3);

console.log(array);
// => [1, 2]

wrapped = wrapped.commit();
console.log(array);
// => [1, 2, 3]

wrapped.last();
// => 3

console.log(array);
// => [1, 2, 3]
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypenext"></a>`_.prototype.next()`
[#](#_prototypenext) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8423)  [&#x24C9;][1]

Gets the next value on a wrapped object following the
[iterator protocol](https://mdn.io/iteration_protocols#iterator).

#### Since
4.0.0
#### Returns
*(Object)*: Returns the next iterator value.

#### Example
```js
var wrapped = _([1, 2]);

wrapped.next();
// => { 'done': false, 'value': 1 }

wrapped.next();
// => { 'done': false, 'value': 2 }

wrapped.next();
// => { 'done': true, 'value': undefined }
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypeplantvalue"></a>`_.prototype.plant(value)`
[#](#_prototypeplantvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8479)  [&#x24C9;][1]

Creates a clone of the chain sequence planting `value` as the wrapped value.

#### Since
3.2.0
#### Arguments
1. `value` *(&#42;)*: The value to plant.

#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
function square(n) {
  return n * n;
}

var wrapped = _([1, 2]).map(square);
var other = wrapped.plant([3, 4]);

other.value();
// => [9, 16]

wrapped.value();
// => [1, 4]
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypereverse"></a>`_.prototype.reverse()`
[#](#_prototypereverse) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8519)  [&#x24C9;][1]

This method is the wrapper version of `_.reverse`.
<br>
<br>
**Note:** This method mutates the wrapped array.

#### Since
0.1.0
#### Returns
*(Object)*: Returns the new `lodash` wrapper instance.

#### Example
```js
var array = [1, 2, 3];

_(array).reverse().value()
// => [3, 2, 1]

console.log(array);
// => [3, 2, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_prototypevalue"></a>`_.prototype.value()`
[#](#_prototypevalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L8551)  [&#x24C9;][1]

Executes the chain sequence to resolve the unwrapped value.

#### Since
0.1.0
#### Aliases
*_.prototype.toJSON, _.prototype.valueOf*

#### Returns
*(&#42;)*: Returns the resolved unwrapped value.

#### Example
```js
_([1, 2, 3]).value();
// => [1, 2, 3]
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“String” Methods`

<!-- div -->

### <a id="_camelcasestring"></a>`_.camelCase([string=''])`
[#](#_camelcasestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13628) [npm package](https://www.npmjs.com/package/lodash.camelcase) [&#x24C9;][1]

Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the camel cased string.

#### Example
```js
_.camelCase('Foo Bar');
// => 'fooBar'

_.camelCase('--foo-bar--');
// => 'fooBar'

_.camelCase('__FOO_BAR__');
// => 'fooBar'
```
---

<!-- /div -->

<!-- div -->

### <a id="_capitalizestring"></a>`_.capitalize([string=''])`
[#](#_capitalizestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13648) [npm package](https://www.npmjs.com/package/lodash.capitalize) [&#x24C9;][1]

Converts the first character of `string` to upper case and the remaining
to lower case.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to capitalize.

#### Returns
*(string)*: Returns the capitalized string.

#### Example
```js
_.capitalize('FRED');
// => 'Fred'
```
---

<!-- /div -->

<!-- div -->

### <a id="_deburrstring"></a>`_.deburr([string=''])`
[#](#_deburrstring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13669) [npm package](https://www.npmjs.com/package/lodash.deburr) [&#x24C9;][1]

Deburrs `string` by converting
[latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
to basic latin letters and removing
[combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to deburr.

#### Returns
*(string)*: Returns the deburred string.

#### Example
```js
_.deburr('déjà vu');
// => 'deja vu'
```
---

<!-- /div -->

<!-- div -->

### <a id="_endswithstring-target-positionstringlength"></a>`_.endsWith([string=''], [target], [position=string.length])`
[#](#_endswithstring-target-positionstringlength) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13697) [npm package](https://www.npmjs.com/package/lodash.endswith) [&#x24C9;][1]

Checks if `string` ends with the given target string.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to search.
2. `[target]` *(string)*: The string to search for.
3. `[position=string.length]` *(number)*: The position to search up to.

#### Returns
*(boolean)*: Returns `true` if `string` ends with `target`, else `false`.

#### Example
```js
_.endsWith('abc', 'c');
// => true

_.endsWith('abc', 'b');
// => false

_.endsWith('abc', 'b', 2);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_escapestring"></a>`_.escape([string=''])`
[#](#_escapestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13745) [npm package](https://www.npmjs.com/package/lodash.escape) [&#x24C9;][1]

Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
their corresponding HTML entities.
<br>
<br>
**Note:** No other characters are escaped. To escape additional
characters use a third-party library like [_he_](https://mths.be/he).
<br>
<br>
Though the ">" character is escaped for symmetry, characters like
">" and "/" don't need escaping in HTML and have no special meaning
unless they're part of a tag or unquoted attribute value. See
[Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
*(under "semi-related fun fact")* for more details.
<br>
<br>
Backticks are escaped because in IE < `9`, they can break out of
attribute values or HTML comments. See [#59](https://html5sec.org/#59),
[#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
[#133](https://html5sec.org/#133) of the
[HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
<br>
<br>
When working with HTML you should always
[quote attribute values](http://wonko.com/post/html-escaping) to reduce
XSS vectors.

#### Since
0.1.0
#### Arguments
1. `[string='']` *(string)*: The string to escape.

#### Returns
*(string)*: Returns the escaped string.

#### Example
```js
_.escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```
---

<!-- /div -->

<!-- div -->

### <a id="_escaperegexpstring"></a>`_.escapeRegExp([string=''])`
[#](#_escaperegexpstring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13767) [npm package](https://www.npmjs.com/package/lodash.escaperegexp) [&#x24C9;][1]

Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
"?", "(", ")", "[", "]", "{", "}", and "|" in `string`.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to escape.

#### Returns
*(string)*: Returns the escaped string.

#### Example
```js
_.escapeRegExp('[lodash](https://lodash.com/)');
// => '\[lodash\]\(https://lodash\.com/\)'
```
---

<!-- /div -->

<!-- div -->

### <a id="_kebabcasestring"></a>`_.kebabCase([string=''])`
[#](#_kebabcasestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13795) [npm package](https://www.npmjs.com/package/lodash.kebabcase) [&#x24C9;][1]

Converts `string` to
[kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the kebab cased string.

#### Example
```js
_.kebabCase('Foo Bar');
// => 'foo-bar'

_.kebabCase('fooBar');
// => 'foo-bar'

_.kebabCase('__FOO_BAR__');
// => 'foo-bar'
```
---

<!-- /div -->

<!-- div -->

### <a id="_lowercasestring"></a>`_.lowerCase([string=''])`
[#](#_lowercasestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13819) [npm package](https://www.npmjs.com/package/lodash.lowercase) [&#x24C9;][1]

Converts `string`, as space separated words, to lower case.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the lower cased string.

#### Example
```js
_.lowerCase('--Foo-Bar--');
// => 'foo bar'

_.lowerCase('fooBar');
// => 'foo bar'

_.lowerCase('__FOO_BAR__');
// => 'foo bar'
```
---

<!-- /div -->

<!-- div -->

### <a id="_lowerfirststring"></a>`_.lowerFirst([string=''])`
[#](#_lowerfirststring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13840) [npm package](https://www.npmjs.com/package/lodash.lowerfirst) [&#x24C9;][1]

Converts the first character of `string` to lower case.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the converted string.

#### Example
```js
_.lowerFirst('Fred');
// => 'fred'

_.lowerFirst('FRED');
// => 'fRED'
```
---

<!-- /div -->

<!-- div -->

### <a id="_padstring-length0-chars"></a>`_.pad([string=''], [length=0], [chars=' '])`
[#](#_padstring-length0-chars) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13865) [npm package](https://www.npmjs.com/package/lodash.pad) [&#x24C9;][1]

Pads `string` on the left and right sides if it's shorter than `length`.
Padding characters are truncated if they can't be evenly divided by `length`.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to pad.
2. `[length=0]` *(number)*: The padding length.
3. `[chars=' ']` *(string)*: The string used as padding.

#### Returns
*(string)*: Returns the padded string.

#### Example
```js
_.pad('abc', 8);
// => '  abc   '

_.pad('abc', 8, '_-');
// => '_-abc_-_'

_.pad('abc', 3);
// => 'abc'
```
---

<!-- /div -->

<!-- div -->

### <a id="_padendstring-length0-chars"></a>`_.padEnd([string=''], [length=0], [chars=' '])`
[#](#_padendstring-length0-chars) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13904) [npm package](https://www.npmjs.com/package/lodash.padend) [&#x24C9;][1]

Pads `string` on the right side if it's shorter than `length`. Padding
characters are truncated if they exceed `length`.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to pad.
2. `[length=0]` *(number)*: The padding length.
3. `[chars=' ']` *(string)*: The string used as padding.

#### Returns
*(string)*: Returns the padded string.

#### Example
```js
_.padEnd('abc', 6);
// => 'abc   '

_.padEnd('abc', 6, '_-');
// => 'abc_-_'

_.padEnd('abc', 3);
// => 'abc'
```
---

<!-- /div -->

<!-- div -->

### <a id="_padstartstring-length0-chars"></a>`_.padStart([string=''], [length=0], [chars=' '])`
[#](#_padstartstring-length0-chars) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13937) [npm package](https://www.npmjs.com/package/lodash.padstart) [&#x24C9;][1]

Pads `string` on the left side if it's shorter than `length`. Padding
characters are truncated if they exceed `length`.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to pad.
2. `[length=0]` *(number)*: The padding length.
3. `[chars=' ']` *(string)*: The string used as padding.

#### Returns
*(string)*: Returns the padded string.

#### Example
```js
_.padStart('abc', 6);
// => '   abc'

_.padStart('abc', 6, '_-');
// => '_-_abc'

_.padStart('abc', 3);
// => 'abc'
```
---

<!-- /div -->

<!-- div -->

### <a id="_parseintstring-radix10"></a>`_.parseInt(string, [radix=10])`
[#](#_parseintstring-radix10) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L13971) [npm package](https://www.npmjs.com/package/lodash.parseint) [&#x24C9;][1]

Converts `string` to an integer of the specified radix. If `radix` is
`undefined` or `0`, a `radix` of `10` is used unless `value` is a
hexadecimal, in which case a `radix` of `16` is used.
<br>
<br>
**Note:** This method aligns with the
[ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.

#### Since
1.1.0
#### Arguments
1. `string` *(string)*: The string to convert.
2. `[radix=10]` *(number)*: The radix to interpret `value` by.

#### Returns
*(number)*: Returns the converted integer.

#### Example
```js
_.parseInt('08');
// => 8

_.map(['6', '08', '10'], _.parseInt);
// => [6, 8, 10]
```
---

<!-- /div -->

<!-- div -->

### <a id="_repeatstring-n1"></a>`_.repeat([string=''], [n=1])`
[#](#_repeatstring-n1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14005) [npm package](https://www.npmjs.com/package/lodash.repeat) [&#x24C9;][1]

Repeats the given string `n` times.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to repeat.
2. `[n=1]` *(number)*: The number of times to repeat the string.

#### Returns
*(string)*: Returns the repeated string.

#### Example
```js
_.repeat('*', 3);
// => '***'

_.repeat('abc', 2);
// => 'abcabc'

_.repeat('abc', 0);
// => ''
```
---

<!-- /div -->

<!-- div -->

### <a id="_replacestring-pattern-replacement"></a>`_.replace([string=''], pattern, replacement)`
[#](#_replacestring-pattern-replacement) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14033) [npm package](https://www.npmjs.com/package/lodash.replace) [&#x24C9;][1]

Replaces matches for `pattern` in `string` with `replacement`.
<br>
<br>
**Note:** This method is based on
[`String#replace`](https://mdn.io/String/replace).

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to modify.
2. `pattern` *(RegExp|string)*: The pattern to replace.
3. `replacement` *(Function|string)*: The match replacement.

#### Returns
*(string)*: Returns the modified string.

#### Example
```js
_.replace('Hi Fred', 'Fred', 'Barney');
// => 'Hi Barney'
```
---

<!-- /div -->

<!-- div -->

### <a id="_snakecasestring"></a>`_.snakeCase([string=''])`
[#](#_snakecasestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14061) [npm package](https://www.npmjs.com/package/lodash.snakecase) [&#x24C9;][1]

Converts `string` to
[snake case](https://en.wikipedia.org/wiki/Snake_case).

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the snake cased string.

#### Example
```js
_.snakeCase('Foo Bar');
// => 'foo_bar'

_.snakeCase('fooBar');
// => 'foo_bar'

_.snakeCase('--FOO-BAR--');
// => 'foo_bar'
```
---

<!-- /div -->

<!-- div -->

### <a id="_splitstring-separator-limit"></a>`_.split([string=''], separator, [limit])`
[#](#_splitstring-separator-limit) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14084) [npm package](https://www.npmjs.com/package/lodash.split) [&#x24C9;][1]

Splits `string` by `separator`.
<br>
<br>
**Note:** This method is based on
[`String#split`](https://mdn.io/String/split).

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to split.
2. `separator` *(RegExp|string)*: The separator pattern to split by.
3. `[limit]` *(number)*: The length to truncate results to.

#### Returns
*(Array)*: Returns the string segments.

#### Example
```js
_.split('a-b-c', '-', 2);
// => ['a', 'b']
```
---

<!-- /div -->

<!-- div -->

### <a id="_startcasestring"></a>`_.startCase([string=''])`
[#](#_startcasestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14126) [npm package](https://www.npmjs.com/package/lodash.startcase) [&#x24C9;][1]

Converts `string` to
[start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).

#### Since
3.1.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the start cased string.

#### Example
```js
_.startCase('--foo-bar--');
// => 'Foo Bar'

_.startCase('fooBar');
// => 'Foo Bar'

_.startCase('__FOO_BAR__');
// => 'FOO BAR'
```
---

<!-- /div -->

<!-- div -->

### <a id="_startswithstring-target-position0"></a>`_.startsWith([string=''], [target], [position=0])`
[#](#_startswithstring-target-position0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14153) [npm package](https://www.npmjs.com/package/lodash.startswith) [&#x24C9;][1]

Checks if `string` starts with the given target string.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to search.
2. `[target]` *(string)*: The string to search for.
3. `[position=0]` *(number)*: The position to search from.

#### Returns
*(boolean)*: Returns `true` if `string` starts with `target`, else `false`.

#### Example
```js
_.startsWith('abc', 'a');
// => true

_.startsWith('abc', 'b');
// => false

_.startsWith('abc', 'b', 1);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_templatestring-options-optionsescape_templatesettingsescape-optionsevaluate_templatesettingsevaluate-optionsimports_templatesettingsimports-optionsinterpolate_templatesettingsinterpolate-optionssourceurllodashtemplatesourcesn-optionsvariableobj"></a>`_.template([string=''], [options={}], [options.escape=_.templateSettings.escape], [options.evaluate=_.templateSettings.evaluate], [options.imports=_.templateSettings.imports], [options.interpolate=_.templateSettings.interpolate], [options.sourceURL='lodash.templateSources[n]'], [options.variable='obj'])`
[#](#_templatestring-options-optionsescape_templatesettingsescape-optionsevaluate_templatesettingsevaluate-optionsimports_templatesettingsimports-optionsinterpolate_templatesettingsinterpolate-optionssourceurllodashtemplatesourcesn-optionsvariableobj) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14263) [npm package](https://www.npmjs.com/package/lodash.template) [&#x24C9;][1]

Creates a compiled template function that can interpolate data properties
in "interpolate" delimiters, HTML-escape interpolated data properties in
"escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
properties may be accessed as free variables in the template. If a setting
object is given, it takes precedence over `_.templateSettings` values.
<br>
<br>
**Note:** In the development build `_.template` utilizes
[sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
for easier debugging.
<br>
<br>
For more information on precompiling templates see
[lodash's custom builds documentation](https://lodash.com/custom-builds).
<br>
<br>
For more information on Chrome extension sandboxes see
[Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).

#### Since
0.1.0
#### Arguments
1. `[string='']` *(string)*: The template string.
2. `[options={}]` *(Object)*: The options object.
3. `[options.escape=_.templateSettings.escape]` *(RegExp)*: The HTML "escape" delimiter.
4. `[options.evaluate=_.templateSettings.evaluate]` *(RegExp)*: The "evaluate" delimiter.
5. `[options.imports=_.templateSettings.imports]` *(Object)*: An object to import into the template as free variables.
6. `[options.interpolate=_.templateSettings.interpolate]` *(RegExp)*: The "interpolate" delimiter.
7. `[options.sourceURL='lodash.templateSources[n]']` *(string)*: The sourceURL of the compiled template.
8. `[options.variable='obj']` *(string)*: The data object variable name.

#### Returns
*(Function)*: Returns the compiled template function.

#### Example
```js
// Use the "interpolate" delimiter to create a compiled template.
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'

// Use the HTML "escape" delimiter to escape data property values.
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b>&lt;script&gt;</b>'

// Use the "evaluate" delimiter to execute JavaScript and generate HTML.
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'

// Use the internal `print` function in "evaluate" delimiters.
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'

// Use the ES delimiter as an alternative to the default "interpolate" delimiter.
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'

// Use backslashes to treat delimiters as plain text.
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'

// Use the `imports` option to import `jQuery` as `jq`.
var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'

// Use the `sourceURL` option to specify a custom sourceURL for the template.
var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.

// Use the `variable` option to ensure a with-statement isn't used in the compiled template.
var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }

// Use custom template delimiters.
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'

// Use the `source` property to inline compiled templates for meaningful
// line numbers in error messages and stack traces.
fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
');
```
---

<!-- /div -->

<!-- div -->

### <a id="_tolowerstring"></a>`_.toLower([string=''])`
[#](#_tolowerstring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14392) [npm package](https://www.npmjs.com/package/lodash.tolower) [&#x24C9;][1]

Converts `string`, as a whole, to lower case just like
[String#toLowerCase](https://mdn.io/toLowerCase).

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the lower cased string.

#### Example
```js
_.toLower('--Foo-Bar--');
// => '--foo-bar--'

_.toLower('fooBar');
// => 'foobar'

_.toLower('__FOO_BAR__');
// => '__foo_bar__'
```
---

<!-- /div -->

<!-- div -->

### <a id="_toupperstring"></a>`_.toUpper([string=''])`
[#](#_toupperstring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14417) [npm package](https://www.npmjs.com/package/lodash.toupper) [&#x24C9;][1]

Converts `string`, as a whole, to upper case just like
[String#toUpperCase](https://mdn.io/toUpperCase).

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the upper cased string.

#### Example
```js
_.toUpper('--foo-bar--');
// => '--FOO-BAR--'

_.toUpper('fooBar');
// => 'FOOBAR'

_.toUpper('__foo_bar__');
// => '__FOO_BAR__'
```
---

<!-- /div -->

<!-- div -->

### <a id="_trimstring-charswhitespace"></a>`_.trim([string=''], [chars=whitespace])`
[#](#_trimstring-charswhitespace) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14443) [npm package](https://www.npmjs.com/package/lodash.trim) [&#x24C9;][1]

Removes leading and trailing whitespace or specified characters from `string`.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to trim.
2. `[chars=whitespace]` *(string)*: The characters to trim.

#### Returns
*(string)*: Returns the trimmed string.

#### Example
```js
_.trim('  abc  ');
// => 'abc'

_.trim('-_-abc-_-', '_-');
// => 'abc'

_.map(['  foo  ', '  bar  '], _.trim);
// => ['foo', 'bar']
```
---

<!-- /div -->

<!-- div -->

### <a id="_trimendstring-charswhitespace"></a>`_.trimEnd([string=''], [chars=whitespace])`
[#](#_trimendstring-charswhitespace) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14478) [npm package](https://www.npmjs.com/package/lodash.trimend) [&#x24C9;][1]

Removes trailing whitespace or specified characters from `string`.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to trim.
2. `[chars=whitespace]` *(string)*: The characters to trim.

#### Returns
*(string)*: Returns the trimmed string.

#### Example
```js
_.trimEnd('  abc  ');
// => '  abc'

_.trimEnd('-_-abc-_-', '_-');
// => '-_-abc'
```
---

<!-- /div -->

<!-- div -->

### <a id="_trimstartstring-charswhitespace"></a>`_.trimStart([string=''], [chars=whitespace])`
[#](#_trimstartstring-charswhitespace) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14511) [npm package](https://www.npmjs.com/package/lodash.trimstart) [&#x24C9;][1]

Removes leading whitespace or specified characters from `string`.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to trim.
2. `[chars=whitespace]` *(string)*: The characters to trim.

#### Returns
*(string)*: Returns the trimmed string.

#### Example
```js
_.trimStart('  abc  ');
// => 'abc  '

_.trimStart('-_-abc-_-', '_-');
// => 'abc-_-'
```
---

<!-- /div -->

<!-- div -->

### <a id="_truncatestring-options-optionslength30-optionsomission-optionsseparator"></a>`_.truncate([string=''], [options={}], [options.length=30], [options.omission='...'], [options.separator])`
[#](#_truncatestring-options-optionslength30-optionsomission-optionsseparator) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14562) [npm package](https://www.npmjs.com/package/lodash.truncate) [&#x24C9;][1]

Truncates `string` if it's longer than the given maximum string length.
The last characters of the truncated string are replaced with the omission
string which defaults to "...".

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to truncate.
2. `[options={}]` *(Object)*: The options object.
3. `[options.length=30]` *(number)*: The maximum string length.
4. `[options.omission='...']` *(string)*: The string to indicate text is omitted.
5. `[options.separator]` *(RegExp|string)*: The separator pattern to truncate to.

#### Returns
*(string)*: Returns the truncated string.

#### Example
```js
_.truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'

_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': ' '
});
// => 'hi-diddly-ho there,...'

_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': /,? +/
});
// => 'hi-diddly-ho there...'

_.truncate('hi-diddly-ho there, neighborino', {
  'omission': ' [...]'
});
// => 'hi-diddly-ho there, neig [...]'
```
---

<!-- /div -->

<!-- div -->

### <a id="_unescapestring"></a>`_.unescape([string=''])`
[#](#_unescapestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14637) [npm package](https://www.npmjs.com/package/lodash.unescape) [&#x24C9;][1]

The inverse of `_.escape`; this method converts the HTML entities
`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to
their corresponding characters.
<br>
<br>
**Note:** No other HTML entities are unescaped. To unescape additional
HTML entities use a third-party library like [_he_](https://mths.be/he).

#### Since
0.6.0
#### Arguments
1. `[string='']` *(string)*: The string to unescape.

#### Returns
*(string)*: Returns the unescaped string.

#### Example
```js
_.unescape('fred, barney, &amp; pebbles');
// => 'fred, barney, & pebbles'
```
---

<!-- /div -->

<!-- div -->

### <a id="_uppercasestring"></a>`_.upperCase([string=''])`
[#](#_uppercasestring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14664) [npm package](https://www.npmjs.com/package/lodash.uppercase) [&#x24C9;][1]

Converts `string`, as space separated words, to upper case.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the upper cased string.

#### Example
```js
_.upperCase('--foo-bar');
// => 'FOO BAR'

_.upperCase('fooBar');
// => 'FOO BAR'

_.upperCase('__foo_bar__');
// => 'FOO BAR'
```
---

<!-- /div -->

<!-- div -->

### <a id="_upperfirststring"></a>`_.upperFirst([string=''])`
[#](#_upperfirststring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14685) [npm package](https://www.npmjs.com/package/lodash.upperfirst) [&#x24C9;][1]

Converts the first character of `string` to upper case.

#### Since
4.0.0
#### Arguments
1. `[string='']` *(string)*: The string to convert.

#### Returns
*(string)*: Returns the converted string.

#### Example
```js
_.upperFirst('fred');
// => 'Fred'

_.upperFirst('FRED');
// => 'FRED'
```
---

<!-- /div -->

<!-- div -->

### <a id="_wordsstring-pattern"></a>`_.words([string=''], [pattern])`
[#](#_wordsstring-pattern) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14706) [npm package](https://www.npmjs.com/package/lodash.words) [&#x24C9;][1]

Splits `string` into an array of its words.

#### Since
3.0.0
#### Arguments
1. `[string='']` *(string)*: The string to inspect.
2. `[pattern]` *(RegExp|string)*: The pattern to match words.

#### Returns
*(Array)*: Returns the words of `string`.

#### Example
```js
_.words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']

_.words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Util” Methods`

<!-- div -->

### <a id="_attemptfunc-args"></a>`_.attempt(func, [args])`
[#](#_attemptfunc-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14740) [npm package](https://www.npmjs.com/package/lodash.attempt) [&#x24C9;][1]

Attempts to invoke `func`, returning either the result or the caught error
object. Any additional arguments are provided to `func` when it's invoked.

#### Since
3.0.0
#### Arguments
1. `func` *(Function)*: The function to attempt.
2. `[args]` *(...&#42;)*: The arguments to invoke `func` with.

#### Returns
*(&#42;)*: Returns the `func` result or error object.

#### Example
```js
// Avoid throwing errors for invalid selectors.
var elements = _.attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');

if (_.isError(elements)) {
  elements = [];
}
```
---

<!-- /div -->

<!-- div -->

### <a id="_bindallobject-methodnames"></a>`_.bindAll(object, methodNames)`
[#](#_bindallobject-methodnames) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14774) [npm package](https://www.npmjs.com/package/lodash.bindall) [&#x24C9;][1]

Binds methods of an object to the object itself, overwriting the existing
method.
<br>
<br>
**Note:** This method doesn't set the "length" property of bound functions.

#### Since
0.1.0
#### Arguments
1. `object` *(Object)*: The object to bind and assign the bound methods to.
2. `methodNames` *(...(string|string&#91;&#93;))*: The object method names to bind.

#### Returns
*(Object)*: Returns `object`.

#### Example
```js
var view = {
  'label': 'docs',
  'click': function() {
    console.log('clicked ' + this.label);
  }
};

_.bindAll(view, ['click']);
jQuery(element).on('click', view.click);
// => Logs 'clicked docs' when clicked.
```
---

<!-- /div -->

<!-- div -->

### <a id="_condpairs"></a>`_.cond(pairs)`
[#](#_condpairs) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14811) [npm package](https://www.npmjs.com/package/lodash.cond) [&#x24C9;][1]

Creates a function that iterates over `pairs` and invokes the corresponding
function of the first predicate to return truthy. The predicate-function
pairs are invoked with the `this` binding and arguments of the created
function.

#### Since
4.0.0
#### Arguments
1. `pairs` *(Array)*: The predicate-function pairs.

#### Returns
*(Function)*: Returns the new composite function.

#### Example
```js
var func = _.cond([
  [_.matches({ 'a': 1 }),           _.constant('matches A')],
  [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
  [_.stubTrue,                      _.constant('no match')]
]);

func({ 'a': 1, 'b': 2 });
// => 'matches A'

func({ 'a': 0, 'b': 1 });
// => 'matches B'

func({ 'a': '1', 'b': '2' });
// => 'no match'
```
---

<!-- /div -->

<!-- div -->

### <a id="_conformssource"></a>`_.conforms(source)`
[#](#_conformssource) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14854) [npm package](https://www.npmjs.com/package/lodash.conforms) [&#x24C9;][1]

Creates a function that invokes the predicate properties of `source` with
the corresponding property values of a given object, returning `true` if
all predicates return truthy, else `false`.

#### Since
4.0.0
#### Arguments
1. `source` *(Object)*: The object of property predicates to conform to.

#### Returns
*(Function)*: Returns the new spec function.

#### Example
```js
var objects = [
  { 'a': 2, 'b': 1 },
  { 'a': 1, 'b': 2 }
];

_.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
// => [{ 'a': 1, 'b': 2 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_constantvalue"></a>`_.constant(value)`
[#](#_constantvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14877) [npm package](https://www.npmjs.com/package/lodash.constant) [&#x24C9;][1]

Creates a function that returns `value`.

#### Since
2.4.0
#### Arguments
1. `value` *(&#42;)*: The value to return from the new function.

#### Returns
*(Function)*: Returns the new constant function.

#### Example
```js
var objects = _.times(2, _.constant({ 'a': 1 }));

console.log(objects);
// => [{ 'a': 1 }, { 'a': 1 }]

console.log(objects[0] === objects[1]);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_defaulttovalue-defaultvalue"></a>`_.defaultTo(value, defaultValue)`
[#](#_defaulttovalue-defaultvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14903) [npm package](https://www.npmjs.com/package/lodash.defaultto) [&#x24C9;][1]

Checks `value` to determine whether a default value should be returned in
its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
or `undefined`.

#### Since
4.14.0
#### Arguments
1. `value` *(&#42;)*: The value to check.
2. `defaultValue` *(&#42;)*: The default value.

#### Returns
*(&#42;)*: Returns the resolved value.

#### Example
```js
_.defaultTo(1, 10);
// => 1

_.defaultTo(undefined, 10);
// => 10
```
---

<!-- /div -->

<!-- div -->

### <a id="_flowfuncs"></a>`_.flow([funcs])`
[#](#_flowfuncs) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14929) [npm package](https://www.npmjs.com/package/lodash.flow) [&#x24C9;][1]

Creates a function that returns the result of invoking the given functions
with the `this` binding of the created function, where each successive
invocation is supplied the return value of the previous.

#### Since
3.0.0
#### Arguments
1. `[funcs]` *(...(Function|Function&#91;&#93;))*: The functions to invoke.

#### Returns
*(Function)*: Returns the new composite function.

#### Example
```js
function square(n) {
  return n * n;
}

var addSquare = _.flow([_.add, square]);
addSquare(1, 2);
// => 9
```
---

<!-- /div -->

<!-- div -->

### <a id="_flowrightfuncs"></a>`_.flowRight([funcs])`
[#](#_flowrightfuncs) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14952) [npm package](https://www.npmjs.com/package/lodash.flowright) [&#x24C9;][1]

This method is like `_.flow` except that it creates a function that
invokes the given functions from right to left.

#### Since
3.0.0
#### Arguments
1. `[funcs]` *(...(Function|Function&#91;&#93;))*: The functions to invoke.

#### Returns
*(Function)*: Returns the new composite function.

#### Example
```js
function square(n) {
  return n * n;
}

var addSquare = _.flowRight([square, _.add]);
addSquare(1, 2);
// => 9
```
---

<!-- /div -->

<!-- div -->

### <a id="_identityvalue"></a>`_.identity(value)`
[#](#_identityvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L14970) [npm package](https://www.npmjs.com/package/lodash.identity) [&#x24C9;][1]

This method returns the first argument it receives.

#### Since
0.1.0
#### Arguments
1. `value` *(&#42;)*: Any value.

#### Returns
*(&#42;)*: Returns `value`.

#### Example
```js
var object = { 'a': 1 };

console.log(_.identity(object) === object);
// => true
```
---

<!-- /div -->

<!-- div -->

### <a id="_iterateefunc_identity"></a>`_.iteratee([func=_.identity])`
[#](#_iterateefunc_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15016) [npm package](https://www.npmjs.com/package/lodash.iteratee) [&#x24C9;][1]

Creates a function that invokes `func` with the arguments of the created
function. If `func` is a property name, the created function returns the
property value for a given element. If `func` is an array or object, the
created function returns `true` for elements that contain the equivalent
source properties, otherwise it returns `false`.

#### Since
4.0.0
#### Arguments
1. `[func=_.identity]` *(&#42;)*: The value to convert to a callback.

#### Returns
*(Function)*: Returns the callback.

#### Example
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// The `_.matches` iteratee shorthand.
_.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
// => [{ 'user': 'barney', 'age': 36, 'active': true }]

// The `_.matchesProperty` iteratee shorthand.
_.filter(users, _.iteratee(['user', 'fred']));
// => [{ 'user': 'fred', 'age': 40 }]

// The `_.property` iteratee shorthand.
_.map(users, _.iteratee('user'));
// => ['barney', 'fred']

// Create custom iteratee shorthands.
_.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
  return !_.isRegExp(func) ? iteratee(func) : function(string) {
    return func.test(string);
  };
});

_.filter(['abc', 'def'], /ef/);
// => ['def']
```
---

<!-- /div -->

<!-- div -->

### <a id="_matchessource"></a>`_.matches(source)`
[#](#_matchessource) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15044) [npm package](https://www.npmjs.com/package/lodash.matches) [&#x24C9;][1]

Creates a function that performs a partial deep comparison between a given
object and `source`, returning `true` if the given object has equivalent
property values, else `false`. The created function is equivalent to
`_.isMatch` with a `source` partially applied.
<br>
<br>
**Note:** This method supports comparing the same values as `_.isEqual`.

#### Since
3.0.0
#### Arguments
1. `source` *(Object)*: The object of property values to match.

#### Returns
*(Function)*: Returns the new spec function.

#### Example
```js
var objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];

_.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
// => [{ 'a': 4, 'b': 5, 'c': 6 }]
```
---

<!-- /div -->

<!-- div -->

### <a id="_matchespropertypath-srcvalue"></a>`_.matchesProperty(path, srcValue)`
[#](#_matchespropertypath-srcvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15072) [npm package](https://www.npmjs.com/package/lodash.matchesproperty) [&#x24C9;][1]

Creates a function that performs a partial deep comparison between the
value at `path` of a given object to `srcValue`, returning `true` if the
object value is equivalent, else `false`.
<br>
<br>
**Note:** This method supports comparing the same values as `_.isEqual`.

#### Since
3.2.0
#### Arguments
1. `path` *(Array|string)*: The path of the property to get.
2. `srcValue` *(&#42;)*: The value to match.

#### Returns
*(Function)*: Returns the new spec function.

#### Example
```js
var objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];

_.find(objects, _.matchesProperty('a', 4));
// => { 'a': 4, 'b': 5, 'c': 6 }
```
---

<!-- /div -->

<!-- div -->

### <a id="_methodpath-args"></a>`_.method(path, [args])`
[#](#_methodpath-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15100) [npm package](https://www.npmjs.com/package/lodash.method) [&#x24C9;][1]

Creates a function that invokes the method at `path` of a given object.
Any additional arguments are provided to the invoked method.

#### Since
3.7.0
#### Arguments
1. `path` *(Array|string)*: The path of the method to invoke.
2. `[args]` *(...&#42;)*: The arguments to invoke the method with.

#### Returns
*(Function)*: Returns the new invoker function.

#### Example
```js
var objects = [
  { 'a': { 'b': _.constant(2) } },
  { 'a': { 'b': _.constant(1) } }
];

_.map(objects, _.method('a.b'));
// => [2, 1]

_.map(objects, _.method(['a', 'b']));
// => [2, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_methodofobject-args"></a>`_.methodOf(object, [args])`
[#](#_methodofobject-args) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15129) [npm package](https://www.npmjs.com/package/lodash.methodof) [&#x24C9;][1]

The opposite of `_.method`; this method creates a function that invokes
the method at a given path of `object`. Any additional arguments are
provided to the invoked method.

#### Since
3.7.0
#### Arguments
1. `object` *(Object)*: The object to query.
2. `[args]` *(...&#42;)*: The arguments to invoke the method with.

#### Returns
*(Function)*: Returns the new invoker function.

#### Example
```js
var array = _.times(3, _.constant),
    object = { 'a': array, 'b': array, 'c': array };

_.map(['a[2]', 'c[0]'], _.methodOf(object));
// => [2, 0]

_.map([['a', '2'], ['c', '0']], _.methodOf(object));
// => [2, 0]
```
---

<!-- /div -->

<!-- div -->

### <a id="_mixinobjectlodash-source-options-optionschaintrue"></a>`_.mixin([object=lodash], source, [options={}], [options.chain=true])`
[#](#_mixinobjectlodash-source-options-optionschaintrue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15171) [npm package](https://www.npmjs.com/package/lodash.mixin) [&#x24C9;][1]

Adds all own enumerable string keyed function properties of a source
object to the destination object. If `object` is a function, then methods
are added to its prototype as well.
<br>
<br>
**Note:** Use `_.runInContext` to create a pristine `lodash` function to
avoid conflicts caused by modifying the original.

#### Since
0.1.0
#### Arguments
1. `[object=lodash]` *(Function|Object)*: The destination object.
2. `source` *(Object)*: The object of functions to add.
3. `[options={}]` *(Object)*: The options object.
4. `[options.chain=true]` *(boolean)*: Specify whether mixins are chainable.

#### Returns
*(&#42;)*: Returns `object`.

#### Example
```js
function vowels(string) {
  return _.filter(string, function(v) {
    return /[aeiou]/i.test(v);
  });
}

_.mixin({ 'vowels': vowels });
_.vowels('fred');
// => ['e']

_('fred').vowels().value();
// => ['e']

_.mixin({ 'vowels': vowels }, { 'chain': false });
_('fred').vowels();
// => ['e']
```
---

<!-- /div -->

<!-- div -->

### <a id="_noconflict"></a>`_.noConflict()`
[#](#_noconflict) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15220) [npm package](https://www.npmjs.com/package/lodash.noconflict) [&#x24C9;][1]

Reverts the `_` variable to its previous value and returns a reference to
the `lodash` function.

#### Since
0.1.0
#### Returns
*(Function)*: Returns the `lodash` function.

#### Example
```js
var lodash = _.noConflict();
```
---

<!-- /div -->

<!-- div -->

### <a id="_noop"></a>`_.noop()`
[#](#_noop) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15239) [npm package](https://www.npmjs.com/package/lodash.noop) [&#x24C9;][1]

This method returns `undefined`.

#### Since
2.3.0
#### Example
```js
_.times(2, _.noop);
// => [undefined, undefined]
```
---

<!-- /div -->

<!-- div -->

### <a id="_nthargn0"></a>`_.nthArg([n=0])`
[#](#_nthargn0) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15263) [npm package](https://www.npmjs.com/package/lodash.ntharg) [&#x24C9;][1]

Creates a function that gets the argument at index `n`. If `n` is negative,
the nth argument from the end is returned.

#### Since
4.0.0
#### Arguments
1. `[n=0]` *(number)*: The index of the argument to return.

#### Returns
*(Function)*: Returns the new pass-thru function.

#### Example
```js
var func = _.nthArg(1);
func('a', 'b', 'c', 'd');
// => 'b'

var func = _.nthArg(-2);
func('a', 'b', 'c', 'd');
// => 'c'
```
---

<!-- /div -->

<!-- div -->

### <a id="_overiteratees_identity"></a>`_.over([iteratees=[_.identity]])`
[#](#_overiteratees_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15288) [npm package](https://www.npmjs.com/package/lodash.over) [&#x24C9;][1]

Creates a function that invokes `iteratees` with the arguments it receives
and returns their results.

#### Since
4.0.0
#### Arguments
1. `[iteratees=[_.identity]]` *(...(Function|Function&#91;&#93;))*: The iteratees to invoke.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var func = _.over([Math.max, Math.min]);

func(1, 2, 3, 4);
// => [4, 1]
```
---

<!-- /div -->

<!-- div -->

### <a id="_overeverypredicates_identity"></a>`_.overEvery([predicates=[_.identity]])`
[#](#_overeverypredicates_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15314) [npm package](https://www.npmjs.com/package/lodash.overevery) [&#x24C9;][1]

Creates a function that checks if **all** of the `predicates` return
truthy when invoked with the arguments it receives.

#### Since
4.0.0
#### Arguments
1. `[predicates=[_.identity]]` *(...(Function|Function&#91;&#93;))*: The predicates to check.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var func = _.overEvery([Boolean, isFinite]);

func('1');
// => true

func(null);
// => false

func(NaN);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_oversomepredicates_identity"></a>`_.overSome([predicates=[_.identity]])`
[#](#_oversomepredicates_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15340) [npm package](https://www.npmjs.com/package/lodash.oversome) [&#x24C9;][1]

Creates a function that checks if **any** of the `predicates` return
truthy when invoked with the arguments it receives.

#### Since
4.0.0
#### Arguments
1. `[predicates=[_.identity]]` *(...(Function|Function&#91;&#93;))*: The predicates to check.

#### Returns
*(Function)*: Returns the new function.

#### Example
```js
var func = _.overSome([Boolean, isFinite]);

func('1');
// => true

func(null);
// => true

func(NaN);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_propertypath"></a>`_.property(path)`
[#](#_propertypath) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15364) [npm package](https://www.npmjs.com/package/lodash.property) [&#x24C9;][1]

Creates a function that returns the value at `path` of a given object.

#### Since
2.4.0
#### Arguments
1. `path` *(Array|string)*: The path of the property to get.

#### Returns
*(Function)*: Returns the new accessor function.

#### Example
```js
var objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];

_.map(objects, _.property('a.b'));
// => [2, 1]

_.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
// => [1, 2]
```
---

<!-- /div -->

<!-- div -->

### <a id="_propertyofobject"></a>`_.propertyOf(object)`
[#](#_propertyofobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15389) [npm package](https://www.npmjs.com/package/lodash.propertyof) [&#x24C9;][1]

The opposite of `_.property`; this method creates a function that returns
the value at a given path of `object`.

#### Since
3.0.0
#### Arguments
1. `object` *(Object)*: The object to query.

#### Returns
*(Function)*: Returns the new accessor function.

#### Example
```js
var array = [0, 1, 2],
    object = { 'a': array, 'b': array, 'c': array };

_.map(['a[2]', 'c[0]'], _.propertyOf(object));
// => [2, 0]

_.map([['a', '2'], ['c', '0']], _.propertyOf(object));
// => [2, 0]
```
---

<!-- /div -->

<!-- div -->

### <a id="_rangestart0-end-step1"></a>`_.range([start=0], end, [step=1])`
[#](#_rangestart0-end-step1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15436) [npm package](https://www.npmjs.com/package/lodash.range) [&#x24C9;][1]

Creates an array of numbers *(positive and/or negative)* progressing from
`start` up to, but not including, `end`. A step of `-1` is used if a negative
`start` is specified without an `end` or `step`. If `end` is not specified,
it's set to `start` with `start` then set to `0`.
<br>
<br>
**Note:** JavaScript follows the IEEE-754 standard for resolving
floating-point values which can produce unexpected results.

#### Since
0.1.0
#### Arguments
1. `[start=0]` *(number)*: The start of the range.
2. `end` *(number)*: The end of the range.
3. `[step=1]` *(number)*: The value to increment or decrement by.

#### Returns
*(Array)*: Returns the range of numbers.

#### Example
```js
_.range(4);
// => [0, 1, 2, 3]

_.range(-4);
// => [0, -1, -2, -3]

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
---

<!-- /div -->

<!-- div -->

### <a id="_rangerightstart0-end-step1"></a>`_.rangeRight([start=0], end, [step=1])`
[#](#_rangerightstart0-end-step1) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15474) [npm package](https://www.npmjs.com/package/lodash.rangeright) [&#x24C9;][1]

This method is like `_.range` except that it populates values in
descending order.

#### Since
4.0.0
#### Arguments
1. `[start=0]` *(number)*: The start of the range.
2. `end` *(number)*: The end of the range.
3. `[step=1]` *(number)*: The value to increment or decrement by.

#### Returns
*(Array)*: Returns the range of numbers.

#### Example
```js
_.rangeRight(4);
// => [3, 2, 1, 0]

_.rangeRight(-4);
// => [-3, -2, -1, 0]

_.rangeRight(1, 5);
// => [4, 3, 2, 1]

_.rangeRight(0, 20, 5);
// => [15, 10, 5, 0]

_.rangeRight(0, -4, -1);
// => [-3, -2, -1, 0]

_.rangeRight(1, 4, 0);
// => [1, 1, 1]

_.rangeRight(0);
// => []
```
---

<!-- /div -->

<!-- div -->

### <a id="_runincontextcontextroot"></a>`_.runInContext([context=root])`
[#](#_runincontextcontextroot) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1279) [npm package](https://www.npmjs.com/package/lodash.runincontext) [&#x24C9;][1]

Create a new pristine `lodash` function using the `context` object.

#### Since
1.1.0
#### Arguments
1. `[context=root]` *(Object)*: The context object.

#### Returns
*(Function)*: Returns a new `lodash` function.

#### Example
```js
_.mixin({ 'foo': _.constant('foo') });

var lodash = _.runInContext();
lodash.mixin({ 'bar': lodash.constant('bar') });

_.isFunction(_.foo);
// => true
_.isFunction(_.bar);
// => false

lodash.isFunction(lodash.foo);
// => false
lodash.isFunction(lodash.bar);
// => true

// Use `context` to stub `Date#getTime` use in `_.now`.
var stubbed = _.runInContext({
  'Date': function() {
    return { 'getTime': stubGetTime };
  }
});

// Create a suped-up `defer` in Node.js.
var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
```
---

<!-- /div -->

<!-- div -->

### <a id="_stubarray"></a>`_.stubArray()`
[#](#_stubarray) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15494) [npm package](https://www.npmjs.com/package/lodash.stubarray) [&#x24C9;][1]

This method returns a new empty array.

#### Since
4.13.0
#### Returns
*(Array)*: Returns the new empty array.

#### Example
```js
var arrays = _.times(2, _.stubArray);

console.log(arrays);
// => [[], []]

console.log(arrays[0] === arrays[1]);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_stubfalse"></a>`_.stubFalse()`
[#](#_stubfalse) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15511) [npm package](https://www.npmjs.com/package/lodash.stubfalse) [&#x24C9;][1]

This method returns `false`.

#### Since
4.13.0
#### Returns
*(boolean)*: Returns `false`.

#### Example
```js
_.times(2, _.stubFalse);
// => [false, false]
```
---

<!-- /div -->

<!-- div -->

### <a id="_stubobject"></a>`_.stubObject()`
[#](#_stubobject) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15533) [npm package](https://www.npmjs.com/package/lodash.stubobject) [&#x24C9;][1]

This method returns a new empty object.

#### Since
4.13.0
#### Returns
*(Object)*: Returns the new empty object.

#### Example
```js
var objects = _.times(2, _.stubObject);

console.log(objects);
// => [{}, {}]

console.log(objects[0] === objects[1]);
// => false
```
---

<!-- /div -->

<!-- div -->

### <a id="_stubstring"></a>`_.stubString()`
[#](#_stubstring) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15550) [npm package](https://www.npmjs.com/package/lodash.stubstring) [&#x24C9;][1]

This method returns an empty string.

#### Since
4.13.0
#### Returns
*(string)*: Returns the empty string.

#### Example
```js
_.times(2, _.stubString);
// => ['', '']
```
---

<!-- /div -->

<!-- div -->

### <a id="_stubtrue"></a>`_.stubTrue()`
[#](#_stubtrue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15567) [npm package](https://www.npmjs.com/package/lodash.stubtrue) [&#x24C9;][1]

This method returns `true`.

#### Since
4.13.0
#### Returns
*(boolean)*: Returns `true`.

#### Example
```js
_.times(2, _.stubTrue);
// => [true, true]
```
---

<!-- /div -->

<!-- div -->

### <a id="_timesn-iteratee_identity"></a>`_.times(n, [iteratee=_.identity])`
[#](#_timesn-iteratee_identity) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15590) [npm package](https://www.npmjs.com/package/lodash.times) [&#x24C9;][1]

Invokes the iteratee `n` times, returning an array of the results of
each invocation. The iteratee is invoked with one argument; *(index)*.

#### Since
0.1.0
#### Arguments
1. `n` *(number)*: The number of times to invoke `iteratee`.
2. `[iteratee=_.identity]` *(Function)*: The function invoked per iteration.

#### Returns
*(Array)*: Returns the array of results.

#### Example
```js
_.times(3, String);
// => ['0', '1', '2']

 _.times(4, _.constant(0));
// => [0, 0, 0, 0]
```
---

<!-- /div -->

<!-- div -->

### <a id="_topathvalue"></a>`_.toPath(value)`
[#](#_topathvalue) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15625) [npm package](https://www.npmjs.com/package/lodash.topath) [&#x24C9;][1]

Converts `value` to a property path array.

#### Since
4.0.0
#### Arguments
1. `value` *(&#42;)*: The value to convert.

#### Returns
*(Array)*: Returns the new property path array.

#### Example
```js
_.toPath('a.b.c');
// => ['a', 'b', 'c']

_.toPath('a[0].b.c');
// => ['a', '0', 'b', 'c']
```
---

<!-- /div -->

<!-- div -->

### <a id="_uniqueidprefix"></a>`_.uniqueId([prefix=''])`
[#](#_uniqueidprefix) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L15649) [npm package](https://www.npmjs.com/package/lodash.uniqueid) [&#x24C9;][1]

Generates a unique ID. If `prefix` is given, the ID is appended to it.

#### Since
0.1.0
#### Arguments
1. `[prefix='']` *(string)*: The value to prefix the ID with.

#### Returns
*(string)*: Returns the unique ID.

#### Example
```js
_.uniqueId('contact_');
// => 'contact_104'

_.uniqueId();
// => '105'
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

### <a id="_version"></a>`_.VERSION`
[#](#_version) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L16340)  [&#x24C9;][1]

(string): The semantic version number.

---

<!-- /div -->

<!-- div -->

### <a id="_templatesettings"></a>`_.templateSettings`
[#](#_templatesettings) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1566) [npm package](https://www.npmjs.com/package/lodash.templatesettings) [&#x24C9;][1]

(Object): By default, the template delimiters used by lodash are like those in
embedded Ruby *(ERB)*. Change the following template settings to use
alternative delimiters.

---

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsescape"></a>`_.templateSettings.escape`
[#](#_templatesettingsescape) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1574)  [&#x24C9;][1]

(RegExp): Used to detect `data` property values to be HTML-escaped.

---

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsevaluate"></a>`_.templateSettings.evaluate`
[#](#_templatesettingsevaluate) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1582)  [&#x24C9;][1]

(RegExp): Used to detect code to be evaluated.

---

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsimports"></a>`_.templateSettings.imports`
[#](#_templatesettingsimports) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1606)  [&#x24C9;][1]

(Object): Used to import variables into the compiled template.

---

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsinterpolate"></a>`_.templateSettings.interpolate`
[#](#_templatesettingsinterpolate) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1590)  [&#x24C9;][1]

(RegExp): Used to detect `data` property values to inject.

---

<!-- /div -->

<!-- div -->

### <a id="_templatesettingsvariable"></a>`_.templateSettings.variable`
[#](#_templatesettingsvariable) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1598)  [&#x24C9;][1]

(string): Used to reference the data object in the template text.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="_templatesettingsimports_"></a>`_.templateSettings.imports._`
[#](#_templatesettingsimports_) [source](https://github.com/lodash/lodash/blob/4.14.0/lodash.js#L1614)  [&#x24C9;][1]

A reference to the `lodash` function.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #array "Jump back to the TOC."
