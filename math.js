define(['./math/add', './math/ceil', './math/floor', './math/max', './math/min', './math/round', './math/sum'], function(add, ceil, floor, max, min, round, sum) {
  return {
    'add': add,
    'ceil': ceil,
    'floor': floor,
    'max': max,
    'min': min,
    'round': round,
    'sum': sum
  };
});
