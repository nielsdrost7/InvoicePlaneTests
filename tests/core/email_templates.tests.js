/**
 * @fileoverview Test suite for the Email Templates component of the Core module.
 * This file contains tests for all `email_templates` routes.
 */
const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy } = require('../../test-helpers');

describe('Email Templates Component', () => {
  // Route: /email_templates/index
  test('it can view the email templates index', async () => {
    await assertPageLoads(page, '/email_templates/index');
    await expect(page.locator('.content-title')).toContainText('Email Templates');
  });

  /**
   * @description Test creating a new email template.
   * @payload
   * {
   * "email_template_title": "$email_template_title",
   * "email_template_body": "$email_template_body",
   * "email_template_type": "$email_template_type",
   * "email_template_subject": "$email_template_subject",
   * "email_template_from_name": "$email_template_from_name",
   * "email_template_from_email": "$email_template_from_email"
   * }
   */
  // Route: /email_templates/form
  test('it can create a new email template', async () => {
    const createEmailTemplatePayload = {
      "email_template_title": "Test Template",
      "email_template_body": "Hello World",
      "email_template_type": "invoice",
      "email_template_subject": "Test Subject",
      "email_template_from_name": "Test User",
      "email_template_from_email": "test@example.com"
    };
    await submitFormWithPayload(page, '/email_templates/form', 'email_templates', createEmailTemplatePayload);
  });

  /**
   * @description Test editing an existing email template.
   * @payload
   * {
   * "email_template_title": "$email_template_title",
   * "email_template_body": "$email_template_body",
   * "email_template_type": "$email_template_type",
   * "email_template_subject": "$email_template_subject",
   * "email_template_from_name": "$email_template_from_name",
   * "email_template_from_email": "$email_template_from_email"
   * }
   */
  // Route: /email_templates/form/{id}
  test('it can edit an existing email template', async () => {
    const editEmailTemplatePayload = {
      "email_template_title": "Edited Test Template",
      "email_template_body": "Hello Edited World",
      "email_template_type": "invoice",
      "email_template_subject": "Edited Subject",
      "email_template_from_name": "Edited User",
      "email_template_from_email": "edited@example.com"
    };
    await submitFormWithPayload(page, '/email_templates/form/6', 'email_templates', editEmailTemplatePayload);
  });

  // Route: /email_templates/delete/{id}
  test('it can delete an email template', async () => {
    await assertDestroy(page, '/email_templates/delete/6');
  });
});
