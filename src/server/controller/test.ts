import { TestModel } from '../model/TestModel';
import { Sequelize, QueryTypes } from 'sequelize'
import {Country, CountryCase } from '../model';
import { sequelize } from '../sequelize'
import { Literal } from 'sequelize/types/lib/utils';

export const insertRow = () => {
  CountryCase.upsert({
    caseId:1,
    countryCode:105,
    country:'美国',
    infected:7000000,
  },{
    fields: ['caseId','countryCode','country','infected'],
  }).then(([res, flag]) => {
    console.log('返回数据：',res);
    console.log('flag:',flag);
  })
}
export const findCase =() => {
  CountryCase.findAll({
    where: {
      caseId: 100
    }
  }).then((res) => {
    console.log('res:',res)
  })
}

export const test1 = () => {
  const caseList: any[] = require('../../assets/json/caseList.json')
  Sequelize.literal('(select)')
  Country.findAll({
    attributes:[
      'id',
      [Sequelize.literal('case'), 'cn_name'],
      [Sequelize.literal(`case when country like '%United States%' then cn_name`),'cn_name'],
      [Sequelize.literal(`end cnName`),'cn_name']
    ]
  }).then((list: Country[]) => {
    const newList = list!.filter(i => i.cnName)
    console.log('case when:',newList)
  })
}

export const test = () => {
  const caseList: any[] = require('../../assets/json/caseList.json')
  sequelize.query<Country>(`select
  country,
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
