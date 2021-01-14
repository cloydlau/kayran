import parseQueryString from '../src/parseQueryString'
import qs from 'qs'

describe('parseQueryString', () => {
  const search = qs.stringify({
    code: 'codeInSearch',
    s: 'search',
  }, {
    addQueryPrefix: true
  })

  const searchWithoutCode = qs.stringify({
    s: 'search',
  }, {
    addQueryPrefix: true
  })

  const hash = '#/' + qs.stringify({
    code: 'codeInHash',
    h: 'hash'
  }, {
    addQueryPrefix: true
  })

  const hashWithoutCode = '#/' + qs.stringify({
    h: 'hash'
  }, {
    addQueryPrefix: true
  })

  it('字符串参数', () => {
    expect(parseQueryString('a')).toEqual('')
  })

  it('mode参数错误', () => {
    expect(() => {
      parseQueryString({
        mode: 'absolute'
      })
    }).toThrow()
  })

  it('history', () => {
    expect(parseQueryString({
      search,
      key: 's',
      mode: 'history'
    })).toEqual('search')

    expect(parseQueryString({
      search,
      key: 's',
    })).toEqual('')
  })

  it('hash', () => {
    expect(parseQueryString({
      hash,
      key: 'h',
    })).toEqual('hash')

    expect(parseQueryString({
      hash,
      key: 'h',
      mode: 'history'
    })).toEqual('')
  })

  it('search + hash', () => {
    expect(parseQueryString({
      search,
      hash,
      key: 'code',
    })).toEqual('codeInSearch')

    expect(parseQueryString({
      search,
      hash,
    })).toEqual({
      code: 'codeInSearch',
      h: 'hash'
    })

    expect(parseQueryString({
      search,
      hash,
      mode: 'history'
    })).toEqual({
      code: 'codeInSearch',
      s: 'search'
    })
  })

  it('删除', () => {
    expect(parseQueryString({
      search,
      hash,
      key: 'code',
      del: true
    })).toEqual('codeInSearch')

    expect(parseQueryString({
      search,
      hash,
      key: 'h',
      del: true
    })).toEqual('hash')

    expect(parseQueryString({
      search,
      hash,
      key: 'code',
      mode: 'history',
      del: true
    })).toEqual('codeInSearch')

    expect(parseQueryString({
      search,
      hash,
      key: 's',
      mode: 'history',
      del: true
    })).toEqual('search')

    expect(parseQueryString({
      search,
      hash,
      del: true
    })).toEqual({
      code: 'codeInSearch',
      h: 'hash'
    })

    expect(parseQueryString({
      search: searchWithoutCode,
      hash: hashWithoutCode,
      del: true
    })).toEqual({
      h: 'hash'
    })

    expect(parseQueryString({
      search: searchWithoutCode,
      hash,
      mode: 'history',
      del: true
    })).toEqual({
      s: 'search'
    })
  })

  it('如果search中没拿到code 则沿用hash中的code', () => {
    expect(parseQueryString({
      search: searchWithoutCode,
      hash,
    })).toEqual({
      code: 'codeInHash',
      h: 'hash'
    })
  })
})
