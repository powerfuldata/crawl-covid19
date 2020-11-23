/**
 * 将带逗号的数字字符转换为数字类型
 * - 例如： "12,000" -> 12000
 * @param numStr 
 */
export const comma2Number = (numStr: string): number => {
  if (!numStr || typeof numStr !== 'string') return 0;
  const newStr = numStr.split(',').join('');
  return !!parseInt(newStr) ? parseInt(newStr) : 0;
}