const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.goto('https://playwright.dev/');
  await page.screenshot({ path: `screenshots/example.png` });
  await browser.close();
})();