const noop = _ => _

/**
 * Parse simple path.
 */
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

const bailRE = new RegExp(('[^' + (unicodeRegExp.source) + '.$_\\d]'))

function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  let segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]]
    }
    return obj
  }
}

export default function getPropByPath (obj: object, exp?: string) {
  if (!exp) {
    return obj
  }

  let getter = parsePath(exp)

  if (getter) {
    return getter(obj)
  } else {
    console.warn(
      `Failed watching path: "${exp}" ` +
      'Watcher only accepts simple dot-delimited paths. ' +
      'For full control, use a function instead.'
    )
  }
}
