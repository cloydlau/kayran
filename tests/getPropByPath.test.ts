import getPropByPath from '../src/getPropByPath'

const obj = {
  a: {
    b: 'bingo'
  }
}

describe('getPropByPath', () => {
  it('a.b.c.d', () => {
    expect(getPropByPath(obj, 'a.b.c')).toEqual(undefined)
  })
  it('a.b.c', () => {
    expect(getPropByPath(obj, 'a.b.c')).toEqual(undefined)
  })
  it('a.c', () => {
    expect(getPropByPath(obj, 'a.c')).toEqual(undefined)
  })
  it('a.b', () => {
    expect(getPropByPath(obj, 'a.b')).toEqual('bingo')
  })
  it('a', () => {
    expect(getPropByPath(obj, 'a')).toEqual({
      b: 'bingo'
    })
  })
  it('', () => {
    expect(getPropByPath(obj, '')).toEqual(obj)
  })
  it('undefined', () => {
    expect(getPropByPath(obj)).toEqual(obj)
  })
})
