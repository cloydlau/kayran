import isBase64 from '../src/isBase64'

const withoutScheme = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4='
const withScheme = 'data:image/png;base64,' + withoutScheme

describe('isBase64', () => {
  it('123', () => {
    expect(isBase64('123')).toEqual(false)
  })
  it('withoutScheme', () => {
    expect(isBase64(withoutScheme, {
      scheme: false
    })).toEqual(true)
  })
  it('withScheme', () => {
    expect(isBase64(withScheme)).toEqual(true)
    expect(isBase64(withScheme, {})).toEqual(true)
    expect(isBase64(withScheme, {
      mediaType: 'image/gif'
    })).toEqual(false)
    expect(isBase64(withScheme, {
      mediaType: 'image/png'
    })).toEqual(true)
  })
})
