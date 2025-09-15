const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, assertFormSubmit, assertDestroy } = require('../../test-helpers');

describe('User Clients Module', () => {

  // View Routes
  test('it can view user clients index', async () => {
    await assertPageLoads(page, '/user_clients/index');
  });

  // Form Routes
  test('it can create a new user client', async () => {
    await assertFormSubmit(page, '/user_clients/form', 'user_clients');
  });

  test('it can edit a user client by id', async () => {
    await assertFormSubmit(page, '/user_clients/form/1', 'user_clients');
  });

  // Destroy Routes
  test('it can delete a user client', async () => {
    await assertDestroy(page, '/user_clients/delete/1');
  });
});
