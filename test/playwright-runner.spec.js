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

test('build param is not injected as markup', async ({ page }) => {
  const payload = 'x"></script><script>window.injected = true</script>';
  await page.goto('http://localhost:9001/test/index.html?build=' + encodeURIComponent(payload), { waitUntil: 'domcontentloaded' });
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
});

test('loader param is not injected as markup', async ({ page }) => {
  const payload = 'x"></script><script>window.injected = true</script>';
  await page.goto('http://localhost:9001/test/index.html?loader=' + encodeURIComponent(payload), { waitUntil: 'domcontentloaded' });
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
});
