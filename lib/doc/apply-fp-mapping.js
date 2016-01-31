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
 * Returns the new ary of a given function.
 *
 * @param  {Object} mapping Mapping object that defines the arity of all functions.
 * @param  {String} name Name of the function associated to the call/function definition.
 * @return {number} Ary of the function as an integer
 */
function getMethodAry(mapping, name) {
  var ary = _.reduce(mapping.aryMethod, function(res, value, key) {
    if (res) {
      return res;
    }
    return _.includes(value, name) && key;
  }, '');
  return _.parseInt(ary);
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

var dotsRegex = /^\.\.\./;
var parensRegex = /^\((.*)\)$/;
var arrayRegex = /\[\]$/;

/**
 * Replace parameter type from something like `...number` to `number|number[]`.
 *
 * @param  {string[]} param Array whose first item is a description of the parameter type.
 * @return {string[]} `param` with the updated type.
 */
function removeDotsFromType(param) {
  var type = param[0];
  if (!type.startsWith('...')) {
    return param;
  }

  var newType = _.chain(type)
    .replace(dotsRegex, '')
    .replace(parensRegex, '$1')
    .split('|')
    .map(function(s) {
      return s.replace(arrayRegex, '');
    })
    .uniq()
    .thru(function(array) {
      if (array.length > 1) {
        return '(' + array.join('|') + ')';
      }
      return array;
    })
    .thru(function(subtypes) {
      return subtypes + '|' + subtypes + '[]';
    })
    .value();

  return [newType].concat(_.tail(param));
}

function updateParamsDescription(mapping, entry, params) {
  var paramsWithoutDots = params.map(removeDotsFromType);
  return reorderParams(mapping, getBaseName(entry), paramsWithoutDots);
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
      this._params = updateParamsDescription(mapping, this.entry, this._params);
    }
    return baseGetParams.call(this, index);
  };
}

/**
 * Concatenate arguments into an array of arguments.
 * For a `function fn(a, b, ...args) { ... }` with an arity of 3,
 * when called with `args` [a, b, c, d, e, f], returns [a, b, [c, d, e, f]].
 *
 * @param {object} j JSCodeShift object.
 * @param {Object} mapping Mapping object that defines if and how the arguments will be reordered.
 * @param {String} name Name of the function associated to the call/function definition.
 * @param {ASTobjects[]} Arguments to concatenate.
 * @return {ASTobjects[]} Concatenated arguments
 */
function concatExtraArgs(j, mapping, name, args) {
  var ary = getMethodAry(mapping, name);
  if (ary === args.length) {
    return args;
  }
  return _.take(args, ary - 1).concat(
    j.arrayExpression(_.takeRight(args, args.length - ary + 1))
  );
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
      var name = value.callee.property.name;
      var args = concatExtraArgs(j, mapping, name, value.arguments);
      return j.callExpression(
        value.callee,
        reorderParams(mapping, name, args)
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
