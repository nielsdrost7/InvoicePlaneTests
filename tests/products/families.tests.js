/**
 * @fileoverview Test suite for the Families component of the Products module.
 * This file contains tests for all `families` routes.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../../test-helpers');

describe('Families Component', () => {
  // Routes: /families/index
  test('it can view the product families index', async () => {
    await assertPageLoads(page, '/families/index');
    await expect(page.locator('.content-title')).toContainText('Families');
  });

  /**
   * @description Test creating a new product family.
   * @payload
   * {
   * "family_name": "$family_name"
   * }
   */
  // Route: /families/form
  test('it can create a new product family', async () => {
    const createFamilyPayload = {
      "family_name": "Test Family"
    };
    await submitFormWithPayload(page, '/families/form', 'families', createFamilyPayload);
  });

  /**
   * @description Test editing an existing product family.
   * @payload
   * {
   * "family_name": "$family_name"
   * }
   */
  // Route: /families/form/{id}
  test('it can edit an existing product family', async () => {
    const editFamilyPayload = {
      "family_name": "Edited Family"
    };
    await submitFormWithPayload(page, '/families/form/55', 'families', editFamilyPayload);
  });

  // Route: /families/delete/{id}
  test('it can delete a product family', async () => {
    await assertDestroy(page, '/families/delete/55');
  });
});
