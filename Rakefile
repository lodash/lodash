require 'rubygems'
require 'closure-compiler'
  
desc "Use the Closure Compiler to compress Underscore.js"
task :build do
  js  = File.open('underscore.js', 'r')
  min = Closure::Compiler.new.compile(js)
  File.open('underscore-min.js', 'w') {|f| f.write(min) }
end

task :build_advanced do
  js  = File.read('underscore.js')
  # remove wrapping anonymous function as this messes with closure compiler
  # see
  # http://groups.google.com/group/closure-compiler-discuss/browse_thread/thread/b59b54c1a0073aa5
  js.sub!('(function() {', '').chomp!("})();\n")
  compiler = Closure::Compiler.new \
    :compilation_level => 'ADVANCED_OPTIMIZATIONS', 
    :formatting => 'PRETTY_PRINT'
  min = compiler.compile(js)
  File.open('underscore-min2.js', 'w') {|f| f.write(min) }
  #
  original_size = js.length
  minimized_size = min.length
  puts original_size, minimized_size
end

