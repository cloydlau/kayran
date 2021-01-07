import paramFilter from '../src/paramFilter'

it('paramFilter', () => {
  const dirtyParam = {
    a: NaN,
    b: {
      b1: null,
      b2: ''
    },
    c: undefined,
    d: 123
  }

  expect(paramFilter(dirtyParam)).toEqual({
    b: {
      b2: ''
    },
    d: 123
  })
})
