define(['./_getNative'], function(getNative) {

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  return nativeCreate;
});
