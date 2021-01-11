//import isPlainObject from 'lodash/isPlainObject'
//import cloneDeep from 'lodash/cloneDeep'
import { isPlainObject, cloneDeep } from 'lodash'

/**
 * @param {object} param - 需要过滤的对象
 * @param {function} exclusion - 过滤规则 返回true表示需要滤掉 默认实现：```v => [NaN, null, undefined].includes(v) || v.startsWith('__')```
 * @return {object} 过滤后的对象
 */
export default function paramFilter (
  param: object,
  exclusion:
    (value: any, key: any) => boolean =
    (v, k) => [NaN, null, undefined].includes(v) || k.startsWith('__')
) {
  if (param instanceof FormData) {
    return param
  }

  const newParam = cloneDeep(param)

  function recursion (arg) {
    for (const k in arg) {
      if (exclusion(arg[k], k)) {
        delete arg[k]
      } else if (isPlainObject(arg[k])) {
        recursion(arg[k])
      } else if (arg[k] instanceof Array) {
        for (const v of arg[k]) {
          recursion(v)
        }
      }
    }
  }

  recursion(newParam)

  return newParam
}
