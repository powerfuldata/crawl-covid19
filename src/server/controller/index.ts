import { task } from '../timingTask'

// 1.制定定时任务，定时爬页面
// 2.爬取到数据，入库
// crone time规则生成器，https://cron.qqe2.com/
export const start = () => {
  task();
}