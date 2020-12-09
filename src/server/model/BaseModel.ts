import { Model } from 'sequelize'
import { formatDateTime } from '../../utils/format';
import {sequelize} from '../sequelize'

export interface BaseTime {
  createTime?: string;
  updateTime?: string;
}
// Model基类
export class BaseModel extends Model implements BaseTime {
  createTime?: string = '';
  updateTime?: string = '';
  // 格式化-创建时间
  get createTimeFormat(): string {
    console.log('createTime=',this.getDataValue('createTime'))
    return formatDateTime(this.getDataValue('createTime')!);
  }
  // 格式化-更新时间
  get updateTimeFormat(): string {
    console.log('updateTime=',this.getDataValue('updateTime'))
    return formatDateTime(this.getDataValue('updateTime')!);
  }
}

BaseModel.init({
  
},{sequelize})
