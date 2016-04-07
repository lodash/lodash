'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    path = require('path');

var file = require('../common/file'),
    mapping = require('../common/mapping');

var templatePath = path.join(__dirname, 'template/doc'),
    template = file.globTemplate(path.join(templatePath, '*.jst'));

var argNames = ['a', 'b', 'c', 'd'];

var templateData = {
  'mapping': mapping,
  'toArgOrder': toArgOrder,
  'toFuncList': toFuncList
};

function toArgOrder(array) {
  var reordered = [];
  _.each(array, function(newIndex, index) {
    reordered[newIndex] = argNames[index];
  });
  return '`(' + reordered.join(', ') + ')`';
}

function toFuncList(array) {
  var chunks = _.chunk(array.slice().sort(), 5),
      lastChunk = _.last(chunks),
      last = lastChunk ? lastChunk.pop() : undefined;

  chunks = _.reject(chunks, _.isEmpty);
  lastChunk = _.last(chunks);

  var result = '`' + _.map(chunks, function(chunk) {
    return chunk.join('`, `') + '`';
  }).join(',\n`');

  if (last == null) {
    return result;
  }
  if (_.size(chunks) > 1 || _.size(lastChunk) > 1) {
    result += ',';
  }
  result += ' &';
  result += _.size(lastChunk) < 5 ? ' ' : '\n';
  return result + '`' + last + '`';
}

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(target) {
  target = path.resolve(target);
  fs.writeFile(target, template.wiki(templateData), onComplete);
}

build(_.last(process.argv));
