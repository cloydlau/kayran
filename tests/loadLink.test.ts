import loadLink from '../src/loadLink'

describe('loadLink', () => {
  it('加载成功', async () => {
    expect(getComputedStyle(document.body).margin).toEqual('8px')
    const link = await loadLink('https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css')
    expect(getComputedStyle(document.body).margin).toEqual('0px')
    link.remove()
  })

  it('返回值为Element类型', async () => {
    const link = await loadLink('https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css')
    expect(link instanceof Element).toBeTruthy()
    link.remove()
  })

  it('参数类型为object', async () => {
    expect(getComputedStyle(document.body).margin).toEqual('8px')
    const link = await loadLink({
      href: 'https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css',
      id: 'object'
    })
    expect(getComputedStyle(document.body).margin).toEqual('0px')
    expect(document.querySelector('#object')).toBe(link)
    link.remove()
  })

  it('falsy参数 - string', async () => {
    expect(getComputedStyle(document.body).margin).toEqual('8px')
    await expect(loadLink('')).rejects.toBeTruthy()
    expect(getComputedStyle(document.body).margin).toEqual('8px')
  })

  it('falsy参数 - object', async () => {
    expect(getComputedStyle(document.body).margin).toEqual('8px')
    await expect(loadLink({
      href: ''
    })).rejects.toBeTruthy()
    expect(getComputedStyle(document.body).margin).toEqual('8px')
  })
})
