import paramFilter from './paramFilter'

export default (data: object): FormData => {
  const formData = new FormData()
  data = paramFilter(data)
  for (let k in data) {
    formData.append(k, data[k])
  }
  return formData
}
