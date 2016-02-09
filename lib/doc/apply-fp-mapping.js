var _ = require('lodash'),
    j = require('jscodeshift'),
    recast = require('recast'),
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

function isWrapped(entry) {
  return !hasTag(entry, 'static');
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

var dotsRegex = /^\.\.\./;
var parensRegex = /^\((.*)\)$/;
var squareBracketsRegex = /^\[(.*)\]$/;
var arrayRegex = /\[\]$/;

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
  var paramName = param[1]
    .replace(squareBracketsRegex, '$1')
    .split('=')
    [0];

  return [param[0], paramName, param[2]];
}

function updateParamsDescription(mapping, entry, params) {
  var tmpParams;
  var name = getBaseName(entry);
  var ary = getMethodAry(mapping, name);

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
  tmpParams = tmpParams.map(removeDefaultValue);
  return reorderParams(mapping, name, tmpParams, wrapped);
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

function getDefaultValue(paramDescription) {
  var paramName = paramDescription[1];
  if (paramName[0] !== '[') {
    return null;
  }
  return paramName
    .slice(1, paramName.length - 1)
    .split('=')
    [1] || null;
}

/**
 * Return an AST node representation of `str`.
 *
 * @param {object} j JSCodeShift object.
 * @param {string} str String to convert.
 * @return {ASTObject} AST node.
 */
function stringToASTNode(j, str) {
  return j(str).find(j.Expression).paths()[0].value;
}

/**
 * Return the name of a parameter from its description.
 * @param {string[]} paramDescription Parameter description.
 * @return {string} name of the parameter.
 */
function paramName(paramDescription) {
  var paramName = paramDescription[1];
  if (paramName[0] !== '[') {
    return paramName;
  }
  return paramName
    .slice(1, paramName.length - 1)
    .split('=')
    [0];
}

/**
 * Return a AST node representation of `object.property`.
 * If `object.property` can be evaluated (ex: [].length --> 0), the node will be simplified.
 * If `defaultValue` references another argument, it will be replaced by the value of that argument.
 *
 * @param {object} j JSCodeShift object.
 * @param {ASTObject} object Object of the member expression.
 * @param {string} property Property of the member expression.
 * @return {ASTObject} AST node.
 */
function memberExpressiontoASTNode(j, object, property) {
  var node = j.memberExpression(object, j.identifier(property));
  try {
    // Attempt to evaluate the value of the node to have simpler calls
    // [1, 2, 3, 4].length --> 4
    var evaluatedNode = eval(recast.print(node).code);
    return stringToASTNode(j, JSON.stringify(evaluatedNode));
  } catch (e) {
    return node;
  }
}

/**
 * Return a AST node representation of `defaultValue`.
 * If `defaultValue` references another argument, it will be replaced by the value of that argument.
 *
 * @param {object} j JSCodeShift object.
 * @param {string} defaultValue Value to convert.
 * @param {ASTObject[]} args Arguments given to the function.
 * @param {string[]} paramNames Name of the expected parameters.
 * @return {ASTObject} AST node representation of `defaultValue`.
 */
function defaultValueToASTNode(j, defaultValue, args, paramNames) {
  // var endValue = replaceValueByArgValue(j, defaultValue, args, paramNames);
  var splitDefaultValue = defaultValue.split('.');
  var indexOfReferencedParam = paramNames.indexOf(splitDefaultValue[0]);
  if (indexOfReferencedParam !== -1) {
    if (splitDefaultValue.length > 1) {
      // defaultValue is probably of the type 'someArg.length'
      // Other more complicated cases could be handled but none exist as of this writing.
      return memberExpressiontoASTNode(j, args[indexOfReferencedParam], splitDefaultValue[1]);
    }
    return args[indexOfReferencedParam];
  }
  return stringToASTNode(j, defaultValue);
}

function mapRight(array, fn) {
  var res = [];
  var index = array.length;
  while (index--) {
    res = [fn(array[index], index)].concat(res);
  }
  return res;
}

/**
 * Return the list of arguments, augmented by the default value of the arguments that were ommitted.
 * The augmentation only happens when the method call is made without some of the optional arguments,
 * and when the arguments these optional arguments have become compulsory.
 * For a `function fn(a, b, c=0, d=b.length) { ... }` with an arity of 4,
 * when called with `args` [a, ['b']], returns [a, ['b'], 0, ['b'].length].
 * If possible, the value will be evaluated such that ̀`['b'].length` becomes `1`.
 *
 * @param {object} j JSCodeShift object.
 * @param {object} mapping Mapping object that defines if and how the arguments will be reordered.
 * @param {String} name Name of the function associated to the call/function definition.
 * @param {ASTObject[]} args Arguments to concatenate.
 * @param {string[][]} paramsDescription Description of the expected params.
 * @return {ASTObject[]} Args along with missing arguments.
 */
function addMissingArguments(j, mapping, name, args, paramsDescription) {
  var ary = getMethodAry(mapping, name);

  if (ary === undefined) {
    console.log('WARNING: method `' + name + '` is not capped');
  }

  ary = ary || 1;
  if (ary <= args.length) {
    return args;
  }
  var paramNames = paramsDescription.map(paramName);
  var tmpArgs = _.clone(args);
  var newArgs = mapRight(_.take(paramsDescription, ary), function(paramDescription, index) {
    if (index === tmpArgs.length - 1) {
      return tmpArgs.pop();
    }
    var defaultValue = getDefaultValue(paramDescription);
    if (defaultValue !== null) {
      return defaultValueToASTNode(j, defaultValue, args, paramNames);
    }
    return tmpArgs.pop();
  });
  return newArgs;
}

/**
 * Concatenate arguments into an array of arguments.
 * For a `function fn(a, b, ...args) { ... }` with an arity of 3,
 * when called with `args` [a, b, c, d, e, f], returns [a, b, [c, d, e, f]].
 *
 * @param {object} j JSCodeShift object.
 * @param {object} mapping Mapping object that defines if and how the arguments will be reordered.
 * @param {String} name Name of the function associated to the call/function definition.
 * @param {ASTObject[]} args Arguments to concatenate.
 * @return {ASTObject[]} Concatenated arguments
 */
function concatExtraArgs(j, mapping, name, args) {
  var ary = getMethodAry(mapping, name);
  if (args.length <= ary) {
    return args;
  }

  var concatenatedArgs = j.arrayExpression(_.takeRight(args, args.length - ary + 1));
  return _.take(args, ary - 1).concat(concatenatedArgs);
}

/**
 * Reorder the args in the example if needed, and eventually merges them when
 * the method is called with more args than the method's ary.
 *
 * @param {object} j JSCodeShift object.
 * @param {ASTObject} root AST representation of the example
 * @param {object} mapping Mapping object that defines if and how the arguments will be reordered.
 * @return {ASTObject} AST object where the arguments are reordered/merged
 */
function reorderMethodArgs(j, root, mapping, paramsDescription) {
  root.find(j.CallExpression, { callee: { object: {name: '_' }}})
    .replaceWith(function(callExpr, i) {
      var value = callExpr.value;
      var name = value.callee.property.name;
      var argsIncludingMissingOnes = addMissingArguments(j, mapping, name, value.arguments, paramsDescription)
      var args = concatExtraArgs(j, mapping, name, argsIncludingMissingOnes);
      return j.callExpression(
        value.callee,
        reorderParams(mapping, name, args)
      );
    });
}

function removeConsoleLogs(codeSample) {
  return codeSample
    .split('\n')
    .filter(function(line) {
      return !line.startsWith('console.log');
    })
    .join('\n');
}

/**
 * Updates a code sample so that the arguments in the call are reordered according to `mapping`.
 *
 * @param {object} mapping Mapping object that defines if and how the arguments will be reordered.
 * @param {string} codeSample Code sample to update.
 * @returns {string} Updated code sample.
 */
function reorderParamsInExample(mapping, codeSample, paramsDescription) {
  var root = j(removeConsoleLogs(codeSample));
  try {
    reorderMethodArgs(j, root, mapping, paramsDescription);
  } catch (error) {
    console.error(codeSample);
    console.error(error.stack);
    process.exit(1);
  }
  return root.toSource();
}

function getOriginalParams() {
  var prev = this._params;
  this._params = undefined;
  baseGetParams.call(this);
  var result = this._params;
  this._params = prev;
  return result;
}

/**
 * Returns a function that extracts the entry's `example` data,
 * where function call arguments are reordered according to `mapping`.
 *
 * @param {object} mapping Mapping object that defines if and how the `params` will be reordered.
 * @returns {Function} Function that returns the entry's `example` data.
 */
function getReorderedExample(mapping) {
  return function() {
    var result = getMultilineValue(this.entry, 'example');
    if (!result) {
      return result;
    }

    var paramsDescription = getOriginalParams.call(this);
    var resultReordered = reorderParamsInExample(mapping, result, paramsDescription);
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
