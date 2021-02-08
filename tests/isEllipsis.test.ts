import 'expect-puppeteer'

import isEllipsis from '../src/isEllipsis'
import loadStyle from '../src/loadStyle'

const wait = promise => promise
.then(res => [res, null])
.catch(err => [null, err])

describe('isEllipsis', () => {
  beforeAll(async () => {
    /*await page.waitForFunction(async username => {
      await loadStyle(`
      .ellipsis {
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        line-height: normal;
      }
    `).then(() => {
        console.log('then')
      }).catch(() => {
        console.log('catch')
      }).finally(() => {
        console.log('finally')
      })
    })*/
  })

  it.only('false', async () => {
    const [res, err] = await wait(page.waitForFunction(() => {
      const div = document.createElement('div')
      div.className = 'ellipsis'
      div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
      document.body.appendChild(div)
      return isEllipsis(div)
    }))
    console.log('err', err)
    console.log('res', res)

    expect(err).toBeFalsy()
  })

  it('true', () => {
    const div = document.createElement('div')
    div.className = 'ellipsis'
    div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
    document.body.appendChild(div)
    div.style.width = '50px'

    expect(isEllipsis(div)).toBeTruthy()
  })
})
