import { BaseModel } from './BaseModel';
import { Model, DataTypes } from 'sequelize';
import { sequelize, modelOptions } from '../sequelize';

// 各个国家确诊实体
export class CountryCase extends BaseModel{ 
  public caseId!: number;
  public countryCode?: number;
  public country?: string;
  public countryCnName?: string;
  public tested?: number;
  public infected?: number;
  public recovered?: number;
  public deceased?: number;
  public sourceUpdateTime?: Date;
};
CountryCase.init({
  caseId: { type: DataTypes.BIGINT,primaryKey: true },
  countryCode: { type: DataTypes.BIGINT},
  country: { type: DataTypes.STRING },
  countryCnName: { type: DataTypes.STRING },
  tested: { type: DataTypes.BIGINT,defaultValue: null },
  infected: { type: DataTypes.BIGINT,defaultValue: null },
  recovered: { type: DataTypes.BIGINT,defaultValue: null },
  deceased: { type: DataTypes.BIGINT,defaultValue: null },
  sourceUpdateTime: { type: DataTypes.STRING },
},{
  ...modelOptions,
  modelName: 'CountryCase',
  tableName:'country_case',
  comment:'各国确诊数量表',
})
// 可以设置一个主键，否则会默认一个主键叫做`id`。如果表没有主键，可以移除掉默认的主键id
CountryCase.removeAttribute('id');