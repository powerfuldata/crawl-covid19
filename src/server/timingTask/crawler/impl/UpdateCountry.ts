import {ICrawler} from '../index'
import {updateCovid19CountryName} from '../../../service/CountryService'

/**
 * 每日6点检查更新，有新国家名称则更新
 */
export class UpdateCountry implements ICrawler {
  async run():Promise<any[]> {
    updateCovid19CountryName();
    return Promise.resolve([])
  };
}