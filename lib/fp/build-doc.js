'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

const file = require('../common/file');
const mapping = require('../common/mapping');
const util = require('../common/util');

const templatePath = path.join(__dirname, 'template/doc');
const template = file.globTemplate(path.join(templatePath, '*.jst'));

const argNames = ['a', 'b', 'c', 'd'];

const templateData = {
  mapping,
  toArgOrder,
  toFuncList
};

/**
 * Converts arranged argument `indexes` into a named argument string
 * representation of their order.
 *
 * @private
 * @param {number[]} indexes The arranged argument indexes.
 * @returns {string} Returns the named argument string.
 */
function toArgOrder(indexes) {
  const reordered = [];
  _.each(indexes, (newIndex, index) => {
    reordered[newIndex] = argNames[index];
  });
  return '`(' + reordered.join(', ') + ')`';
}

/**
 * Converts `funcNames` into a chunked list string representation.
 *
 * @private
 * @param {string[]} funcNames The function names.
 * @returns {string} Returns the function list string.
 */
function toFuncList(funcNames) {
  let chunks = _.chunk(funcNames.slice().sort(), 5);
  let lastChunk = _.last(chunks);
  const lastName = lastChunk ? lastChunk.pop() : undefined;

  chunks = _.reject(chunks, _.isEmpty);
  lastChunk = _.last(chunks);

  let result = '`' + _.map(chunks, chunk => chunk.join('`, `') + '`').join(',\n`');
  if (lastName == null) {
    return result;
  }
  if (_.size(chunks) > 1 || _.size(lastChunk) > 1) {
    result += ',';
  }
  result += ' &';
  result += _.size(lastChunk) < 5 ? ' ' : '\n';
  return result + '`' + lastName + '`';
}

/*----------------------------------------------------------------------------*/

/**
 * Creates the FP-Guide wiki at the `target` path.
 *
 * @private
 * @param {string} target The output file path.
 */
function build(target) {
  target = path.resolve(target);
  fs.writeFile(target, template.wiki(templateData), util.pitch);
}

build(_.last(process.argv));
