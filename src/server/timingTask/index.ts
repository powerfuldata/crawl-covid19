// 定时任务，抓取网页数据，存储到mysql数据库
import { ICrawler, runCrawler } from './crawler'
import { ApifyList } from './crawler/impl/ApifyList'
import schedule from 'node-schedule'
import moment from 'moment';
import { generateId } from '../../utils/snowFlake';
import { CountryCase } from '../model';
import {comma2Number} from '../../utils/stringUtil'
import {UpdateCountry} from './crawler/impl/UpdateCountry'

/**
 * 定时任务，每日爬取疫情网站信息
 */
export const captureApifyInfo = () => {
  // 每分钟的第20/50秒各执行一次
  // crone time规则生成器，https://cron.qqe2.com/
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
          countryCode: contrastObj[country.trim()]?.country,
          cnName: contrastObj[country.trim()]?.cnName,
          tested: comma2Number(tested),
          infected: comma2Number(tested),
          recovered: comma2Number(tested),
          deceased: comma2Number(tested),
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

/**
 * 定时任务：每天6点更新国家表
 */
export const updateCountryInTiming = () => {
  // 每20秒执行一次，0/20 * * * * ?
  // 每天6点执行一次，0 0 6 * * ?
  // 20/50 * * * * ?
  schedule.scheduleJob('0 0 6 * * ?',() => {
    runCrawler(new UpdateCountry());
  })
  
}

