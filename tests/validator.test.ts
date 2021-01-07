import {
  lng,
  lat,
  int,
  decimal,
  len,
  phone,
  tel,
  email,
  idCard,
} from '../src/validator'

describe('validator', () => {
  it('lng', () => {
    expect(lng(0)).toBeFalsy()
    expect(lng('108.7777777')).toBeFalsy()
    expect(lng('180.7777777')).toBeTruthy()
    expect(lng('-180.7777777')).toBeTruthy()
  })

  it('lat', () => {
    expect(lat(0)).toBeFalsy()
    expect(lat('80.7777777')).toBeFalsy()
    expect(lat('90.7777777')).toBeTruthy()
    expect(lat('-90.7777777')).toBeTruthy()
  })

  it('int', () => {
    expect(int(0)).toBeFalsy()
    expect(int(1.0)).toBeFalsy()
    expect(int('1.0')).toBeTruthy()
    expect(int('80')).toBeFalsy()
    expect(int('90.7777777')).toBeTruthy()
    expect(int(0, '(-1,2)')).toBeFalsy()
    expect(int(0, '(-1,0]')).toBeFalsy()
    expect(int(0, '(0,2)')).toBeTruthy()
    expect(int(+1)).toBeFalsy()
    expect(int('+1')).toBeTruthy()
    expect(int('+1', {
      positiveSign: true
    })).toBeFalsy()
  })

  it('decimal', () => {
    expect(decimal('90.7777777')).toBeFalsy()
    expect(decimal('80')).toBeFalsy()
    expect(decimal('80', {
      range: '-∞,80'
    })).toThrow()
    expect(decimal('80', {
      range: '(-∞,+∞)'
    })).toBeFalsy()
    expect(decimal('80', {
      range: '[80,+∞]'
    })).toBeFalsy()
    expect(decimal('80', {
      range: '(80,+∞)'
    })).toBeTruthy()
    expect(decimal('80', {
      range: '[-∞,80]'
    })).toBeFalsy()
    expect(decimal('80', {
      range: '(-∞,80)'
    })).toBeTruthy()
    expect(decimal('80', {
      decimalPlaces: 0
    })).toBeFalsy()
    expect(decimal('80.1', {
      decimalPlaces: 1
    })).toBeFalsy()
    expect(decimal('80.1', {
      decimalPlaces: 2
    })).toBeTruthy()
    expect(decimal('80.1', {
      decimalPlaces: [0, 1]
    })).toBeFalsy()
    expect(decimal('80.1', {
      decimalPlaces: [2, 3]
    })).toBeTruthy()
    expect(decimal('80.1', {
      decimalPlaces: [3, 2]
    })).toThrow()
  })
})
