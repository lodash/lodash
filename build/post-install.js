#!/usr/bin/env node
;(function () {
  'use strict';

  /** Load Node modules */
  var exec = require('child_process').exec,
      fs = require('fs'),
      https = require('https'),
      path = require('path'),
      tar = require('tar'),
      zlib = require('zlib');

  /** The path of the directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The path of the `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  /**
   * Fetches a required `.tar.gz` dependency with the given Git object ID from
   * the Lo-Dash repo on GitHub. The object ID may be obtained by running
   * `git hash-object path/to/dependency.tar.gz`.
   *
   * @param {String} objectId The Git object ID of the `.tar.gz` package.
   * @param {String} The extraction target directory.
   * @param {Function} callback The function to call once the extraction finishes.
   */
  function getDependency(objectId, targets, callback) {
    https.get({
      'host': 'api.github.com',
      'path': '/repos/bestiejs/lodash/git/blobs/' + objectId,
      'headers': {
        'Accept': 'application/vnd.github.v3.raw'
      }
    }, function(response) {
      var parser = new tar.Extract({
        'path': targets
      })
      .on('end', callback)
      .on('error', callback);

      response.pipe(zlib.createUnzip()).pipe(parser);
    })
    .on('error', callback);
  }

  exec('npm -g root', function(exception, stdout, stderr) {
    if (exception || stderr) {
      console.error('There was a problem loading the npm registry.');
      process.exit(1);
    }
    // exit early if not a global install
    if (path.resolve(basePath, '..') != stdout.trim()) {
      return;
    }
    // download Closure Compiler
    getDependency('aa29a2ecf6f51d4da5a2a418c0d4ea0e368ee80d', vendorPath, function(exception) {
      var statusCode = 0;
      if (exception) {
        console.error('There was a problem downloading the Closure Compiler.');
        statusCode = 1;
      }
      // download UglifyJS
      getDependency('827f406a02626c1c6723e8ae281b6785d36375c1', vendorPath, function(exception) {
        if (exception) {
          console.error('There was a problem downloading UglifyJS.');
          statusCode = 1;
        }
        process.exit(statusCode);
      });
    });
  });
}());
