
import moment from 'moment';
// 时间格式-时分秒
export const TIME_FORMAT_HMS = 'YYYY-MM-DD HH:mm:ss'
/**
 * 年-月-日 时:分:秒
 * @param utcTime utc国际标准时间格式
 */
export const formatDateTime = (utcTime: string): string => {
  return utcTime ? moment(utcTime).format(TIME_FORMAT_HMS) : '';
}

/**
 * 获取当前时间
 * @returns string
 */
export const getCurrentTimeStr = () => {
  return moment(new Date()).format(TIME_FORMAT_HMS)
}