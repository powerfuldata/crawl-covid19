import puppertter from 'puppeteer-core';
import cheerio from 'cheerio';

const init = async () => {
  const browser = await puppertter.launch({
    executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
  })
  const page = await browser.newPage();
  await page.goto('https://apify.com/covid-19');
  const html = await page.content();
  const $ = cheerio.load(html)
  const table = $('#actual-data').next('table');// 查找与标题紧邻的table元素
  const thead = table.children().first();
  const titles = thead.find('tr').children().map((i, el) => $(el).text()).get();
  console.log('表头：',titles)

  const tbody = table.children().last();
  const dataSource = tbody.children().map((i: number,row) => {
    return row.children.reduce((obj: any,column: any, index: number) => {
      const text = $(column).text();
      const key = titles[index];
      if (key) {
        obj[key] = text;
      }
      
      return obj;
    },{})
  }).get()
  console.log('dataSource:',dataSource)
  browser.close();
}

init()
