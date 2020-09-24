import {Sequelize, InitOptions} from 'sequelize';
import { MYSQL_CONFIG } from '../../config'

// Sequelize实例
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: MYSQL_CONFIG.HOST,
  username: MYSQL_CONFIG.USERNAME,
  password: MYSQL_CONFIG.PASSWORD,
  database: MYSQL_CONFIG.DATABASE,
  port: MYSQL_CONFIG.PORT,
  logQueryParameters: true,
  pool: {
    max: 10,
    min: 5,
    acquire: 300000, // 超时时间300秒
  },
})

// Model全局配置，需要个性化配置需要在init方法中实现
export const modelOptions:InitOptions = {
  sequelize,
  charset:'utf-8',
  underscored: true,// 驼峰转下划线
  createdAt: 'createTime', // 创建时间
  updatedAt: 'updateTime', // 修改时间
  deletedAt: 'deletedTime',
  timestamps: true,
}
export default sequelize;