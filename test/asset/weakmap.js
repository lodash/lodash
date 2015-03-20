;(function() {

  /** Used to determine if values are of the language type Object. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as the `WeakMap#toString` return value. */
  var nativeString = String(Object.prototype.toString).replace(/toString/g, 'WeakMap');

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

  /** Detect free variable `self`. */
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it is the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

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
