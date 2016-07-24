define(['./_getNative'], function(getNative) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /* Used to set `toString` methods. */
  var defineProperty = (function() {
    var func = getNative(Object, 'defineProperty'),
        name = getNative.name;

    return (name && name.length > 2) ? func : undefined;
  }());

  return defineProperty;
});
