/**
 * @fileoverview Test suite for the Users component of the Core module.
 * This file contains tests for the users and sessions routes.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../../test-helpers');

describe('Users Component', () => {
  // Routes: /users, /users/index
  test('it can view the users index', async () => {
    await assertPageLoads(page, '/users/index');
    await expect(page.locator('.content-title')).toContainText('Users');
  });

  // Route: /sessions/index
  test('it can view the user sessions index', async () => {
    await assertPageLoads(page, '/sessions/index');
    await expect(page.locator('.content-title')).toContainText('User Sessions');
  });

  /**
   * @description Test creating a new user.
   * @payload
   * {
   * "user_email": "$user_email",
   * "user_name": "$user_name",
   * "user_password": "$user_password",
   * "user_password_verify": "$user_password_verify"
   * }
   */
  // Route: /users/form
  test('it can create a new user', async () => {
    const createUserPayload = {
      "user_email": "newuser@example.com",
      "user_name": "New User",
      "user_password": "password",
      "user_password_verify": "password"
    };
    await submitFormWithPayload(page, '/users/form', 'users', createUserPayload);
  });

  /**
   * @description Test editing an existing user.
   * @payload
   * {
   * "user_email": "$user_email",
   * "user_name": "$user_name"
   * }
   */
  // Route: /users/form/{id}
  test('it can edit an existing user', async () => {
    const editUserPayload = {
      "user_email": "editeduser@example.com",
      "user_name": "Edited User"
    };
    await submitFormWithPayload(page, '/users/form/2', 'users', editUserPayload);
  });

  // Route: /users/delete/{id}
  test('it can delete a user', async () => {
    await assertDestroy(page, '/users/delete/2');
  });
});
