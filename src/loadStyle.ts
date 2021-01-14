/**
 * @param {string|object} innerText - style标签的innerText 或传对象指定style的各项属性
 * @return {Promise<Element>}
 */
export default function (innerText: string | {
  innerText: string
  [others: string]: any
}): Promise<Element> {
  return new Promise((resolve, reject) => {
    if (!innerText || (typeof innerText === 'object' && !innerText.innerText)) {
      reject('innerText为空')
    }
    const style = document.createElement('style')
    style.onload = () => resolve(style)
    style.onerror = reject
    if (typeof innerText === 'string') {
      style.appendChild(document.createTextNode(innerText))
    } else {
      let props = innerText
      for (let k in props) {
        if (k === 'innerText') {
          style.appendChild(document.createTextNode(props[k]))
        } else {
          style[k] = props[k]
        }
      }
    }
    document.head.appendChild(style)
  })
}
