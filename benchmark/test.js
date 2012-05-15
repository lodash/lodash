/*global _, lodash */
var Benchmark = require('../vendor/benchmark.js');
var colors = require('colors');
var count = {
	underscore: 0,
	lodash: 0
};

// Workaround node.js scoping issue
global.lodash = require('../');
global._ = require('../vendor/underscore');


Benchmark.options.setup = function() {
	var objects, randomized;
	var lodash = global.lodash;
	var _ = global._;
	var numbers = [];
	var object = {};
	var i = 0;

	for ( ; i < 20; i++ ) {
		numbers[ i ] = i;
		object[ 'key' + i ] = i;
	}

	objects = _.map(numbers, function( n ) {
		return { 'num': n };
	});
	randomized = _.sortBy(numbers, function() {
		return Math.random();
	});
};

function start() {
	console.log( '\n' + this.name.bold );
}

function cycle( e ) {
	console.log( e.target.toString().grey );
}

function complete() {
	console.log( this.filter('fastest').pluck('name').toString().green + ' fastest' );
	count.underscore += this[0].count;
	count.lodash += this[1].count;
}


/* each */
Benchmark.Suite('each')
.add('Underscore', function() {
	var timesTwo = [];
	_.each( numbers, function( num ) {
		timesTwo.push( num * 2 );
	});
})
.add('Lodash', function() {
	var timesTwo = [];
	lodash.each( numbers, function( num ) {
		timesTwo.push( num * 2 );
	});
})
.on( 'start', start )
.on( 'cycle', cycle )
.on( 'complete', complete )
.run();


/* each object */
Benchmark.Suite('each object')
.add('Underscore', function() {
	var timesTwo = [];
	_.each( object, function( num ) {
		timesTwo.push( num * 2 );
	});
})
.add('Lodash', function() {
	var timesTwo = [];
	lodash.each( object, function( num ) {
		timesTwo.push( num * 2 );
	});
})
.on( 'start', start )
.on( 'cycle', cycle )
.on( 'complete', complete )
.run();


/* keys */
Benchmark.Suite('keys')
.add('Underscore', function() {
	_.keys( object );
})
.add('Lodash', function() {
	lodash.keys( object );
})
.on( 'start', start )
.on( 'cycle', cycle )
.on( 'complete', complete )
.run();


/* map */
Benchmark.Suite('map')
.add('Underscore', function() {
	_.map( objects, function( obj ) {
		return obj.num;
	});
})
.add('Lodash', function() {
	lodash.map( objects, function( obj ) {
		return obj.num;
	});
})
.on( 'start', start )
.on( 'cycle', cycle )
.on( 'complete', complete )
.run();


/* pluck */
Benchmark.Suite('pluck')
.add('Underscore', function() {
	_.pluck( objects, 'num' );
})
.add('Lodash', function() {
	lodash.pluck( objects, 'num' );
})
.on( 'start', start )
.on( 'cycle', cycle )
.on( 'complete', complete )
.run();


/* values */
Benchmark.Suite('values')
.add('Underscore', function() {
	_.values( objects );
})
.add('Lodash', function() {
	lodash.values( objects );
})
.on( 'start', start )
.on( 'cycle', cycle )
.on( 'complete', complete )
.run();


console.log( ('\nLodash is ' + ( count.lodash / count.underscore ).toFixed(2) + 'x faster than Underscore' ).green );