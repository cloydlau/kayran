import isEmpty from '../src/isEmpty'

describe('isEmpty', () => {
  describe('string', () => {
    describe('false', () => {
      it('\'0\'', () => {
        expect(isEmpty('0')).toEqual(false)
      })
      it('123', () => {
        expect(isEmpty('123')).toEqual(false)
      })
    })
    describe('true', () => {
      it('\'\'', () => {
        expect(isEmpty('')).toEqual(true)
      })
    })
  })

  describe('number', () => {
    describe('false', () => {
      it('0', () => {
        expect(isEmpty(0)).toEqual(false)
      })
      it('1', () => {
        expect(isEmpty(1)).toEqual(false)
      })
    })
    describe('true', () => {
      it('NaN', () => {
        expect(isEmpty(NaN)).toEqual(true)
      })
    })
  })

  describe('object', () => {
    describe('false', () => {
      it('{a:1}', () => {
        expect(isEmpty({ a: 1 })).toEqual(false)
      })
      it('Object.create({a:1})', () => {
        expect(isEmpty(Object.create({ a: 1 }))).toEqual(false)
      })
      it('Object.create({})', () => {
        expect(isEmpty(Object.create({ a: 1 }))).toEqual(false)
      })
      it('new Object({a:1})', () => {
        expect(isEmpty(new Object({ a: 1 }))).toEqual(false)
      })
    })
    describe('true', () => {
      it('{}', () => {
        expect(isEmpty({})).toEqual(true)
      })
      it('Object.create(null)', () => {
        expect(isEmpty(Object.create(null))).toEqual(true)
      })
      it('new Object()', () => {
        expect(isEmpty(new Object())).toEqual(true)
      })
      it('new Object({})', () => {
        expect(isEmpty(new Object({}))).toEqual(true)
      })
    })
  })

  describe('array', () => {
    describe('false', () => {
      it('[1]', () => {
        expect(isEmpty([1])).toEqual(false)
      })
      it('new Array(1)', () => {
        expect(isEmpty(new Array(1))).toEqual(false)
      })
      it('Array.from({ length: 1 })', () => {
        expect(isEmpty(Array.from({ length: 1 }))).toEqual(false)
      })
    })
    describe('true', () => {
      it('[]', () => {
        expect(isEmpty([])).toEqual(true)
      })
      it('new Array()', () => {
        expect(isEmpty(new Array())).toEqual(true)
      })
      it('new Array(0)', () => {
        expect(isEmpty(new Array(0))).toEqual(true)
      })
      it('Array.from({ length: 0 })', () => {
        expect(isEmpty(Array.from({ length: 0 }))).toEqual(true)
      })
    })
  })

  describe('undefined', () => {
    describe('true', () => {
      it('undefined', () => {
        expect(isEmpty(undefined)).toEqual(true)
      })
    })
  })

  describe('null', () => {
    describe('true', () => {
      it('null', () => {
        expect(isEmpty(null)).toEqual(true)
      })
    })
  })

  describe('boolean', () => {
    describe('false', () => {
      it('false', () => {
        expect(isEmpty(true)).toEqual(false)
      })
    })
    describe('true', () => {
      it('true', () => {
        expect(isEmpty(false)).toEqual(true)
      })
    })
  })

  describe('symbol', () => {
    describe('false', () => {
      it('Symbol("key")', () => {
        expect(isEmpty(Symbol('key'))).toEqual(false)
      })
      it('Symbol()', () => {
        expect(isEmpty(Symbol())).toEqual(false)
      })
    })
  })

  describe('bigint', () => {
    describe('false', () => {
      it('BigInt(1)', () => {
        expect(isEmpty(BigInt(1))).toEqual(false)
      })
      it('BigInt(\'1\')', () => {
        expect(isEmpty(BigInt('1'))).toEqual(false)
      })
      it('1n', () => {
        // @ts-ignore
        expect(isEmpty(1n)).toEqual(false)
      })
    })
  })
})
