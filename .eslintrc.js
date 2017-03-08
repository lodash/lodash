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
    'array-bracket-spacing': ['error', 'never'],

    'comma-dangle': ['error', 'never'],

    'camelcase': ['error', {
      'properties': 'never'
    }],

    'eol-last': ['error'],

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

    'curly': ['error', 'all'],

    'no-else-return': ['error'],

    'no-mixed-spaces-and-tabs': ['error'],

    'no-multiple-empty-lines': ['error'],

    'no-trailing-spaces': ['error'],

    'no-spaced-func': ['error'],

    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none'
    }],

    'space-unary-ops': ['error', {
      'nonwords': false,
      'overrides': {}
    }],

    'space-before-function-paren': ['error', 'never'],

    'space-before-blocks': ['error', 'always'],

    'space-in-parens': ['error', 'never'],

    // 'valid-jsdoc': ['error'],

    // ECMAScript 6 rules

    'arrow-body-style': ['error', 'as-needed', {
      'requireReturnForObjectLiteral': false
    }],

    'arrow-parens': ['error', 'always'],

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
