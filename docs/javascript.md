# JavaScript 程序设计

## HTML 中的 JavaScript

**`<script>`元素**
- `<script>`元素可以包含来自外部域的 JavaScript 文件
- `defer`属性
    - 按照 HTML5 规范要求脚本应该按照它们出现的顺序执行
    - 并且会在 DOMContentLoaded 事件之前执行
- `async`属性
    - 标记为异步的脚本并不保证能按照它们出现的次序执行

**动态加载脚本**
- 默认情况下，以这种方式创建的`<script>`元素相当于加了`async`属性

**`<noscript>`元素**
- 在浏览器不支持脚本或对脚本的支持被关闭时显示包含在`<noscript>`中的内容

## ECMAScript

**严格模式**
- 在脚本开头加上`'use strict'`
- 在函数体开头加上`'use strict'`，单独指定一个函数在严格模式下执行

**变量**
- `var`声明
    - 省略`var`初始化变量会在函数内创建全局变量，在严格模式下会抛出错误
    - `var`存在着声明提升，也因此可以反复多次使用`var`声明同一个变量
- `let`声明
    - 与`var`的函数作用域不同，`let`是块作用域
    - `let`不允许同一个块作用域中出现冗余声明
    - `let`不存在声明提升，在`let`声明之前的执行瞬间被成为“暂时性死区”，在此阶段引用任何后面才声明的变量都会抛出错误
    - 与`var`不同，使用`let`在全局作用域中声明的变量不会成为`window`对象的属性
    - `let`在每次迭代声明一个独立变量实例
- `const`声明
    - 声明变量时必须同时初始化变量，尝试修改`const`声明的变量会抛出错误
    - 如果`const`变量引用的是一个对象，那么修改这个对象内部的属性并不违反`const`的限制
- 最佳实践
    - 不使用`var`
    - `const`优先，`let`次之

**字符串**
- ECMAScript 中的字符串是不可变的
- `toString()`方法
    - `null`和`undefined`值没有`toString()`方法
    - 数值调用这个方法时，可以传入一个底数参数
- `String()`函数
    - 如果值有`toString()`方法，调用该方法
    - 如果值是`null`，返回`'null'`
    - 如果值是`undefined`，返回`'undefined'`
- 模板字面量
    - 模板字面量会保持反引号内部的空格和换行符
    - 模板字面量支持字符串插值，在定义时立即求值并转化为字符串实例
    - 模板字面量支持定义标签函数
        - 可以使用默认的`String.raw()`标签函数获取原始的模板字面量内容
        ```javascript
        console.log(String.raw`\u00A9`);
        ```
        - 也可以通过标签函数的第一个参数，即字符串数组的`.raw`属性取得每个字符串的原始内容

**Symbol 类型**
- 基本用法
    - 使用`Symbol()`函数进行初始化
    - 可以传入一个字符串参数作为对符号的描述
- 全局符号注册表
    - `Symbol.for()`方法
        - 根据传入的字符串检查注册表，发现不存在对应的符号，生成新符号
        - 发现对应的符号，返回该符号
    - 采用相同的描述，在全局注册表中定义的符号跟使用`Symbol()`定义的符号也并不相同
    - `Symbol.keyFor()`方法
        - 接收符号，返回该全局符号对应的字符串键
- 内置符号

**操作符**
- 在应用给对象时，操作符通常会调用`valueOf()`和`toString()`方法来取得可以计算的值
- 一元操作符
    - 前缀，变量的值会在语句被求值之前改变
    - 后缀，在语句求值后才发生
- 位操作符
    - 确定负数的补码
        1. 确定绝对值的二进制表示
        2. 找到数值的反码
        3. 给结果加 1
    - `~`按位非、`&`按位与、`|`按位或、`^`按位异或
    - `<<`左移、`>>`无符号右移、`>>>`有符号右移
- 布尔操作符
    - `!`逻辑非、`&&`逻辑与、`||`逻辑或
    - `&&`和`||`具有短路特性
    ```javascript
    let myObject = preferredObject || backupObject;
    //如果第一个变量未定义，则赋值第二个变量
    ```
- 加性操作符
    - 如果两个操作数都是数值，执行加法运算
    - 如果两个操作数都是字符串，执行拼接
    - 如果有一个操作数是字符串，对另一个操作数执行`toString()`方法后进行拼接
- 关系操作符
    - 如果任一操作数是数值，执行数值比较
    - 如果操作数都是字符串，比较编码
    - 涉及比较`NaN`时都返回`false`
- 相等操作符
    - `==`进行类型转换
        - 类似关系操作符
        - `null`和`undefined`相等
        - 如果两个操作数指向同一个对象则相等
        - `null`和`undefined`不进行类型转换
    - `===`不进行类型转换
    - 推荐使用全等操作符，保持数据类型的完整性
    - 涉及比较`NaN`时都返回`false`

**语句**
- for-in 语句
    - 枚举对象中的非符号键属性
    - 不保证返回对象属性的顺序
- for-of 语句
    - 遍历可迭代对象的元素
    - 按照`next()`方法产生迭代值的顺序
- 标签语句
    - 配合`break`、`continue`能实现复杂的逻辑
- with 语句
    - 严格模式下不允许使用 with 语句
    - 不推荐使用 with 语句
- switch 语句
    - 不使用`break`，代码会匹配下一个条件
    - 可以用于所有数据类型，判断时不会进行类型转换

