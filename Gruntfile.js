module.exports = function(grunt) {

  grunt.initConfig({
    'shell': {
      'options': {
        'stdout': true,
        'stderr': true,
        'failOnError': true,
        'execOptions': {
          'cwd': 'test'
        }
      },
      'cover': {
        'command': 'istanbul cover --report "html" --verbose --dir "coverage" "test.js"'
      },
      'test-rhino': {
        'command': 'echo "Testing in Rhino..."; rhino -opt -1 "test.js" "../dist/lodash.compat.js"; rhino -opt -1 "test.js" "../dist/lodash.compat.min.js"'
      },
      'test-rhino-require': {
        'command': 'echo "Testing in Rhino with -require..."; rhino -opt -1 -require "test.js" "../dist/lodash.compat.js"; rhino -opt -1 -require "test.js" "../dist/lodash.compat.min.js";'
      },
      'test-ringo': {
        'command': 'echo "Testing in Ringo..."; ringo -o -1 "test.js" "../dist/lodash.compat.js"; ringo -o -1 "test.js" "../dist/lodash.compat.min.js"'
      },
      'test-phantomjs': {
        'command': 'echo "Testing in PhantomJS..."; phantomjs "test.js" "../dist/lodash.compat.js"; phantomjs "test.js" "../dist/lodash.compat.min.js"'
      },
      'test-narwhal': {
        'command': 'echo "Testing in Narwhal..."; export NARWHAL_OPTIMIZATION=-1; narwhal "test.js" "../dist/lodash.compat.js"; narwhal "test.js" "../dist/lodash.compat.min.js"'
      },
      'test-node': {
        'command': 'echo "Testing in Node..."; node "test.js" "../dist/lodash.compat.js"; node "test.js" "../dist/lodash.compat.min.js"'
      },
      'test-node-build': {
        'command': 'echo "Testing build..."; node "test-build.js"'
      },
      'test-browser': {
        'command': 'echo "Testing in a browser..."; open "index.html"'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('cover', 'shell:cover');
  grunt.registerTask('test', [
    'shell:test-rhino',
    //'shell:test-rhino-require',
    'shell:test-ringo',
    'shell:test-phantomjs',
    'shell:test-narwhal',
    'shell:test-node',
    'shell:test-node-build',
    'shell:test-browser'
  ]);

  grunt.registerTask('default', [
    'shell:test-node',
    'shell:test-node-build',
    'cover'
  ]);

};
