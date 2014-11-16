;(function() {

  /** Used to determine if values are of the language type Object. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as the `Set#toString` return value. */
  var nativeString = String(Object.prototype.toString).replace(/toString/g, 'Set');

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
