/**
 * @jest-environment jsdom
 */

import loadStyle from '../src/loadStyle'

describe('loadStyle', () => {
  let style

  afterEach(() => {
    style.remove()
  })

  it('加载成功', async () => {
    const value = '5px'
    expect(getComputedStyle(document.body).marginBottom).not.toEqual(value)
    style = await loadStyle(`
      body {
        margin-bottom: ${value};
      }
    `)
    expect(getComputedStyle(document.body).marginBottom).toEqual(value)
  })

  it('返回值为Element类型', async () => {
    const value = '5px'
    style = await loadStyle(`
      body {
        margin-bottom: ${value};
      }
    `)
    expect(style instanceof Element).toBeTruthy()
  })

  it('参数类型为object', async () => {
    const value = '5px'
    style = await loadStyle({
      innerText: `
        body {
          margin-bottom: ${value};
        }
      `,
      id: 'loadStyle-object'
    })
    expect(document.querySelector('#loadStyle-object')).toBe(style)
  })

  it('falsy参数 - string', async () => {
    await expect(loadStyle('')).rejects.toBeTruthy()
  })

  it('falsy参数 - object', async () => {
    await expect(loadStyle({
      innerText: ''
    })).rejects.toBeTruthy()
  })
})
