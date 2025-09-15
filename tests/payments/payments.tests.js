/**
 * @fileoverview Test suite for the Payments module.
 * This file contains tests for all `payments` routes, including views, forms, and deletions.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy, assertAjax } = require('../test-helpers');

describe('Payments Module', () => {
  // Route: /payments/index
  test('it can view the payments index', async () => {
    await assertPageLoads(page, '/payments/index');
    await expect(page.locator('.content-title')).toContainText('Payments');
  });

  /**
   * @description Test creating a new payment.
   * @payload
   * {
   * "invoice_id": "$invoice_id",
   * "payment_date": "$payment_date",
   * "payment_amount": "$payment_amount",
   * "payment_method_id": "$payment_method_id",
   * "payment_note": "$payment_note"
   * }
   */
  // Route: /payments/form
  test('it can create a new payment', async () => {
    const createPaymentPayload = {
      "invoice_id": "6617",
      "payment_date": "2024-09-15",
      "payment_amount": "50.00",
      "payment_method_id": "108",
      "payment_note": "Test payment note."
    };
    await submitFormWithPayload(page, '/payments/form', 'payments', createPaymentPayload);
  });

  /**
   * @description Test editing an existing payment.
   * @payload
   * {
   * "payment_date": "$payment_date",
   * "payment_amount": "$payment_amount",
   * "payment_method_id": "$payment_method_id",
   * "payment_note": "$payment_note"
   * }
   */
  // Route: /payments/form/{id}
  test('it can edit an existing payment', async () => {
    const editPaymentPayload = {
      "payment_date": "2024-09-16",
      "payment_amount": "55.50",
      "payment_method_id": "108",
      "payment_note": "Edited payment note."
    };
    await submitFormWithPayload(page, '/payments/form/966', 'payments', editPaymentPayload);
  });

  // Route: /payments/delete/{id}
  test('it can delete a payment', async () => {
    await assertDestroy(page, '/payments/delete/966');
  });

  // Route: /payments/online_logs
  test('it can view the online payments log via AJAX', async () => {
    await assertAjax(page, '/payments/online_logs');
  });
});
