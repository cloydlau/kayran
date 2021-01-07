/**
 * 检测变量类型最佳实践
 */
export default function typeOf (variate): string {
  return ({}).toString.call(variate).slice(8, -1).toLowerCase()
}
