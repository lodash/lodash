#!/usr/bin/env node
;(function () {
  'use strict';

  /** Load Node modules */
  var fs = require('fs'),
      zlib = require('zlib'),
      path = require('path'),
      https = require('https'),
      tar = require('tar'),
      npm = require('npm');

  /** The directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  /**
   * Fetches a required `.tar.gz` dependency with the given Git object ID from
   * the Lo-Dash repo on GitHub. The object ID may be obtained by running `git
   * hash-object path/to/dependency.tar.gz`.
   *
   * @param {String} source The Git object ID of the `.tar.gz` package.
   * @param {String|Object} The extraction target directory, or an object
   *   containing archived file names and target paths as key-value pairs.
   * @param {Function} callback The function to call once the extraction
   *  finishes.
   *
   */
  function getDependency(source, targets, callback) {
    https.get({
      'host': 'api.github.com',
      'path': '/repos/bestiejs/lodash/git/blobs/' + source,
      'headers': {
        'Accept': 'application/vnd.github.v3.raw'
      }
    }, function(response) {
      var parser;
      if (typeof targets == 'string') {
        parser = new tar.Extract({
          'path': targets
        });
      } else {
        parser = new tar.Parse();
        parser.on('entry', function(entry) {
          var path = entry.path;
          if (path in targets) {
            entry.pipe(fs.createWriteStream(targets[path]));
          }
        });
      }
      parser.on('end', function() {
        callback(null, targets);
      });
      parser.on('error', callback);
      response.pipe(zlib.createUnzip()).pipe(parser);
    }).on('error', callback);
  }

  npm.load({
    'global': true
  }, function(exception) {
    console.log(path.resolve(basePath, '..'), npm.root);
    if (exception) {
      process.stderr.write('There was a problem loading the npm registry.');
      process.exit(1);
    } else {
      if (path.resolve(basePath, '..') == npm.root) {
        // download Closure Compiler
        getDependency('aa29a2ecf6f51d4da5a2a418c0d4ea0e368ee80d', vendorPath, function(exception) {
          var statusCode = 0;
          if (exception) {
            process.stderr.write('There was a problem downloading Closure Compiler.');
            statusCode = 1;
          }
          // download UglifyJS
          getDependency('827f406a02626c1c6723e8ae281b6785d36375c1', vendorPath, function(exception) {
            if (exception) {
              process.stderr.write('There was a problem downloading UglifyJS.');
              statusCode = 1;
            }
            process.exit(statusCode);
          });
        });
      }
    }
  });
}());
