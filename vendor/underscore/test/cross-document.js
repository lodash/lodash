(function() {
  if (typeof document == 'undefined') return;

  var _ = typeof require == 'function' ? require('..') : window._;

  QUnit.module('Cross Document');
  /* global iObject, iElement, iArguments, iFunction, iArray, iError, iString, iNumber, iBoolean, iDate, iRegExp, iNaN, iNull, iUndefined, ActiveXObject */

  // Setup remote variables for iFrame tests.
  var iframe = document.createElement('iframe');
  iframe.frameBorder = iframe.height = iframe.width = 0;
  document.body.appendChild(iframe);
  var iDoc = (iDoc = iframe.contentDocument || iframe.contentWindow).document || iDoc;
  iDoc.write(
    [
      '<script>',
      'parent.iElement = document.createElement("div");',
      'parent.iArguments = (function(){ return arguments; })(1, 2, 3);',
      'parent.iArray = [1, 2, 3];',
      'parent.iString = new String("hello");',
      'parent.iNumber = new Number(100);',
      'parent.iFunction = (function(){});',
      'parent.iDate = new Date();',
      'parent.iRegExp = /hi/;',
      'parent.iNaN = NaN;',
      'parent.iNull = null;',
      'parent.iBoolean = new Boolean(false);',
      'parent.iUndefined = undefined;',
      'parent.iObject = {};',
      'parent.iError = new Error();',
      '</script>'
    ].join('\n')
  );
  iDoc.close();

  test('isEqual', function(assert) {

    assert.ok(!_.isEqual(iNumber, 101));
    assert.ok(_.isEqual(iNumber, 100));

    // Objects from another frame.
    assert.ok(_.isEqual({}, iObject), 'Objects with equivalent members created in different documents are equal');

    // Array from another frame.
    assert.ok(_.isEqual([1, 2, 3], iArray), 'Arrays with equivalent elements created in different documents are equal');
  });

  test('isEmpty', function(assert) {
    assert.ok(!_([iNumber]).isEmpty(), '[1] is not empty');
    assert.ok(!_.isEmpty(iArray), '[] is empty');
    assert.ok(_.isEmpty(iObject), '{} is empty');
  });

  test('isElement', function(assert) {
    assert.ok(!_.isElement('div'), 'strings are not dom elements');
    assert.ok(_.isElement(document.body), 'the body tag is a DOM element');
    assert.ok(_.isElement(iElement), 'even from another frame');
  });

  test('isArguments', function(assert) {
    assert.ok(_.isArguments(iArguments), 'even from another frame');
  });

  test('isObject', function(assert) {
    assert.ok(_.isObject(iElement), 'even from another frame');
    assert.ok(_.isObject(iFunction), 'even from another frame');
  });

  test('isArray', function(assert) {
    assert.ok(_.isArray(iArray), 'even from another frame');
  });

  test('isString', function(assert) {
    assert.ok(_.isString(iString), 'even from another frame');
  });

  test('isNumber', function(assert) {
    assert.ok(_.isNumber(iNumber), 'even from another frame');
  });

  test('isBoolean', function(assert) {
    assert.ok(_.isBoolean(iBoolean), 'even from another frame');
  });

  test('isFunction', function(assert) {
    assert.ok(_.isFunction(iFunction), 'even from another frame');
  });

  test('isDate', function(assert) {
    assert.ok(_.isDate(iDate), 'even from another frame');
  });

  test('isRegExp', function(assert) {
    assert.ok(_.isRegExp(iRegExp), 'even from another frame');
  });

  test('isNaN', function(assert) {
    assert.ok(_.isNaN(iNaN), 'even from another frame');
  });

  test('isNull', function(assert) {
    assert.ok(_.isNull(iNull), 'even from another frame');
  });

  test('isUndefined', function(assert) {
    assert.ok(_.isUndefined(iUndefined), 'even from another frame');
  });

  test('isError', function(assert) {
    assert.ok(_.isError(iError), 'even from another frame');
  });

  if (typeof ActiveXObject != 'undefined') {
    test('IE host objects', function(assert) {
      var xml = new ActiveXObject('Msxml2.DOMDocument.3.0');
      assert.ok(!_.isNumber(xml));
      assert.ok(!_.isBoolean(xml));
      assert.ok(!_.isNaN(xml));
      assert.ok(!_.isFunction(xml));
      assert.ok(!_.isNull(xml));
      assert.ok(!_.isUndefined(xml));
    });

    test('#1621 IE 11 compat mode DOM elements are not functions', function(assert) {
      var fn = function() {};
      var xml = new ActiveXObject('Msxml2.DOMDocument.3.0');
      var div = document.createElement('div');

      // JIT the function
      var count = 200;
      while (count--) {
        _.isFunction(fn);
      }

      assert.equal(_.isFunction(xml), false);
      assert.equal(_.isFunction(div), false);
      assert.equal(_.isFunction(fn), true);
    });
  }

}());
