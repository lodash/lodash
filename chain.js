define(['./chain/chain', './chain/commit', './chain/lodash', './chain/plant', './chain/reverse', './chain/run', './chain/tap', './chain/thru', './chain/toJSON', './chain/toString', './chain/value', './chain/valueOf', './chain/wrapperChain'], function(chain, commit, lodash, plant, reverse, run, tap, thru, toJSON, toString, value, valueOf, wrapperChain) {
  return {
    'chain': chain,
    'commit': commit,
    'lodash': lodash,
    'plant': plant,
    'reverse': reverse,
    'run': run,
    'tap': tap,
    'thru': thru,
    'toJSON': toJSON,
    'toString': toString,
    'value': value,
    'valueOf': valueOf,
    'wrapperChain': wrapperChain
  };
});
