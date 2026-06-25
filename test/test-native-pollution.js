/**
 * Test to verify that lodash/fp doesn't pollute native functions.
 * See: https://github.com/lodash/lodash/issues/6105
 */

var _ = require('../lodash.js');
var baseConvert = require('../fp/_baseConvert.js');

// Native functions that lodash wraps and could potentially pollute
var nativeFunctions = [
  { name: 'Array.isArray', fn: Array.isArray },
  { name: 'Object.keys', fn: Object.keys },
  { name: 'Object.assign', fn: Object.assign },
  { name: 'Number.isFinite', fn: Number.isFinite },
  { name: 'Number.isNaN', fn: Number.isNaN }
];

// Check that native functions have no convert/placeholder properties before conversion
console.log('Before baseConvert:');
nativeFunctions.forEach(function(item) {
  console.log('  ' + item.name + '.convert:', item.fn.convert);
  console.log('  ' + item.name + '.placeholder:', item.fn.placeholder);
});

// Convert lodash to fp-style
var fp = baseConvert(_, _.cloneDeep(_));

// Check that native functions still have no convert/placeholder properties after conversion
console.log('\nAfter baseConvert:');
nativeFunctions.forEach(function(item) {
  console.log('  ' + item.name + '.convert:', item.fn.convert);
  console.log('  ' + item.name + '.placeholder:', item.fn.placeholder);
});

// Verify the fix - check all native functions
var allClean = nativeFunctions.every(function(item) {
  return item.fn.convert === undefined && item.fn.placeholder === undefined;
});

console.log('\n✓ Native functions not polluted:', allClean);

// Also verify that fp methods still work correctly
console.log('\n✓ fp.isArray([1,2,3]):', fp.isArray([1, 2, 3]));
console.log('✓ fp.isArray("string"):', fp.isArray('string'));
console.log('✓ fp.isArray.convert exists:', typeof fp.isArray.convert === 'function');
console.log('✓ fp.keys({a:1}):', JSON.stringify(fp.keys({a:1})));
console.log('✓ fp.keys.convert exists:', typeof fp.keys.convert === 'function');

if (!allClean) {
  console.error('\n❌ TEST FAILED: Native functions were polluted!');
  nativeFunctions.forEach(function(item) {
    if (item.fn.convert !== undefined || item.fn.placeholder !== undefined) {
      console.error('  - ' + item.name + ' was polluted');
    }
  });
  process.exit(1);
}

console.log('\n✅ All tests passed!');
