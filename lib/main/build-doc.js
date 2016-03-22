'use strict';

var _ = require('lodash'),
    docdown = require('docdown'),
    fs = require('fs-extra'),
    path = require('path');

var basePath = path.join(__dirname, '..', '..'),
    docPath = path.join(basePath, 'doc'),
    readmePath = path.join(docPath, 'README.md');

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
  // Fix docdown bugs.
  return string
    // Repair the default value of `chars`.
    // See https://github.com/eslint/doctrine/issues/157 for more details.
    .replace(/\bchars=''/g, "chars=' '")
    // Wrap symbol property identifiers in brackets.
    .replace(/\.(Symbol\.(?:[a-z]+[A-Z]?)+)/g, '[$1]');
}

/*----------------------------------------------------------------------------*/

function onComplete(error) {
  if (error) {
    throw error;
  }
}

function build(type) {
  var options = _.defaults({}, config.base, config[type]),
      markdown = docdown(options);

  fs.writeFile(readmePath, postprocess(markdown), onComplete);
}

build(_.last(process.argv));
