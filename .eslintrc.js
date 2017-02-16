module.exports = {
  'extends': ['plugin:import/errors'],
  'plugins': ['import'],
  'env': {
    'es6': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'impliedStrict': true,
      'objectLiteralDuplicateProperties': false
    }
  },
  'rules': {
    'comma-dangle': ['error', 'never'],

    'indent': ['error', 2, {
      'SwitchCase': 1
    }],

    'max-len': ['error', {
      'code': 180,
      'ignoreComments': true,
      'ignoreRegExpLiterals': true
    }],

    'no-const-assign': 'error',

    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }]
  }
};
