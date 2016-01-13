var path = require('path');
var Module = require('module');
var _ = require('lodash/fp');
var mutatingAssign = require('lodash').assign;
var fs = require('fs');

var collectionModules = [
  'array.js',
  'collection.js',
  'date.js',
  'function.js',
  'lang.js',
  'math.js',
  'number.js',
  'object.js',
  'string.js',
  'util.js'
];

var utilityModules = [
  'util.js', // XXX: Remove! Not actually an utility but a collection module but it interferes testing with the current releases...
  'lodash.js',
  'fp.js',
  'chain.js'
];

var lodashPath = path.dirname(Module._resolveFilename('lodash', mutatingAssign(new Module, {
  'paths': Module._nodeModulePaths(process.cwd())
})));

var mapping = require(lodashPath + '/fp/mapping');
var singleArgFns = mapping.aryMethodMap[1];

var extPattern = /\.js$/;
var isJSfile = extPattern.test.bind(extPattern);

var removeJSExt = function(filename) {
  return filename.replace(extPattern, '');
};

var isCollectionModule = _.includes(_, collectionModules);
var isNotUtilityModule = _.negate(_.includes(_, utilityModules));
var isSingleArgFn = _.includes(_, singleArgFns);

var lodashModules = fs.readdirSync(lodashPath)
  .filter(isJSfile)
  .filter(isNotUtilityModule)
  .map(removeJSExt);

var convertTemplate = _.template(
  "var convert = require('./convert');\n" +
  "module.exports = convert('<%= name %>', require('../<%= name %>'));\n"
);

var collectionTemplate = _.template(
  "var convert = require('./convert');\n" +
    "module.exports = convert(require('../<%= name %>'));\n"
);

var passThroughTemplate = _.template(
  "module.exports = require('../<%= name %>');\n"
);

var moduleTemplate = function(name) {
  var context = {name: name};

  if (isCollectionModule(name + '.js')) {
    return collectionTemplate(context);
  }
  if (isSingleArgFn(name)) {
    return passThroughTemplate(context);
  }

  return convertTemplate(context);
};

function precompileFpWrappers(target) {
  _.forEach(function(moduleName) {
    fs.writeFileSync(
      path.join(target, moduleName + '.js'),
      moduleTemplate(moduleName)
    );
  }, lodashModules);

  _.forEach(function(aliases, origName) {
    _.forEach(function aliasName() {
      fs.writeFileSync(
        path.join(target, aliasName + '.js'),
        moduleTemplate(origName)
      );
    }, aliases);
  }, mapping.aliasMap);
}

module.exports = precompileFpWrappers;
