// 定时任务，抓取网页数据，存储到mysql数据库
import { ICrawler, runCrawler } from './crawler'
import { ApifyList } from './crawler/impl/ApifyList'
import schedule from 'node-schedule'
import moment from 'moment'

// 执行延迟任务
export const task = () => {
  schedule.scheduleJob('0/50 * * * * ?',(fireDate: Date) => {
    console.log('定时任务触发时间：', moment(fireDate).format('yyyy-MM-DD HH:mm:ss'))
    runCrawler(new ApifyList()).then((data: any[]) => {
      console.log('ApifyList',data)
      
    })
  })
}

