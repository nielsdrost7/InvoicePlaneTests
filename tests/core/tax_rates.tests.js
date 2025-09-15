const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Tax Rates Module', () => {

  // View Routes
  test('it can view tax rates index', async () => {
    await assertPageLoads(page, '/tax_rates/index');
  });

  // Form Routes
  test('it can create a new tax rate', async () => {
    await assertFormSubmit(page, '/tax_rates/form', 'core');
  });

  test('it can edit an existing tax rate by id', async () => {
    await assertFormSubmit(page, '/tax_rates/form/131', 'core');
  });

  // Destroy Routes
  test('it can delete a tax rate', async () => {
    await assertDestroy(page, '/tax_rates/delete/1');
  });
});
