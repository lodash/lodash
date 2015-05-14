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

  test('isEqual', function() {

    ok(!_.isEqual(iNumber, 101));
    ok(_.isEqual(iNumber, 100));

    // Objects from another frame.
    ok(_.isEqual({}, iObject), 'Objects with equivalent members created in different documents are equal');

    // Array from another frame.
    ok(_.isEqual([1, 2, 3], iArray), 'Arrays with equivalent elements created in different documents are equal');
  });

  test('isEmpty', function() {
    ok(!_([iNumber]).isEmpty(), '[1] is not empty');
    ok(!_.isEmpty(iArray), '[] is empty');
    ok(_.isEmpty(iObject), '{} is empty');
  });

  test('isElement', function() {
    ok(!_.isElement('div'), 'strings are not dom elements');
    ok(_.isElement(document.body), 'the body tag is a DOM element');
    ok(_.isElement(iElement), 'even from another frame');
  });

  test('isArguments', function() {
    ok(_.isArguments(iArguments), 'even from another frame');
  });

  test('isObject', function() {
    ok(_.isObject(iElement), 'even from another frame');
    ok(_.isObject(iFunction), 'even from another frame');
  });

  test('isArray', function() {
    ok(_.isArray(iArray), 'even from another frame');
  });

  test('isString', function() {
    ok(_.isString(iString), 'even from another frame');
  });

  test('isNumber', function() {
    ok(_.isNumber(iNumber), 'even from another frame');
  });

  test('isBoolean', function() {
    ok(_.isBoolean(iBoolean), 'even from another frame');
  });

  test('isFunction', function() {
    ok(_.isFunction(iFunction), 'even from another frame');
  });

  test('isDate', function() {
    ok(_.isDate(iDate), 'even from another frame');
  });

  test('isRegExp', function() {
    ok(_.isRegExp(iRegExp), 'even from another frame');
  });

  test('isNaN', function() {
    ok(_.isNaN(iNaN), 'even from another frame');
  });

  test('isNull', function() {
    ok(_.isNull(iNull), 'even from another frame');
  });

  test('isUndefined', function() {
    ok(_.isUndefined(iUndefined), 'even from another frame');
  });

  test('isError', function() {
    ok(_.isError(iError), 'even from another frame');
  });

  if (typeof ActiveXObject != 'undefined') {
    test('IE host objects', function() {
      var xml = new ActiveXObject('Msxml2.DOMDocument.3.0');
      ok(!_.isNumber(xml));
      ok(!_.isBoolean(xml));
      ok(!_.isNaN(xml));
      ok(!_.isFunction(xml));
      ok(!_.isNull(xml));
      ok(!_.isUndefined(xml));
    });

    test('#1621 IE 11 compat mode DOM elements are not functions', function() {
      var fn = function() {};
      var xml = new ActiveXObject('Msxml2.DOMDocument.3.0');
      var div = document.createElement('div');

      // JIT the function
      var count = 200;
      while (count--) {
        _.isFunction(fn);
      }

      equal(_.isFunction(xml), false);
      equal(_.isFunction(div), false);
      equal(_.isFunction(fn), true);
    });
  }

}());