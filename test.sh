#!/bin/bash
set -e

case "$1" in
  base)
    npm test
    ;;
  new)
    npm test
    ;;
  *)
    echo "Usage: ./test.sh {base|new}"
    exit 1
    ;;
esac
