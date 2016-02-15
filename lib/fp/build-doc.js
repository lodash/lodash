'use strict';

var _ = require('lodash'),
    fs = require('fs-extra'),
    path = require('path'),
    util = require('../common/util');

var basePath = path.join(__dirname, '..', '..'),
    docPath = path.join(basePath, 'doc'),
    readmePath = path.join(docPath, 'FP-Guide.md');

var mapping = require('../../fp/_mapping'),
    templatePath = path.join(__dirname, 'template/doc'),
    template = util.globTemplate(path.join(templatePath, '*.jst'));

var templateData = {
  'mapping': mapping,
  'toFuncList': toFuncList
};

function toFuncList(array) {
  var chunks = _.chunk(array.slice().sort(), 5),
      lastChunk = _.last(chunks),
      last = lastChunk ? lastChunk.pop() : undefined;

  var result = '`' + _.map(chunks, function(chunk) {
    return chunk.join('`, `') + '`';
  }).join(',\n`');

  return result + (last == null ? '' : (', & `' + last + '`'));
}

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build() {
  fs.writeFile(readmePath, template.wiki(templateData), onComplete);
}

build();
