'use strict';

var _ = require('lodash/fp'),
    async = require('async'),
    fs = require('fs-extra'),
    glob = require('glob'),
    Module = require('module'),
    path = require('path');

var basePath = path.join(__dirname, '..', '..'),
    templatePath = path.join(_dirname, 'template');

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

var categories = [
  'array',
  'collection',
  'date',
  'function',
  'lang',
  'math',
  'number',
  'object',
  'seq',
  'string',
  'util'
];

var lodashPath = path.dirname(Module._resolveFilename('lodash', assign(new Module, {
  'paths': Module._nodeModulePaths(process.cwd())
})));

var mapping = require(path.join(lodashPath, 'fp/mapping'));

var aliasTemplate = _.template(fs.readFileSync(templatePath, 'alias.jst')),
    categoryTemplate = _.template(fs.readFileSync(templatePath, 'category.jst')),
    convertTemplate = _.template(fs.readFileSync(templatePath, 'convert.jst')),
    moduleTemplate = _.template(fs.readFileSync(templatePath, 'module.jst')),
    utilTemplate = _.template(fs.readFileSync(templatePath, '_util.jst'));

var isAlias = function(funcName) {
  if (_.includes(funcName, mapping.aryMethod[1]) ||
      _.includes(funcName, mapping.aryMethod[2]) ||
      _.includes(funcName, mapping.aryMethod[3]) ||
      _.includes(funcName, mapping.aryMethod[4])) {
    return false;
  }
  return _.find(alias, _.includes(funcName));
};

var isCategory = _.includes(_, _.map(_.add(_, '.js'), categories));

var moduleTemplate = function(name) {
  var data = { 'name': name };
  if (isCategory(name)) {
    return categoryTemplate(data);
  }
  if (isAlias(name)) {
    return aliasTemplate(data);
  }
  return convertTemplate(data);
};

function build(target) {
  var fpPath = path.join(target, 'fp'),
      pattern = path.join(target, '*.js'),
      options = { 'nodir': true, 'ignore': '_*.js' };

  glob(pattern, options, function(err, files) {
    files = files.map(function(file) {
      var name = path.basename(file, '.js');
      return _.partial(fs.write, path.join(fpPath, path.basename(file), moduleTemplate(name)));
    });

    async.series(files, onComplete);
  });
}

module.exports = build;
