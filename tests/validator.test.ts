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
  base64,
} from '../src/validator'

describe('validator', () => {
  describe('lng', () => {
    it('合法', () => {
      expect(lng(0)).toEqual('')
      expect(lng('108.7777777')).toEqual('')
      expect(lng('')).toEqual('')
    })
    it('非法', () => {
      expect(lng('180.7777777')).toBeTruthy()
      expect(lng('-180.7777777')).toBeTruthy()
      expect(lng('-80.')).toBeTruthy()
      expect(lng(NaN)).toBeTruthy()
    })
  })

  describe('lat', () => {
    it('合法', () => {
      expect(lat('')).toEqual('')
      expect(lat(0)).toEqual('')
      expect(lat('80.7777777')).toEqual('')
    })
    it('非法', () => {
      expect(lat('90.7777777')).toBeTruthy()
      expect(lat('-90.7777777')).toBeTruthy()
      expect(lat('x')).toBeTruthy()
      expect(lat(NaN)).toBeTruthy()
    })
  })

  describe('int', () => {
    it('合法', () => {
      expect(int('')).toEqual('')
      expect(int(0)).toEqual('')
      expect(int(1.0)).toEqual('')
      expect(int('80')).toEqual('')
      expect(int(0, '(-1,2)')).toEqual('')
      expect(int(0, '[-1,0]')).toEqual('')
      expect(int(+1)).toEqual('')
      expect(int('+1', {
        positiveSign: true
      })).toEqual('')
      expect(int(+1, {
        positiveSign: true
      })).toEqual('')
      expect(int(0, '(-∞,2)')).toEqual('')
      expect(int(0, '(-1,+∞)')).toEqual('')
    })
    it('非法', () => {
      expect(int('1.0')).toBeTruthy()
      expect(int('90.7777777')).toBeTruthy()
      expect(int(0, '(0,2)')).toBeTruthy()
      expect(int(0, '(-2,0)')).toBeTruthy()
      expect(int(0, '[1,2]')).toBeTruthy()
      expect(int(0, '[-2,-1]')).toBeTruthy()
      expect(int('+1')).toBeTruthy()
      expect(() => {
        int(0, '(-1,0')
      }).toThrow()
      expect(int(NaN)).toBeTruthy()
    })
  })

  describe('decimal', () => {
    describe('合法', () => {
      it('number', () => {
        expect(decimal('')).toEqual('')
        expect(decimal(80, {
          decimalPlaces: 0
        })).toEqual('')
        expect(decimal(90.7777777)).toEqual('')
        expect(decimal(80)).toEqual('')
        expect(decimal(80, '(-∞,+∞)')).toEqual('')
        expect(decimal(80, '[80,+∞]')).toEqual('')
        expect(decimal(80, '[-∞,80]')).toEqual('')
        expect(decimal(80.1, {
          decimalPlaces: 1
        })).toEqual('')
        expect(decimal(80.1, {
          decimalPlaces: [0, 1]
        })).toEqual('')
      })
      it('string', () => {
        expect(decimal('80', {
          decimalPlaces: 0
        })).toEqual('')
        expect(decimal('90.7777777')).toEqual('')
        expect(decimal('80')).toEqual('')
        expect(decimal('80', '(-∞,+∞)')).toEqual('')
        expect(decimal('80', '[80,+∞]')).toEqual('')
        expect(decimal('80', '[-∞,80]')).toEqual('')
        expect(decimal('80.1', {
          decimalPlaces: 1
        })).toEqual('')
        expect(decimal('80.1', {
          decimalPlaces: [0, 1]
        })).toEqual('')
        expect(decimal('80.1', {
          decimalPlaces: [0, 2]
        })).toEqual('')
        expect(decimal('80.1', {
          decimalPlaces: null
        })).toEqual('')
      })
    })

    describe('非法', () => {
      it('number', () => {
        expect(decimal('x')).toBeTruthy()
        expect(decimal(80, {
          decimalPlaces: 1
        })).toBeTruthy()
        expect(decimal(80.1, {
          decimalPlaces: 0
        })).toBeTruthy()
        expect(() => {
          decimal(80.1, {
            decimalPlaces: -1
          })
        }).toThrow()
        expect(decimal(80, '(80,+∞)')).toBeTruthy()
        expect(decimal(80, '(-∞,80)')).toBeTruthy()
        expect(decimal(80, '[-∞,79]')).toBeTruthy()
        expect(decimal(80, '[81,+∞]')).toBeTruthy()
        expect(decimal(80.1, {
          decimalPlaces: 2
        })).toBeTruthy()
        expect(decimal(80.123, {
          decimalPlaces: [1, 2]
        })).toBeTruthy()
        expect(decimal(80, {
          decimalPlaces: [1, 2]
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
        expect(decimal(NaN)).toBeTruthy()
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
        expect(() => {
          decimal('80.1', {
            decimalPlaces: [NaN, 1]
          })
        }).toThrow()
        expect(() => {
          decimal('80.1', {
            decimalPlaces: [1, NaN]
          })
        }).toThrow()
      })
    })
  })

  describe('len', () => {
    it('合法', () => {
      expect(len('', 0)).toEqual('')
      expect(len(null, 1)).toEqual('')
      expect(len('123', 3)).toEqual('')
      expect(len('123', [1, 3])).toEqual('')
      expect(len('123', {
        min: 1,
        max: 3
      })).toEqual('')
      expect(len('123', [, 3])).toEqual('')
      expect(len('123', [1, Infinity])).toEqual('')
      expect(len('123', [1, undefined])).toEqual('')
      expect(len('123', {
        max: 3
      })).toEqual('')
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
        len('123', NaN)
      }).toThrow()
      expect(() => {
        len('123', [-Infinity, 3])
      }).toThrow()
      expect(() => {
        len('123', {})
      }).toThrow()
      expect(() => {
        expect(len('1234', null)).toEqual('')
      }).toThrow()
      expect(() => {
        len('123', [3, 1])
      }).toThrow()
      expect(() => {
        len('123', [NaN, 3])
      }).toThrow()
      expect(() => {
        len('123', [3, NaN])
      }).toThrow()
      expect(() => {
        len('123', [-1, 3])
      }).toThrow()
      expect(() => {
        len('123', [-2, -1])
      }).toThrow()
    })
  })

  describe('base64', () => {
    const withoutScheme = 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4='
    const withScheme = 'data:image/png;base64,' + withoutScheme

    it('合法', () => {
      expect(base64(withoutScheme, {
        scheme: false
      })).toEqual('')
      expect(base64(withScheme)).toEqual('')
      expect(base64(withScheme, {})).toEqual('')
      expect(base64(withScheme, {
        mediaType: 'image/png'
      })).toEqual('')
      expect(base64(null)).toEqual('')
    })
    it('非法', () => {
      expect(base64('123')).toBeTruthy()
      expect(base64('123', {
        scheme: false
      })).toBeTruthy()
      expect(base64(withScheme, {
        mediaType: 'image/gif'
      })).toBeTruthy()
    })
  })

  describe('phone', () => {
    it('合法', () => {
      expect(phone('')).toEqual('')
      expect(phone(13333333333)).toEqual('')
      expect(phone('13333333333')).toEqual('')
      expect(phone('14333333333')).toEqual('')
      expect(phone('15333333333')).toEqual('')
      expect(phone('16333333333')).toEqual('')
      expect(phone('17333333333')).toEqual('')
      expect(phone('18333333333')).toEqual('')
      expect(phone('19333333333')).toEqual('')
      expect(phone('+8619333333333')).toEqual('')
      expect(phone('008619333333333')).toEqual('')
    })
    it('非法', () => {
      expect(phone('10333333333')).toBeTruthy()
      expect(phone('12333333333')).toBeTruthy()
      expect(phone('1333333333')).toBeTruthy()
      expect(phone('133333333333')).toBeTruthy()
      expect(phone(NaN)).toBeTruthy()
    })
  })

  describe('tel', () => {
    it('合法', () => {
      expect(tel('')).toEqual('')
      expect(tel('0341-86091234')).toEqual('')
      expect(tel('0341-86091231;0341-86091232;0341-86091233')).toEqual('')
      expect(tel('0341-8609123')).toEqual('')
      expect(tel('034-86091234')).toEqual('')
      expect(tel('86091234')).toEqual('')
      expect(tel('86091231;86091232;86091233;')).toEqual('')
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
      expect(tel(NaN)).toBeTruthy()
    })
  })

  describe('email', () => {
    it('合法', () => {
      expect(email('1@qq.com')).toEqual('')
      expect(email('好的@qq.com')).toEqual('')
      expect(email('abc@qq.com.cn')).toEqual('')
    })
    it('非法', () => {
      expect(email('qq.com')).toBeTruthy()
      expect(email(null)).toBeTruthy()
    })
  })

  describe('url', () => {
    it('合法', () => {
      expect(url('baidu.com')).toEqual('')
      expect(url('www.baidu.com')).toEqual('')
      expect(url('https://www.baidu.com')).toEqual('')
      expect(url(null)).toEqual('')
    })
    it('非法', () => {
      expect(url('baidu-com')).toBeTruthy()
    })
  })

  describe('idCard', () => {
    it('合法', () => {
      expect(idCard('')).toEqual('')
      expect(idCard(110101199003077272)).toEqual('')
      expect(idCard('11010119900307727X')).toEqual('')
    })
    it('非法', () => {
      expect(idCard(11010119900307727)).toBeTruthy()
      expect(idCard(110101299003077272)).toBeTruthy()
      expect(idCard(NaN)).toBeTruthy()
    })
  })

  describe('postcode', () => {
    it('合法', () => {
      expect(postcode('')).toEqual('')
      expect(postcode(550001)).toEqual('')
      expect(postcode('550001')).toEqual('')
    })
    it('非法', () => {
      expect(postcode(55000)).toBeTruthy()
      expect(postcode('5500011')).toBeTruthy()
      expect(postcode(NaN)).toBeTruthy()
    })
  })
})
