#!/usr/bin/env node
;(function() {
  'use strict';

  /** Load Node modules */
  var fs = require('fs'),
      path = require('path');

  /** The path of the directory that is the base of the repository */
  var basePath = fs.realpathSync(path.join(__dirname, '..'));

  /** The path of the `vendor` directory */
  var vendorPath = path.join(basePath, 'vendor');

  /** The Git object ID of `closure-compiler.tar.gz` */
  var closureId = 'a2787b470c577cee2404d186c562dd9835f779f5';

  /** The Git object ID of `uglifyjs.tar.gz` */
  var uglifyId = '505f1be36ef60fd25a992a522f116d5179ab317f';

  /** The media type for raw blob data */
  var mediaType = 'application/vnd.github.v3.raw';

  /** Used to reference parts of the blob href */
  var location = (function() {
    var host = 'api.github.com',
        origin = 'https://api.github.com',
        pathname = '/repos/bestiejs/lodash/git/blobs';

    return {
      'host': host,
      'href': origin + pathname,
      'origin': origin,
      'pathname': pathname
    };
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Fetches a required `.tar.gz` dependency with the given Git object ID from
   * the Lo-Dash repo on GitHub. The object ID may be obtained by running
   * `git hash-object path/to/dependency.tar.gz`.
   *
   * @private
   * @param {Object} options The options object.
   *  id - The Git object ID of the `.tar.gz` file.
   *  onComplete - The function, invoked with one argument (exception),
   *   called once the extraction has finished.
   *  path - The path of the extraction directory.
   *  title - The dependency's title used in status updates logged to the console.
   */
  function getDependency(options) {
    options || (options = {});

    var id = options.id,
        onComplete = options.onComplete,
        path = options.path,
        title = options.title;

    function callback(exception) {
      if (exception) {
        console.error([
          'There was a problem installing ' + title + '. To manually install, run:',
          '',
          "curl -H 'Accept: " + mediaType + "' " + location.href + '/' + id + " | tar xvz -C '" + path + "'"
        ].join('\n'));
      }
      onComplete(exception);
    }

    console.log('Downloading ' + title + '...');

    https.get({
      'host': location.host,
      'path': location.pathname + '/' + id,
      'headers': {
        // By default, all GitHub blob API endpoints return a JSON document
        // containing Base64-encoded blob data. Overriding the `Accept` header
        // with the GitHub raw media type returns the blob data directly.
        // See http://developer.github.com/v3/media/.
        'Accept': mediaType
      }
    }, function(response) {
      var decompressor = zlib.createUnzip(),
          parser = new tar.Extract({ 'path': path });

      decompressor.on('error', callback);
      parser.on('end', callback).on('error', callback);
      response.pipe(decompressor).pipe(parser);
    })
    .on('error', callback);
  }

  /*--------------------------------------------------------------------------*/

  if (process.env.npm_config_global === 'true') {
    // catch module load errors
    try {
      var https = require('https'),
          tar = require('../vendor/tar/tar.js'),
          zlib = require('zlib');

      // download the Closure Compiler
      getDependency({
        'title': 'the Closure Compiler',
        'id': closureId,
        'path': vendorPath,
        'onComplete': function() {
          // download UglifyJS
          getDependency({
            'title': 'UglifyJS',
            'id': uglifyId,
            'path': vendorPath,
            'onComplete': function() {
              process.exit();
            }
          });
        }
      });
    } catch(e) {
      console.log([
        'Oops! There was a problem installing dependencies required by the Lo-Dash',
        'command-line executable. To manually install UglifyJS and the Closure Compiler',
        'run:',
        '',
        "curl -H 'Accept: " + mediaType + "' " + location.href + '/' + closureId + " | tar xvz -C '" + vendorPath + "'",
        "curl -H 'Accept: " + mediaType + "' " + location.href + '/' + uglifyId  + " | tar xvz -C '" + vendorPath + "'",
        ''
      ].join('\n'));

      console.log(e);
    }
  }
}());
