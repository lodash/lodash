import overArg from './_overArg.js';

/** Built-in value references. */
const getPrototype = overArg(Object.getPrototypeOf, Object);

export default getPrototype;
