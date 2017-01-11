import freeGlobal from './freeGlobal.js';

/** Detect free variable `exports`. */
const freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
const freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
const freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
const nodeUtil = ((() => {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
})());

export default nodeUtil;
