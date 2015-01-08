define(['./chain/chain', './chain/lodash', './chain/reverse', './chain/tap', './chain/thru', './chain/toJSON', './chain/toString', './chain/value', './chain/valueOf', './chain/wrapperChain'], function(chain, lodash, reverse, tap, thru, toJSON, toString, value, valueOf, wrapperChain) {
  return {
    'chain': chain,
    'lodash': lodash,
    'reverse': reverse,
    'tap': tap,
    'thru': thru,
    'toJSON': toJSON,
    'toString': toString,
    'value': value,
    'valueOf': valueOf,
    'wrapperChain': wrapperChain
  };
});
