#!/usr/bin/env node
'use strict';

/** Load modules. */
var fs = require('fs'),
    path = require('path');

/** Resolve program params. */
var args = process.argv.slice(process.argv[0] === process.execPath ? 2 : 0),
    filePath = path.resolve(args[1]);

var pattern = (function() {
  var result = args[0],
      delimiter = result.charAt(0),
      lastIndex = result.lastIndexOf(delimiter);

  return RegExp(result.slice(1, lastIndex), result.slice(lastIndex + 1));
}());

/** Used to match lines of code. */
var reLine = /.*/gm;

/*----------------------------------------------------------------------------*/

fs.writeFileSync(filePath, fs.readFileSync(filePath, 'utf-8').replace(pattern, function(match) {
  return match.replace(reLine, '');
}));
