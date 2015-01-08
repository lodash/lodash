define(['../lang/isNative', './root'], function(isNative, root) {

  /** Native method references. */
  var WeakMap = isNative(WeakMap = root.WeakMap) && WeakMap;

  /** Used to store function metadata. */
  var metaMap = WeakMap && new WeakMap;

  return metaMap;
});
