#!/usr/bin/env node
;(function () {
  'use strict';

  /** Load Node modules */
  var exec = require('child_process').exec,
      fs = require('fs'),
      https = require('https'),
      path = require('path'),
      tar = require('../vendor/tar/tar.js'),
      zlib = require('zlib');

  /** The path of the directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The path of the `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  /** The Git object ID of `closure-compiler.tar.gz` */
  var closureId = 'aa29a2ecf6f51d4da5a2a418c0d4ea0e368ee80d';

  /** The Git object ID of `uglifyjs.tar.gz` */
  var uglifyId = '9869c4443fb22598235d1019fcc8245be41e8889';

  /*--------------------------------------------------------------------------*/

  /**
   * Fetches a required `.tar.gz` dependency with the given Git object ID from
   * the Lo-Dash repo on GitHub. The object ID may be obtained by running
   * `git hash-object path/to/dependency.tar.gz`.
   *
   * @private
   * @param {Object} options The options object.
   *
   *  id - The Git object ID of the `.tar.gz` file.
   *  onComplete - The function, invoked with one argument (exception),
   *   called once the extraction has finished.
   *  path - The path of the extraction directory.
   *  title - The dependency's title used in status updates logged to the console.
   */
  function getDependency(options) {
    options || (options = {});

    var onComplete = options.onComplete,
        title = options.title;

    function callback(exception) {
      if (exception) {
        console.error('There was a problem downloading ' + title + '.');
      }
      onComplete(exception);
    }

    console.log('Downloading ' + title + '...');

    https.get({
      'host': 'api.github.com',
      'path': '/repos/bestiejs/lodash/git/blobs/' + options.id,
      'headers': {
        // By default, all GitHub blob API endpoints return a JSON document
        // containing Base64-encoded blob data. Overriding the `Accept` header
        // with the GitHub raw media type returns the blob data directly.
        'Accept': 'application/vnd.github.v3.raw'
      }
    }, function(response) {
      var parser = new tar.Extract({
        'path': options.path
      })
      .on('end', callback)
      .on('error', callback);

      response.pipe(zlib.createUnzip()).pipe(parser);
    })
    .on('error', callback);
  }

  /*--------------------------------------------------------------------------*/

  exec('npm -g root', function(exception, stdout) {
    if (exception) {
      console.error('There was a problem loading the npm registry.');
      process.exit(1);
    }
    // exit early if not a global install
    if (path.resolve(basePath, '..') != stdout.trim()) {
      return;
    }
    // download the Closure Compiler
    getDependency({
      'title': 'the Closure Compiler',
      'id': closureId,
      'path': vendorPath,
      'onComplete':function(exceptionA) {
        // download UglifyJS
        getDependency({
          'title': 'UglifyJS',
          'id': uglifyId,
          'path': vendorPath,
          'onComplete': function(exceptionB) {
            process.exit(exceptionA || exceptionB ? 1 : 0);
          }
        });
      }
    });
  });
}());
