//Source: https://github.com/nodejs/node/blob/f16f41c5b3cf2345abc7bd4d5e951a43479ce4a7/deps/undici/src/lib/core/util.js#L17

function isStream(obj) {
  return obj && typeof obj === 'object'
    && typeof obj.pipe === 'function'
    && typeof obj.on === 'function'
}

export default isStream
