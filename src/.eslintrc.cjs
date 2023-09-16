'use strict';

const path = require('node:path');

module.exports = {
    overrides: [
        {
            files: ['**/*.{ts}'],
            rules: {
                'import/no-extraneous-dependencies': [
                    'error',
                    // Use package.json from both this package folder and root.
                    { packageDir: [__dirname, path.join(__dirname, '../')] },
                ],
            },
        },
    ],
};