**原始值、引用值**
- 保存原始值的变量是按值访问的，保存引用值的变量是按引用访问的
- 只有引用值可以动态添加后面可以使用的属性
- 引用值实际上是一个指针，它指向存储在堆内存中的对象
- ECMAScript 中所有函数的参数都是按值传递的
- 可以使用`instanceof`操作符知道一个引用值是什么类型的对象
    - 如果变量是给定引用类型的实例，则`instanceof`操作符返回`true`
    ```javascript
    result = variable instanceof constructor
    ```

**执行上下文**
- 每个上下文都有一个关联的变量对象
    - 每个函数调用都有自己的上下文
    - 上下文代码在执行时，会创建变量对象的一个作用域链
- 上下文在所有代码执行完毕后会被销毁
- 主要有全局上下文和函数上下文两种
    - 使用 try/catch 语句的`catch`块，创建一个新的变量对象， 包含要抛出的错误对象的声明
    - `with`语句，向作用域链前端添加新的对象

**垃圾回收**
- 周期性的自动运行垃圾回收程序
- 垃圾回收策略
    - 标记清理
        1. 标记内存中存储的所有变量
        2. 将在上下文中的变量、在上下文中的变量引用的变量的标记去掉
        3. 此时加上标记的变量就是待删除的了
    - 引用计数
        - 对每个值记录它被引用的次数
        - 值的引用数为零时，回收内存
        - 无法处理循环引用

**内存管理**    
- 解除引用的关键在于确保相关的值已经不在上下文中
- V8 会将创建的对象与隐藏类关联起来，能共享相同隐藏类的对象性能会更好
    - 避免动态属性赋值，在构造函数中一次性声明所有属性
    - 不使用`delete`动态删除属性，把不想要的属性设置为`null`
- 内存泄漏
    - 意外声明全局变量
    - 定时器的回调
    - 闭包
- 减少垃圾回收的次数
    - 不要动态创建对象，使用已有的对象
    - 使用对象池
    - 关于数组的动态可变

> 对象，某个特定引用类型的实例

**Date**  
- 辅助方法
    - `Date.parse()`
        - 接收一个表示日期的字符串，返回表示该日期的毫秒数
        - 把字符串传给 Date 构造函数，Date 会在后台调用`Date.parse()`方法
    - `Date.UTC()`
        - 传入年、零起点月、日、时、分、秒、毫秒，返回日期的毫秒表示
        - 只有前两个参数是必需的
        - 也会被 Date 构造函数隐式调用，但创建本地时间
    - `Date.now()`
        - 返回方法执行时的毫秒数

**RegExp**
- ECMAScript 通过 RegExp 类型支持正则表达式
- 创建
    - 使用字面量，类似 Perl 的简洁语法
    ```javascript
    let expression = /pattern/flags;
    ```
    - 使用 RegExp 构造函数
        - 因为 RegExp 的模式参数是字符串，所以某些情况需要二次转义
