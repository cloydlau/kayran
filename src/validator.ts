import { name } from '../package.json'
const errPrefix = `[${name}] `

import notEmpty from './notEmpty'
import isEmpty from './isEmpty'

/**
 * 为什么用toString()而不是String()
 *
 *   String(1.0) // '1'
 *   1.0.toString() // '1.0'
 *
 * deprecated: 但是1.0传入方法后自动变成1
 */
7
// 经度
const lng = (value: string | number, options?): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    value = value.toString()
    if (/^-?(\d+|\d+\.\d+)$/.test(value)) {
      value = Number(value)
      if (value > 180 || value < -180) {
        errInfo = '经度的范围为[-180, 180]'
      }
    } else {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// 纬度
const lat = (value: string | number, options?): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    value = value.toString()
    if (/^-?(\d+|\d+\.\d+)$/.test(value)) {
      value = Number(value)
      if (value > 90 || value < -90) {
        errInfo = '纬度的范围为[-90, 90]'
      }
    } else {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// 手机
const phone = (value: string | number): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    value = value.toString()
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// url
const url = (value: string): string => {
  let errInfo = ''
  if (notEmpty(value)) {
    if (!/^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(value)) {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// base64
const base64 = (value: string, { mediaType = '', scheme = true }: {
  mediaType?: string,
  scheme?: boolean
} = {}): string => {
  let errInfo = ''
  if (notEmpty(value)) {
    if (scheme && !value.startsWith(`data:${mediaType}`)) {
      errInfo = '缺失scheme'
    } else {
      const data = scheme ? value.split(',')[1] : value
      if (!(data && /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(data))) {
        errInfo = '格式不正确'
      }
    }
  }

  return errInfo
}

// 身份证
const idCard = (value: string | number, options?): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    value = value.toString()
    if (!/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(value)) {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// 邮编
const postcode = (value: string | number, options?): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    value = value.toString()
    if (!/^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/.test(value)) {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// 座机
const tel = (value: string | number, { multiple = true } = {}): string => {
  const regex = multiple ? /^((?:\d{3}-)?\d{8};?)+$|^((?:\d{4}-)?\d{7,8};?)+$/ : /^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7,8}$/
  const maxLen = 50

  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    value = value.toString()
    if (value.length > maxLen) {
      errInfo = '不能超过' + maxLen + '个字符'
    } else if (!regex.test(value)) {
      errInfo = '格式不正确' + (multiple ? '，如有多个请用英文分号隔开' : '')
    }
  }

  return errInfo
}

// 邮箱
const email = (value: string): string => {
  let errInfo = ''
  if (!/^[\u4e00-\u9fa5\dA-Za-z_-]+@[\dA-Za-z_-]+(\.[\dA-Za-z_-]+)+$/.test(value)) {
    errInfo = '格式不正确'
  }

  return errInfo
}

// 长度
const len = (value: string,
  options:
    number |
    [number, number] |
    {
      min?: number
      max?: number
    }
): string => {
  let errInfo = '', target, min, max
  if (typeof options === 'number') {
    if (Number.isNaN(options)) {
      throw Error(errPrefix + 'options不能为NaN')
    }
    target = options
  } else if (Array.isArray(options)) {
    min = options[0]
    max = options[1]
  } else if (options && typeof options === 'object') {
    min = options.min
    max = options.max
  }
  if (Number.isNaN(min)) {
    throw Error(errPrefix + 'min不能为NaN')
  }
  if (Number.isNaN(max)) {
    throw Error(errPrefix + 'max不能为NaN')
  }
  if (max < 0) {
    throw Error(errPrefix + 'max不能为负')
  }
  if (min < 0) {
    throw Error(errPrefix + 'min不能为负')
  }
  if (max < min) {
    throw Error(errPrefix + 'max不能小于min')
  }
  if (isEmpty(target) && isEmpty(min) && isEmpty(max)) {
    throw Error(errPrefix + '未指定任何校验条件')
  }
  if (value === '' || notEmpty(value)) {
    if (value.length > max) {
      errInfo = '不能超过' + max + '个字符'
    } else if (min && value.length < min) {
      errInfo = '不能低于' + min + '个字符'
    } else if (notEmpty(target) && value.length !== target) {
      errInfo = '字符数需为' + min
    }
  }

  return errInfo
}

// 整数
const int = (value: string | number, options?: string | {
  range?: string
  positiveSign?: boolean
}): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    let min, max, greaterThan, lessThan, range, positiveSign
    if (typeof options === 'object') {
      range = options.range
      positiveSign = options.positiveSign
    } else {
      range = options
    }
    if (!positiveSign && typeof value === 'number') {
      process.env.NODE_ENV === 'production' && console.warn(errPrefix + 'positiveSign仅对字符串生效')
    }
    if (range) {
      if (!/^[\[(](-?\d*|-∞),(-?\d*|\+∞)[\])]$/.test(range)) {
        throw Error(errPrefix + 'range参数格式不正确')
      }
      const [start, end] = range.substr(1, range.length - 2).split(',')
      if (!['', '-∞'].includes(start)) {
        if (range.startsWith('(')) {
          greaterThan = start
        } else {
          min = start
        }
      }
      if (!['', '+∞'].includes(end)) {
        if (range.endsWith(')')) {
          lessThan = end
        } else {
          max = end
        }
      }
    }
    const numberValue = Number(value)
    const stringValue = value.toString()
    switch (true) {
      case (!((positiveSign ? /^[\+\-]?\d+$/ : /^\-?\d+$/).test(stringValue))):
        errInfo = '需为整数'
        break
      case (notEmpty(min) && numberValue < min) :
        errInfo = '不能小于' + min
        break
      case (notEmpty(max) && numberValue > max) :
        errInfo = '不能大于' + max
        break
      case (notEmpty(greaterThan) && numberValue <= greaterThan) :
        errInfo = '需大于' + greaterThan
        break
      case (notEmpty(lessThan) && numberValue >= lessThan) :
        errInfo = '需小于' + lessThan
        break
      /*case (notEmpty(minLen) && stringValue.length < minLen) :
        errInfo = minLen + '位以上'
        break
      case (notEmpty(maxLen) && stringValue.length > maxLen) :
        errInfo = maxLen + '位以内'
        break
      case (notEmpty(len) && stringValue.length !== len) :
        errInfo = '长度需为' + len + '位'*/
    }
  }

  return errInfo
}

// 小数
const decimal = (
  value: string | number,
  options?: string | {
    range?: string,
    decimalPlaces?: number | [number, number]
  }): string => {
  let errInfo = ''
  if (typeof value === 'number' && Number.isNaN(value)) {
    errInfo = '格式不正确'
  } else if (notEmpty(value)) {
    let range, decimalPlaces, min, max, greaterThan, lessThan
    if (typeof options === 'object') {
      range = options.range
      decimalPlaces = options.decimalPlaces
    } else {
      range = options
    }
    if (range) {
      if (!/^[\[(](-?\d*\.?\d*|-∞),(-?\d*\.?\d*|\+∞)[\])]$/.test(range)) {
        throw Error(errPrefix + 'range参数格式不正确')
      }
      const [start, end] = range.substr(1, range.length - 2).split(',')
      if (!['', '-∞'].includes(start)) {
        if (range.startsWith('(')) {
          greaterThan = start
        } else {
          min = start
        }
      }
      if (!['', '+∞'].includes(end)) {
        if (range.endsWith(')')) {
          lessThan = end
        } else {
          max = end
        }
      }
    }
    const numberValue = Number(value)
    const stringValue = value.toString()
    switch (true) {
      case (!/^-?(\d+|\d+\.\d+)$/.test(stringValue)) :
        errInfo = '需为数字'
        break
      case (notEmpty(min) && numberValue < min) :
        errInfo = '不能小于' + min
        break
      case (notEmpty(max) && numberValue > max) :
        errInfo = '不能大于' + max
        break
      case (notEmpty(greaterThan) && numberValue <= greaterThan) :
        errInfo = '需大于' + greaterThan
        break
      case (notEmpty(lessThan) && numberValue >= lessThan) :
        errInfo = '需小于' + lessThan
        break
      default :
        const decimalPart = stringValue.split('.')
        if (typeof decimalPlaces === 'number') {
          switch (true) {
            case decimalPlaces < 0:
              throw Error('decimalPlaces不能小于0')
            case decimalPlaces === 0:
              if (notEmpty(decimalPart[1])) {
                errInfo = '需为整数'
              }
              break
            default:
              if (decimalPart[1]?.length !== decimalPlaces) {
                errInfo = '小数位数需为' + decimalPlaces + '位'
              }
          }
        } else if (Array.isArray(decimalPlaces)) {
          const [minDecimalPlaces, maxDecimalPlaces] = decimalPlaces
          if (maxDecimalPlaces < minDecimalPlaces) {
            throw Error(errPrefix + 'decimalPlaces的上限不能小于下限')
          }
          if (Number.isNaN(maxDecimalPlaces)) {
            throw Error(errPrefix + 'decimalPlaces[1]不能为NaN')
          } else {
            if (maxDecimalPlaces < 0) {
              throw Error(errPrefix + 'decimalPlaces的上限不能为负')
            }
            if ((decimalPart[1]?.length ?? 0) > maxDecimalPlaces) {
              errInfo = '最多' + maxDecimalPlaces + '位小数'
            }
          }
          if (Number.isNaN(minDecimalPlaces)) {
            throw Error(errPrefix + 'decimalPlaces[0]不能为NaN')
          } else {
            if (minDecimalPlaces < 0) {
              throw Error(errPrefix + 'decimalPlaces[0]不能为负')
            }
            if ((decimalPart[1]?.length ?? 0) < minDecimalPlaces) {
              errInfo = '最少' + minDecimalPlaces + '位小数'
            }
          }
        }
    }
  }

  return errInfo
}

export {
  lng,
  lat,
  int,
  decimal,
  len,
  phone,
  tel,
  email,
  idCard,
  url,
  postcode,
  base64
}
