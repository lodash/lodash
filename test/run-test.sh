cd "$(dirname "$0")"

for cmd in rhino "rhino -require" ringo phantomjs; do
  echo "Testing in $cmd..."
  $cmd test.js ../dist/lodash.compat.js && $cmd test.js ../dist/lodash.compat.min.js
  echo ""
done

echo "Testing in node..."
node test.js ../dist/lodash.js && node test.js ../dist/lodash.min.js

echo ""
echo "Testing in a browser..."
open index.html
