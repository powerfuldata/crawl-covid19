/**
 * @param {number[]} nums
 * @return {boolean}
 */
export const PredictTheWinner = (nums=[1,5,233,7,22,2,3]) => {
  let arr = JSON.parse(JSON.stringify(nums));
  let length = arr.length;
  const res = nums.reduce((result = {}, num = 0, index = 0) => {
      // index +=1;// 从1开始，让c1打先手
      const left = arr[0]
      const right = arr[arr.length - 1]
      if (index % 2 === 1) { // 奇数，让c1来
          result.c1 += (left > right ? left : right);
          left > right ? arr.shift() : arr.pop(); //移除头部还是尾部
      } else {// c2来
          result.c2 += (left > right ? left : right);
          left > right ? arr.shift() : arr.pop(); //移除头部还是尾部
      }
      return result;
  },{c1:0,c2:0});
  console.log('res:',res)
  return res.c1 >= res.c2;
};

function calculate(nums=[],isFirst = true) {

}