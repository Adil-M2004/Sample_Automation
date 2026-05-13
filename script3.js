const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50// Optional: slows down operations by 50ms so you can follow along
  });

  const num = 2;

  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'PIM' }).click();

  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByPlaceholder('First Name').fill('Jacky');
  await page.getByPlaceholder('Last Name').fill('Ferny');

  await page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input').fill('077654')

  await page.getByRole('button', { name: 'Save' }).click();

  //GO back to PIM page
  await page.getByRole('link', { name: 'PIM' }).click();

  //WAIT FOR THE TABLE TO APPEAR 
  //await this.page.locator('.oxd-table-body').waitFor({ state: 'visible' });

  // while(await page.locator('.oxd-table-row', { hasText: '0396' }).isNotVisible()) {
  //     await page.getByRole('button', { name: num, exact: true }).click();
  //     num++;
  // }
  //  console.log("Employee was found in section"+num)

  //await browser.close();

});