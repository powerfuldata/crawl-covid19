import { TestModel } from '../model/TestModel';
import { Sequelize, QueryTypes } from 'sequelize'
import {Country, CountryCase } from '../model';
import { sequelize } from '../sequelize'
import { Literal } from 'sequelize/types/lib/utils';
import os, {NetworkInterfaceInfo} from 'os';
import {TextEncoder} from 'text-encoding'
import { generateId } from '../../utils/snowFlake'

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
  var arr1: any[] = [
    {name: '11'},
    {name: '12'},
    {name: '13'},
    {' text': '14'},
    {name: {
      first: 'wu',
      last: 'chao'
    }},
    {},
  ]
  const index = arr1.findIndex(i => i?.name?.last === 'chao')
  console.log('index:',index)
  console.log('question mark:',Object.keys(arr1[3]))
}

export const getHostName = () => {
  const hostName = os.hostname()
  console.log('homedir:',os.homedir())
  console.log('hostName:',hostName)
  const obj = os.networkInterfaces()
  let address: string = ''
  Object.keys(obj).find(o => obj[o]?.find((info: NetworkInterfaceInfo) => {
    const isIp = info.family === 'IPv4'
    isIp && (address = info.address || '');
    return isIp
  }))
  console.log('address:',address)
  const start = Date.now();
  for(let i = 0; i < 100; i ++) {
    const id = generateId();
    console.log('id:',id)
  }
  const end =  Date.now()
  console.log('所需时间：', end - start)

  console.log('SEQ_MAX_NUM:',~(-1 << 12))
}

export const testSnowFlake = () => {
  for(let i = 0; i < 1; i ++) {
    const id = generateId()
    console.log('雪花id:', id)
  }
}