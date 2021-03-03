import './validator.scss'

export default (selectors: string | Element | NodeList = '.el-form .el-form-item.is-error'): void => {
  function elementInView (element) {
    const rect = element.getBoundingClientRect()
    const yInView = rect.top < window.innerHeight && rect.bottom > 0
    const xInView = rect.left < window.innerWidth && rect.right > 0
    return yInView && xInView
  }

  const animateCSS = (el, animationName) =>
    new Promise<void>((resolve, reject) => {
      if (el) {
        // @ts-ignore
        for (let v of el instanceof NodeList ? el : [el]) {
          v.classList.add('animate__animated', animationName)

          const handleAnimationEnd = () => {
            v.classList.remove('animate__animated', animationName)
            v.removeEventListener('animationend', handleAnimationEnd)
            resolve()
          }

          v.addEventListener('animationend', handleAnimationEnd)
        }
      } else {
        reject()
      }
    })

  // is-error类名需要异步才能获取到
  setTimeout(() => {
    const errFormItems = typeof selectors === 'string' ? document.querySelectorAll(selectors) : selectors

    // 视图滚动至校验失败的第一个表单项
    if (errFormItems[0] && !elementInView(errFormItems[0])) {
      errFormItems[0].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
    // 对所有校验失败的表单项产生震动效果
    animateCSS(errFormItems, 'animate__headShake').catch(e => {
      console.warn(e)
    })
  }, 0)
}
