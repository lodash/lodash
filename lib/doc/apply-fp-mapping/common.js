var _ = require('lodash'),
    Entry = require('docdown/lib/entry');

var baseGetParams = Entry.prototype.getParams;

// Function copied from docdown/lib/entry that is not exported.
function getMultilineValue(string, tagName) {
  var prelude = tagName == 'description' ? '^ */\\*\\*(?: *\\n *\\* *)?' : ('^ *\\*[\\t ]*@' + _.escapeRegExp(tagName) + '\\b'),
      postlude = '(?=\\*\\s+\\@[a-z]|\\*/)',
      result = _.result(RegExp(prelude + '([\\s\\S]*?)' + postlude, 'gm').exec(string), 1, '');

  return _.trim(result.replace(RegExp('(?:^|\\n)[\\t ]*\\*[\\t ]' + (tagName == 'example' ? '?' : '*'), 'g'), '\n'));

}

// Function copied from docdown/lib/entry that is not exported.
function hasTag(string, tagName) {
  tagName = tagName == '*' ? '\\w+' : _.escapeRegExp(tagName);
  return RegExp('^ *\\*[\\t ]*@' + tagName + '\\b', 'm').test(string);
}

/**
 * Return the new ary of a given function.
 *
 * @param {object} mapping Mapping object that defines the arity of all functions.
 * @param {String} name Name of the function associated to the call/function definition.
 * @param {boolean} wrapped Flag indicating whether method is wrapped. Will decrement ary if true.
 * @return {number} Ary of the function as an integer
 */
function getMethodAry(mapping, name, wrapped) {
  var ary = _.find(mapping.caps, function(cap) {
    return _.includes(mapping.aryMethod[cap], name) && cap;
  });
  if (_.isNumber(ary) && wrapped) {
    return ary - 1;
  }
  return ary;
}

/**
 * Reorder `params` for a given function definition/call.
 *
 * @param {object} mapping Mapping object that defines if and how the `params` will be reordered.
 * @param {String} name Name of the function associated to the call/function definition.
 * @param {*[]} params Parameters/arguments to reorder.
 * @param {boolean} wrapped Flag indicating whether method is wrapped. Will decrement ary if true.
 * @returns {*[]} Reordered parameters/arguments.
 */
function reorderParams(mapping, name, params, wrapped) {
  // Check if reordering is needed.
  if (!mapping || mapping.skipRearg[name]) {
    return params;
  }
  var reargOrder = mapping.methodRearg[name] || mapping.aryRearg[getMethodAry(mapping, name, wrapped)];
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

module.exports = {
  baseGetParams: baseGetParams,
  getMultilineValue: getMultilineValue,
  hasTag: hasTag,
  getMethodAry: getMethodAry,
  reorderParams: reorderParams
};
