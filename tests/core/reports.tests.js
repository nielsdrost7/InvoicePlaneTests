/**
 * @fileoverview Test suite for the Reports component of the Core module.
 * This file contains tests for all reports routes.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Reports Component', () => {
  // Route: /reports/invoice_aging
  test('it can view the invoice aging report', async () => {
    await assertPageLoads(page, '/reports/invoice_aging');
    await expect(page.locator('.content-title')).toContainText('Invoice Aging');
  });

  // Route: /reports/invoices_per_client
  test('it can view the invoices per client report', async () => {
    await assertPageLoads(page, '/reports/invoices_per_client');
    await expect(page.locator('.content-title')).toContainText('Invoices per Client');
  });

  // Route: /reports/payment_history
  test('it can view the payment history report', async () => {
    await assertPageLoads(page, '/reports/payment_history');
    await expect(page.locator('.content-title')).toContainText('Payment History');
  });

  // Route: /reports/sales_by_client
  test('it can view the sales by client report', async () => {
    await assertPageLoads(page, '/reports/sales_by_client');
    await expect(page.locator('.content-title')).toContainText('Sales by Client');
  });

  // Route: /reports/sales_by_year
  test('it can view the sales by year report', async () => {
    await assertPageLoads(page, '/reports/sales_by_year');
    await expect(page.locator('.content-title')).toContainText('Sales by Year');
  });
});
