#!/usr/bin/env node
'use strict';

var fs = require('fs'),
    path = require('path');

var args = (args = process.argv)
  .slice((args[0] === process.execPath || args[0] === 'node') ? 2 : 0);

var filePath = path.resolve(args[1]),
    reLine = /.*/gm,
    slice = Array.prototype.slice;

var pattern = (function() {
  var result = args[0],
      delimiter = result.charAt(0),
      lastIndex = result.lastIndexOf(delimiter);

  return RegExp(result.slice(1, lastIndex), result.slice(lastIndex + 1));
}());

/*----------------------------------------------------------------------------*/

fs.writeFileSync(filePath, fs.readFileSync(filePath, 'utf8').replace(pattern, function(match) {
  var snippet = slice.call(arguments, -3, -1)[0];
  return match.replace(snippet, snippet.replace(reLine, ''));
}));
