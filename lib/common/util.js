'use strict';

var _ = require('lodash');

/*----------------------------------------------------------------------------*/

/**
 * Creates a hash object. If a `properties` object is provided, its own
 * enumerable properties are assigned to the created object.
 *
 * @memberOf util
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new hash object.
 */
function Hash(properties) {
  return _.transform(properties, function(result, value, key) {
    result[key] = (_.isPlainObject(value) && !(value instanceof Hash))
      ? new Hash(value)
      : value;
  }, this);
}

Hash.prototype = Object.create(null);

module.exports = {
  'Hash': Hash
};
