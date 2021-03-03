# kayran / 七零八碎工具函数合集

## Installation

![NPM](https://nodei.co/npm/kayran.png)

``` bash
$ yarn add kayran
```

如果你仅使用少量组件或函数 建议按需引入

babel7以上按需引入步骤：

1. ```$ yarn add babel-plugin-import -D```
2. 在```babel.config.js```中增加如下配置：

```js
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'kayran',
      libraryDirectory: 'lib',
      style: false,
      camel2DashComponentName: false
    }, 'kayran']
  ]
}
```

<br/>

## awaitFor / 以优雅方式书写await

```js
/**
 * @param {Promise} 需要包装的Promise
 * @return {array}
 *         {[0]} Promise.prototype.then返回的结果
 *         {[1]} Promise.prototype.catch返回的结果
 */

import { awaitFor } from 'kayran'

const [res] = await awaitFor(new Promise((resolve, reject) => {
  resolve('res')
}))
console.log(res) // 'res'

const [, err] = await awaitFor(new Promise((resolve, reject) => {
  reject('err')
}))
console.log(err) // 'err'
```

<br/>

## getPropByPath / 对象深层属性访问

```js
/**
 * @param {object} 对象
 * @param {string} 属性名 支持点运算符获取深层属性 可选
 * @return {any} 属性值 如果第二个参数为空 则返回对象本身
 */

import { getPropByPath } from 'kayran'

const obj = {
  a: {
    b: 'c'
  }
}

getPropByPath(obj, 'a.b') // 'c'
getPropByPath(obj) // 返回obj本身
```

<br/>

## highlightError / 高亮提示错误（可用于校验失败的表单项）

```js
/**
 * @param {string|Element|NodeList} 错误元素或其DOMString 默认为'.el-form .el-form-item.is-error'
 */

import { highlightError } from 'kayran'

highlightError()
```

> 平滑滚动至校验失败的第一个表单项、并对所有校验失败的表单项产生震动效果

<br/>

## isEllipsis / 判断dom是否触发溢出省略（text-overflow: ellipsis）

```js
/**
 * @param {Element} 需要判断的元素
 * @return {boolean} 是否触发溢出省略
 */

import { isEllipsis } from 'kayran'

isEllipsis(document.querySelector('.text'))
```

<br/>

## isEmpty & notEmpty / 判空 & 判非空

notEmpty() 等同于 !isEmpty()

```js
/**
 * @param {any} 需要判断的变量
 * @return {boolean} 结果
 */

import { isEmpty, notEmpty } from 'kayran'

isEmpty(0)  // false
isEmpty({}) // true
isEmpty([]) // true
```

<br/>

## jsonToFormData / json转FormData

```js
/**
 * @param {object} 需要转换的对象
 * @return {FormData} 结果
 */

import { jsonToFormData } from 'kayran'

const formData = jsonToFormData({
  a: 1
})

formData.get('a') // 1
```

<br/>

## loadLink / 动态加载link

```js
/**
 * @param {string|object} src - link url
 * @return {Promise} 加载状态
 */

import { loadLink } from 'kayran'

await loadLink('https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css')
```

<br/>

## loadScript / 动态加载js

```js
/**
 * @param {string|object} src - 脚本url
 * @return {Promise} 加载状态
 */

import { loadScript } from 'kayran'

loadScript('https://cdn.jsdelivr.net/npm/vue/dist/vue.js').then(e => {
  console.log(Vue)
})
```

<br/>

## loadStyle / 动态加载style

```js
/**
 * @param {string|object} innerText - style标签的innerText 或传对象指定style的各项属性
 * @return {Promise<Element>} 加载状态
 */

import { loadStyle } from 'kayran'

await loadStyle('https://cdn.jsdelivr.net/npm/vue/dist/vue.js')
```

<br/>

## paramFilter / 接口参数过滤器

```js
/**
 * @param {object} innerText - style标签的innerText 或传对象指定style的各项属性
 * @return {Promise<Element>}
 */

import { paramFilter } from 'kayran'

await loadStyle('https://cdn.jsdelivr.net/npm/vue/dist/vue.js')
```

<br/>

## parseQueryString / 获取当前url某个查询参数的值

```js
/**
 * 获取当前url某个查询参数的值
 * 支持微信公众号授权特例：授权后会重定向回来并在链接中加入一个code参数 但微信没有考虑hash路由的情况 所以获取这个code需要特殊处理
 * @param {object}
 *        {string} key - 查询参数的key 如果为空 则返回查询参数映射的对象 可以解构使用
 *        {string} mode - router模式 可选值'history'/'hash' 默认'hash'
 *        {boolean} del - 是否在url中删除该值（删除会引发页面刷新）
 * @return {string|object} 查询参数中key对应的value / 如果key为空 则返回查询参数整个对象
 */

import { parseQueryString } from 'kayran'

const code = parseQueryString('code')

//or

const { code } = parseQueryString()
```

注意：如果search和hash中同时包含code 如```http://localhost:8080/?code=1#/?code=2``` 取的是search中的code 即返回1

<br/>

## validator / 输入校验

```js
/**
 * @param {string} 需要校验的内容
 * @return {string} 校验失败提示信息 如果校验通过则返回''
 */

import { validator } from 'kayran'

const { idCard } = validator

const errMsg = idCard('xxx')

if (errMsg) {
  Toast(errMsg) // '格式不正确'
  return
}
```

> 该方法不是通过true和false来标识校验是否通过 因为错误往往需要一个友好的原因提示

```js
// 如果仅仅想知道是否校验通过

!idCard('xxx') // true通过 false失败
```

### lng / 经度

```js
/**
 * @param {string|number} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { lng } = validator
```

<br/>

### lat / 纬度

```js
/**
 * @param {string|number} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { lat } = validator
```

<br/>

### phone / 手机

```js
/**
 * @param {string|number} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { phone } = validator
```

<br/>

### url

```js
/**
 * @param {string} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { url } = validator
```

<br/>

### base64 / 判断是否为base64编码字符串

```js
/**
 * @param {string} 需要判断的字符串
 * @param {object}
 *        {string} mediaType - 媒体类型 可选值参考 https://en.wikipedia.org/wiki/Data_URI_scheme
 *        {boolean} scheme - 是否包含前缀 默认true
 * @return {boolean} 结果
 */

import { validator } from 'kayran'

const { base64 } = validator

base64(1, {
  mediaType: 'image',
  scheme: false
}) // false
```

<br/>

### idCard / 身份证

```js
/**
 * @param {string|number} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { idCard } = validator
```

<br/>

### postcode / 邮编

```js
/**
 * @param {string|number} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { postcode } = validator
```

<br/>

### tel / 座机

```js
/**
 * @param {string|number} 需要判断的值
 * @param {object}
 *        {boolean} multiple - 是否允许多个 默认true
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { tel } = validator
```

<br/>

### email / 邮箱

```js
/**
 * @param {string} 需要判断的值
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { email } = validator
```

<br/>

### len / 字符长度

```js
/**
 * @param {string} 需要判断的值
 * @param {
 *          number |
 *          [number, number] |
 *          {
 *            min?: number
 *            max?: number
 *          }
 *        }
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { len } = validator

len('123', [1, 3])
```

<br/>

### int / 整数

```js
/**
 * @param {string|number} 需要判断的值
 * @param {
 *          string | 
 *          {
 *            range?: string
 *            positiveSign?: boolean
 *          }
 *        }
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { int } = validator

int(0, '(0,2)')
```

<br/>

### decimal / 小数

```js
/**
 * @param {string|number} 需要判断的值
 * @param {
 *          string |
 *          {
 *            range?: string,
 *            decimalPlaces?: number | [number, number]
 *          }
 *        }
 * @return {string} 判断结果
 */

import { validator } from 'kayran'
const { decimal } = validator

decimal(80, '[80,+∞]')

decimal('80.1', {
  decimalPlaces: [0, 1]
})
```

<br/>

## typeOf / 获取变量的精确类型

动机：原生js的typeof等类型检测手段都存在各种缺陷

```js
/**
 * @param {any} 需要判断的变量
 * @return {string} 变量类型（全小写） 如string null undefined file...
 */

import { typeOf } from 'kayran'

typeOf(1) // 'number'
```

<br/>
