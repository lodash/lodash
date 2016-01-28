define(['./_arraySome', './_baseIteratee', './_baseSome', './isArray', './_isIterateeCall'], function(arraySome, baseIteratee, baseSome, isArray, isIterateeCall) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Checks if `predicate` returns truthy for **any** element of `collection`.
   * Iteration is stopped once `predicate` returns truthy. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
   * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // using the `_.matches` iteratee shorthand
   * _.some(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // using the `_.matchesProperty` iteratee shorthand
   * _.some(users, ['active', false]);
   * // => true
   *
   * // using the `_.property` iteratee shorthand
   * _.some(users, 'active');
   * // => true
   */
  function some(collection, predicate, guard) {
    var func = isArray(collection) ? arraySome : baseSome;
    if (guard && isIterateeCall(collection, predicate, guard)) {
      predicate = undefined;
    }
    return func(collection, baseIteratee(predicate, 3));
  }

  return some;
});
