/**
 * @fileoverview Test suite for the Invoices module.
 * This file contains tests for all `invoices` routes, including views, forms, and deletions.
 * Payloads are explicitly documented in JSDoc blocks for relevant tests.
 */

const { page, expect } = require('jest-playwright-preset');
const { assertPageLoads, submitFormWithPayload, assertDestroy, assertAjax } = require('../test-helpers');

describe('Invoices Module', () => {
  // Routes: /invoices/index
  test('it can view the invoices index', async () => {
    await assertPageLoads(page, '/invoices/index');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/archive
  test('it can view the invoice archive', async () => {
    await assertPageLoads(page, '/invoices/archive');
    await expect(page.locator('.content-title')).toContainText('Invoice Archive');
  });

  // Route: /invoices/status/all
  test('it can view all invoices', async () => {
    await assertPageLoads(page, '/invoices/status/all');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/status/draft
  test('it can view draft invoices', async () => {
    await assertPageLoads(page, '/invoices/status/draft');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/status/overdue
  test('it can view overdue invoices', async () => {
    await assertPageLoads(page, '/invoices/status/overdue');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/status/paid
  test('it can view paid invoices', async () => {
    await assertPageLoads(page, '/invoices/status/paid');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/status/sent
  test('it can view sent invoices', async () => {
    await assertPageLoads(page, '/invoices/status/sent');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/status/viewed
  test('it can view viewed invoices', async () => {
    await assertPageLoads(page, '/invoices/status/viewed');
    await expect(page.locator('.content-title')).toContainText('Invoices');
  });

  // Route: /invoices/recurring
  test('it can view the recurring invoices index', async () => {
    await assertPageLoads(page, '/invoices/recurring');
    await expect(page.locator('.content-title')).toContainText('Recurring Invoices');
  });

  // Route: /invoices/recurring/index
  test('it can view the recurring invoices index via its full route', async () => {
    await assertPageLoads(page, '/invoices/recurring/index');
    await expect(page.locator('.content-title')).toContainText('Recurring Invoices');
  });

  // Route: /invoice_groups/index
  test('it can view the invoice groups index', async () => {
    await assertPageLoads(page, '/invoice_groups/index');
    await expect(page.locator('.content-title')).toContainText('Invoice Groups');
  });

  // Route: /invoices/view/{id}
  test('it can view a specific invoice', async () => {
    await assertPageLoads(page, '/invoices/view/6617');
    await expect(page.locator('.content-title')).toContainText('Invoice');
  });

  /**
   * @description Test creating an invoice from a form.
   * @payload
   * {
   * "client_id": "$create_invoice_client_id",
   * "invoice_date_created": "2024-09-15",
   * "invoice_group_id": "$invoice_group_id",
   * "invoice_password": "$invoice_password",
   * "invoice_time_created": "$date('H:i:s')",
   * "user_id": "$user_id"
   * }
   */
  // Route: /invoices/form
  test('it can create a new invoice', async () => {
    const createInvoicePayload = {
      "client_id": "956",
      "invoice_date_created": "2024-09-15",
      "invoice_group_id": "40",
      "invoice_password": "demopassword",
      "invoice_time_created": "$date('H:i:s')",
      "user_id": "1"
    };
    await submitFormWithPayload(page, '/invoices/form', 'invoices', createInvoicePayload);
  });

  /**
   * @description Test editing an existing invoice from a form.
   * @payload
   * {
   * "invoice_number": "$invoice_number",
   * "invoice_date_created": "$invoice_date_created",
   * "invoice_date_due": "$invoice_date_due",
   * "invoice_password": "$invoice_password",
   * "invoice_terms": "$invoice_terms",
   * "invoice_status_id": "$invoice_status_id",
   * "invoice_tax_rate_id": "$invoice_tax_rate_id",
   * "invoice_sign": "$invoice_sign",
   * "invoice_total": "$invoice_total",
   * "payment_method": "$payment_method"
   * }
   */
  // Route: /invoices/form/{id}
  test('it can edit an existing invoice', async () => {
    const editInvoicePayload = {
      "invoice_number": "EDITED-123",
      "invoice_date_created": "2024-09-15",
      "invoice_date_due": "2024-10-15",
      "invoice_password": "editedpassword",
      "invoice_terms": "These are edited terms.",
      "invoice_status_id": "2",
      "invoice_tax_rate_id": "131",
      "invoice_sign": "1",
      "invoice_total": "123.45",
      "payment_method": "108"
    };
    await submitFormWithPayload(page, '/invoices/form/6617', 'invoices', editInvoicePayload);
  });

  /**
   * @description Test creating a recurring invoice.
   * @payload
   * {
   * "client_id": "$create_recurring_client_id",
   * "invoice_date_created": "$invoice_date_created",
   * "invoice_group_id": "$invoice_group_id",
   * "invoice_password": "$invoice_password",
   * "invoice_time_created": "$date('H:i:s')",
   * "user_id": "$user_id",
   * "recur_frequency": "$recur_frequency",
   * "recur_start_date": "$recur_start_date",
   * "recur_end_date": "$recur_end_date"
   * }
   */
  // Route: /invoices/recurring/form
  test('it can create a recurring invoice', async () => {
    const createRecurringPayload = {
      "client_id": "956",
      "invoice_date_created": "2024-09-15",
      "invoice_group_id": "40",
      "invoice_password": "demopassword",
      "invoice_time_created": "$date('H:i:s')",
      "user_id": "1",
      "recur_frequency": "1",
      "recur_start_date": "2024-09-15",
      "recur_end_date": "2025-09-15"
    };
    await submitFormWithPayload(page, '/invoices/recurring/form', 'invoices', createRecurringPayload);
  });

  /**
   * @description Test editing an existing recurring invoice.
   * @payload
   * {
   * "invoice_number": "$invoice_number",
   * "invoice_date_created": "$invoice_date_created",
   * "invoice_date_due": "$invoice_date_due",
   * "invoice_password": "$invoice_password",
   * "invoice_terms": "$invoice_terms",
   * "invoice_status_id": "$invoice_status_id",
   * "invoice_tax_rate_id": "$invoice_tax_rate_id",
   * "invoice_sign": "$invoice_sign",
   * "invoice_total": "$invoice_total",
   * "payment_method": "$payment_method"
   * }
   */
  // Route: /invoices/recurring/form/{id}
  test('it can edit an existing recurring invoice', async () => {
    const editRecurringPayload = {
      "invoice_number": "RECUR-123",
      "invoice_date_created": "2024-09-15",
      "invoice_date_due": "2024-10-15",
      "invoice_password": "editedpassword",
      "invoice_terms": "These are edited terms.",
      "invoice_status_id": "2",
      "invoice_tax_rate_id": "131",
      "invoice_sign": "1",
      "invoice_total": "123.45",
      "payment_method": "108"
    };
    await submitFormWithPayload(page, '/invoices/recurring/form/6617', 'invoices', editRecurringPayload);
  });

  /**
   * @description Test creating a new invoice group.
   * @payload
   * {
   * "invoice_group_name": "$invoice_group_name",
   * "invoice_group_prefix": "$invoice_group_prefix",
   * "invoice_group_next_id": "$invoice_group_next_id",
   * "invoice_group_left_pad": "$invoice_group_left_pad",
   * "invoice_group_prefix_year": "$invoice_group_prefix_year"
   * }
   */
  // Route: /invoice_groups/form
  test('it can create a new invoice group', async () => {
    const createInvoiceGroupPayload = {
      "invoice_group_name": "Test Group",
      "invoice_group_prefix": "TG",
      "invoice_group_next_id": "1",
      "invoice_group_left_pad": "3",
      "invoice_group_prefix_year": "1"
    };
    await submitFormWithPayload(page, '/invoice_groups/form', 'invoice_groups', createInvoiceGroupPayload);
  });

  /**
   * @description Test editing an existing invoice group.
   * @payload
   * {
   * "invoice_group_name": "$invoice_group_name",
   * "invoice_group_prefix": "$invoice_group_prefix",
   * "invoice_group_next_id": "$invoice_group_next_id",
   * "invoice_group_left_pad": "$invoice_group_left_pad",
   * "invoice_group_prefix_year": "$invoice_group_prefix_year"
   * }
   */
  // Route: /invoice_groups/form/{id}
  test('it can edit an existing invoice group', async () => {
    const editInvoiceGroupPayload = {
      "invoice_group_name": "Edited Group",
      "invoice_group_prefix": "EG",
      "invoice_group_next_id": "1",
      "invoice_group_left_pad": "3",
      "invoice_group_prefix_year": "1"
    };
    await submitFormWithPayload(page, '/invoice_groups/form/40', 'invoice_groups', editInvoiceGroupPayload);
  });

  // Route: /invoices/delete/{id}
  test('it can delete an invoice', async () => {
    await assertDestroy(page, '/invoices/delete/6617');
  });

  // Route: /invoice_groups/delete/{id}
  test('it can delete an invoice group', async () => {
    await assertDestroy(page, '/invoice_groups/delete/40');
  });

  // Route: /invoices/recurring/delete/{id}
  test('it can delete a recurring invoice', async () => {
    await assertDestroy(page, '/invoices/recurring/delete/6617');
  });

  /**
   * @description Test the AJAX route to save an invoice.
   * @payload
   * {
   * "invoice_id": "$invoice_id",
   * "invoice_number": "$invoice_number",
   * "invoice_date_created": "$invoice_date_created",
   * "invoice_date_due": "$invoice_date_due",
   * "invoice_password": "$invoice_password",
   * "invoice_terms": "$invoice_terms",
   * "invoice_status_id": "$invoice_status_id",
   * "invoice_tax_rate_id": "$invoice_tax_rate_id",
   * "invoice_sign": "$invoice_sign",
   * "invoice_total": "$invoice_total",
   * "payment_method": "$payment_method"
   * }
   */
  // Route: /invoices/ajax/save
  test('it can save an invoice via AJAX', async () => {
    const saveInvoicePayload = {
      "invoice_id": "6617",
      "invoice_number": "AJAX-1",
      "invoice_date_created": "2024-09-15",
      "invoice_date_due": "2024-10-15",
      "invoice_password": "ajaxpassword",
      "invoice_terms": "AJAX terms.",
      "invoice_status_id": "2",
      "invoice_tax_rate_id": "131",
      "invoice_sign": "1",
      "invoice_total": "99.99",
      "payment_method": "108"
    };
    await submitFormWithPayload(page, '/invoices/ajax/save', 'invoices', saveInvoicePayload);
  });

  /**
   * @description Test the AJAX route to save a recurring invoice.
   * @payload
   * {
   * "invoice_id": "$invoice_id",
   * "invoice_number": "$invoice_number",
   * "invoice_date_created": "$invoice_date_created",
   * "invoice_date_due": "$invoice_date_due",
   * "invoice_password": "$invoice_password",
   * "invoice_terms": "$invoice_terms",
   * "invoice_status_id": "$invoice_status_id",
   * "invoice_tax_rate_id": "$invoice_tax_rate_id",
   * "invoice_sign": "$invoice_sign",
   * "invoice_total": "$invoice_total",
   * "payment_method": "$payment_method"
   * }
   */
  // Route: /invoices/recurring/ajax/save
  test('it can save a recurring invoice via AJAX', async () => {
    const saveRecurringPayload = {
      "invoice_id": "6617",
      "invoice_number": "RECURRING-AJAX-1",
      "invoice_date_created": "2024-09-15",
      "invoice_date_due": "2024-10-15",
      "invoice_password": "recurringajaxpassword",
      "invoice_terms": "Recurring AJAX terms.",
      "invoice_status_id": "2",
      "invoice_tax_rate_id": "131",
      "invoice_sign": "1",
      "invoice_total": "199.99",
      "payment_method": "108"
    };
    await submitFormWithPayload(page, '/invoices/recurring/ajax/save', 'invoices', saveRecurringPayload);
  });
  
  // Route: /invoices/ajax/invoice_to_quote/{id}
  test('it can convert an invoice to a quote', async () => {
      await assertAjax(page, '/invoices/ajax/invoice_to_quote/6617');
  });

  // Route: /invoices/ajax/invoice_to_quote/{id}
  test('it can convert an invoice to a quote', async () => {
    await assertAjax(page, '/invoices/ajax/invoice_to_quote/6617');
  });
  
  /**
   * @description Test the AJAX route to save an invoice item.
   * @payload
   * {
   * "invoice_id": "$invoice_id",
   * "item_name": "$item_name",
   * "item_description": "$item_description",
   * "item_quantity": "$item_quantity",
   * "item_price": "$item_price",
   * "item_tax_rate_id": "$item_tax_rate_id",
   * "item_product_id": "$item_product_id"
   * }
   */
  // Route: /invoices/ajax/save_invoice_item
  test('it can save an invoice item via AJAX', async () => {
    const saveItemPayload = {
      "invoice_id": "6617",
      "item_name": "Test Item",
      "item_description": "A new test item.",
      "item_quantity": "2",
      "item_price": "50",
      "item_tax_rate_id": "131",
      "item_product_id": "324"
    };
    await submitFormWithPayload(page, '/invoices/ajax/save_invoice_item', 'invoices', saveItemPayload);
  });
  
  /**
   * @description Test the AJAX route to save a new recurring invoice item.
   * @payload
   * {
   * "invoice_id": "$invoice_id",
   * "item_name": "$item_name",
   * "item_description": "$item_description",
   * "item_quantity": "$item_quantity",
   * "item_price": "$item_price",
   * "item_tax_rate_id": "$item_tax_rate_id",
   * "item_product_id": "$item_product_id"
   * }
   */
  // Route: /invoices/recurring/ajax/save_recurring_invoice_item
  test('it can save a recurring invoice item via AJAX', async () => {
    const saveRecurringItemPayload = {
      "invoice_id": "6617",
      "item_name": "Test Recurring Item",
      "item_description": "A new recurring test item.",
      "item_quantity": "1",
      "item_price": "100",
      "item_tax_rate_id": "131",
      "item_product_id": "324"
    };
    await submitFormWithPayload(page, '/invoices/recurring/ajax/save_recurring_invoice_item', 'invoices', saveRecurringItemPayload);
  });
  
  // Route: /invoices/ajax/generate_pdf/{id}
  test('it can generate an invoice PDF via AJAX', async () => {
    await assertAjax(page, '/invoices/ajax/generate_pdf/6617');
  });

  // Route: /invoices/ajax/invoice_item_to_quote_item/{id}
  test('it can convert an invoice item to a quote item via AJAX', async () => {
    await assertAjax(page, '/invoices/ajax/invoice_item_to_quote_item/1');
  });
});
