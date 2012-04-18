cd "$(dirname "$0")"
for cmd in rhino ringo narwhal node; do
	echo "Testing in $cmd..."
	$cmd test.js
done
echo "Testing in a browser..."
open index.html