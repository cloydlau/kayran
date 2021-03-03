import isEllipsis from '../src/isEllipsis'
import loadStyle from '../src/loadStyle'
import awaitFor from '../src/awaitFor'
import fn2str from './fn2str'

const isEllipsisStr = fn2str(isEllipsis)
const loadStyleStr = fn2str(loadStyle)

const style = `
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
`

describe('isEllipsis', () => {
  describe('不限宽', () => {
    it('无样式', async () => {
      if (!window.navigator.userAgent) {
        const [res, err] = await awaitFor(page.evaluate((isEllipsisStr, loadStyleStr, style) => {
          new Function('return ' + loadStyleStr)()(style)
          const div = document.createElement('div')
          div.className = 'ellipsis'
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, isEllipsisStr, loadStyleStr, style))

        if (err) {
          console.log(err)
        }

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeFalsy()
      }
    })

    it('有样式', async () => {
      if (!window.navigator.userAgent) {
        const [res, err] = await awaitFor(page.evaluate(isEllipsisStr => {
          const div = document.createElement('div')
          div.className = 'ellipsis'
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, isEllipsisStr))

        if (err) {
          console.log(err)
        }

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeFalsy()
      }
    })
  })

  describe('限宽', () => {
    it('无样式', async () => {
      if (!window.navigator.userAgent) {
        const [res, err] = await awaitFor(page.evaluate(isEllipsisStr => {
          const div = document.createElement('div')
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          div.style.width = '50px'
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, isEllipsisStr))

        if (err) {
          console.log(err)
        }

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeFalsy()
      }
    })

    it('有样式', async () => {
      if (!window.navigator.userAgent) {
        const [res, err] = await awaitFor(page.evaluate(isEllipsisStr => {
          const div = document.createElement('div')
          div.className = 'ellipsis'
          div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
          document.body.appendChild(div)
          div.style.width = '50px'
          return new Function('return ' + isEllipsisStr)()(div).toString()
        }, isEllipsisStr))

        if (err) {
          console.log(err)
        }

        expect({
          'false': false,
          'true': true
        }[res._remoteObject.value]).toBeTruthy()
      }
    })
  })
})
