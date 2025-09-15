/**
 * @fileoverview Test suite for the Custom Fields component of the Core module.
 * This file contains tests for all custom fields and values routes.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads } = require('../../test-helpers');

describe('Custom Fields Component', () => {
  // Routes: /custom_fields, /custom_fields/index
  test('it can view the custom fields index page', async () => {
    await assertPageLoads(page, '/custom_fields/index');
    await expect(page.locator('.content-title')).toContainText('Custom Fields');
  });

  // Route: /custom_values
  test('it can view the custom values page', async () => {
    await assertPageLoads(page, '/custom_values');
    await expect(page.locator('.content-title')).toContainText('Custom Values');
  });
});
