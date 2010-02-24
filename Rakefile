require 'rubygems'
require 'closure-compiler'

desc "Use the Closure Compiler to compress Underscore.js"
task :build do
  js  = File.open('underscore.js', 'r')
  min = Closure::Compiler.new.compile(js)
  File.open('underscore-min.js', 'w') {|f| f.write(min) }
end

