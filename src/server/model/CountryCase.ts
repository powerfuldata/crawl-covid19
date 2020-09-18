import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

// 各个国家确诊实体
export class CountryCase extends Model { };

CountryCase.init({
  Country: { type: DataTypes.STRING },
  Tested: { type: DataTypes.BIGINT },
  Infected: { type: DataTypes.BIGINT },
  Recovered: { type: DataTypes.BIGINT },
  Deceased: { type: DataTypes.BIGINT },
  Source: { type: DataTypes.STRING },
},{
  sequelize,
  modelName: 'CountryCase',
  tableName:'',
  charset:'utf-8',
  comment:'各国确诊数量表',
  createdAt: 'createTime',
  updatedAt: 'updatedTime',
  deletedAt: 'deletedTime',
})