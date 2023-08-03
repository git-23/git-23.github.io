# JS 原型.md

## 工厂模式

使用函数封装创建对象的代码，缺点是没有解决对象标识的问题（创建的函数全部是 Object 类型）

## 构造函数

构造函数与原型对象通过`prototype`与`constructor`属性相互引用，创建的新对象`[[Prototype]]`特性指向原型对象。

自定义构造函数可以标识新对象类型，但在不同实例上创建了相同方法

## 原型模式

将重复创建的实例方法变为原型方法

使用`Object.getPrototypeOf()`和`Object.setPrototypeOf()`方法可以读写实例对象的`[[Prototype]]`特性

`Object.create()`方法创建以参数对象为原型的新对象

`in`操作符返回可枚举的原型属性和实例属性，`Object.keys()`方法返回可枚举的实例属性

`Object.getOwnPropertyNames()`返回所有实例属性，`Object.getOwnPropertySymbols()`返回所有符号实例属性

## 原型继承

使用`call()`或`apply()`方法盗用原型对象的构造函数