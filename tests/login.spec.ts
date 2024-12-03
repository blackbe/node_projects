import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';
import * as fs from 'fs';

  test('has title', async ({ page }) => {
      // Navigate to the website
      const url = 'https://parabank.parasoft.com/parabank/index.htm';
      await page.goto(url);
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/ParaBank/);
  
      // Log in using the provided credentials  
      const username = 'john';
      const password = 'demo';

      await page.fill('input[name="username"]', username);
      await page.fill('input[name="password"]', password);

      //log in
      await page.getByRole('button', { name: 'Log In' }).click();

      // Expects page to have a title with the name of Accounts Overview.
      await expect(page).toHaveTitle(/Accounts Overview/);  

      // Extract the account balance
      // Find the 'Total' cell
      const totalElement = await page.getByText('Total');
    
      // Get the text of the next cell after 'Total'
      const nextCellText = await totalElement.evaluate((el) => {
        const nextCell = el.closest('tr')?.querySelector('td:nth-child(2)');
      
        // Prepare the JSON data
        const data = {
          username: username,
          amount: nextCell?.textContent?.trim(),
          timestamp: new Date().toISOString(),
        };
      
      // Write the data to a JSON file
      const filePath = 'account_balance.json';
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Account balance written to ${filePath}`);
      });
    });