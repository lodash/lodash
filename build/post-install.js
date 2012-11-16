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
      var decompressor = zlib.createUnzip(),
          parser = new tar.Extract({ 'path': options.path });

      decompressor.on('error', callback)
      parser.on('end', callback).on('error', callback);
      response.pipe(decompressor).pipe(parser);
    })
    .on('error', callback);
  }

  /*--------------------------------------------------------------------------*/

  exec('npm -g root', function(exception, stdout) {
    if (exception) {
      console.error([
        "There was a problem loading the npm registry. If you're installing the Lo-Dash",
        "command-line executable (via `npm install -g lodash`), you'll need to manually",
        'download UglifyJS and the Closure Compiler:',
        '',
        "curl -H 'Accept: application/vnd.github.v3.raw' https://api.github.com/repos/bestiejs/lodash/git/blobs/aa29a2ecf6f51d4da5a2a418c0d4ea0e368ee80d | tar xvz -C '%s'",
        "curl -H 'Accept: application/vnd.github.v3.raw' https://api.github.com/repos/bestiejs/lodash/git/blobs/9869c4443fb22598235d1019fcc8245be41e8889 | tar xvz -C '%s'",
        '',
        'Please submit an issue on the GitHub issue tracker: %s.'
      ].join('\n'), vendorPath, vendorPath, process.env.npm_package_bugs_url);
      console.error(exception);
      process.exit();
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
      'onComplete': function(exception) {
        if (exception) {
          console.error([
            "You'll need to manually download the Closure Compiler:",
            '',
            "curl -H 'Accept: application/vnd.github.v3.raw' https://api.github.com/repos/bestiejs/lodash/git/blobs/aa29a2ecf6f51d4da5a2a418c0d4ea0e368ee80d | tar xvz -C '%s'"
          ].join('\n'), vendorPath);
        }
        // download UglifyJS
        getDependency({
          'title': 'UglifyJS',
          'id': uglifyId,
          'path': vendorPath,
          'onComplete': function(exception) {
            if (exception) {
              console.error([
                "You'll need to manually download the Closure Compiler:",
                '',
                "curl -H 'Accept: application/vnd.github.v3.raw' https://api.github.com/repos/bestiejs/lodash/git/blobs/9869c4443fb22598235d1019fcc8245be41e8889 | tar xvz -C '%s'"
              ].join('\n'), vendorPath);
            }
            process.exit();
          }
        });
      }
    });
  });
}());
