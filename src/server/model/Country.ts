import { BaseModel, BaseTime } from './BaseModel'
import { modelOptions } from '../sequelize';
import { DataTypes } from 'sequelize'

export interface CountryType extends BaseTime {
  id: string;
  cnName?: string;
  country?: string;
  apifyCountry?: string; // 疫情网站的国家名称，跟country值不同
  slug?: string;// 国家简称
  iso2?: string;// 字母缩写
  recordCount?: number; // 统计天数
}

// 国家
export class Country extends BaseModel {
  public id!: string;
  public cnName?: string;
  public country?: string;
  public apifyCountry?: string; // 疫情网站的国家名称，跟country值不同
  public slug?: string;// 国家简称
  public iso2?: string;// 字母缩写
  public recordCount?: number; // 统计天数
}
Country.init({
  id: { type: DataTypes.BIGINT, primaryKey: true },
  cnName: { type: DataTypes.STRING, defaultValue: '' },
  country: { type: DataTypes.STRING, defaultValue: '' },
  slug: { type: DataTypes.STRING, defaultValue: '' },
  iso2: { type: DataTypes.STRING, defaultValue: '' },
  recordCount: { type: DataTypes.SMALLINT },
  apifyCountry: { type: DataTypes.STRING },
}, {
  ...modelOptions,
  tableName: 'covid19_countries',
  modelName: 'countries',
  comment: '国家表'
})
