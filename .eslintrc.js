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

    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],

    'keyword-spacing': ['error'],

    // ECMAScript 6 rules

    'arrow-body-style': ['error', 'as-needed', {
      'requireReturnForObjectLiteral': false
    }],

    'arrow-parens': ['error', 'as-needed', {
      'requireForBlockBody': true
    }],

    'arrow-spacing': ['error', {
      'before': true,
      'after': true
    }],

    'no-class-assign': ['error'],

    'no-const-assign': ['error'],

    'no-dupe-class-members': ['error'],

    'no-duplicate-imports': ['error'],

    'no-new-symbol': ['error'],

    'no-useless-rename': ['error'],

    'no-var': ['error'],

    'object-shorthand': ['error', 'always', {
      'ignoreConstructors': false,
      'avoidQuotes': true
    }],

    'prefer-arrow-callback': ['error', {
      'allowNamedFunctions': false,
      'allowUnboundThis': true
    }],

    'prefer-const': ['error'],

    'prefer-rest-params': ['error'],

    'prefer-template': ['error'],

    'template-curly-spacing': ['error', 'always']
  }
};
