/**
 * Secure template implementation for lodash
 * This patch enhances the security of the template function while maintaining compatibility
 */

var templateSettings = {
  evaluate: /<%([^=][\s\S]*?)%>/g,
  interpolate: /<%=([^-][\s\S]*?)%>/g,
  escape: /<%-([\s\S]*?)%>/g
};

/**
 * Sanitizes template code by removing access to dangerous globals
 * @private
 * @param {string} code - The code to sanitize
 * @returns {string} Sanitized code
 */
function sanitizeCode(code) {
  var blacklist = [
    'process',
    'global',
    'require',
    'module',
    '__dirname',
    '__filename',
    'Buffer'
  ];
  
  return blacklist.reduce(function(sanitized, term) {
    return sanitized.replace(new RegExp('\\b' + term + '\\b', 'g'), '');
  }, code);
}

/**
 * Creates a template function that can be called with data to produce a string
 * @param {string} string - The template string
 * @param {Object} [options={}] - The template options
 * @param {RegExp} [options.escape] - The HTML "escape" delimiter
 * @param {RegExp} [options.evaluate] - The "evaluate" delimiter
 * @param {RegExp} [options.interpolate] - The "interpolate" delimiter
 * @param {Object} [options.sandbox={}] - Sandbox object for allowed globals
 * @returns {Function} Returns the template function
 */
function template(string, options) {
  var settings = Object.assign({}, templateSettings, options);
  var sandbox = (options && options.sandbox) || {};

  // Convert template to valid JavaScript string
  var source = JSON.stringify(string);

  // Replace delimiters with secure implementations
  source = source
    .replace(settings.escape || templateSettings.escape, function(match, code) {
      return '" + _.escape(' + sanitizeCode(code) + ') + "';
    })
    .replace(settings.interpolate || templateSettings.interpolate, function(match, code) {
      return '" + (' + sanitizeCode(code) + ') + "';
    })
    .replace(settings.evaluate || templateSettings.evaluate, function(match, code) {
      return '"; ' + sanitizeCode(code) + ' __p += "';
    });

  // Set up function body with secure context
  source = 'var __p = "";' +
    'with (Object.create(null)) {' +
    'with (sandbox) {' +
    'with (obj || {}) {' +
    source +
    '}}}' +
    'return __p;';

  try {
    var render = new Function('obj', 'sandbox', '_', source);
    
    var template = function(data) {
      try {
        return render.call(undefined, data, sandbox, _);
      } catch (e) {
        e.source = source;
        throw e;
      }
    };

    // Provide the compiled source as a convenience for precompilation
    template.source = 'function(obj) {\n' + source + '\n}';
    
    return template;
  } catch (e) {
    e.source = source;
    throw e;
  }
}

// Export the secure template implementation
module.exports = template;
