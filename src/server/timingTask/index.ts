// 定时任务，抓取网页数据，存储到mysql数据库
import { ICrawler, runCrawler } from './crawler'
import { ApifyList } from './crawler/impl/ApifyList'
import schedule from 'node-schedule'
import moment from 'moment';

// 执行延迟任务
export const task = () => {
  schedule.scheduleJob('0/50 * * * * ?',(fireDate: Date) => {
    console.log('定时任务触发时间：', moment(fireDate).format('yyyy-MM-DD HH:mm:ss'))
    const contrastObj: any = require('../../assets/json/apifyContrast.json')
    // 爬虫回去数据
    runCrawler(new ApifyList()).then((list: any[]) => {
      // 爬取疫情网站，获取各国疫情信息
      const newCaseList: any[] = list.map((item: any = {}) => {
        const {
          Country: country = '',
          Tested: tested = '',
          Infected: infected = '',
          Recovered: recovered = '',
          Deceased: deceased = '',
        } = item;
        return {
          country:country.trim(),
          countryCode: contrastObj[country.trim()]?.countryCode,
          cnName: contrastObj[country.trim()]?.cnName,
          tested,
          infected,
          recovered,
          deceased,
        }
      });
      // 入库
      
    })
  })
}

