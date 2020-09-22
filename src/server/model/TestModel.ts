import { Model, DataTypes} from 'sequelize';
import { modelOptions } from '../sequelize'

export class TestModel extends Model {
  public caseId?: number
}
TestModel.init({
  caseId: { type:DataTypes.BIGINT, primaryKey: true}
},{
  ...modelOptions,
  tableName:'country_case',
  modelName:'TestModel'
})