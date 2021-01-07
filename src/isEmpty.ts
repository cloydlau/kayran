//import isPlainObject from 'lodash/isPlainObject'
import { isPlainObject } from 'lodash'

export default function isEmpty (v): boolean {
  return {
    object: () =>
      v === null ||
      v instanceof Array && v.length === 0 ||
      isPlainObject(v) && Object.getOwnPropertyNames(v).length === 0,
    number: () => isNaN(v),
    string: () => v === '',
    undefined: () => true,
    boolean: () => v === false,
    symbol: () => false,
    bigint: () => false
  }[typeof v]()
}
