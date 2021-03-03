/**
 * @param {string|object} src - script标签的src 或传对象指定script的各项属性
 * @return {Promise<Element>}
 */
export default function (src: string | {
  src: string
  [others: string]: any
}): Promise<Element> {
  return new Promise((resolve, reject) => {
    if (!src || (typeof src === 'object' && !src.src)) {
      reject('src为空')
    }
    const script = document.createElement('script')
    script.onload = () => resolve(script)
    script.onerror = reject
    if (typeof src === 'string') {
      script.src = src
    } else {
      let props = src
      for (let k in props) {
        script[k] = props[k]
      }
    }
    document.body.appendChild(script)
  })
}
