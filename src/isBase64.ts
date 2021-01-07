export default function isBase64 (str: string, { mediaType = '', scheme = true }: {
  mediaType?: string,
  scheme?: boolean
} = {}) {
  if (scheme && !str.startsWith(`data:${mediaType}`)) {
    return false
  }
  const data = scheme ? str.split(',')?.[1] : str
  return Boolean(data && /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(data))
}
