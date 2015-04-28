cd "$(dirname "$0")"

echo "Testing in node..."
node test.js ../lodash.src.js

for cmd in rhino "rhino -require" ringo phantomjs; do
  echo ""
  echo "Testing in $cmd..."
  $cmd test.js ../lodash.src.js
done

echo ""
echo "Testing in a browser..."
open index.html
