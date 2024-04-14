'use strict';

const path = require('node:path');

module.exports = {
    globals: {
        describe: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        xdescribe: 'readonly',
        xit: 'readonly'
    },
    overrides: [
        {
            files: ['**/*.{ts}'],
            rules: {
                'import/no-unresolved': 'off',
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
};
