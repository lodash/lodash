define(['./_getNative', './_root'], function(getNative, root) {

  /* Built-in method references that are verified to be native. */
  var Promise = getNative(root, 'Promise');

  return Promise;
});
