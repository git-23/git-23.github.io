# JS 内置对象

## Date

`Date.parse()`方法接收字符串，`Date.UTC()`接收多个参数，均返回表示日期的毫秒数。`Date.now`方法返回执行时毫秒数。这几个方法会被 Date 构造函数隐式调用

## RegExp

可以使用字面量或 RegExp 构造函数创建 RegExp 对象，构造函数接收一个字符串作为参数，需要进行二次转义

实例的`exec()`方法使用应用模式的字符串作为参数，返回数组对象。数组元素是匹配模式和捕获组的字符串，拥有两个额外的属性`index`和`input`

实例的`test()`方法返回一个布尔值，表示字符串是否与模式匹配

RegExp 对象除了`lastIndex`等标准的属性外，还有着一些非标准特性的属性

## 原始值包装对象

可以直接对原始值调用实例方法，会创建一个实例并在方法调用后销毁

## Number

`toFixed()`返回包含指定小数点位数的字符串，`toExponential()`返回科学计数法表示的字符串，`toPrecision`返回指定总位数的字符串

## String

`charAt()`返回给定索引的字符，`charCodeAt()`与`charPointAt()`返回给定索引处的码元值

`fromCharCode()`与`fromCharPoint()`接收任意数量的码点作为参数，返回拼接后的字符串

`normalize()`使用一种规范化格式对字符串进行规范化，比较源字符串与返回值可以知道是否支持某种规范化格式

`concat()`接收一个字符串作为参数，返回拼接后的字符串

`slice()`, `substr()`, `substring()`用于获取字符串子串，`substr()`方法的第二个参数表示截取字符串的长度，`substring()`方法将所有负参数视作0，同时会将较小的参数视作起点

`indexOf()`与`lastIndexOf()`方法返回传入子串出现的索引，第二个参数指定开始搜索的位置

`startsWith()`, `endsWith()`, `includes()`返回布尔值，表示子串是否出现，可以指定第二个参数作为位置

`trim()`, `trimLeft()`, `trimRight()`返回删除前后出现空格后的副本

`repeat()`返回将字符串复制指定次数后的拼接结果

`padStart()`, `padEnd()`返回填充指定字符到指定长度的字符串，第一个参数是长度，第二个参数可选，默认为空格

`match()`接收正则表达式作为参数，返回包含匹配结果的数组。`search()`方法返回匹配位置索引

`replace()`方法第一个参数可以是正则表达式或字符串，第二个参数可以使用特殊的字符序列，也可以是一个函数，函数有三个参数，与模式匹配的字符串、匹配项开始索引和原字符串，函数应该返回一个字符串

`split()`根据传入的分隔符将字符串拆分为数组，分隔符可以是正则表达式，还可以传入第二个参数，数组大小

`localeCompare()`通过字母表顺序比较字符串

## Global

`encodeURI()`与`encodeURIComponent()`编码 URL 中的特殊字符，`encodeURI()`不会编码属于 URL 组件的字符

`decodeURI()`与`decodeURIComponent()`方法解码 URL 中的特殊字符

`eval()`方法将参数字符串作为代码执行，被执行的代码属于该调用所在上下文

## Math

`Math.max()`与`Math.min()`方法接收多个参数返回最值

`Math.ceil()`向上舍入至整数，`Math.floor()`向下舍入至整数，`Math.round()`四舍五入至整数，`Math.fround()`返回数值最接近的单精度浮点数

`Math.random()`方法返回0-1范围内的随机数，包含0但不包含1