import assert from 'assert';
import { oldDash, coverage, document, isModularize, realm, filePath } from './utils.js';
import noConflict from '../noConflict.js';

describe('noConflict', function() {
  it('should return the `lodash` function', function() {
    assert.strictEqual(noConflict(), oldDash);
    assert.notStrictEqual(root._, oldDash);
    root._ = oldDash;
  });

  it('should restore `_` only if `lodash` is the current `_` value', function() {
    var object = root._ = {};
    assert.strictEqual(noConflict(), oldDash);
    assert.strictEqual(root._, object);
    root._ = oldDash;
  });

  it('should work with a `root` of `this`', function() {
    if (!coverage && !document && !isModularize && realm.object) {
      var fs = require('fs'),
          vm = require('vm'),
          expected = {},
          context = vm.createContext({ '_': expected, 'console': console }),
          source = fs.readFileSync(filePath, 'utf8');

      vm.runInContext(source + '\nthis.lodash = this._.noConflict()', context);

      assert.strictEqual(context._, expected);
      assert.ok(context.lodash);
    }
  });
});
