# commonJS

## 模块的暴露与引入

### 模块的暴露

创建一个文件 hello.js，这个文件代表模块 hello。

```javascript
'use strict';

var s = 'Hello';

function greet(name) {
    console.log(s + ', ' + name + '!');
}

module.exports = greet;
```

代码的最后一行`module.exports = greet`将`greet`函数作为模块的输出暴露出去。

### 模块的引入

```javascript
'use strict';

// 引入hello模块:
var greet = require('./hello');

var s = 'Michael';

greet(s); // Hello, Michael!
```

代码的第四行引入了模块 hello，greet 被赋值为 hello 模块中暴露的`greet`函数。

## 简单原理介绍

**暂略**

## 参考链接

[廖雪峰-JavaScript教程](https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616)