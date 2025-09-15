const { page } = require('jest-playwright-preset');
const config = require('./config');

beforeAll(async () => {
  await page.goto(`${config.baseUrl}/sessions/login`);
  await page.fill('input[name="email"]', config.login.email);
  await page.fill('input[name="password"]', config.login.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
});

afterAll(async () => {
  // You can add logout or other cleanup here if needed
});
