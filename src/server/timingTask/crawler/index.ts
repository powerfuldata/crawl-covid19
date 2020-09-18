import {getCheerio} from './cheerio'


interface ICrawler {
  run: Function
}

// 
class ApifyList implements ICrawler {
  async run(){
    const $:CheerioStatic = await getCheerio();
    const table = $('#actual-data').next('table');// 查找与标题紧邻的table元素
    const thead = table.children().first();
    // 表头
    const titles = thead.find('tr').children().map((i, el) => $(el).text()).get();
    const tbody = table.children().last();
    const dataSource = tbody.children().map((i: number,row) => {
      return row.children.reduce((obj: any,column: any, index: number) => {
        const text = $(column).text();
        const key = titles[index];
        if (key) {
          obj[key] = text;
        }
        
        return obj;
      },{})
    }).get()
    console.log('dataSource:',dataSource)
    }
}