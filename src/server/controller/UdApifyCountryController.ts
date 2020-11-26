import {ApifyList} from '../timingTask/crawler/impl/ApifyList'
import { Country } from '../model/Country'

// 更新`covid19_countries`表，apify_country字段
export const updateCovid19CountryName = async () => {
  // 1.爬取疫情数据，解析成json
  // 2.读取数据库，剔除apify_country=''的数据，解析为json
  // 3.迭代遍历，生成新的列表，包含字段{id, country, apify_country, cn_name, }
  // 4.批量跟新数据库

  // const caseList: any[] = await new ApifyList().run();
  Country.findAll().then((countryList) => {
    console.log('countryList=',countryList)
  })
}