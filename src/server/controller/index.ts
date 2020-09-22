import { TestModel } from '../model/TestModel';
import { CountryCase } from '../model/CountryCase';

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

export const test = () => {
  TestModel.create({
    caseId: 300
  },{
    fields:['caseId']
  })
}