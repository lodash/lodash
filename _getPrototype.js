define(['./_overArg'], function(overArg) {

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  return getPrototype;
});
