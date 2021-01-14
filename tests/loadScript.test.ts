import loadScript from '../src/loadScript'

describe('loadScript', () => {
  let script

  afterEach(() => {
    script.remove()
    globalThis.Vue = undefined
  })

  it('加载成功', async () => {
    expect(globalThis.Vue).toBeFalsy()
    script = await loadScript('https://cdn.jsdelivr.net/npm/vue/dist/vue.js')
    expect(globalThis.Vue).toBeTruthy()
  })

  it('返回值为Element类型', async () => {
    script = await loadScript('https://cdn.jsdelivr.net/npm/vue/dist/vue.js')
    expect(script instanceof Element).toBeTruthy()
  })

  it('参数类型为object', async () => {
    const id = 'loadScript-object'
    expect(globalThis.Vue).toBeFalsy()
    script = await loadScript({
      src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
      id
    })
    expect(globalThis.Vue).toBeTruthy()
    expect(document.querySelector('#' + id)).toBe(script)
  })

  it('falsy参数 - string', async () => {
    await expect(loadScript('')).rejects.toBeTruthy()
  })

  it('falsy参数 - object', async () => {
    await expect(loadScript({
      src: ''
    })).rejects.toBeTruthy()
  })
})
