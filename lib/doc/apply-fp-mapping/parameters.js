var _ = require('lodash'),
    j = require('jscodeshift'),
    Entry = require('docdown/lib/entry'),
    common = require('./common');

var baseGetParams = Entry.prototype.getParams;

var dotsRegex = /^\.\.\./;
var parensRegex = /^\((.*)\)$/;
var squareBracketsRegex = /^\[(.*)\]$/;
var arrayRegex = /\[\]$/;

/**
 * Return whether method is wrapped.
 *
 * @param {Entry} entry Entry to look at.
 * @return {Boolean} true if the method is wrapped, false if it is static.
 */
function isWrapped(entry) {
  return !common.hasTag(entry, 'static');
}

/**
 * Extract the entry's `name` data.
 * Sub-part of Entry.prototype.getCall() that fetches the name. Using `Entry.prototype.getCall()`
 * makes a call to getParams(), which itself call getBaseName --> infinite recursion.
 *
 * @param {object} entry Entry whose name to extract.
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
 * Return `types` as '(X|Y|...)' if `types` contains multiple values, `types[0]` otherwise.
 *
 * @param  {string[]} types Possible types of the parameter.
 * @return {string} `types` as a string.
 */
function wrapInParensIfMultiple(types) {
  if (types.length > 1) {
    return '(' + types.join('|') + ')';
  }
  return types[0];
}

/**
 * Transform parameter type from 'X' to 'X|X[]'.
 *
 * @param  {string[]} param Array whose first item is a description of the parameter type.
 * @return {string[]} `param` with the updated type.
 */
function singleItemOrArrayOf(type) {
  return type + '|' + type + '[]';
}

/**
 * Replace parameter type from something like `...number` to `number|number[]`.
 *
 * @param {string[]} param Array whose first item is a description of the parameter type.
 * @return {string[]} `param` with the updated type.
 */
function removeDotsFromTypeAndAllowMultiple(param) {
  var type = param[0];
  if (!dotsRegex.test(type)) {
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
    .thru(wrapInParensIfMultiple)
    .thru(singleItemOrArrayOf)
    .value();

  return [newType].concat(_.tail(param));
}

/**
 * Replace parameter type from something like `...number` to `number|number[]`.
 *
 * @param {string[]} param Array whose first item is a description of the parameter type.
 * @return {string[]} `param` with the updated type.
 */
function removeDotsFromType(param) {
  var type = param[0];
  if (!dotsRegex.test(type)) {
    return param;
  }

  var newType = type
    .replace(dotsRegex, '')
    .replace(parensRegex, '$1');

  return [newType].concat(_.tail(param));
}

/**
 * Find and duplicate the parameter with a type of the form '...x'.
 *
 * @param  {string} name Name of the method.
 * @param  {string[]} params Description of the parameters of the method.
 * @return {string[]} Updated parameters.
 */
function duplicateRestArrays(name, params) {
  var indexOfRestParam = _.findIndex(params, function(param) {
    return dotsRegex.test(param[0]);
  });
  if (indexOfRestParam === -1) {
    console.log('WARNING: method `' + name + '`',
      'is capped to more arguments than its declared number of parameters,',
      'but does not have a parameter like `...x`');
  }
  // duplicates param[indexOfRestParam] at its position
  return params.slice(0, indexOfRestParam + 1)
    .concat(params.slice(indexOfRestParam));
}

/**
 * Remove the optional default value and brackets around the name of the method.
 *
 * @param {string[]} param Array whose second item is the name of the param of the form
 *   'name', '[name]' or [name=defaultValue].
 * @return {string[]} `param` with the updated name.
 */
function removeDefaultValue(param) {
  var name = param[1]
    .replace(squareBracketsRegex, '$1')
    .split('=')
    [0];

  return [param[0], name, param[2]];
}

/**
 * Return the updated list of parameters of a method described by `entry`,
 * according to changes described by `mapping`. Will, if needed:
 * - reorder the arguments
 * - remove default values and brackets around previously optional arguments
 * - remove ignored arguments
 * - duplicate rest arguments if the number of params is less than its cap
 * - de-restify arguments
 *
 * @param {object} mapping Mapping object that defines if and how the `params` will be reordered.
 * @param {Entry} entry Method to update.
 * @param {string[][]} params List of the original parameters of the method.
 * @return {string[][]} Updated list of params.
 */
function updateParamsDescription(mapping, entry, params) {
  var tmpParams;
  var name = getBaseName(entry);
  var ary = common.getMethodAry(mapping, name);

  var wrapped = isWrapped(entry);
  if (wrapped) {
    // Needs one less argument when wrapped
    ary = ary - 1;
    params.shift();
  }

  if (ary > params.length) {
    tmpParams = duplicateRestArrays(name, params)
      .map(removeDotsFromType);
  } else {
    tmpParams = params
      .map(removeDotsFromTypeAndAllowMultiple);
  }
  tmpParams = _.take(tmpParams, ary).map(removeDefaultValue);
  return common.reorderParams(mapping, name, tmpParams, wrapped);
}

/**
 * Return a function that extracts the entry's `param` data, reordered according to `mapping`.
 *
 * @param {object} mapping Mapping object that defines if and how the `params` will be reordered.
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
 * Updates `docdown` `Entry`'s prototype so that parameters/arguments are reordered according to `mapping`.
 */
module.exports = getReorderedParams;
