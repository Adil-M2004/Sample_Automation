const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com');
  
  const headlines = await page.$$eval('.titleline > a', nodes => 
    nodes.map(n => n.innerText)
  );
  
  console.log(headlines.slice(0, 5)); // Just prints the top 5 stories
  await browser.close();
})();