/**
 * @param {string | object} href - link标签的href 或传对象指定link的各项属性
 * @return {Promise<Element>}
 */
export default function (href: string | {
  href: string
  [others: string]: any
}): Promise<Element> {
  return new Promise((resolve, reject) => {
    if (!href || (typeof href === 'object' && !href.href)) {
      reject('href为空')
    }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.onerror = reject
    if (typeof href === 'string') {
      link.href = href
    } else {
      let props = href
      for (let k in props) {
        link[k] = props[k]
      }
    }

    // hack
    const img = document.createElement('img')
    img.onerror = () => resolve(link)
    img.src = link.href

    document.head.appendChild(link)
  })
}
