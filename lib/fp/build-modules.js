'use strict';

const _ = require('lodash');
const async = require('async');
const glob = require('glob');
const path = require('path');

const file = require('../common/file');
const mapping = require('../common/mapping');
const util = require('../common/util');

const templatePath = path.join(__dirname, 'template/modules');
const template = file.globTemplate(path.join(templatePath, '*.jst'));

const aryMethods = _.union(
  mapping.aryMethod[1],
  mapping.aryMethod[2],
  mapping.aryMethod[3],
  mapping.aryMethod[4]
);

const categories = [
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

const ignored = [
  '_*.js',
  'core.js',
  'core.min.js',
  'fp.js',
  'index.js',
  'lodash.js',
  'lodash.min.js'
];

/**
 * Checks if `name` is a method alias.
 *
 * @private
 * @param {string} name The name to check.
 * @returns {boolean} Returns `true` if `name` is a method alias, else `false`.
 */
function isAlias(name) {
  return _.has(mapping.aliasToReal, name);
}

/**
 * Checks if `name` is a category name.
 *
 * @private
 * @param {string} name The name to check.
 * @returns {boolean} Returns `true` if `name` is a category name, else `false`.
 */
function isCategory(name) {
  return _.includes(categories, name);
}

/**
 * Checks if `name` belongs to a method that's passed thru and not wrapped.
 *
 * @private
 * @param {string} name The name to check.
 * @returns {boolean} Returns `true` if `name` is of a pass thru method,
 *  else `false`.
 */
function isThru(name) {
  return !_.includes(aryMethods, name);
}

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
function getTemplate(moduleName) {
  const data = {
    'name': _.get(mapping.aliasToReal, moduleName, moduleName),
    'mapping': mapping
  };

  if (isAlias(moduleName)) {
    return template.alias(data);
  }
  if (isCategory(moduleName)) {
    return template.category(data);
  }
  if (isThru(moduleName)) {
    return template.thru(data);
  }
  return template.module(data);
}

/*----------------------------------------------------------------------------*/

/**
 * Creates FP modules at the `target` path.
 *
 * @private
 * @param {string} target The output directory path.
 */
function build(target) {
  target = path.resolve(target);

  const fpPath = path.join(target, 'fp');

  // Glob existing lodash module paths.
  const modulePaths = glob.sync(path.join(target, '*.js'), {
    'nodir': true,
    'ignore': ignored.map(filename => {
      return path.join(target, filename);
    })
  });

  // Add FP alias and remapped module paths.
  _.each([mapping.aliasToReal, mapping.remap], data => {
    _.forOwn(data, (realName, alias) => {
      const modulePath = path.join(target, alias + '.js');
      if (!_.includes(modulePaths, modulePath)) {
        modulePaths.push(modulePath);
      }
    });
  });

  const actions = modulePaths.map(modulePath => {
    const moduleName = path.basename(modulePath, '.js');
    return file.write(path.join(fpPath, moduleName + '.js'), getTemplate(moduleName));
  });

  actions.unshift(file.copy(path.join(__dirname, '../../fp'), fpPath));
  actions.push(file.write(path.join(fpPath, '_falseOptions.js'), template._falseOptions()));
  actions.push(file.write(path.join(fpPath, '_util.js'), template._util()));
  actions.push(file.write(path.join(target, 'fp.js'), template.fp()));
  actions.push(file.write(path.join(fpPath, 'convert.js'), template.convert()));

  async.series(actions, util.pitch);
}

build(_.last(process.argv));
