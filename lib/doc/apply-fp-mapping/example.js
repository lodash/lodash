var _ = require('lodash'),
    recast = require('recast'),
    j = require('jscodeshift'),
    common = require('./common');

/**
 * Return the name of a parameter from its description.
 *
 * @param {string[]} paramDescription Parameter description.
 * @return {string} name of the parameter.
 */
function paramName(paramDescription) {
  var name = paramDescription[1];
  if (name[0] !== '[') {
    return name;
  }
  return name
    .slice(1, name.length - 1)
    .split('=')
    [0];
}

/**
 * Return the default value of the given parameter.
 *
 * @param {string[]} paramDescription Parameter description.
 * @return {string} Default value as string if found, null otherwise.
 */
function getDefaultValue(paramDescription) {
  var name = paramDescription[1];
  if (name[0] !== '[') {
    return null;
  }
  return name
    .slice(1, name.length - 1)
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

/**
 * Same as _.map, but applied in reverse order.
 *
 * @param {Array} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @return {Array} Returns the new mapped array.
 */
function mapRight(array, iteratee) {
  var res = [];
  var index = array.length;
  while (index--) {
    res = [iteratee(array[index], index)].concat(res);
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
  var ary = common.getMethodAry(mapping, name);

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
  var ary = common.getMethodAry(mapping, name);
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
      var argsIncludingMissingOnes = addMissingArguments(j, mapping, name, value.arguments, paramsDescription);
      var args = concatExtraArgs(j, mapping, name, argsIncludingMissingOnes);
      return j.callExpression(
        value.callee,
        common.reorderParams(mapping, name, args)
      );
    });
}

/**
 * Remove calls to `console.log` from `codeSample`.
 *
 * @param {string} codeSample string to remove the calls from.
 * @return {string} Updated code sample.
 */
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

/**
 * Returns the original, not reordered, list of parameters.
 *
 * @param  {Entry} entryItem Entry whose parameters to get.
 * @return {string[][]} List of args.
 */
function getOriginalParams(entryItem) {
  var prev = entryItem._params;
  entryItem._params = undefined;
  common.baseGetParams.call(entryItem);
  var result = entryItem._params;
  entryItem._params = prev;
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
    var result = common.getMultilineValue(this.entry, 'example');
    if (!result) {
      return result;
    }

    var paramsDescription = getOriginalParams(this);
    var resultReordered = reorderParamsInExample(mapping, result, paramsDescription);
    return '```' + this.lang + '\n' + resultReordered + '\n```';
  };
}

module.exports = getReorderedExample;
