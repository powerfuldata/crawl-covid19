
import {captureApifyInfo, updateCountryInTiming} from './server/timingTask'


captureApifyInfo();// 定时爬取疫情网站信息
updateCountryInTiming();// 定时更新国家表