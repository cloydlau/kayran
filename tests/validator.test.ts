import {
  lng,
  lat,
  int,
  decimal,
  len,
  phone,
  tel,
  email,
  idCard,
  url,
  postcode,
  base64
} from '../src/validator'

describe('validator', () => {
  describe('lng', () => {
    it('合法', () => {
      expect(lng(0)).toBeFalsy()
      expect(lng('108.7777777')).toBeFalsy()
    })
    it('非法', () => {
      expect(lng('180.7777777')).toBeTruthy()
      expect(lng('-180.7777777')).toBeTruthy()
    })
  })

  describe('lat', () => {
    it('合法', () => {
      expect(lat(0)).toBeFalsy()
      expect(lat('80.7777777')).toBeFalsy()
    })
    it('非法', () => {
      expect(lat('90.7777777')).toBeTruthy()
      expect(lat('-90.7777777')).toBeTruthy()
    })
  })

  describe('int', () => {
    it('合法', () => {
      expect(int(0)).toBeFalsy()
      expect(int(1.0)).toBeFalsy()
      expect(int('80')).toBeFalsy()
      expect(int(0, '(-1,2)')).toBeFalsy()
      expect(int(0, '(-1,0]')).toBeFalsy()
      expect(int(+1)).toBeFalsy()
      expect(int('+1', {
        positiveSign: true
      })).toBeFalsy()
    })
    it('非法', () => {
      expect(int('1.0')).toBeTruthy()
      expect(int('90.7777777')).toBeTruthy()
      expect(int(0, '(0,2)')).toBeTruthy()
      expect(int('+1')).toBeTruthy()
    })
  })

  describe('decimal', () => {
    describe('合法', () => {
      it('number', () => {
        expect(decimal(80, {
          decimalPlaces: 0
        })).toBeFalsy()
        expect(decimal(90.7777777)).toBeFalsy()
        expect(decimal(80)).toBeFalsy()
        expect(decimal(80, '(-∞,+∞)')).toBeFalsy()
        expect(decimal(80, '[80,+∞]')).toBeFalsy()
        expect(decimal(80, '[-∞,80]')).toBeFalsy()
        expect(decimal(80.1, {
          decimalPlaces: 1
        })).toBeFalsy()
        expect(decimal(80.1, {
          decimalPlaces: [0, 1]
        })).toBeFalsy()
      })
      it('string', () => {
        expect(decimal('80', {
          decimalPlaces: 0
        })).toBeFalsy()
        expect(decimal('90.7777777')).toBeFalsy()
        expect(decimal('80')).toBeFalsy()
        expect(decimal('80', '(-∞,+∞)')).toBeFalsy()
        expect(decimal('80', '[80,+∞]')).toBeFalsy()
        expect(decimal('80', '[-∞,80]')).toBeFalsy()
        expect(decimal('80.1', {
          decimalPlaces: 1
        })).toBeFalsy()
        expect(decimal('80.1', {
          decimalPlaces: [0, 1]
        })).toBeFalsy()
      })
    })

    describe('非法', () => {
      it('number', () => {
        expect(decimal(80.1, {
          decimalPlaces: 0
        })).toBeTruthy()
        expect(decimal(80, '(80,+∞)')).toBeTruthy()
        expect(decimal(80, '(-∞,80)')).toBeTruthy()
        expect(decimal(80.1, {
          decimalPlaces: 2
        })).toBeTruthy()
        expect(decimal(80.1, {
          decimalPlaces: [2, 3]
        })).toBeTruthy()
      })
      it('string', () => {
        expect(decimal('80.1', {
          decimalPlaces: 0
        })).toBeTruthy()
        expect(decimal('80', '(80,+∞)')).toBeTruthy()
        expect(decimal('80', '(-∞,80)')).toBeTruthy()
        expect(decimal('80.1', {
          decimalPlaces: 2
        })).toBeTruthy()
        expect(decimal('80.1', {
          decimalPlaces: [2, 3]
        })).toBeTruthy()
      })
    })

    describe('抛错', () => {
      it('range', () => {
        expect(() => {
          decimal('80', '-∞,80')
        }).toThrow()
        expect(() => {
          decimal('80', {
            range: '-∞,80'
          })
        }).toThrow()
      })
      it('decimalPlaces', () => {
        expect(() => {
          decimal('80.1', {
            decimalPlaces: [3, 2]
          })
        }).toThrow()
        expect(() => {
          decimal('80.1', {
            decimalPlaces: [-1, 2]
          })
        }).toThrow()
        expect(() => {
          decimal('80.1', {
            decimalPlaces: [-2, -1]
          })
        }).toThrow()
      })
    })

    describe('len', () => {
      it('合法', () => {
        expect(len('123', 3)).toBeFalsy()
        expect(len('123', [1, 3])).toBeFalsy()
        expect(len('123', {
          min: 1,
          max: 3
        })).toBeFalsy()
        expect(len('123', [, 3])).toBeFalsy()
        expect(len('123', ['-∞', 3])).toBeFalsy()
        expect(len('123', [1, '+∞'])).toBeFalsy()
        expect(len('123', [1, undefined])).toBeFalsy()
        expect(len('123', {
          max: 3
        })).toBeFalsy()
      })
      it('非法', () => {
        expect(len('1234', [1, 3])).toBeTruthy()
        expect(len('1234', 3)).toBeTruthy()
        expect(len('1234', {
          max: 3
        })).toBeTruthy()
        expect(len('1234', {
          min: 5,
        })).toBeTruthy()
      })
      it('抛错', () => {
        expect(() => {
          len('123', {})
        }).toThrow()
        expect(() => {
          len('123', [3, 1])
        }).toThrow()
        expect(() => {
          len('123', ['∞', 3])
        }).toThrow()
        expect(() => {
          len('123', [3, 'x'])
        }).toThrow()
      })
    })

    describe('base64', () => {
      const withoutScheme = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4='
      const withScheme = 'data:image/png;base64,' + withoutScheme

      it('123', () => {
        expect(base64('123')).toBeTruthy()
        expect(base64('123', {
          scheme: false
        })).toBeTruthy()
      })
      it('withoutScheme', () => {
        expect(base64(withoutScheme, {
          scheme: false
        })).toBeFalsy()
      })
      it('withScheme', () => {
        expect(base64(withScheme)).toBeFalsy()
        expect(base64(withScheme, {})).toBeFalsy()
        expect(base64(withScheme, {
          mediaType: 'image/gif'
        })).toBeTruthy()
        expect(base64(withScheme, {
          mediaType: 'image/png'
        })).toBeFalsy()
      })
    })

    describe('phone', () => {
      it('合法', () => {
        expect(phone(13333333333)).toBeFalsy()
        expect(phone('13333333333')).toBeFalsy()
        expect(phone('14333333333')).toBeFalsy()
        expect(phone('15333333333')).toBeFalsy()
        expect(phone('16333333333')).toBeFalsy()
        expect(phone('17333333333')).toBeFalsy()
        expect(phone('18333333333')).toBeFalsy()
        expect(phone('19333333333')).toBeFalsy()
        expect(phone('+8619333333333')).toBeFalsy()
        expect(phone('008619333333333')).toBeFalsy()
      })
      it('非法', () => {
        expect(phone('10333333333')).toBeTruthy()
        expect(phone('12333333333')).toBeTruthy()
        expect(phone('1333333333')).toBeTruthy()
        expect(phone('133333333333')).toBeTruthy()
      })
    })

    describe('tel', () => {
      it('合法', () => {
        expect(tel('0341-86091234')).toBeFalsy()
        expect(tel('0341-86091231;0341-86091232;0341-86091233')).toBeFalsy()
        expect(tel('0341-8609123')).toBeFalsy()
        expect(tel('034-86091234')).toBeFalsy()
        expect(tel('86091234')).toBeFalsy()
        expect(tel('86091231;86091232;86091233;')).toBeFalsy()
      })
      it('非法', () => {
        expect(tel('0341+86091234')).toBeTruthy()
        expect(tel('0341-86091231;0341-86091232;0341-86091233;0341-86091234;0341-86091235')).toBeTruthy()
        expect(tel('0341-860912')).toBeTruthy()
        expect(tel('03-8609123')).toBeTruthy()
        expect(tel('034-8609123')).toBeTruthy()
        expect(tel('-86091234')).toBeTruthy()
        expect(tel('860912')).toBeTruthy()
        expect(tel('86091231;86091232;86091233;', {
          multiple: false
        })).toBeTruthy()
      })
    })

    describe('email', () => {
      it('合法', () => {
        expect(email('1@qq.com')).toBeFalsy()
        expect(email('好的@qq.com')).toBeFalsy()
        expect(email('abc@qq.com.cn')).toBeFalsy()
      })
      it('非法', () => {
        expect(email('qq.com')).toBeTruthy()
      })
    })

    describe('url', () => {
      it('合法', () => {
        expect(url('baidu.com')).toBeFalsy()
        expect(url('www.baidu.com')).toBeFalsy()
        expect(url('https://www.baidu.com')).toBeFalsy()
      })
      it('非法', () => {
        expect(url('baidu-com')).toBeTruthy()
      })
    })

    describe('idCard', () => {
      it('合法', () => {
        expect(idCard(110101199003077272)).toBeFalsy()
        expect(idCard('11010119900307727X')).toBeFalsy()
      })
      it('非法', () => {
        expect(idCard(11010119900307727)).toBeTruthy()
        expect(idCard(110101299003077272)).toBeTruthy()
      })
    })

    describe('postcode', () => {
      it('合法', () => {
        expect(postcode(550001)).toBeFalsy()
        expect(postcode('550001')).toBeFalsy()
      })
      it('非法', () => {
        expect(postcode(55000)).toBeTruthy()
        expect(postcode('5500011')).toBeTruthy()
      })
    })
  })
})
