import typeOf from '../src/typeOf'

describe('typeOf', () => {
  it('number', () => {
    expect(typeOf(1)).toEqual('number')
    expect(typeOf(NaN)).toEqual('number')
  })

  it('string', () => {
    expect(typeOf('1')).toEqual('string')
    expect(typeOf('')).toEqual('string')
  })

  it('array', () => {
    expect(typeOf([1])).toEqual('array')
    expect(typeOf([])).toEqual('array')
  })

  it('object', () => {
    expect(typeOf({ a: 1 })).toEqual('object')
    expect(typeOf({})).toEqual('object')
  })

  it('undefined', () => {
    expect(typeOf(undefined)).toEqual('undefined')
  })

  it('null', () => {
    expect(typeOf(null)).toEqual('null')
  })

  it('boolean', () => {
    expect(typeOf(false)).toEqual('boolean')
  })

  it('symbol', () => {
    expect(typeOf(Symbol('key'))).toEqual('symbol')
    expect(typeOf(Symbol())).toEqual('symbol')
  })

  it('bigint', () => {
    expect(typeOf(BigInt(1))).toEqual('bigint')
    expect(typeOf(BigInt('1'))).toEqual('bigint')
    // @ts-ignore
    expect(typeOf(1n)).toEqual('bigint')
  })

  it('formdata', () => {
    expect(typeOf(new FormData())).toEqual('formdata')
  })
})
