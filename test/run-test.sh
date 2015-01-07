cd "$(dirname "$0")"

for cmd in rhino "rhino -require" ringo phantomjs; do
  echo "Testing in $cmd..."
  $cmd test.js ../lodash.compat.js && $cmd test.js ../lodash.compat.min.js
  echo ""
done

echo "Testing in node..."
node test.js ../lodash.js && node test.js ../lodash.min.js

echo ""
echo "Testing in a browser..."
open index.html
