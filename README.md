# kayran / 杂七杂八的工具函数合集

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

## Features

### <a id="getPropByPath">getPropByPath</a> / 支持多层的属性访问

```js
import { getPropByPath } from 'kayran'

const obj = {
  a: {
    b: 'c'
  }
}

/**
 * @param {object} 对象
 * @param {string} 属性名 支持点运算符获取深层属性 可选
 * @return {any} 属性值 如果第二个参数为空 则返回对象本身
 */
getPropByPath(obj, 'a.b') // 'c'
getPropByPath(obj) // 返回obj本身
```

<br/>

### highlightError / 高亮提示错误（可用于校验失败的表单项）

```js
import { highlightError } from 'kayran'

/**
 * @param {node | string} 错误元素或其选择器 默认为'.el-form .el-form-item.is-error'
 */
highlightError()
```

> 平滑滚动至校验失败的第一个表单项、并对所有校验失败的表单项产生震动效果

<br/>

### isEllipsis / 判断dom是否触发溢出省略（text-overflow: ellipsis）

```js
import { isEllipsis } from 'kayran'

/**
 * @param {node} 需要判断的元素
 * @return {boolean} 是否触发溢出省略
 */
isEllipsis(document.querySelector('.text'))
```

<br/>

### isEmpty & notEmpty / 判空 & 判非空

notEmpty() 等同于 !isEmpty()

```js
import { isEmpty, notEmpty } from 'kayran'

/**
 * @param {any} 需要判断的变量
 * @return {boolean} 结果
 */
isEmpty(0)  // false
isEmpty({}) // true
isEmpty([]) // true
```

<br/>

### jsonToFormData / json转formData

```js
import { jsonToFormData } from 'kayran'

/**
 * @param {object} 需要转换的对象
 * @return {formData} 结果
 */
const formData = jsonToFormData({
  a: 1
})

formData.get('a') // 1
```

<br/>

### loadScript / 动态加载js

```js
import { loadScript } from 'kayran'

/**
 * @param {string} src - 脚本url
 * @return {promise}
 */
loadScript('https://cdn.jsdelivr.net/npm/vue/dist/vue.js').then(e => {
  console.log(Vue)
})
```

<br/>

### loadStyle / 动态加载css



<br/>

### parseQueryString / 获取当前url某个查询参数的值

```js
import { parseQueryString } from 'kayran'

const code = parseQueryString('code')

//or

const { code } = parseQueryString()
```

```js
/**
 * 获取当前url某个查询参数的值
 * 支持微信公众号授权特例：授权后会重定向回来并在链接中加入一个code参数 但微信没有考虑hash路由的情况 所以获取这个code需要特殊处理
 * @param {Object}
 *        {String} key - 查询参数的key 如果为空 则返回查询参数映射的对象 可以解构使用
 *        {String} mode - router模式 可选值'history'/'hash' 默认'hash'
 *        {Boolean} del - 是否在url中删除该值（删除会引发页面刷新）
 * @return {String|Object} 查询参数中key对应的value / 如果key为空 则返回查询参数整个对象
 */
```

注意：如果search和hash中同时包含code 如```http://localhost:8080/?code=1#/?code=2``` 取的是search中的code 即返回1

<br/>

### validator / 输入校验

```js
import { validator } from 'kayran'

const { idCard } = validator

const errMsg = idCard.validator('xxx')

if (errMsg) {
  Toast(errMsg) // '格式不正确'
  return
}
```

```js
/**
 * @param {String} 需要校验的内容
 * @return {String} 校验失败提示信息 如果校验通过则返回''
 */
```

前文提到的[输入校验](#validator)都可以像这样独立使用 不过：

1. 不再需要后面的双下划线 这里不需要规避命名冲突

2. 需要多点一层validator 这也是为了兼容element所做的妥协

3. 该方法不是通过true和false来标识校验是否通过 因为错误往往需要一个友好的原因提示

> 如果仅仅想知道是否校验通过：

```js
!idCard.validator('xxx') // true通过 false失败
```

<br/>

### typeOf / 获取变量的精确类型

动机：原生js的typeof等类型检测手段都存在各种缺陷

```js
import { typeOf } from 'kayran'

/**
 * @param {any} 需要判断的变量
 * @return {string} 变量类型（全小写） 如string null undefined file...
 */
typeOf(1) // 'number'
```

<br/>

### isBase64 / 判断是否为base64编码字符串

```js
import { isBase64 } from 'kayran'

/**
 * @param {string} 需要判断的字符串
 * @param {object}
 *        {string} mediaType - 媒体类型 可选值参考 https://en.wikipedia.org/wiki/Data_URI_scheme
 *        {boolean} scheme - 是否包含前缀 默认true
 * @return {boolean} 结果
 */
isBase64(1, {
  mediaType: 'image',
  scheme: false
}) // false
```
