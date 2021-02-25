import isEllipsis from '../src/isEllipsis'
import loadStyle from '../src/loadStyle'
import awaitFor from '../src/awaitFor'

const isEllipsisStr = isEllipsis.toString()
.replace(/\/\* istanbul ignore next \*\//g, '')
.replace(/cov_mwhopiwvn\(\)\..+]\+\+;/g, '')
.replace(/cov_mwhopiwvn\(\)\..+]\+\+,/g, '')

describe('isEllipsis', () => {
  beforeAll(async () => {
    const init = () => loadStyle(`
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
    `)
    // node环境
    if (page) {
      await page.waitForFunction(async username => {
        await init()
        .then(() => {
          console.log('then')
        }).catch(() => {
          console.log('catch')
        }).finally(() => {
          console.log('finally')
        })
      })
    }
    // 浏览器环境
    else {
      await init()
    }
  })

  describe('不限宽', () => {
    it('无样式', async () => {
      if (page) {
        const [res, err] = await awaitFor(page.waitForFunction(isEllipsisStr => {
          const div = document.createElement('div')
          div.className = 'ellipsis'
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, {}, isEllipsisStr))

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeFalsy()
      }
    })

    it('有样式', async () => {
      if (page) {
        const [res, err] = await awaitFor(page.waitForFunction(isEllipsisStr => {
          const div = document.createElement('div')
          div.className = 'ellipsis'
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, {}, isEllipsisStr))

        //console.log('res', res)
        //console.log('err', err)

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeFalsy()
      }
    })
  })

  describe('限宽', () => {
    it('无样式', async () => {
      if (page) {
        const [res, err] = await awaitFor(page.waitForFunction(isEllipsisStr => {
          const div = document.createElement('div')
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          div.style.width = '50px'
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, {}, isEllipsisStr))

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeFalsy()
      }
    })

    it('有样式', async () => {
      if (page) {
        const [res, err] = await awaitFor(page.waitForFunction(isEllipsisStr => {
          const div = document.createElement('div')
          div.className = 'ellipsis'
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          div.style.width = '50px'
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, {}, isEllipsisStr))

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeTruthy()
      }
    })
  })
})
