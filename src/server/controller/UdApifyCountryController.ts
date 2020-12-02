import {ApifyList} from '../timingTask/crawler/impl/ApifyList'
import { Country, CountryType, CountryMapper } from '../model'

interface DataType {
  id: string;
  apifyCountry: string;
  [prop:string]: string
}

// 更新`covid19_countries`表，apify_country字段
export const updateCovid19CountryName = async () => {
  // 1.爬取疫情数据，解析成json
  // 2.读取数据库，剔除apify_country=''的数据，解析为json
  // 3.迭代遍历，生成新的列表，包含字段{id, country, apify_country, cn_name, }
  // 4.批量更新数据库

  const caseList: any[] = await new ApifyList().run();// 爬取疫情列表
  const countryList:CountryType[] = await CountryMapper.selectWithoutApifyName();// 查询列表
  const newList = caseList.reduce((list: DataType[], aCase: any) => {
    let {Country: apifyName = ''} = aCase;
    apifyName = apifyName.trim()
    // 疫情网站上的国家名称去表中匹配
    const country = countryList.find(item => item.country!.indexOf(apifyName) >= 0);
    if (country) {
      list.push({id: country.id, apifyCountry: apifyName, country: country.country!})
    }
    return list;
  },[])
  // console.log('newList=',newList)
  CountryMapper.batchUpdateApifyName(newList)
}