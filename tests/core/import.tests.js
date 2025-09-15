const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit } = require('../../test-helpers');

describe('Import Module', () => {

  // View Routes
  test('it can view import page', async () => {
    await assertPageLoads(page, '/import');
  });

  // Form Routes
  test('it can view the import form', async () => {
    await assertFormSubmit(page, '/import/form', 'core');
  });
});
