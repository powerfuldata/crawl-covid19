import {Country} from '../index';
import { queryInterfaceInstance, sequelize } from '../../sequelize';
import { QueryTypes} from 'sequelize';
import {getCurrentTimeStr} from '../../../utils/format'

/**
 * 查询apifyCountry=’‘的所有记录
 */
export const selectWithoutApifyName = async (): Promise<Country[]> => {
  const countryList: Country[] = await Country.findAll({
    raw: true,// 去除sequelize其他字段
    attributes:['id','cnName','country','slug','iso2','apifyCountry'],
    where: { apifyCountry: '' }
  });
  return countryList
}
/**
 * 批量更新ApifyName
 * API文档：https://sequelize.org/v5/manual/raw-queries.html
 * 执行sql
 * ```update covid19_countries set update_time='xxxx',apify_country=case id
 * when xx then xx
 * when xx then xx
 * end
 * where id IN (1,2,3)```
 */
export const batchUpdateApifyName = (values: {id:string, apifyCountry:string, country?:string}[]): void => {
  sequelize.query(`update covid19_countries set
  update_time='${getCurrentTimeStr()}',
  apify_country= 
  case id
  ${values.reduce((str:string, item) => {
    str += `when ${item.id} then '${item.apifyCountry}'\n`
    return str;
  },'')}
  end
  where id IN (:ids)
  `,{
    replacements:{ids: values.map(i => i.id)},// 替换上面的模板 `:ids`
    model:Country,
    mapToModel: true,
    type: QueryTypes.UPDATE,
  }).then(res => {
    console.log('成功数量=',res.length)
  }).catch(e => console.log(e))
  
}
