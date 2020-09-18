import puppetteer, {Browser} from 'puppeteer-core'
import cheerio from 'cheerio';
import * as Config from '../../../config'
// puppetteer配置
interface PupConfig {
  executablePath?: string, // chrome浏览器路径
}
// 初始化
const browserInstance = (config: PupConfig): Promise<Browser> => {
  return puppetteer.launch(config);
}

// 读取页面全部内容
const getHtml = async (url: string): Promise<string> => {
  console.log('爬虫url：',url)
  const browser = await browserInstance({ executablePath: Config.EXECUTABLE_PATH });
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content()
  browser.close();
  return html ? Promise.resolve(html) : Promise.resolve('')
}

// 获取JQuery对象
export const getCheerio = async (): Promise<CheerioStatic> => {
  const html = await getHtml(Config.CRAWLER_URL)
  return cheerio.load(html);
}
