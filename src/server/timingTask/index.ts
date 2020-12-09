// 定时任务，抓取网页数据，存储到mysql数据库
import { ICrawler, runCrawler } from './crawler'
import { ApifyList } from './crawler/impl/ApifyList'
import schedule from 'node-schedule'
import moment from 'moment';
import { generateId } from '../../utils/snowFlake';
import { CountryCase,Country, CountryType,CountryCaseType } from '../model';
import {comma2Number} from '../../utils/stringUtil'
import {UpdateCountry} from './crawler/impl/UpdateCountry'
import * as CountryMapper from '../model/dao/CountryMapper';

interface DataType {
  [prop:string]:string
}
/**
 * 定时任务，每日爬取疫情网站信息
 */
export const captureApifyInfo = () => {
  // 每分钟的第20/50秒各执行一次，20/50 * * * * ?
  // 每天6/14/21点各更新一次0 0 6,14,21 * * ? 
  // crone time规则生成器，https://cron.qqe2.com/
  schedule.scheduleJob('20/50 * * * * ?', async (fireDate: Date) => {
    console.log('定时任务触发时间：', moment(fireDate).format('yyyy-MM-DD HH:mm:ss'))
    // const contrastObj: any = require('../../assets/json/apifyContrast.json')
    const countryList = await CountryMapper.selectAllApifyNames();//查询国家表
    const countryMap = countryList.reduce((map: Map<string, CountryType>,item: Country) => {
      const {
        apifyCountry = '',
      } = item || {};
      apifyCountry && map.set(apifyCountry, item)
      return map;
    },new Map())
    // console.log('map=',countryMap)
    // 爬虫回去数据
    runCrawler(new ApifyList()).then((list: {[prop:string]:string}[]) => {
      // 爬取疫情网站，获取各国疫情信息
      const newCaseList: CountryCaseType[] = list.map((item) => {
        const {
          Country: country = '',
          Tested: tested = '',
          Infected: infected = '',
          Recovered: recovered = '',
          Deceased: deceased = '',
        } = item;
        return {
          country: country.trim(),
          countryCode: countryMap.get(country.trim())?.id || '-1',
          countryCnName: countryMap.get(country.trim())?.cnName || '',
          tested: comma2Number(tested),
          infected: comma2Number(infected),
          recovered: comma2Number(recovered),
          deceased: comma2Number(deceased),
          caseId: generateId(),
          statisticDate: new Date()
        }
      });
      newCaseList.length = 5
      // 添加到数据库
      CountryCase.bulkCreate(newCaseList,{
        logging: (sql: string, time) => {
          console.log('疫情信息爬取成功：',sql)
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

