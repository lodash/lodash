var convert = require('./convert'),
    func = convert('[object Object]', require('../[object Object]'), require('./_falseOptions'));

func.placeholder = require('./placeholder');
module.exports = func;
