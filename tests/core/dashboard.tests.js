const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Dashboard Module', () => {

  // View Routes
  test('it can view the dashboard', async () => {
    await assertPageLoads(page, '/dashboard');
    await expect(page.locator('.content-title')).toContainText('Dashboard');
  });
});
