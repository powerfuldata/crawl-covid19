import {ApifyList} from '../../src/server/timingTask/crawler/impl/ApifyList'
import {updateCovid19CountryName} from '../../src/server/service/CountryService'


// 获取apify网站的疫情信息
const getApifyList = async () => {
  const list = await new ApifyList().run();
  console.log('疫情数据=',list)
}

// 测试：yarn run ts-node __test__/controller/UtilitiesController.ts
(() => {
  
  updateCovid19CountryName()
})()