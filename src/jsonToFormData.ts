import paramFilter from './paramFilter'

export default function jsonToFormData (data: object) {
  const formData = new FormData()
  data = paramFilter(data)
  for (let k in data) {
    formData.append(k, data[k])
  }
  return formData
}
