const { devices } = require('@playwright/test');

module.exports = {
    retries: 0,
    testDir: './test',
    testMatch: '**/*.spec.js',
    use: {
        baseURL: 'http://localhost:9001',
        headless: true,
    },
    projects: [
        { name: 'Chromium', use: { browserName: 'chromium' } },
        { name: 'Firefox', use: { browserName: 'firefox' } },
        { name: 'WebKit', use: { browserName: 'webkit' } },
        {
            name: 'Microsoft Edge',
            use: { browserName: 'chromium', channel: 'msedge' },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'], browserName: 'webkit' },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'], browserName: 'chromium' },
        },
    ],
};