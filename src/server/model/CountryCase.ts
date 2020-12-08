import { BaseModel } from './BaseModel';
import { Model, DataTypes } from 'sequelize';
import { sequelize, modelOptions } from '../sequelize';

export interface CountryCaseType {
  caseId?: string;
  countryCode?: string;
  country?: string;
  countryCnName?: string;
  tested?: number;
  infected?: number;
  recovered?: number;
  deceased?: number;
  sourceUpdateTime?: Date;
  statisticDate?: Date; // 统计日期
}
// 各个国家确诊实体
export class CountryCase extends BaseModel{ 
  public caseId!: string;
  public countryCode?: number;
  public country?: string;
  public countryCnName?: string;
  public tested?: number;
  public infected?: number;
  public recovered?: number;
  public deceased?: number;
  public sourceUpdateTime?: Date;
  public statisticDate?: Date;
};
CountryCase.init({
  caseId: { type: DataTypes.BIGINT,primaryKey: true },
  countryCode: { type: DataTypes.BIGINT},
  country: { type: DataTypes.STRING },
  countryCnName: { type: DataTypes.STRING },
  tested: { type: DataTypes.BIGINT,defaultValue: null, comment:'检测人数' },
  infected: { type: DataTypes.BIGINT,defaultValue: null, comment:'确诊人数' },
  recovered: { type: DataTypes.BIGINT,defaultValue: null, comment:'治愈人数' },
  deceased: { type: DataTypes.BIGINT,defaultValue: null, comment:'死亡人数' },
  sourceUpdateTime: { type: DataTypes.STRING },
  statisticDate: { type: DataTypes.DATE, allowNull: false,comment:'统计日期' },
},{
  ...modelOptions,
  modelName: 'CountryCase',
  tableName:'country_case',
  comment:'各国确诊数量表',
})
// 可以设置一个主键，否则会默认一个主键叫做`id`。如果表没有主键，可以移除掉默认的主键id
CountryCase.removeAttribute('id');