const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

test('index', async ({ page }) => {
  await page.goto('http://localhost:9001/test/index.html');
  await expect(page.locator('text=0 failed')).toBeVisible({ timeout: 60000 });
});

test('fp', async ({ page }) => {
  await page.goto('http://localhost:9001/test/fp.html');
  await expect(page.locator('text=0 failed')).toBeVisible({ timeout: 60000 });
});

test('backbone', async ({ page }) => {
  await page.goto('http://localhost:9001/test/backbone.html');
  await expect(page.locator('text=0 failed')).toBeVisible({ timeout: 60000 });
});

test('underscore', async ({ page }) => {
  await page.goto('http://localhost:9001/test/underscore.html');
  await expect(page.locator('text=0 failed')).toBeVisible({ timeout: 60000 });
});
