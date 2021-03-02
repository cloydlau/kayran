export default fn => {
  return fn.toString()
  .replace(/\/\* istanbul ignore next \*\//g, '')
  .replace(/cov_.+\(\)\..+]\+\+;/g, '')
  .replace(/cov_.+\(\)\..+]\+\+,/g, '')
}
