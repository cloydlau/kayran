import { name } from '../package.json'
const errPrefix = `[${name}] `

import isEmpty from './isEmpty'
import notEmpty from './notEmpty'

/**
 * 为什么用toString()而不是String()
 *
 *   String(1.0) // '1'
 *   1.0.toString() // '1.0'
 *
 * deprecated: 但是1.0传入方法后自动变成1
 */

// 经度
const lng = (value: string | number, options?) => {
  const validateRange = value => {
    value = Number(value)
    if (value > 180 || value < -180) {
      return '经度的范围为[-180, 180]'
    }
  }

  value = value.toString()
  let errInfo
  if (isEmpty(value)) {
    errInfo = '必填项'
  } else if (/^-?\d+\.\d+$/.test(value)) {
    errInfo = validateRange(value)
    /*let decimalPart = value.toString().split('.')[1]
    if (decimalPart.length > 6) {
      errInfo = '最多6位小数'
    }*/
  } else if ((/^-?\d+$/).test(value)) {
    errInfo = validateRange(value)
  } else {
    errInfo = '格式不正确'
  }

  return errInfo
}

// 纬度
const lat = (value: string | number, options?) => {
  const validateRange = value => {
    value = Number(value)
    if (value > 90 || value < -90) {
      return '纬度的范围为[-90, 90]'
    }
  }

  value = value.toString()
  let errInfo = ''
  if (isEmpty(value)) {
    errInfo = '必填项'
  } else if (/^-?\d+\.\d+$/.test(value)) {
    errInfo = validateRange(value)
    /*let decimalPart = value.toString().split('.')[1]
    if (decimalPart.length > 6) {
      errInfo = '最多6位小数'
    }*/
  } else if ((/^-?\d+$/).test(value)) {
    errInfo = validateRange(value)
  } else {
    errInfo = '格式不正确'
  }

  return errInfo
}

// 手机
const phone = (value: string | number, options?) => {
  value = value.toString()
  let errInfo = ''
  if (notEmpty(value) && !/^1\d{10}$/.test(value)) {
    errInfo = '格式不正确'
  }

  return errInfo
}

// 身份证
const idCard = (value: string | number, options?) => {
  value = value.toString()
  let errInfo = ''

  if (notEmpty(value)) {
    // 加权因子
    let weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 校验码
    let check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

    let code = value + ''
    let last = value[17] //最后一位

    let seventeen = code.substring(0, 17)

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    let arr = seventeen.split('')
    let len = arr.length
    let num = 0
    for (let i = 0; i < len; i++) {
      // @ts-ignore
      num = num + arr[i] * weight_factor[i]
    }

    // 获取余数
    let resisue = num % 11
    let last_no = check_code[resisue]

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

    // 判断格式是否正确
    let format = idcard_patter.test(value)

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    if (!(last === last_no && format)) {
      errInfo = '格式不正确'
    }
  }

  return errInfo
}

// 座机
const tel = (value: string | number, { multiple = true }) => {
  value = value.toString()
  const regex = multiple ? /^[+\-;\d]*$/ : /^[+\-\d]*$/
  const length = multiple ? 50 : 20

  let errInfo = ''
  if (notEmpty(value)) {
    if (value.length > length) {
      errInfo = '不能超过' + length + '个字符'
    } else if (!regex.test(value)) {
      errInfo = '格式不正确' + (multiple ? '，如有多个请用英文分号隔开' : '')
    }
  }

  return errInfo
}

// 邮箱
const email = (value: string, options?) => {
  let errInfo = ''
  if (notEmpty(value) && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    errInfo = '格式不正确'
  }

  return errInfo
}

// 长度
const len = (value: string, [min, max]: [number, number]) => {
  let errInfo = ''
  if (notEmpty(value)) {
    if (value.length > max) {
      errInfo = '不能超过' + max + '个字符'
    } else if (min && value.length < min) {
      errInfo = '不能低于' + min + '个字符'
    }
  }

  return errInfo
}

// 整数
const int = (value: string | number, options?: string | {
  range?: string
  positiveSign?: boolean
}) => {
  let errInfo = ''
  if (notEmpty(value)) {
    let min, max, greaterThan, lessThan, range, positiveSign
    if (typeof options === 'object') {
      range = options.range
      positiveSign = options.positiveSign
      if (!positiveSign && typeof value === 'number') {
        console.warn(errPrefix + 'positiveSign仅对字符串值生效')
      }
    } else {
      range = options
    }
    if (range) {
      if (!/^[\[(](-?\d+|-∞),(-?\d+|\+∞)[\])]$/.test(range)) {
        throw Error(errPrefix + 'range参数格式不正确')
      }
      const [start, end] = range.substr(1, range.length - 2).split(',')
      if (start !== '-∞') {
        if (range.startsWith('(')) {
          greaterThan = start
        } else {
          min = start
        }
      }
      if (end !== '+∞') {
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
  }) => {
  let errInfo = ''
  if (notEmpty(value)) {
    let range, decimalPlaces, min, max, greaterThan, lessThan
    if (typeof options === 'object') {
      range = options.range
      decimalPlaces = options.decimalPlaces
    } else {
      range = options
    }
    if (range) {
      if (!/^[\[(](-?\d+\.?\d+|-∞),(-?\d+\.?\d+|\+∞)[\])]$/.test(range)) {
        console.log(range)
        throw Error(errPrefix + 'range参数格式不正确')
      }
      const [start, end] = range.substr(1, range.length - 2).split(',')
      if (start !== '-∞') {
        if (range.startsWith('(')) {
          greaterThan = start
        } else {
          min = start
        }
      }
      if (end !== '+∞') {
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
      case (!/(^\d+\.?\d+$)|(^\d+$)/.test(stringValue)) :
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
          } else if (maxDecimalPlaces === minDecimalPlaces) {
            console.warn(errPrefix + 'decimalPlaces的上下限相同时，可以简写为一个数字')
          }
          if (notEmpty(maxDecimalPlaces)) {
            if (decimalPart[1]?.length > maxDecimalPlaces) {
              errInfo = '最多' + maxDecimalPlaces + '位小数'
            }
          } else if (notEmpty(minDecimalPlaces)) {
            if (decimalPart[1]?.length < minDecimalPlaces) {
              errInfo = '最少' + maxDecimalPlaces + '位小数'
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
}
