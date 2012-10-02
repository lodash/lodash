// typing for lodash 0.8.0

interface value {
	
}

interface Collection {
	
}

interface lodashInstance {
	after (n : number, func : Function) : Function;
	bind (func : Function, thisArg? : any, ...args:any[]) : Function;
	bindAll (object : Object, ...methodNames : string[]) : Object;
	chain (value : any) : Object;
	clone (value: any, deep? : bool) : any;
	compact (array : Array) : Array;
	compose (...funcs : Function[]) : Function;
	contains (collection : Array, target : any) : bool;
	contains (collection : Object, target : any) : bool;
	contains (collection : string, target : any) : bool;
	countBy (collection : Array, callback : Function) : Object;
	countBy (collection : Array, property : string) : Object;
	countBy (collection : Object, callback : Function) : Object;
	countBy (collection : Object, property : string) : Object;
	countBy (collection : string, callback : Function) : Object;
	countBy (collection : string, property : string) : Object;
	debounce (func : Function, wait : number, immediate? : bool) : Function;
	defaults (object : Object, ...defaults : Object[]) : Object;
	defer (func : Function, args : any[]) : number;
	delay (func : Function, wait : number, ...args : any[]) : number;
	difference (array : Array, ...arrays : Array[]) : Array;
	escape (string) : string;
	every (collection : Array, callback? : ArrayIterator, thisArg ?: any) : bool;
	every (collection : Object, callback? : ObjectIterator, thisArg? : any) : bool;
	every (collection : string, callback? : StringIterator, thisArg? : any) : bool;
	extend (object : Object, ...sources : Object[]) : Object;
	filter (collection : Array, callback? : ArrayIterator, thisArg? : any) : Array;
	filter (collection : Object, callback? : ObjectIterator, thisArg? : any) : Array;
	filter (collection : string, callback? : StringIterator, thisArg? : any) : Array;
	find (collection : Array, callback : ArrayIterator, thisArg? : any) : any;
	find (collection : Object, callback : ObjectIterator, thisArg? : any) : any;
	find (collection : string, callback : StringIterator, thisArg? : any) : any;
	first (array : Array) : any;
	first (array : Array, n : number) : Array;
	flatten (array : Array, shallow? : bool) : Array;
	forEach (collection : Array, callback : ArrayIterator, thisArg? : any) : Array;
	forEach (collection : Object, callback : ObjectIterator, thisArg? : any) : Object;
	forEach (collection : string, callback : StringIterator, thisArg? : any) : string;
	forIn (object : Object, callback : ObjectIterator, thisArg? : any) : Object;
	forOwn (object : Object, callback : ObjectIterator, thisArg? : any) : Object;
	functions (object : Object) : string[];
	groupBy (collection : Array, callback : Function) : Object;
	groupBy (collection : Array, property : string) : Object;
	groupBy (collection : Object, callback : Function) : Object;
	groupBy (collection : Object, property : string) : Object;
	groupBy (collection : string, callback : Function) : Object;
	groupBy (collection : string, property : string) : Object;
	has (object : Object, property : string) : bool;
	identity (value : any) : any;
	indexOf (array : Array, value : any, fromIndex? : number) : number;
	indexOf (array : Array, value : any, fromIndex? : bool) : number;
	initial (array : Array, n? : number) : Array;
	intersection (...arrays : Array[]) : Array;
	invert (object : Object) : Object;
	invoke (collection : Array, func : Function, ...args : any[]) : Array;
	invoke (collection : Array, methodName : string, ...args : any[]) : Array;
	invoke (collection : Object, func : Function, ...args : any[]) : Array;
	invoke (collection : Object, methodName : string, ...args : any[]) : Array;
	invoke (collection : string, func : Function, ...args : any[]) : Array;
	invoke (collection : string, methodName : string, ...args : any[]) : Array;
	isArguments: Checker;
	isArray: Checker;
	isBoolean: Checker;
	isDate: Checker;
	isElement: Checker;
	isEmpty: Checker;
	isEqual (a : any, b : any) : bool;
	isFinite: Checker;
	isFunction : Checker;
	isNaN: Checker;
	isNull: Checker;
	isNumber: Checker;
	isObject: Checker;
	isPlainObject: Checker;
	isRegExp: Checker;
	isString: Checker;
	isUndefined: Checker;
	keys (object : Object) : string[];
	last (array : Array) : any;
	last (array : Array, n : number) : Array;
	lastIndexOf (array : Array, value : any, fromIndex? : number) : number;
	lateBind (object : Object, methodName : string, ...args : any[]) : Function;
	map (collection : Array, callback? : ArrayIterator, thisArg? : any) : Array;
	map (collection : Object, callback? : ObjectIterator, thisArg? : any) : Array;
	map (collection : string, callback? : StringIterator, thisArg? : any) : Array;
	max (array : Array, callback? : ArrayIterator, thisArg? : any) : any;
	memoize (func : Function, resolver? : Function) : Function;
	merge (object : Object, ...sources : Object[]) : Object;
	min (array : Array, callback? : ArrayIterator, thisArg? : any) : any;
	mixin (object : Object) : void;
	noConflict () : lodashStatic;
	object (keys : Array, values? : Array) : Object;
	omit (object : Object, callback : (any) => bool, thisArg? : any) : Object;
	omit (object : Object, ...props : string[]) : Object;
	once (func : Function) : Function;
	pairs (object : Object) : Array[];
	partial (func, ...args : any[]) : Function;
	pick (object : Object, callback : (any) => bool, thisArg? : any) : Object;
	pick (object : Object, ...props : string[]) : Object;
	pluck (collection : Array, property : string) : Array;
	pluck (collection : Object, property : string) : Array;
	pluck (collection : string, property : string) : Array;
	random (min? : number, max? : number) : number;
	range (start : number, end : number, step? : number) : number[];
	range (end : number, step? : number) : number[];
	reduce (collection : Array, callback : ArrayAccumulator, accumulator? : any, thisArg? : any) : any;
	reduce (collection : Object, callback : ObjectAccumulator, accumulator? : any, thisArg? : any) : any;
	reduce (collection : string, callback : StringAccumulator, accumulator? : any, thisArg? : any) : any;
	reduceRight (collection : Array, callback : ArrayAccumulator, accumulator? : any, thisArg? : any) : any;
	reduceRight (collection : Object, callback : ObjectAccumulator, accumulator? : any, thisArg? : any) : any;
	reduceRight (collection : string, callback : StringAccumulator, accumulator? : any, thisArg? : any) : any;
	reject (collection : Array, callback? : Checker, thisArg? : any) : Array;
	reject (collection : Object, callback? : Checker, thisArg? : any) : Array;
	reject (collection : string, callback? : Checker, thisArg? : any) : Array;
	rest (array : Array, n? : number) : Array;
	result (object : Object, property : string) : any;
	shuffle (array : Array) : Array;
	size (collection : Array) : number;
	size (collection : Object) : number;
	size (collection : string) : number;
	some (collection : Array, callback? : ArrayIterator, thisArg? : any) : bool;
	some (collection : Object, callback? : ObjectIterator, thisArg? : any) : bool;
	some (collection : string, callback? : StringIterator, thisArg? : any) : bool;
	sortBy (collection : Array, callback : Function, thisArg? : any) : Object;
	sortBy (collection : Array, property : string) : Object;
	sortBy (collection : Object, callback : Function, thisArg? : any) : Object;
	sortBy (collection : Object, property : string) : Object;
	sortBy (collection : string, callback : Function, thisArg? : any) : Object;
	sortBy (collection : string, property : string) : Object;
	sortedIndex (array : Array, value : any, callback? : (value : any) => number, thisArg? : any) : number;
	sortedIndex (array : Array, value : any, property? : string) : number;
	tap (value : any, interceptor : Function) : any;
	template (text : string) : (data : Object, options? : Object) => string;
	template (text : string, data : Object, options : Object) : string;

}




interface ArrayAccumulator {
	(accumulator : any, value : any, index : number, collection : Array) : any;
}

interface ObjectAccumulator {
	(accumulator : any, value : any, key : string, collection : Object) : any;
}

interface StringAccumulator {
	(accumulator : any, value : string, index : number, collection : string) : any;
}

interface Checker {
	(value : any) : bool;
}

interface ArrayIterator {
	(value : any, index : number, collection : Array) : any;
}

interface ObjectIterator {
	(value : any, key : string, collection : Object) : any;
}

interface StringIterator {
	(value : any, index : number, collection : string) : any;
}

interface lodashStatic extends lodashInstance{
	(value): lodashInstance;
	VERSION: string;
}

declare var _: lodashStatic
