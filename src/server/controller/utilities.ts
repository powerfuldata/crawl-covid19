import { Sequelize, QueryTypes } from 'sequelize'
import {Country } from '../model';
import { sequelize } from '../sequelize'

// 使用的工具-包含业务
// 中文国家名称对照表（对照apify.com网站）
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
// 将apify网站上的英文名称翻译为对应的中文
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

