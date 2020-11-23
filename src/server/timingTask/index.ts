// 定时任务，抓取网页数据，存储到mysql数据库
import { ICrawler, runCrawler } from './crawler'
import { ApifyList } from './crawler/impl/ApifyList'
import schedule from 'node-schedule'
import moment from 'moment';
import { generateId } from '../../utils/snowFlake';
import { CountryCase } from '../model'

// 执行延迟任务
export const task = () => {
  // 每分钟的第20/50秒各执行一次
  schedule.scheduleJob('20/50 * * * * ?',(fireDate: Date) => {
    console.log('定时任务触发时间：', moment(fireDate).format('yyyy-MM-DD HH:mm:ss'))
    const contrastObj: any = require('../../assets/json/apifyContrast.json')
    // 爬虫回去数据
    runCrawler(new ApifyList()).then((list: any[]) => {
      // 爬取疫情网站，获取各国疫情信息
      const newCaseList = list.map((item: any = {}) => {
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
          tested: tested * 1,
          infected: infected * 1,
          recovered: recovered * 1,
          deceased: deceased * 1,
          caseId: generateId()
        }
      });
      // 入库
      console.log('newCaseList:',newCaseList)
      CountryCase.bulkCreate(newCaseList,{
        logging: (sql: string, time) => {
          console.log('CountryCase批量跟新时间：',time)
        }
      })
    })
  })
}

