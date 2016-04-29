var _ = require('./lodash.js');

function mockQuery() {
  return {
    'on': function(eventName, callback) {
      callback();
    }
  };
}

mockQuery.each = _.each;

module.exports = {
  'babel': false,
  'globals': {
    '_': _,

    // Example mocks.
    'asyncSave': _.noop,
    'addContactToList': _.noop,
    'batchLog': _.noop,
    'calculateLayout': _.noop,
    'createApplication': _.noop,
    'data': { 'user': 'mock'},
    'mainText': '',
    'renewToken': _.noop,
    'sendMail': _.noop,
    'updatePosition': _.noop,

    // DOM mocks.
    'document': { 'body': { 'childNodes': [], 'nodeName': 'BODY' } },
    'element': {},
    'EventSource': _.noop,
    'jQuery': mockQuery,
    'window': {},

    // Node.js mocks.
    'Buffer': Buffer,
    'fs': { 'writeFileSync': _.noop },
    'path': require('path'),
    'process': process,
    'setImmediate': setImmediate
  }
}
