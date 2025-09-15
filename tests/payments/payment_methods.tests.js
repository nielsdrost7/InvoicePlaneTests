/**
 * @fileoverview Test suite for the Payment Methods module.
 * This file contains tests for all `payment_methods` routes, including views, forms, and deletions.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../test-helpers');

describe('Payment Methods Module', () => {
  // Route: /payment_methods/index
  test('it can view the payment methods index', async () => {
    await assertPageLoads(page, '/payment_methods/index');
    await expect(page.locator('.content-title')).toContainText('Payment Methods');
  });

  /**
   * @description Test creating a new payment method.
   * @payload
   * {
   * "payment_method_name": "$payment_method_name"
   * }
   */
  // Route: /payment_methods/form
  test('it can create a new payment method', async () => {
    const createMethodPayload = {
      "payment_method_name": "Test Payment Method"
    };
    await submitFormWithPayload(page, '/payment_methods/form', 'payment_methods', createMethodPayload);
  });

  /**
   * @description Test editing an existing payment method.
   * @payload
   * {
   * "payment_method_name": "$payment_method_name"
   * }
   */
  // Route: /payment_methods/form/{id}
  test('it can edit an existing payment method', async () => {
    const editMethodPayload = {
      "payment_method_name": "Edited Payment Method"
    };
    await submitFormWithPayload(page, '/payment_methods/form/108', 'payment_methods', editMethodPayload);
  });

  // Route: /payment_methods/delete/{id}
  test('it can delete a payment method', async () => {
    await assertDestroy(page, '/payment_methods/delete/108');
  });
});
