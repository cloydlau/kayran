import paramFilter from '../src/paramFilter'

const dirtyParam = {
  a: NaN,
  b: {
    b1: null,
    b2: ''
  },
  c: undefined,
  d: 123,
  e: [
    { a: 0 },
    { b: null }
  ]
}

describe('paramFilter', () => {
  it('plain-object', () => {
    expect(paramFilter(dirtyParam)).toEqual({
      b: {
        b2: ''
      },
      d: 123,
      e: [
        { a: 0 },
        {}
      ]
    })
  })

  it('formdata', () => {
    const formData = new FormData()
    expect(paramFilter(formData)).toBe(formData)
  })

  it('exclusion', () => {
    expect(paramFilter(dirtyParam, (v, k) => true)).toEqual({})
  })
})
