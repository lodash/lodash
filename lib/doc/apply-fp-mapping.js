var _ = require('lodash'),
    j = require('jscodeshift'),
    Entry = require('docdown/lib/entry');

var baseGetParams = Entry.prototype.getParams;

// Function copied from docdown/lib/entry that is not exported.
function getMultilineValue(string, tagName) {
  var prelude = tagName == 'description' ? '^ */\\*\\*(?: *\\n *\\* *)?' : ('^ *\\*[\\t ]*@' + _.escapeRegExp(tagName) + '\\b'),
      postlude = '(?=\\*\\s+\\@[a-z]|\\*/)',
      result = _.result(RegExp(prelude + '([\\s\\S]*?)' + postlude, 'gm').exec(string), 1, '');

  return _.trim(result.replace(RegExp('(?:^|\\n)[\\t ]*\\*[\\t ]' + (tagName == 'example' ? '?' : '*'), 'g'), '\n'));
}

/**
 * Extracts the entry's `name` data.
 * Sub-part of Entry.prototype.getCall() that fetches the name. Using `Entry.prototype.getCall()`
 * makes a call to getParams(), which itself call getBaseName --> infinite recursion.
 *
 * @param   {Object} entry Entry whose name to extract.
 * @returns {string} The entry's `name` data.
 */
function getBaseName(entry) {
  var result = /\*\/\s*(?:function\s+([^(]*)|(.*?)(?=[:=,]))/.exec(entry);
  if (result) {
    result = (result[1] || result[2]).split('.').pop();
    result = _.trim(_.trim(result), "'").split('var ').pop();
    result = _.trim(result);
  }
  // Get the function name.
  return _.result(/\*[\t ]*@name\s+(.+)/.exec(entry), 1, result || '');
}

/**
 * Reorders `params` for a given function definition/call.
 *
 * @param  {Object} mapping Mapping object that defines if and how the `params` will be reordered.
 * @param  {String} name Name of the function associated to the call/function definition.
 * @param  {*[]} params Parameters/arguments to reorder.
 * @returns {*[]} Reordered parameters/arguments.
 */
function reorderParams(mapping, name, params) {
  // Check if reordering is needed.
  if (!mapping || mapping.skipRearg[name]) {
    return params;
  }
  var reargOrder = mapping.methodRearg[name] || mapping.aryRearg[params.length];
  if (!reargOrder) {
    return params;
  }
  // Reorder params.
  var newParams = [];
  reargOrder.forEach(function(newPosition, index) {
    newParams[newPosition] = params[index];
  });
  return newParams;
}

/**
 * Returns a function that extracts the entry's `param` data, reordered according to `mapping`.
 *
 * @param {Object} mapping Mapping object that defines if and how the `params` will be reordered.
 * @returns {Function} Function that returns the entry's `param` data.
 */
function getReorderedParams(mapping) {
  return function(index) {
    if (!this._params) {
      // Call baseGetParams in order to compute `this._params`.
      baseGetParams.call(this);
      // Reorder params according to the `mapping`.
      this._params = reorderParams(mapping, getBaseName(this.entry), this._params);
    }
    return baseGetParams.call(this, index);
  };
}

/**
 * Updates a code sample so that the arguments in the call are reordered according to `mapping`.
 *
 * @param {Object} mapping Mapping object that defines if and how the arguments will be reordered.
 * @param {string} codeSample Code sample to update.
 * @returns {string} Updated code sample.
 */
function reorderParamsInExample(mapping, codeSample) {
  return j(codeSample)
    .find(j.CallExpression, { callee: { object: {name: '_' }}})
    .replaceWith(function(callExpr) {
      var value = callExpr.value;
      return j.callExpression(
        value.callee,
        reorderParams(mapping, value.callee.property.name, value.arguments)
      );
    })
    .toSource();
}

/**
 * Returns a function that extracts the entry's `example` data,
 * where function call arguments are reordered according to `mapping`.
 *
 * @param {Object} mapping Mapping object that defines if and how the `params` will be reordered.
 * @returns {Function} Function that returns the entry's `example` data.
 */
function getReorderedExample(mapping) {
  return function() {
    var result = getMultilineValue(this.entry, 'example');
    if (!result) {
      return result;
    }
    var resultReordered = reorderParamsInExample(mapping, result);
    return '```' + this.lang + '\n' + resultReordered + '\n```';
  };
}

/**
 * Updates `docdown` `Entry`'s prototype so that parameters/arguments are reordered according to `mapping`.
 */
module.exports = function applyFPMapping(mapping) {
  Entry.prototype.getParams = getReorderedParams(mapping);
  Entry.prototype.getExample = getReorderedExample(mapping);
};
