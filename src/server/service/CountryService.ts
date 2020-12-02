import {ApifyList} from '../timingTask/crawler/impl/ApifyList'
import { Country, CountryType, CountryMapper } from '../model'
import { QueryTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface DataType {
  id: string;
  apifyCountry: string;
  [prop:string]: string
}

/**
 * 检查更新状态，是否需要更新`covid19_countries`表,
 * 如果需要，则更新`apify_country字段
 */
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
    // 疫情网站上的国家名称去表中匹配，只找不匹配的记录
    const country = countryList.find(item => item.country!.indexOf(apifyName) >= 0);
    if (country) {
      list.push({id: country.id, apifyCountry: apifyName, country: country.country!})
    }
    return list;
  },[])
  if (newList && newList.length > 0) {// 更新表
    CountryMapper.batchUpdateApifyName(newList)
  }
}


// 获取中文国家名称对照表（对照apify.com网站）
export const getCountryCnNameFromApify = () => {
  const caseList: any[] = require('../../assets/json/caseList.json')
  // 查询数据库
  sequelize.query<Country>(`select
  country,
  id,
  case
  ${caseList.reduce((str: string, item: any) => str + ` when country like '%${item.Country!.trim()}%' then cn_name`, '')}
  end 'cnName'
  from covid19_countries;`,{
    type: QueryTypes.SELECT,
  }).then((data: Country[]) => {
    const list = data.filter(i => i.cnName)
    console.log('list:',list)
    console.log('length:',list.length)
  })
}
// 将apify网站上的国家英文名称翻译为对应的中文
export const translateApiFyCnName = () => {
  const countryList: any[] = require('../../assets/json/countryCnNames.json');
  const caseList: any[] = require('../../assets/json/caseList.json');
  const obj =  countryList.reduce((init:any, item: {country: string, cnName: string} ) => {
    const aCase = caseList.find(i => i?.Country?.trim()?.indexOf(item.country) >= 0)
    if (aCase?.Country) {
      const apifyName = aCase.Country.trim();
      init[apifyName] = {
        country:item.country,
        cnName:item.cnName,
        apifyName
      }
    }
    return init;
  },{});
  console.log('obj:',obj)
}


