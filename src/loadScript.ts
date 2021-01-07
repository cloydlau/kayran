/**
 * @param {string} src - 脚本url
 * @return {promise}
 */
export default function loadScript (src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    document.body.appendChild(script)
  })
}
