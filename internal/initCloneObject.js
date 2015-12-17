define(['./baseCreate', '../isFunction'], function(baseCreate, isFunction) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    var Ctor = object.constructor;
    return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
  }

  return initCloneObject;
});
