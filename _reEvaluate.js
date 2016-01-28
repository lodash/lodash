define([], function() {

  /** Used to match template delimiters. */
  var reEvaluate = /<%([\s\S]+?)%>/g;

  return reEvaluate;
});
