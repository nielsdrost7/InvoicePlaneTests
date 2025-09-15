/**
 * @fileoverview Test suite for the Quotes module.
 * This file contains tests for all `quotes` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy, assertAjax } = require('../test-helpers');

describe('Quotes Module', () => {
  // Routes: /quotes/index
  test('it can view the quotes index', async () => {
    await assertPageLoads(page, '/quotes/index');
    await expect(page.locator('.content-title')).toContainText('Quotes');
  });

  // Route: /quotes/view/{id}
  test('it can view a specific quote', async () => {
    await assertPageLoads(page, '/quotes/view/2172');
    await expect(page.locator('.content-title')).toContainText('Quote');
  });

  /**
   * @description Test creating a new quote from a form.
   * @payload
   * {
   * "client_id": "$create_quote_client_id",
   * "quote_date_created": "2024-09-15",
   * "invoice_group_id": "$invoice_group_id",
   * "quote_password": "$quote_password"
   * }
   */
  // Route: /quotes/form
  test('it can create a new quote', async () => {
    const createQuotePayload = {
      "client_id": "956",
      "quote_date_created": "2024-09-15",
      "invoice_group_id": "40",
      "quote_password": "demopassword"
    };
    await submitFormWithPayload(page, '/quotes/form', 'quotes', createQuotePayload);
  });

  /**
   * @description Test editing an existing quote.
   * @payload
   * {
   * "quote_id": "$quote_id",
   * "quote_number": "$quote_number",
   * "quote_date_created": "$quote_date_created",
   * "quote_date_expires": "$quote_date_expires",
   * "quote_status_id": "$quote_status_id",
   * "quote_password": "$quote_password",
   * "items": "JSON.stringify(items)",
   * "quote_discount_amount": "$quote_discount_amount",
   * "quote_discount_percent": "$quote_discount_percent",
   * "notes": "$notes",
   * "custom": "$('input[name^=custom]')"
   * }
   */
  // Route: /quotes/form/{id}
  test('it can edit an existing quote', async () => {
    const editQuotePayload = {
      "quote_id": "2172",
      "quote_number": "EDITED-Q-123",
      "quote_date_created": "2024-09-15",
      "quote_date_expires": "2024-10-15",
      "quote_status_id": "2",
      "quote_password": "editedpassword",
      "items": "JSON.stringify(items)",
      "quote_discount_amount": "10.00",
      "quote_discount_percent": "5",
      "notes": "Edited test notes.",
      "custom": "test custom field"
    };
    await submitFormWithPayload(page, '/quotes/form/2172', 'quotes', editQuotePayload);
  });

  // Route: /quotes/delete/{id}
  test('it can delete a quote', async () => {
    await assertDestroy(page, '/quotes/delete/2172');
  });

  // Route: /quotes/cancel/{id}
  test('it can cancel a quote', async () => {
    await assertDestroy(page, '/quotes/cancel/2172');
  });

  // Route: /quotes/ajax/generate_pdf/{id}
  test('it can generate a quote PDF via AJAX', async () => {
    await assertAjax(page, '/quotes/ajax/generate_pdf/2172');
  });
});
