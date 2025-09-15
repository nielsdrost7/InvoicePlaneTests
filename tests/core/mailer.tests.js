const { page, expect } = require('jest-playwright-preset');
const { assertAjax } = require('../../test-helpers');

describe('Mailer Module', () => {

  // AJAX Routes
  test('it can mail an invoice by id', async () => {
    await assertAjax(page, '/mailer/invoice/6617');
  });

  test('it can mail a quote by id', async () => {
    await assertAjax(page, '/mailer/quote/2172');
  });
});
