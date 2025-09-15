const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Settings Module', () => {

  // View Routes
  test('it can view system settings', async () => {
    await assertPageLoads(page, '/settings');
  });
});
