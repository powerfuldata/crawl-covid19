// 定时任务，抓取网页数据，存储到mysql数据库
import { ICrawler, runCrawler } from './crawler'
import { ApifyList } from './crawler/impl/ApifyList'

// 执行延迟任务
export const task = () => {
  setTimeout(() => {
    runCrawler(new ApifyList()).then((data: any[]) => {
      console.log('ApifyList',data)
    })
  }, 5000);
}

