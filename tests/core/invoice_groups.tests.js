const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('Invoice Groups Module', () => {

  // View Routes
  test('it can view invoice groups index', async () => {
    await assertPageLoads(page, '/invoice_groups/index');
  });

  // Form Routes
  test('it can create a new invoice group', async () => {
    await assertFormSubmit(page, '/invoice_groups/form', 'invoices');
  });

  test('it can edit an existing invoice group by id', async () => {
    await assertFormSubmit(page, '/invoice_groups/form/40', 'invoices');
  });

  // Destroy Routes
  test('it can delete an invoice group', async () => {
    await assertDestroy(page, '/invoice_groups/delete/1');
  });
});
