const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Guest Module', () => {

  // View Routes
  test('it can view guest client profile by id', async () => {
    await assertPageLoads(page, '/guest/view/837');
  });

  test('it can view guest invoice by id', async () => {
    await assertPageLoads(page, '/guest/invoice/6617');
  });

  test('it can view guest quote by id', async () => {
    await assertPageLoads(page, '/guest/quote/2172');
  });
});
