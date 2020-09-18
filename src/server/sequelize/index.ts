import {Sequelize} from 'sequelize';
import { MYSQL_CONFIG } from '../../config'

// Sequelize实例
export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: MYSQL_CONFIG.HOST,
  username: MYSQL_CONFIG.USERNAME,
  password: MYSQL_CONFIG.PASSWORD,
  database: MYSQL_CONFIG.DATABASE,
  port: MYSQL_CONFIG.PORT,
  pool: {
    max: 10,
    min: 5,
    acquire: 300000, // 超时时间300秒
  },
})