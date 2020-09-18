// 爬虫接口
export interface ICrawler {
  run: () => Promise<any[]>
}

// 执行爬虫
export const runCrawler = (crawler: ICrawler) => {
  return crawler.run();
}