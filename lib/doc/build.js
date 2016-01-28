'use strict';

var _ = require('lodash'),
    docdown = require('docdown'),
    fs = require('fs-extra'),
    path = require('path');

var mapping = require('../../fp/_mapping'),
    applyFPMapping = require('./apply-fp-mapping');

var basePath = path.join(__dirname, '..', '..'),
    docPath = path.join(basePath, 'doc'),
    readmePath = path.join(docPath, 'README.md'),
    fpReadmePath = path.join(docPath, 'fp.md');

var pkg = require('../../package.json'),
    version = pkg.version;

var config = {
  'base': {
    'entryLinks': [
      '<% if (name == "templateSettings" || !/^(?:methods|properties|seq)$/i.test(category)) {' +
      'print("[&#x24C3;](https://www.npmjs.com/package/lodash." + name.toLowerCase() + " \\"See the npm package\\")")' +
      '} %>'
    ],
    'path': path.join(basePath, 'lodash.js'),
    'title': '<a href="https://lodash.com/">lodash</a> <span>v' + version + '</span>',
    'toc': 'categories',
    'url': 'https://github.com/lodash/lodash/blob/' + version + '/lodash.js'
  },
  'github': {
    'hash': 'github'
  },
  'site': {
    'tocLink': '#docs'
  }
};

function postprocess(string) {
  // Fix docdown bug by wrapping symbol property identifiers in brackets.
  return string.replace(/\.(Symbol\.(?:[a-z]+[A-Z]?)+)/g, '[$1]');
}

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(fpFlag, type) {
  if (fpFlag) {
    applyFPMapping(mapping);
  }
  var options = _.defaults({}, config.base, config[type]),
      markdown = docdown(options),
      filePath = fpFlag ? fpReadmePath : readmePath;

  fs.writeFile(filePath, postprocess(markdown), onComplete);
}

build(_.includes(process.argv, '--fp'), _.last(process.argv));
