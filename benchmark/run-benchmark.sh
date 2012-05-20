cd "$(dirname "$0")"
for cmd in rhino ringo narwhal node; do
	echo "Benchmarking in $cmd..."
	$cmd benchmark.js
done
echo "Benchmarking in a browser..."
open index.html