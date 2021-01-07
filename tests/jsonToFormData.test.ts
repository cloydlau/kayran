//import { describe, it, expect, run } from 'jest-lite'
import jsonToFormData from '../src/jsonToFormData'

// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
it('jsonToFormData', () => {
  const json = {
    a: 1,
    b: 2
  }

  const formData = jsonToFormData(json)

  let flag = true, cnt = 0
  for (let k in json) {
    cnt++
    if (formData.get(k) !== String(json[k])) {
      flag = false
    }
  }

  expect(flag).toEqual(true)
  expect(cnt).toEqual(Object.getOwnPropertyNames(json).length)
})
