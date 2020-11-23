import { comma2Number } from '../../src/utils/stringUtil';

// 测试字符串转数字
(() => {
  console.log('输出', comma2Number('1,366'))
  console.log('输出', comma2Number(''))
  console.log('输出', comma2Number('xxx'))
  console.log('输出', comma2Number('123455'))
  console.log('输出', comma2Number('0'))
})()

