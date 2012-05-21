cd "$(dirname "$0")"
for cmd in node narwhal ringo rhino; do
	echo ""
	echo "Running performance suite in $cmd..."
	$cmd perf.js
done
echo ""
echo "Running performance suite in a browser..."
open index.html