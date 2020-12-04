import {updateCountryInTiming} from '../src/server/timingTask'
// yarn run nodemon --exec 'ts-node __test__/timingTask.ts'
(() => {
  updateCountryInTiming();// 定时任务，更新国家表
})()