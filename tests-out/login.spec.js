"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('has title', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    // Expect a title "to contain" a substring.
    await (0, test_1.expect)(page).toHaveTitle(/ParaBank/);
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill('john');
    await page.locator('input[name="username"]').press('Tab');
    await page.locator('input[name="password"]').fill('demo');
    //log in
    await page.getByRole('button', { name: 'Log In' }).click();
    // Expects page to have a title with the name of Accounts Overview.
    await (0, test_1.expect)(page).toHaveTitle(/Accounts Overview/);
});
//# sourceMappingURL=login.spec.js.map