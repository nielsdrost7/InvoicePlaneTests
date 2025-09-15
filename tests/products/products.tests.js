/**
 * @fileoverview Test suite for the Products module.
 * This file contains tests for all `products` routes.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../../test-helpers');

describe('Products Module', () => {
  // Routes: /products/index
  test('it can view the products index', async () => {
    await assertPageLoads(page, '/products/index');
    await expect(page.locator('.content-title')).toContainText('Products');
  });

  /**
   * @description Test creating a new product.
   * @payload
   * {
   * "product_sku": "$product_sku",
   * "product_name": "$product_name",
   * "product_description": "$product_description",
   * "product_price": "$product_price",
   * "tax_rate_id": "$tax_rate_id",
   * "family_id": "$family_id",
   * "unit_id": "$unit_id"
   * }
   */
  // Route: /products/form
  test('it can create a new product', async () => {
    const createProductPayload = {
      "product_sku": "123-ABC",
      "product_name": "Test Product",
      "product_description": "A test product.",
      "product_price": "100.00",
      "tax_rate_id": "131",
      "family_id": "55",
      "unit_id": "59"
    };
    await submitFormWithPayload(page, '/products/form', 'products', createProductPayload);
  });

  /**
   * @description Test editing an existing product.
   * @payload
   * {
   * "product_sku": "$product_sku",
   * "product_name": "$product_name",
   * "product_description": "$product_description",
   * "product_price": "$product_price",
   * "tax_rate_id": "$tax_rate_id",
   * "family_id": "$family_id",
   * "unit_id": "$unit_id"
   * }
   */
  // Route: /products/form/{id}
  test('it can edit an existing product', async () => {
    const editProductPayload = {
      "product_sku": "123-DEF",
      "product_name": "Edited Product",
      "product_description": "An edited test product.",
      "product_price": "120.00",
      "tax_rate_id": "131",
      "family_id": "55",
      "unit_id": "59"
    };
    await submitFormWithPayload(page, '/products/form/216', 'products', editProductPayload);
  });

  // Route: /products/delete/{id}
  test('it can delete a product', async () => {
    await assertDestroy(page, '/products/delete/216');
  });
});
