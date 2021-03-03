import { isPlainObject } from 'lodash-es'

export default (value: any): boolean => {
  return {
    object: () =>
      value === null ||
      value instanceof Array && value.length === 0 ||
      isPlainObject(value) && Object.getOwnPropertyNames(value).length === 0,
    number: () => Number.isNaN(value),
    string: () => value === '',
    undefined: () => true,
    boolean: () => value === false,
    symbol: () => false,
    bigint: () => false
  }[typeof value]()
}