- 元字符
    - 元字符在模式中必须使用`\`转义
- 实例方法
    - `exec()`
        - 参数是要应用模式的字符串
        - 返回包含第一个匹配信息的数组
        - 数组包括两个额外的属性：`index`和`input`
        - 数组的第一个元素是匹配整个模式的字符串，其他元素是匹配捕获组的字符串
        - 设置全局模式后，调用`exec()`后模式的`lastIndex`属性会发生变化
    - `test()`
        - 输入的文本与模式匹配，则参数返回`true`
- RegExp 构造函数属性
    - 每个属性有一个全名一个简写
    - RegExp 构造函数的属性没有 Web 标准出处

**原始值包装类型**
- 读模式访问字符串值
    1. 创建 String 实例
    2. 调用实例上方法
    3. 销毁实例
- Object 构造函数能根据传入值类型返回相应原始值包装类型实例
    ```javascript
    let obj = new Object('some text');
    console.log(obj instanceof String);
    //true
    ```
- Number 类型方法
    - `toFixed()`
        - 返回包含指定小数点位数的数值字符串
        - 超出部分四舍五入
    - `toExponential()`
        - 返回科学计数法字符串
    - `toPrecision()`
        - 接收一个参数，表示结果中数字总位数
- String 类型方法
    - `charAt()`
        - 返回给定索引的字符
    - `charCodeAt()`, `codePointAt()`
        - 返回指定索引的码元值
    - `fromCharCode()`, `fromCodePoint()`
        - 接收任意数量的码点，返回对应字符串
    - `normalize()` 
        - 使用一种规范化格式对字符串进行规范化
        - 比较字符串与`normalize()`返回值，了解该字符串是否已规范化
        - 选择同一种规范化形式可以让比较操作符返回正确的结果
    - `concat()`
        - 接收参数，返回拼接后的字符串
    - `slice()`, `substr()`, `substring()`
        - 第一个参数表示开始位置，第二个参数表示结束位置，`substr()`第二个参数表示长度
        - 当某个参数为负数时
            - `slice()`方法将所有负值参数都当成字符串长度加上负值参数
            - `substr()`方法将第一个负参数值当成字符串长度加该值，第二个负参数视为零
            - `substring()`方法将所有负参数都视为零
        - `substring()`方法会将较小的参数作为起点，较大的参数作为终点，`slice()`方法不会
    - `indexOf()`, `lastIndexOf()`
        - 搜索传入的字符串，返回位置
        - 第二个参数表示开始搜索的位置
        - 没找到返回`-1`
    - `startsWith()`, `endsWith()`, `includes()`
        - 搜索子串，返回布尔值
        - `startsWith()`和`includes()`接受第二个参数，表示开始搜索的位置
        - `endsWith()`接受第二个参数，表示当作字符串末尾的位置
    - `trim()`, `trimLeft()`, `trimRight()`
        - 创建一个副本，删除前后所有空格，返回这个副本
    - `repeat()`
        - 接收一个整数参数，表示将字符串复制多少次，返回拼接后结果
    - `padStart()`, `padEnd()`
        - 填充字符，直到满足指定长度
        - 第一个参数是长度，第二个参数是可选的填充字符串，默认为空格
    - `[Symbol.iterator]()`
        - 手动使用迭代器
        ```javascript
        let message = 'abc';
        let stringIterator = message[Symbol.iterator]();
        console.log(stringIterator.next()); // {value: "a", done: false}
        console.log(stringIterator.next()); // {value: "b", done: false}
        console.log(stringIterator.next()); // {value: "c", done: false}
        console.log(stringIterator.next()); // {value: undefined, done: true}
        ```
        - 在 for-of 循环中使用迭代器
        ```javascript
        for (const c of 'abcde') {
            console.log(c);
        }
        ```
        - 有了迭代器之后，可以通过解构操作符解构
        ```javascript
        let message = 'abcde';
        console.log([...message]);
        //["a", "b", "c", "d", "e"]
        ```
    - `toLowerCase()`, `toLocaleLowerCase()`, Upper...
    - `match()`, `search()`
        - `match()`方法接收正则表达式，返回类似`exec()`方法的数组
        - `search()`方法返回匹配位置索引
    - `replace()`
        - 接收两个参数，第一个参数可以是 RegExp 对象或一个字符串，字符串不会转换为正则表达式
        - 如果第一个参数是一个字符串，那么只会替换第一个子字符串
        - 向要替换所有子字符串，第一个参数为正则表达式且带全局标志
        - 第二个参数中可以使用特殊的字符序列，如`$&`, `$1`等
        - 第二个参数可以是一个函数
            - 函数有三个参数，与整个模式匹配的字符串、匹配项在字符串中的开始位置和整个字符串
            - 在有多个捕获组的情况下，每个匹配捕获组的字符串也将作为参数传给这个函数
            - 这个函数应该返回一个字符串，表示将匹配项替换成什么
    - `split()`
        - 根据传入的分隔符将字符串拆分为数组
        - 分隔符可以是字符串，也可以是 RegExp 对象
        - 还可以传入第二个参数，数组大小
    - `localeCompare()`
        - 通过字母表顺序比较两个字符串

**内置对象**
- > 任何由 ECMAScript 实现提供、与宿主环境无关，并在 ECMAScript 程序开始执行时就存在的对象
- Global
    - 在全局作用域中定义的变量和函数都会变成 Global 对象的属性和方法
    - URL 编码方法
        - 有效的 URL 不能包含某些字符，比如空格
        - `encodeURI()`, `encodeURIComponent()`
            - `encodeURI()`不会编码属于 URL 组件的特殊字符
            - `encodeURIComponent()`会编码它发现的所有非标准字符
        - `decodeURI()`, `decodeURIComponent()`
    - `eval()`方法
        - 被执行的代码属于该调用所在上下文
        - 在严格模式下，在`eval()`内部创建的变量和函数无法被外部访问
- Math
    - Math 对象上提供的计算要比直接在 JavaScript 实现快得多
    - Math 对象上的属性保存数学中的一些特殊值
    - `min()`, `max()`
        - 接收任意多个参数
        - 可以使用扩展运算符应用于数组
        ```javascript
        let values = [1, 2, 3, 4];
        let max = Math.max(...values);
        ```
    - `Math.ceil()`, `Math.floor()`, `Math.round()`, `Math.fround()`
        - `Math.ceil()`向上舍入为最接近的整数
        - `Math.floor()`向下舍入为最接近的整数
        - `Math.round()`四舍五入到最接近的整数
        - `Math.fround`返回数值最接近的单精度浮点数
    - `Math.random()`
        - 返回一个 0~1 范围内的随机数，包含 0 但不包含 1
        ```javascript
        number = Math.floor(Math.random() * total + first);
        ```
        - 如果为了加密生成随机数，建议使用`window.crypto.getRandomValues()`

**Array**
- `from()`
    - 将类数组结构转换为数组
    - 接收第二个可选的映射函数参数，用于增强新数组的值
    - 还可以接收第三个参数，用于指定映射函数中`this`的值。但这个重写的`this`值在箭头函数中不适用
- `of()`
    - 将一组参数转换为数组实例
- 数组空位
    - ES6 新增方法普遍把这些空位当成存在的元素，不过值为`undefined`
    - `map()`方法会跳过空位置
    - `join()`方法会视空位置为空字符串
- `length`属性
    - 通过修改`length`，可以从数组末尾删除或添加元素
- `Array.isArray()`
- `keys()`, `values()`, `entries()`
    -使用 ES6 的解构可以非常容易地在循环中拆分键/值对
    ```javascript
    const a = ['foo', 'bar', 'baz', 'qux'];
    for (const [idx, element] of a.entries()) {
        alert(idx);
        alert(element);
    }
    ```
- `fill()`
    - 填充值，开始索引，结束索引
    - `fill()`静默超出数组边界、零长度和方向相反的索引范围
- `copyWithin()`
    - 插入位置，开始索引，结束索引
    - 规则类似`fill()`方法
- `join()`
    - 接收一个参数，即字符串分隔符
    - 默认使用逗号作为分隔符
    - `null`和`undefined`项在`join()`, `toString()`, `valueOf()`返回的结果中会以空串表示
- `push()`, `pop()`, `shift()`, `unshift()`
- `reserve()`
    - 反转数组
- `sort()`
    - 默认情况下，`sort()`会在每一项调用`String()`转型函数，然后通过比较字符串来决定顺序
    - `sort()`方法可以接收一个比较函数
        - 比较函数有两个参数
        - 如果第一个参数应该排在前面，返回负值
        - 相等，返回 0
        - 如果第一个参数应该排在后面，返回正值
        ```javascript
        let values = [0, 1, 5, 10, 15];
        values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
        //15, 10, 5, 1, 0
        
        values.sort((a, b) => a - b);
        //如果数组元素是数值，或者 valueOf() 方法返回数值，可以写的更简单
        ```
- `concat()`
    - 如果参数是数组，会把数组的每一项都添加到结果数组
    - 如果参数不是数组，则直接把它们添加到结果数组末尾
    - 参数数组的`[Symbol.isConcatSpreadable]`属性设为`false`可以阻止打平数组
- `slice()`
    - 接收一个或两个参数，开始索引和结束索引
- `splice()`
    - 接收参数，开始位置、要删除元素数目和插入元素
    - 操作在原数组上进行
    - 返回一个数组，包含被删除的元素
- `indexOf()`, `lastIndexOf()`, `includes()`
    - 接收两个参数，要查找的元素和一个可选的起始搜索位置
    - `indexOf()`和`lastIndexOf()`返回索引位置，`includes`返回布尔值
    - 在比较时使用全等操作符
- `find()`, `findIndex()`
    - 接收一个断言函数作为参数
        - 断言函数接收三个参数：元素、索引、数组本身
        - 断言函数返回真值，表示是否匹配
    - `find()`返回第一个匹配的元素、`findIndex()`返回第一个匹配元素的索引
    - 接收第二个可选的参数，指定断言函数内部`this`的值
- 迭代方法
    - 每个方法接收两个参数，以每一项为参数运行的函数，以及指定`this`值的对象
    - 传给每个方法的函数接收三个参数`item`, `index`, `array`
    - `every()`
        - 对数组的每一项都运行传入的函数，如果每一项都返回`true`，`every()`方法返回`true`
    - `filter()`
        - 对每一项传入函数，返回`true`的项组成数组作为返回值
    - `forEach()`
        - 对每一项都运行传入的函数，没有返回值
    - `map()`
        - 对每一项传入函数，返回由函数调用结果构成的数组
    - `some()`
        - 对每一项传入函数，有一项返回`true`，`some()`方法返回`true`
- 归并方法
    - 每个方法接收两个参数，对每一项都会运行的归并函数，可选的作为归并起点的初始值
    - 函数接收四个参数，上一个归并项、当前项、当前项索引和数组本身
    - `reduce()`
        - 使用`reduce()`执行数组累加
        ```javascript
        let values = [1, 2, 3, 4, 5];
        let sum = values.reduce((prev, cur, index, array) => prev + cur);
        alert(sum)  //15
        ```
    - `reduceRight()`
        - 与`reduce()`方法遍历数组元素的方向相反

**定型数组**
- ArrayBuffer
    - `ArrayBuffer()`是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间
        ```javascript
        const buf = new ArrayBuffer(16);
        alert(buf.byteLength);  //16
        ```
    - ArrayBuffer 一经创建就不能调整大小，但可以使用`slice()`复制其全部或部分到一个新实例中
        ```javascript
        const buf1 = new ArrayBuffer(16);
        const buf2 = buf1.slice(4, 12);
        alert(buf2.byteLength);
        ```
    - 与 C++ 中`malloc()`语句比较
        - `malloc()`在分配失败时返回空指针，`ArrayBuffer()`在分配失败时抛出错误
        - `malloc()`可以利用虚拟内存，`ArrayBuffer()`分配的内存不能超过`Number.MAX_SAFE_INTEGER`字节
        - `malloc()`调用成功不会初始化实际的地址，`ArrayBuffer()`会将所有的二进制位初始化为零
        - `malloc()`分配的堆内存除非调用`free()`或程序退出，否则系统不能使用，`ArrayBuffer()`分配的内存可以被当成垃圾回收
    - 不能通过对 ArrayBuffer 的引用就读取或写入内容。要通过视图
- DataView
    - 必须在对已有的 ArrayBuffer 读取或者写入时才能创建 DataView 实例。这个实例可以使用全部或部分 ArrayBuffer,且维护对该缓冲位置的引用
    - 构造函数接收一个可选的字节偏移量和字节长度，默认使用整个 ArrayBuffer
        ```javascript
        const buf = new ArrayBuffer(16);
        //从缓冲起点开始，限制为前八个字节
        const firstHalfDataView = new DataView(buf, 0, 8);
        alert(firstHalfDataView.byteOffset);    //0
        alert(firstHalfDataView.byteLength);    //8
        alert(firstHalfDataView.buffer === buf);    //true
        ```
    - ElementType
        DataView 对存储在缓冲区内的数据类型没有预设，强制开发者在读写时指定一个 ElementType
        ```javascript
        //在内存中分配两个字节并声明一个 DataView
        const buf = new ArrayBuffer(2);
        const view = new DataView(buf);
        //说明整个缓冲所有二进制位都是零
        alert(view.getInt8(0)); //0
        alert(view.getInt8(1)); //0
        alert(view.getInt16(0));    //0
        //将整个缓冲区设置为1
        view.setUint8(0, 255);
        //DataView 会自动将数据转换为特定的 ElementType
        view.setUint8(1, 0xFF);
        //现在缓冲区都是1 了
        //如果把它当成二补数的有符号整数，则应该是-1
        alert(view.getInt16(0));    //-1
        ```
    - 字节序
        - 大端字节序最高有效位在第一个字节，小端字节序则相反
        - DataView 的所有 API 方法都以大端字节序作为默认值，但接收一个可选的布尔值参数，设置为`true`即可启用小端字节序
            ```javascript
            const buf = new ArrayBuffer(2);
            const view = new DataView(buf);
            //填充缓冲，让第一位和最后一位都是1
            view.setUint8(0, 0x80);
            viex.setUint8(0, 0x01);
            //1000 0000 0000 0001
            //按大端序读取 Uint16
            //2 ** 15 + 2 ** 0
            alert(view.getUint16(0));
            //按小端序读取 Uint16
            //2 ** 7 + 2 ** 8
            alert(view.getUint16(0, true));
            //按大端字节序写入 Uint16
            //0000 0000 0000 0100
            view.setUint16(0, 0x0004);
            //按小端字节序写入 Uint16
            //0000 0010 0000 0000
            view.setUint16(0, 0x0002, true);
            ```
    - 边界情形
        - DataView 完成读写操作必须有充足的缓冲区，否则抛出`RangeError`
        - DataView 在写入缓冲会对值进行类型转换，无法转换抛出`TypeError`
- 定型数组
    - 另一种形式的 ArrayBuffer 视图，但特定于一种 ElementType 且遵循系统原生的字节序
        ```javascript
        const buf = new ArrayBuffer(12);
        //创建一个引用该缓冲的 Int32Array
        const ints = new Int32Array(buf);
        alert(ints.length); //3
        //创建一个长度为 6 的 Int32Array
        const ints2 = new Int32Array(6);
        alert(ints2.length);    //6
        alert(ints2.buffer.byteLength); //24
        //创建一个包含 [2, 4, 6, 8] 的 Int32Array
        const ints3 = new Int32Array([2, 4, 6, 8]);
        const ints4 = new Int16Array(ints3);
        const ints5 = Int16Array.from([3, 5, 7, 9]);
        const floats = Float32Array.of(3.14, 2.718, 1.618);
        ```
    - `BYTES_PER_ELEMENT`属性，返回该类型数组中每个元素大小
    - 定型数组与普通数组有很多相似的地方
        - 具有`[Symbol.iterator]`符号属性，可以通过 for...of 循环和扩展运算符操作
        - `concat()`, `splice()`, 栈及队列方法不适用
        - `set()`
            - 从提供的数组或定型数组中提取值复制到当前定型数组中指定的索引位置
        - `subarray()`
            - 从原始定型数组中复制的值返回一个新定型数组，开始索引和结束索引可选
    - 上溢和下溢
        - 存在一种夹板数组类型，`Uint8ClampedArray`
            - 不允许溢出
            - 超过 255 的值会被向下舍入为 255
            - 小于 0 的值会被向上舍入为 0
        - > `Uint8ClampedArray`完全是 HTML5canvas 元素的历史留存。除非真的做跟 canvas 相关的开发，否则不要使用它。

**Map**
- 创建
    - 使用`new`关键字和 Map 构造函数可以创建一个空映射
    - 如果想要初始化，可以传入一个可迭代对象
        ```javascript
        const m2 = new Map({
            [Symbol.iterator]: function* () {
                yield ['key1', 'val1'];
                yield ['key2', 'val2'];
                yield ['key3', 'val3'];
            }
        });
        alert(m2.size); //3
        ```
- 属性
    - `size`
        - 获取映射中键值对的数量
- 方法
    - `set()`
        - 在映射中添加键值对
        - `set()`方法返回映射实例，因此可以把多个操作连缀起来
    - `get()`, `has()`
        - 查询键值对
    - `delete()`, `clear()`
        - 删除键值对
- Map 可以使用任何 JavaScript 数据类型作为键
- Map 内部使用 SameValueZero(内部定义) 比较操作来检查键的匹配性
    - 基本上相当严格对象相等的标准
    - 独立实例不冲突
    - 与严格相等一样，作为键的对象和其他集合类型，在内容修改时仍然保持不变
    - 可能有一些一项不到的冲突
        ```javascript
        const m = new Map();
        // a, b = NaN
        const a = 0/'', 
              b = 0/'', 
              pz = +0,
              nz = -0;
        m.set(a, 'foo');
        m.set(pz, 'bar');
        alert(m.get(b));    //foo
        alert(m.get(nz));   //bar
        ```
- 与 Object 不同，Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作
    - 映射实例可以提供一个迭代器，以插入顺序生成 [key, value] 形式的数组
    - 可以通过`entries()`方法或者`[Symbol.iterator]`属性(引用`entries()`方法)取得这个迭代器
    - 因为`entries()`是默认迭代器，所以可以直接对映射实例使用扩展操作
- `forEach()`
    - 接收回调函数和可选的`this`取值
    - 回调函数有val, key两个参数
- `keys()`, `values()`
    - 分别返回以插入顺序生成键和值的迭代器
- 与 Object 的比对
    - Map 内存占用小于 Object
    - 插入 Map 要稍快一些
    - Object 在一些特定的情况下查找要优于 Map
    - Map 删除属性的性能要好于 Object

**WeakMap**
- WeakMap 的 API 是 Map 的子集
- 弱映射中的键只能是对象
- 弱映射的键不属于正式的引用，不会阻止垃圾回收
- 没有`clear()`和迭代方法
- 使用弱映射
    - 私有变量
        - 可以将私有变量放在弱映射中
            ```javascript
            const wm = new WeakMap();
            class User {
                constructor(id) {
                    this.idProperty = Symbol('id');
                    this.setId(id);
                }
                setPrivate(property, value) {
                    const privateMembers = wm.get(this) || {};
                    privateMembers[property] = value;
                    wm.set(this, privateMembers);
                }
                getPrivate(property) {
                    return wm.get(this)[property];
                }
                setId(id) {
                    this.setPrivate(this.idProperty, id);
                }
                getId() {
                    return this.getPrivate(this.idProperty);
                }
            }
            const user = newUser(123);
            alert(user.getId());    //123
            user.setId(456);
            alert(user.getId());    //456
            //并不是真正私有的
            alert(wm.get(user)[user.idProperty]);   //456
            ```
        - 外部代码只需要拿到对象实例的引用和弱映射，就可以取得'私有'变量了，为了避免这种访问，可以用一个闭包把 WeakMap 包装起来
            ```javascript
            const User = (() => {
                const wm = new WeakMap();
                class User {
                    constructor(id) {
                        //构造函数内容，同上
                    }
                    //其他函数，同上
                }
                return User;
            })
            const = new User(123);
            ```
        - 整个代码也完全陷入了 ES6 之前的闭包私有变量模式
    - DOM 节点元数据
        ```javascript
        const wm = new WeakMap();
        const loginButton = document.querySelector('#login');
        // 给这个节点带来一些元数据
        wm.set(loginButton, {disabled: true});
        ```

**Set**
- 使用`new`关键字和`Set()`构造函数可以创建一个空集合
    - 可以传入可迭代对象作为参数初始化集合，包含插入新集合实例的元素
        ```javascript
        const s2 = new Set({
            [Symbol.iterator]: function*() {
                yield 'val1';
                yield 'val2';
                yield 'val3';
            }
        });
        alert(s2.size); //3
        ```
- `add()`, `has()`, `delete()`, `clear()`
    - `add()`方法返回集合的实例
    - `delete()`返回一个布尔值，表示集合中是否存在要删除的值
- Set 维护插入值的顺序，支持按顺序迭代
    - `values()`, `keys()`(别名), `[Symbol.iterator]`(引用`values()`方法)返回迭代器
    - 因为`values()`是默认迭代器，所以可以直接对集合实例使用扩展操作，把集合转换为数组
    - `entries()`
        ```javascript
        const s = new Set(['val1', 'val2']);
        for (let pair of s.entries()) {
            console.log(pair);
        }
        // ['val1', 'val1']
        // ['val2', 'val2']
        // ['val3', 'val3']
        ```
    - `forEach()`
        - 传入一个回调函数，以及可选的`this`值
        - 回调函数具有 val, dupVal 两个参数
- 定义正式集合操作

**WeakSet**
- 弱集合的值不属于正式的引用
- 弱集合中的值只能是对象
- 弱集合不可迭代
- 可以使用弱集合给对象打标签

**迭代器和生成器**
- 计数循环就是一种最简单的迭代
    - 迭代之前需要如何使用数据结构
    - 遍历顺序并不是数据结构固有的
- `Array.prototype.forEach()`
    - 解决了单独记录索引和通过数组对象取得值的问题
    - 没有办法表示迭代何时终止
    - 只适用于数组
    - 回调结构笨拙

**迭代器模式**
- 把有些结构称为'可迭代对象'，因为它们实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费
- 可以把可迭代对象理解成数组或集合这样集合类型的对象
    - 它们包含的元素都是有限的，而且都具有无歧义的遍历顺序
    - 可迭代对象不一定是集合对象，如计数循环， 临时性可迭代对象可以实现为生成器
- 任何实现 Iterable 接口的数据结构都可以被实现 Iterator 接口的结构消费
- 实现 Iterable 接口要求同时具备两种能力
    - 支持迭代的自我识别能力
    - 创建实现 Iterator 接口的对象的能力
- 字符串、数组、映射、集合、arguments对象、DOM 集合属性都实现了 Iterable 接口
- 实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性
    - for-of 循环、数组解构、扩展操作符、`Array.from()`、创建集合、创建映射、`Promise.all()`、`Promise.race()`、yield 操作符
    - 这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器
- 如果对象原型链上的父类实现了 Iterable 接口，那这个对象也就实现了这个接口

**迭代器**
- 每次成功调用`next()`，都会返回一个`iteratorResult`对象
    - `done`表示是否还可以再次调用`next()`取得下一个值
    - `value`包含可迭代对象的下一个值或`undefined`
- 只要迭代器到达 done: true 状态，后续调用`next()`就返回一样的值了
- 每个迭代器都代表对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系
- 迭代器并不与可迭代对象某个时刻的快照绑定
    - 如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化
    - 迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象

**自定义迭代器**
- 任何实现了 Iterator 接口的对象都可以作为 迭代器使用
- 一个可迭代对象能够创建多个迭代器            
- 提前终止迭代器
    - 可能情况
        - for-of 循环通过语句退出
        - 解构操作并未消费所有值
    - 可选的`return()`方法用于指定在迭代器提前关闭时的逻辑
        - 要知道迭代器是否可关闭，可以测试实例的`return`属性是不是函数
        - 给不可关闭的迭代器增加`return()`方法不能让它变成可关闭的
        - 调用`return()`方法不会强制迭代器进入关闭状态

**生成器**
- 定义
    - 拥有在函数块内暂停和恢复代码执行的能力
- 用途
    - 使用生成器自定义迭代器
    - 实现协程
- 形式
    - 一个函数，函数名称前面加一个星号(`*`)  
    - 箭头函数不能被用来定义生成器函数
    - 标识生成器函数的星号不受两侧空格影响
- 执行
    - 调用生成器函数会产生一个生成器对象
        - 生成器对象一开始处于暂停执行的状态
        - 生成器也实现了 Iterator 接口，具有`next()`方法
    - 调用`next()`方法会让生成器开始或恢复执行
        - `next()`方法返回值类似迭代器，具有`done`和`value`属性
        - `value()`属性是生成器函数的返回值
    - 生成器函数在遇到`yield`关键字后会停止执行
        - 通过`yield`退出，`done: false`
        - 通过`return`退出，`done: true`
        - `yield`关键字必须直接位于生成器函数定义中
- 使用
    - 把生成器对象当成可迭代对象
        ```javascript
        function* nTimes(n) {
            while(n--) {
                yield;
            }
        }
        for (let _ of nTimes(3)) {
            console.log('foo');
        }
        ```
    - 上一次让函数暂停的`yield`关键字会接收到传给`next()`方法的第一个值
        - 第一次调用`next()`传入的值不会被使用
    - 可以用星号增强`yield`的行为，让它能够迭代一个可迭代对象
        ```javascript
        function* generatorFn() {
            yield*[1, 2, 3];
        }
        ```
    - 生成器对象除了`next()`以及可选的`return()`方法外，还具有`throw()`方法
        - `return()`方法会强制生成器进入关闭状态，提供给`return()`方法的值，就是终止迭代器对象的值
        - `throw()`方法将一个错误注入到生成器对象中。错误未被生成器函数内部处理，则关闭生成器

**对象属性**
- ECMA-262 使用一些内部特性描述属性的特征
- 分为数据属性和访问器属性两种
    - 数据属性会包含一个保存数据值的位置，值会从这个位置读取
        - 数据属性有四个特性描述它们的行为
        - 要修改属性的默认特性，必须使用`Object.defineProperty()`方法
    - 访问器属性不包含数据值。反而包含一个获取函数和一个设置函数
        - 访问器属性不能直接定义，必须使用`Object.defineProperty()`方法
    - 可以使用`Object.defineProperties()`一次性定义多个属性
    - 使用`Object.getOwnPropertyDescriptor()`方法可以取得指定属性的属性描述符

**合并对象**
- `Object.assign()`
    - 接收一个目标对象和一个或多个源对象作为参数
    - 将每个源对象中可枚举和自有属性复制到目标对象
    - 返回修改后的目标对象

**Object.is()**
- 类似全等操作符，但考虑到了一些边界情形
    ```javascript
    Object.is(+0, -0);  //false
    Object.is(+0, 0);   //true
    Object.is(-0, 0);   //false
    Object.is(NaN, NaN);    //true
    ```
- 要检查超过两个值，递归地利用相等性传递即可
    ```javascript
    function recursivelyCheckEqual(x, ...rest) {
        return Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest));
    }
    ```

**增强的对象语法**
- 属性值简写
    - 简写属性名只要使用变量名，就会自动被解释为同名的属性键
- 可计算属性
    - 中括号包裹的对象属性键告诉运行时将其作为表达式求解
- 简写方法名
    - 简写方法名对获取函数和设置函数适用
        ```javascript
        let person = {
            sayName(name) {
                console.log(`My name is ${name}`);
            },
            get name() {},
            set name() {}
        };
        ```
    - 简写方法名与可计算属性键相互兼容
- 对象解构
    - 使用与对象匹配的结构来实现对象属性赋值
        ```javascript
        let person = {
            name: 'Matt',
            age: 27
        };
        let {
            name: personName,
            age: personAge
        } = person;
        ```
    - 也可以使用简写语法
        ```javascript
        let {name, age} = person;
        ```
    - 可以在解构赋值的同时定义默认值
        ```javascript
        let {name, job='engineer'} = person;
        ```
    - 解构在内部使用函数`ToObject()`把源数据结构转换为对象
        - `null` 和 `undefined` 不能被解构，否则会抛出错误
    - 解构并不要求变量必须在解构表达式中声明， 但如果给事先声明的变量赋值，则赋值表达式必须包含在一对括号中
        ```javascript
        let personName, personAge;
        ({name: personName, age: personAge} = person);
        ```
    - 可以使用嵌套解构
        ```javascript
        let person = {
            job: {
                title: 'engineer'
            }
        }
        let { job: {title} } = person;
        ```
    - 在函数参数列表中也可以进行解构赋值

**工厂模式**
- 使用函数封装创建对象的代码
- 没有解决对象标识问题(新创建的对象是什么类型)

**构造函数**
- 要创建构造函数的实例，要使用`new`操作符
    1. 在内存中创建新对象
    2. 新对象内部的`[[Prototype]]`特性被赋值为构造函数的`prototype`属性
    3. 构造函数内部的`this`被赋值为这个新对象
    4. 执行构造函数内部的代码
    5. 如果构造函数不返回非空对象，则返回刚创建的新对象
- 创建的实例对象`constructor`属性指向构造函数
- 自定义构造函数可以确保实例被标识为特定类型
- 定义的方法会在每个实例上都创建一遍

**原型模式**
- 函数与其原型对象通过`prototype`和`constructor`属性相互引用
- 构造函数创建实例内部`[[Prototype]]`指针就会被赋值为构造函数的原型对象
- `instanceof`操作符和`isPrototype()`方法检查实例的原型链中是否包含指定构造函数的原型
- `Object.getPrototypeOf()`方法返回参数的内部特性`[[Prototype]]`的值
- `Object.setPrototypeOf()`方法可以向实例的私有特性`[[Prototype]]`写入一个新值
- `Object.create()`方法创建一个新对象，以参数对象作为原型
- 在访问对象属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身，如果在这个实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原型对象
    - 虽然可以通过实例读取原型对象上的值，但不可能通过实例重写这些值。如果在实例上添加了一个与原型对象同名的属性，那就会在实例上创建这个属性，这个属性会遮住原型对象上的属性。
- `hasOwnProperty()`方法在属性存在于调用它的对象实例上时返回`true`
- `Object.getOwnPropertyDescriptor()`方法只对实例属性有效
- `in`操作符
    - 在单独使用操作符时，只要属性能在对象上访问到，就返回`true`
    - 在 for-in 循环中使用`in`操作符时，可通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性
- `Object.keys()`接收一个对象作为参数，返回包含该对象所有可枚举的实例属性名称的字符串数组
- `Object.getOwnPropertyNames()`返回一个数组，列出所有实例属性，无论是否可以枚举
- `Object.getOwnPropertySymbols()`类似上一个方法，只是针对符号
- `Object.values()`, `Object.entries()`接收一个对象，返回它们内容的数组
    - 非字符串属性转换为字符串输出
    - 这两个方法执行浅复制
    - 符号属性会被忽略
- 原型的问题
    - 弱化了向构造函数传递初始化参数的能力
    - 共享特性

**原型继承**
- 原型链的问题
    - 使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先的实例属性变成了共享的原型属性
    - 子类型在实例化时不能给父类型的构造函数传参
- 盗用构造函数
    - 使用`apply()`和`call()`方法以新创建的对象为上下文执行构造函数
        ```javascript
        function SuperType() {
            this.colors = ['red', 'blue', 'green'];
        }
        function SubType() {
            SuperType.call(this);
        }
        ```
    - 优点
        - 可以在子类构造函数中向父类构造函数传参
    - 缺点
        - 函数不能重用
        - 子类不能访问父类原型上定义的方法
- 组合继承
    - 使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性
        ```javascript
        function SubType(name, age) {
            SuperType.call(this, name);
            this.age = age;
        }
        SubType.prototype = new SuperType();
        SubType.prototype.sayAge = function() {};
        ```
- 寄生式继承
    - 盗用构造函数继承实例属性，使用父类原型的浅拷贝作为子类原型

**类**
- 与函数进行对比
    - 类似函数声明，定义类有类声明和类表达式两种
    - 函数声明可以提升，类声明不能
    - 函数受函数作用域限制，类受块作用域限制
- 类可以包含构造函数、实例方法、获取函数、设置函数和静态类方法
- 类表达式的名称是可选的，可以通过`name`属性取得类表达式的名称字符串
- 构造函数
    - `constructor`关键字用来在类定义块内部创建类的构造函数
    - 使用`new`操作符创建类的新实例时，调用构造函数
        1. 在内存中创建一个新对象
        2. 新对象内部的`[[Prototype]]`指针被赋值为构造函数的`prototype`属性
        3. 构造函数内部的`this`被赋值为这个新对象
        4. 执行构造函数内部的代码
        5. 在构造函数不返回非空对象的前提下返回刚创建的对象
    - 类实例化时传入的参数会用作构造函数的参数
    - 调用类构造函数时如果忘了使用`new`会抛出错误
- ECMAScript 类就是一种特殊函数
- 类标识符也有`prototype`属性，而这个原型也有一个`constructor`属性指向类自身
- 在构造函数内部添加实例属性
- 在类块中定义的方法作为原型方法
- 静态类成员在类定义中使用`static`关键字作为前缀。静态成员中，`this`引用类自身
- 类定义不显式支持在原型或类上添加成员数据，但在类外部，可以手动添加