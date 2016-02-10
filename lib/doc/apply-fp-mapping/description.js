var _ = require('lodash'),
    j = require('jscodeshift'),
    Entry = require('docdown/lib/entry'),
    common = require('./common');

var baseGetDesc = Entry.prototype.getDesc;

var lineBreaksRegex = /<br\/?>\n?$/g;

/**
 * Return the `description` of the entry, only without the possible note about mutation.
 *
 * @returns {Function} Updated description.
 */
function getReorderedExample() {
  var lines = baseGetDesc.call(this).split('\n');

  var indexOfLine = _.findIndex(lines, function(line) {
    return _.includes(line, 'mutate');
  });

  if (indexOfLine === -1) {
    return lines.join('\n');
  }

  var linesToDelete = 1;
  while (indexOfLine + linesToDelete < lines.length &&
         !lines[indexOfLine + linesToDelete].startsWith('<br')) {
    linesToDelete++;
  }
  lines.splice(indexOfLine, linesToDelete);

  while (_.last(lines).startsWith('<br')) {
    lines = _.initial(lines);
  }
  return lines.join('\n');
}

module.exports = getReorderedExample;
