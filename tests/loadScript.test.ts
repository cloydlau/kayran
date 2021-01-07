/**
 * @jest-environment jsdom
 */

import loadScript from '../src/loadScript'

it('loadScript', () => {
  expect.assertions(2)
  expect(typeof globalThis.Vue).toEqual('undefined')
  loadScript('https://cdn.jsdelivr.net/npm/vue/dist/vue.js').then(e => {
    expect(typeof globalThis.Vue).toEqual('function')
  })
})
