const { chromium } = require('playwright');
const config = require('./config');

(async () => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50// Optional: slows down operations by 50ms so you can follow along
  });

  let num = 2;

  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'PIM' }).click();

  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByPlaceholder('First Name').fill(config.firstName);
  await page.getByPlaceholder('Last Name').fill(config.lastName);

  await page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').fill(config.employeeID)

  await page.getByRole('button', { name: 'Save' }).click();

  //GO back to PIM page
  await page.getByRole('link', { name: 'PIM' }).click();

  //WAIT FOR THE TABLE TO APPEAR 
  await page.locator('.oxd-table-body').waitFor({ state: 'visible' });

  while (!(await page.locator('.oxd-table-row', { hasText: config.employeeID }).isVisible())) {
   const nextButton = page.getByRole('button', { name: num.toString(), exact: true });
    
    // Check if the button exists so we don't time out
    if (await nextButton.isVisible()) {
        await nextButton.click();
        num++;
        await page.waitForTimeout(1000); // Give the table time to reload
    } else {
        console.log("Employee ID not found after checking all available pages.");
        break; // Exit the loop if there are no more pages to click
    }
   }

  console.log("Employee was found in section " + num);
  await browser.close();

})();