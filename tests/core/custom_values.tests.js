/**
 * @fileoverview Test suite for the Core module.
 * This file contains tests for routes related to custom values.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy, assertAjax } = require('../../test-helpers');

describe('Custom Values Module', () => {

  // View Routes
  test('it can view custom values index', async () => {
    await assertPageLoads(page, '/custom_values');
  });

  // Form Routes
  test('it can create a new custom value', async () => {
    await assertFormSubmit(page, '/custom_values/create/', 'core');
  });

  test('it can create a new custom value for field by id', async () => {
    await assertFormSubmit(page, '/custom_values/create/171', 'core');
  });

  // Destroy Routes
  test('it can delete a custom value', async () => {
    await assertDestroy(page, '/custom_values/delete/1');
  });

  // AJAX Routes
  test('it can get custom values field without id', async () => {
    await assertAjax(page, '/custom_values/field/');
  });

  test('it can get custom values field by id', async () => {
    await assertAjax(page, '/custom_values/field/171');
  });
});
