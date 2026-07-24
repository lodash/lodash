const { devices } = require('@playwright/test');

module.exports = {
    // Each spec waits up to 60s for the in-page test suite to report "0 failed",
    // so the per-test timeout must exceed that or the test is killed mid-wait.
    timeout: 120000,
    retries: process.env.CI ? 2 : 0,
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