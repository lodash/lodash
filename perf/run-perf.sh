cd "$(dirname "$0")"

echo "Running performance suite in node..."
node perf.js ../lodash.js && node perf.js ../lodash.min.js

for cmd in rhino "rhino -require" narwhal ringo phantomjs; do
  echo ""
  echo "Running performance suite in $cmd..."
  $cmd perf.js ../lodash.src.js
done

echo ""
echo "Running performance suite in a browser..."
open index.html
