module.exports = function pluck(objectsArray, key) {
  return objectsArray.filter((object) => object[key]).map((object) => object[key])
};

