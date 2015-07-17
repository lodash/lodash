cd "$(dirname "$0")"

echo "Testing in node..."
node test.js ../lodash.js

for cmd in rhino "rhino -require" ringo phantomjs; do
  echo ""
  echo "Testing in $cmd..."
  $cmd test.js ../lodash.js
done

echo ""
echo "Testing in a browser..."
open index.html
