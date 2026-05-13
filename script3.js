const { chromium } = require('playwright');
const config = require('./config');

(async () => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50// Optional: slows down operations by 50ms so you can follow along
  });

  let num = 1;

  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill(config.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(config.password);
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

  const record = await page.locator('.oxd-table-row', { hasText: config.employeeID }).isVisible()


  for (let i = 1; i < 5; i++) {
    // 1. Click the section button and wait for it to finish
    await page.getByRole('button', { name: i, exact: true }).click();

    // 2. Re-check if the record exists in THIS section
    const isFound = await page.locator('.oxd-table-row', { hasText: config.employeeID }).isVisible();

    if (isFound) {
      console.log("Employee was found in section " + i);
      break;
    }
  }//loop end

 // console.log("Operation Complete");
   await browser.close();

})();