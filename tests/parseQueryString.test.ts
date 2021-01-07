/**
 * @jest-environment jsdom
 */

import parseQueryString from '../src/parseQueryString'
import qs from 'qs'

describe('parseQueryString', () => {
  const search = qs.stringify({
    code: 'codeInSearch',
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
})
