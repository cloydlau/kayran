/**
 * @jest-environment jsdom
 */

import isEllipsis from '../src/isEllipsis'
import loadStyle from '../src/loadStyle'

describe('isEllipsis', () => {
  beforeEach(async () => {
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
  `)
  })

  it('false', () => {
    const div = document.createElement('div')
    div.className = 'ellipsis'
    div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
    document.body.appendChild(div)

    expect(isEllipsis(div)).toEqual(false)
  })

  it('true', () => {
    const div = document.createElement('div')
    div.className = 'ellipsis'
    div.appendChild(document.createTextNode('这里是一段文字~~~~~~~~~~~'))
    document.body.appendChild(div)
    div.style.width = '50px'

    expect(isEllipsis(div)).toEqual(true)
  })
})
