;(function() {

  /** Used to determine if values are of the language type Object. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as the `WeakMap#toString` return value. */
  var nativeString = String(Object.prototype.toString).replace(/toString/g, 'WeakMap');

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Installs `WeakMap` on the given `context` object.
   *
   * @memberOf exports
   * @param {Object} context The context object.
   */
  function runInContext(context) {

    /**
     * Creates a `WeakMap` object.
     */
    function WeakMap() {
      // No operation performed.
    }

    /**
     * Gets the value associated with the given key.
     *
     * @memberOf WeakMap
     * @param {Object} key The key object.
     * @returns {*} Returns the associated value, else `undefined`.
     */
    function get(key) {
      return key.__weakmap__;
    }

    /**
     * Sets a value for the given key.
     *
     * @memberOf WeakMap
     * @param {Object} key The key object.
     * @param {*} value The value to set.
     */
    function set(key, value) {
      key.__weakmap__ = value;
      return this;
    }

    /**
     * Produces the `toString` result of `WeakMap`.
     *
     * @static
     * @memberOf WeakMap
     * @returns {string} Returns the string result.
     */
    function toString() {
      return nativeString;
    }

    WeakMap.toString = toString;
    WeakMap.prototype.get = get;
    WeakMap.prototype.set = set;

    if (!root.WeakMap) {
      context.WeakMap = WeakMap;
    }
  }

  /*--------------------------------------------------------------------------*/

  if (freeExports) {
    freeExports.runInContext = runInContext;
  } else {
    runInContext(root);
  }
}.call(this));
