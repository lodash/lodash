cd "$(dirname "$0")"
for cmd in rhino ringo narwhal; do
  echo ""
  echo "Testing in $cmd..."
  $cmd test.js ../dist/lodash.compat.js && $cmd test.js ../dist/lodash.compat.min.js
done

echo ""
echo "Testing in node..."
node test.js ../dist/lodash.js && node test.js ../dist/lodash.min.js

echo "Testing build..."
node test-build.js

echo ""
echo "Testing in a browser..."
open index.html
