import { TestModel } from '../model/TestModel';
import { Sequelize, QueryTypes } from 'sequelize'
import {Country, CountryCase } from '../model';
import { sequelize } from '../sequelize'
import { Literal } from 'sequelize/types/lib/utils';
import os, {NetworkInterfaceInfo} from 'os';
import {TextEncoder} from 'text-encoding'
import { generateId } from '../../utils/snowFlake'
import Long from 'long'
import BigInt,{BigInteger} from 'big-integer'


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

export const getId = () => {
  const start = Date.now();
  const set = new Set();
  for(let i = 0; i < 100000; i ++) {
    const id = generateId();
    set.add(id)
  }
  const end =  Date.now()
  console.log('所需时间：', end - start)
  console.log('id数量：',set.size)
}

export const testSnowFlake = () => {
  const set = new Set();
  for(let i = 0; i < 10; i ++) {
    const id = generateId()
    set.add(id)
    // console.log('雪花id:', id)
  }
}
export const testLong = () => {
  const num1 = Long.fromString('9876543211234567')
  const num2 = Long.fromString('100')
  num2.sub
  const sum = num1.add(num2)
  console.log('sum-long:',sum.toString())
}
// 测试bigint
export const testBigInt = () => {
  const set = new Set<string>();
  set.add('1');
  set.add('1');
  set.add('1');
  console.log(Array.from(set))
}