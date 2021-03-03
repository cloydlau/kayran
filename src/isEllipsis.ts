export default (dom: HTMLElement): boolean => {
  let checkDom = <HTMLElement>dom.cloneNode(), parent, flag
  checkDom.style.width = dom.offsetWidth + 'px'
  checkDom.style.height = dom.offsetHeight + 'px'
  checkDom.style.overflow = 'auto'
  checkDom.style.position = 'absolute'
  checkDom.style.zIndex = '-1'
  checkDom.style.opacity = '0'
  checkDom.style.whiteSpace = 'nowrap'
  checkDom.innerHTML = dom.innerHTML

  parent = dom.parentNode
  parent.appendChild(checkDom)
  flag = checkDom.scrollWidth > checkDom.offsetWidth
  parent.removeChild(checkDom)
  return flag
}
