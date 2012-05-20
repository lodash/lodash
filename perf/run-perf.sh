cd "$(dirname "$0")"
for cmd in rhino ringo narwhal node; do
	echo ""
	echo "Running performance suite in $cmd..."
	$cmd perf.js
done
echo ""
echo "Running performance suite in a browser..."
open index.html