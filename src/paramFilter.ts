//import isPlainObject from 'lodash/isPlainObject'
//import cloneDeep from 'lodash/cloneDeep'
import { isPlainObject, cloneDeep } from 'lodash'

function isInvalid (v) {
  return [NaN, null, undefined].includes(v)
}

/**
 * @param {Object} param - 需要过滤的对象
 * @param {Function} filterRule - 过滤方法 返回true表示需要滤掉 默认滤掉双下划线__开头的变量
 * @return {Object} 过滤后的对象
 */
export default function paramFilter (param, filterRule?) {
  if (param instanceof FormData) {
    return param
  }

  const newParam = cloneDeep(param)

  function fn (arg) {
    for (const k in arg) {
      if (isInvalid(arg[k])) {
        delete arg[k]
      } else if (typeof filterRule === 'function' ? filterRule(k) : k.startsWith('__')) {
        delete arg[k]
      } else if (isPlainObject(arg[k])) {
        fn(arg[k])
      } else if (arg[k] instanceof Array) {
        for (const v of arg[k]) {
          fn(v)
        }
      }
    }
  }

  fn(newParam)

  return newParam
}
