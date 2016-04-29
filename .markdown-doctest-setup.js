function noop () {}

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
    '_': require(__dirname),

    asyncSave: noop,
    addContactToList: noop,
    calculateLayout: noop,
    createApplication: noop,
    updatePosition: noop,
    sendMail: noop,
    renewToken: noop,
    batchLog: noop,

    setImmediate: setImmediate,
    Buffer: Buffer,
    EventSource: function () {},

    fs: {writeFileSync: noop},
    path: {join: noop},

    cwd: __dirname,
    mainText: '',
    data: {user: 'Quinoa'},

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
