/** Detect free variable `global` from Node.js. */
const freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

export default freeGlobal;
