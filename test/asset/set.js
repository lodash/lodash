;(function() {

  /** Used to determine if values are of the language type Object. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as the `Set#toString` return value. */
  var nativeString = String(Object.prototype.toString).replace(/toString/g, 'Set');

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
   * Installs `Set` on the given `context` object.
   *
   * @memberOf exports
   * @param {Object} context The context object.
   */
  function runInContext(context) {

    /**
     * Creates a `Set` object.
     */
    function Set() {
      this.__cache__ = {};
    }

    /**
     * Gets the index at which the first occurrence of `value` is found using
     * strict equality for comparisons, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value or `-1`.
     */
    function indexOf(array, value) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Checks if `value` is in the set.
     *
     * @memberOf Set
     * @param {*} value The value to search for.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     */
    function has(value) {
      var type = typeof value,
          cache = this.__cache__;

      if (type == 'boolean' || value == null) {
        return cache[value] || false;
      }
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : '_' + value;
      cache = (cache = cache[type]) && cache[key];

      return type == 'object'
        ? (cache && indexOf(cache, value) > -1 ? true : false)
        : (cache || false);
    }

    /**
     * Adds `value` to the set.
     *
     * @memberOf Set
     * @param {*} value The value to add.
     */
    function add(value) {
      var cache = this.__cache__,
          type = typeof value;

      if (type == 'boolean' || value == null) {
        cache[value] = true;
      } else {
        if (type != 'number' && type != 'string') {
          type = 'object';
        }
        var key = type == 'number' ? value : '_' + value,
            typeCache = cache[type] || (cache[type] = {});

        if (type == 'object') {
          var array = typeCache[key];
          if (array) {
            array.push(value);
          } else {
            typeCache[key] = [value];
          }
        } else {
          typeCache[key] = true;
        }
      }
    }

    /**
     * Produces the `toString` result of `Set`.
     *
     * @static
     * @memberOf Set
     * @returns {string} Returns the string result.
     */
    function toString() {
      return nativeString;
    }

    Set.toString = toString;
    Set.prototype.add = add;
    Set.prototype.has = has;

    if (!root.Set) {
      context.Set = Set;
    }
  }

  /*--------------------------------------------------------------------------*/

  if (freeExports) {
    freeExports.runInContext = runInContext;
  } else {
    runInContext(root);
  }
}.call(this));
