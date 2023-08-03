# JS 对象

## 对象属性

对象属性分为数据属性和访问器属性两种，每个对象属性会对应着一个描述符对象

数组属性描述符对象有`value`, `writable`, `enumerable`(可枚举), `configurable`(可修改)四个键

访问器属性描述符对象键分别为`get`, `set`, `enumerable`, `configurable`

可以使用`Object.defineProperty()`方法修改描述符对象，`Object.getOwnPropertyDescriptor()`方法获取描述符对象

## 对象方法

`Object.assign()`方法接收目标对象和多个源对象作为参数，将源对象中可枚举的自有属性复制到目标对象

`Object.is()`方法类似全等操作符，但`+0`与`-0`返回`false`，`NaN`与`NaN`返回`true`

## 对象语法

属性键使用变量名会自动解释为同名的属性键，中括号包裹的属性键会被解释为表达式

可以对方法名进行简写

可以用与对象匹配的结构用对象属性进行赋值（对象解构），匹配解构可以使用简写语法，可以指定默认值