var _ = require(__dirname);

function jQuery () {
  return {
    on: function (ev, cb) {
      cb()
    }
  }
}

jQuery.each = function (items, f) {
  items.forEach(f)
}

module.exports = {
  globals: {
    '_': _,

    asyncSave: _.noop,
    addContactToList: _.noop,
    calculateLayout: _.noop,
    createApplication: _.noop,
    updatePosition: _.noop,
    sendMail: _.noop,
    renewToken: _.noop,
    batchLog: _.noop,

    setImmediate: setImmediate,
    Buffer: Buffer,
    EventSource: function () {},

    fs: {writeFileSync: _.noop},
    path: {join: _.noop},

    cwd: __dirname,
    mainText: '',
    data: {user: 'mock'},

    document: {
      body: {
        childNodes: [],
        nodeName: 'body'
      }
    },

    jQuery: jQuery,

    element: {},
    window: {}
  },

  babel: false
}
