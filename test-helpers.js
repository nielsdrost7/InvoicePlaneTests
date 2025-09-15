/**
 * A comprehensive suite of helper functions for InvoicePlane Jest tests.
 * This file contains functions for navigating pages, submitting forms with specific payloads,
 * and asserting page content and API responses.
 */

const { expect } = require('@playwright/test');
const config = require('./config');

const base = config.baseUrl;

/**
 * Generates a random string to be used for dynamic data.
 * @param {number} length - The desired length of the string.
 * @returns {string} The randomly generated string.
 */
function generateRandomString(length = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Processes a payload object and fills form fields accordingly.
 * It handles dynamic variables found in the payloads, such as $client_id or date functions.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {object} payload - The form data payload from a JSON file.
 * @returns {Promise<void>}
 */
async function processPayload(page, payload) {
    for (const [key, value] of Object.entries(payload)) {
        let processedValue = value;

        // Handle dynamic variables from the provided payloads
        if (typeof value === 'string') {
            if (value.includes('$date(')) {
                // Dynamically generate a date string
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                processedValue = `${hours}:${minutes}:${seconds}`;
            } else if (value.includes('$client_id')) {
                // Use a hardcoded client ID for testing
                processedValue = '956';
            } else if (value.includes('$invoice_group_id')) {
                processedValue = '40';
            } else if (value.includes('$invoice_id')) {
                processedValue = '6617';
            } else if (value.includes('$invoice_password')) {
                processedValue = 'demopassword';
            } else if (value.includes('$user_id')) {
                processedValue = '1';
            } else if (value.includes('$tax_rate_id')) {
                processedValue = '131';
            } else if (value.includes('$quote_id')) {
                processedValue = '2172';
            } else if (value.includes('$product_id')) {
                processedValue = '324';
            } else if (value.includes('$family_id')) {
                processedValue = '55';
            } else if (value.includes('$payment_method_id')) {
                processedValue = '108';
            } else if (value.includes('$project_id')) {
                processedValue = '56';
            } else if (value.includes('$task_id')) {
                processedValue = '63';
            } else if (value.includes('$unit_id')) {
                processedValue = '59';
            } else if (value.includes('$custom_field_id')) {
                processedValue = '171';
            } else if (value.includes('$email_template_id')) {
                processedValue = '6';
            } else if (value.includes('$payment_id')) {
                processedValue = '966';
            } else {
                // Fill other text fields with a combination of static and random data
                processedValue = `Test ${generateRandomString(5)} - ${processedValue.replace(/\$/g, '')}`;
            }
        }

        // Locate the input field by name and fill it
        const inputLocator = page.locator(`[name="${key}"]`);
        if (await inputLocator.count() > 0) {
            if (await inputLocator.evaluate(el => el.tagName.toLowerCase()) === 'select') {
                await inputLocator.selectOption({ value: processedValue });
            } else {
                await inputLocator.fill(processedValue);
            }
        }
    }
}

/**
 * Asserts that a page loads without errors.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} url - The URL to navigate to.
 * @returns {Promise<void>}
 */
async function assertPageLoads(page, url) {
    // Arrange: Get the URL
    const fullUrl = base + url;
    // Act: Navigate to the page
    const response = await page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
    // Assert: The page loaded successfully without authorization or not found errors
    await expect(page.locator('body')).not.toContainText('Unauthorized');
    await expect(page.locator('body')).not.toContainText('Page not found');
}

/**
 * Asserts that a form can be filled with a specific payload and submitted successfully.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} url - The form URL.
 * @param {string} module - The module name for form saving strategy.
 * @param {object} payload - The specific payload to use for form fields.
 * @returns {Promise<void>}
 */
async function assertFormSubmit(page, url, module, payload) {
    // Arrange: Navigate to the form
    const fullUrl = base + url;
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
    // Act: Process the payload, fill the form, and submit
    await processPayload(page, payload);
    await submitForm(page, module);
    // Assert: Check for redirection and a success message
    await assertSuccessMessage(page);
}

/**
 * Submits the form using a predefined strategy.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} module - The module name for form saving strategy.
 * @returns {Promise<void>}
 */
async function submitForm(page, module) {
    // Arrange: Find the appropriate save button
    const strategies = config.formSaveStrategies[module] || config.formSaveStrategies.default;
    let formSubmitted = false;
    for (const sel of strategies) {
        const button = page.locator(sel).first();
        if (await button.count() > 0) {
            // Act: Click the button and wait for navigation
            await button.click();
            await page.waitForNavigation();
            formSubmitted = true;
            break;
        }
    }

    if (!formSubmitted) {
        throw new Error(`No save button found for module: ${module}`);
    }
}

/**
 * Asserts that a success message is visible on the page.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} message - The success message to check for.
 * @returns {Promise<void>}
 */
async function assertSuccessMessage(page, message = 'Record saved') {
    await expect(page.locator('.alert-success')).toContainText(message, { timeout: 10000 });
}

/**
 * Asserts that a record deletion is successful.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} url - The URL to navigate to for deletion.
 * @returns {Promise<void>}
 */
async function assertDestroy(page, url) {
    // Arrange: Get the URL
    const fullUrl = base + url;
    // Act: Navigate to the delete URL
    await page.goto(fullUrl);
    // Assert: Check for the successful deletion message
    await expect(page.locator('.alert-success')).toContainText('Record was deleted');
}

/**
 * Asserts that an AJAX call is successful.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} url - The URL for the AJAX call.
 * @returns {Promise<void>}
 */
async function assertAjax(page, url) {
    // Act: Make an API request
    const response = await page.request.get(base + url);
    // Assert: The request returns a 200 OK status
    expect(response.status()).toBe(200);
}

/**
 * Asserts a form submission that starts with a modal.
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} formUrl - The URL of the modal form.
 * @param {string} module - The module name for form saving strategy.
 * @param {string} modalSelector - The selector for the modal trigger button.
 * @param {string} modalFormSelector - The selector for the form within the modal.
 * @param {object} payload - The specific payload for the modal form.
 * @returns {Promise<void>}
 */
async function assertModalFormSubmit(page, formUrl, module, modalSelector, modalFormSelector, payload) {
    // Arrange: Navigate to the page with the modal trigger button
    await page.goto(base + formUrl);
    await expect(page.locator(modalSelector)).toBeVisible();

    // Act: Open the modal, fill the form with payload, and submit
    await page.click(modalSelector);
    await expect(page.locator(modalFormSelector)).toBeVisible();
    await processPayload(page, payload);
    await page.click('button[type="submit"]');

    // Assert: A success message is visible
    await assertSuccessMessage(page);
}

module.exports = {
    assertPageLoads,
    assertFormSubmit,
    assertDestroy,
    assertAjax,
    assertModalFormSubmit,
    assertSuccessMessage,
};
