# HTML5

## SECTION 1

> HTML 已经特别为构建真正的 Web 应用做了调整，提供了本地存储、2D绘图、离线支持、套接字和线程等诸多特性。

HTML5 相较于 HTML 的更新
- 声明只需要使用`<!DOCTYPE html>`
- 指定 meta 标记时，只需要提供一个字符编码`<meta charset="utf-8">`
- `<link>`标记可以删除`type`属性，因为已经宣布 CSS 作为 HTML5 的标准样式
- `<script>`标记可以删除`type`属性，因为 JavaScript 已经成为标准，同样也是默认的脚本语言

**HTML5 工作流程**
1. 浏览器加载一个文档，其中包括用 HTML 写的标记和用 CSS 写的样式
2. 浏览器加载文档时，还会为页面创建一个内部模型。类似树的结构，我们把这个树称为 **DOM**(Document Object Model)
3. 浏览器加载页面时，还会加载 **JavaScript 代码**，通常页面加载之后开始执行这些样式
4. 通过 **API**(Application Programming Interfaces) ，可以访问音频和视频、使用画布完成2D绘图、访问本地存储，还可以使用构建应用所需的很多其他优秀技术。*要使用所有这些 API ，需要用到 JavaScript*

> Web 应用应该具备一些特点，比如维护大量状态、管理与用户更复杂的交互、无需页面刷新就能显示不断更新的动态数据，或者甚至可以完成更复杂的任务或计算。

## SECTION 2

**关于 JS**
- JS 是动态类型，不需要在声明变量时指定类型
- 命名变量时可以使用字母、数字、下划线、美元符，同时变量要以字母、下划线或者美元符开头
- 不能使用 JS 的**保留字**作为变量名
- 在`<head>`中增加 JS 脚本时，一旦浏览器解析`<head>`部分就会执行这个代码
- **创建数组**
    - 使用`new Array()`
    - 使用字面量

**关于 DOM**
- 可以使用`getElementById()`获取 DOM 中的元素
- 可以使用`innerHTML`改变元素的内容

**window 对象**
- `window.onload = init`表示页面完全加载时执行`init`函数

## SECTION 3

**关于事件**
- 浏览器中可能会发生很多事件，比如说按钮点击事件、数据到达事件、时间到期事件（定时器到期）
- 可以提供一些代码在事件发生时调用
    - `button.onclick = handleButtonClick`表示将按钮的点击事件与函数`handleButtonClick`关联
    - `window.onload = init`表示将窗口加载完成事件与函数`init`关联

**关于 DOM**
- 使用`document.createElement("Tagname")`创建一个新元素
- 使用`appendChild()`方法将元素增加至 DOM 中

> 可以使用 Web 存储 API (*localStorage*)在用户的浏览器中存储数据

## SECTION 4

**创建函数**
1. 要创建一个函数，需要用到`function`关键字，后面是一个函数名
2. 为函数提供0个或多个参数
3. 编写函数体，这要放在大括号之间
4. 可以返回一个值作为调用这个函数的结果

> 为什么形参名前面没有 var 呢？形参就是一个新变量，是吧？
> 实际上就是这样。函数会为你完成实例化变量的全部工作，所以你不需要在形参名前面加 var 关键字。

**关于函数**
- 函数名的命名规则同变量名
- 传递一个基本类型的值的时，它会复制到形参。我们把这成为按值传递
- 如果函数没有一个 return 语句，这样的函数会返回 underfined
- 函数也是一个值
- 函数可以没有名字

> 对象是管理复杂代码、理解 DOM 、组织数据的关键，甚至也是包装 HTML5 JavaScript API 的基本方法

**关于对象**
- 可以使用字面量创建对象
- 可以用`.`访问对象属性
- 可以用`[]`访问对象属性
- 可以枚举对象的所有属性
- 可以作为函数的参数

> **在调用一个函数并传入一个对象时，实际上只传递了对象引用，在函数内部做出的改变可以在函数外看到**

**构造函数**
- 根据约定，命名构造函数时首字母要大写
- 方法中使用`this`指定对象的属性
- 在调用前面加上关键词`new`

> window 对象表示你的 JavaScript 程序的全局环境，同时还表示应用的主窗口

**window 属性**
- location 包含页面的 URL。如果改变这个属性，浏览器会访问新 URL
- status 包含将在浏览器状态区显示的一个串
- onload 包含了页面完全加载时要调用的函数
- document 包含 DOM

**window 方法**
- alert 显示一个提醒
- prompt 类似 alert，只不过会从用户得到信息
- open 打开一个新的浏览器窗口
- close 关闭窗口
- setTimeOut 指定的时间后调用一个处理程序
- setInerval 以一个指定的时间间隔反复调用一个处理程序

**document 属性**
- domain 提供文档服务的域
- title 文档的标题
- URL 文档的 URL

**document 方法**
- getElementById
- getElementByTagName
- getElementByClassName
- creatElement

**Element 属性**
- innerHTML
- childElementCount
- firstChild

**Element 方法**
- appendChild
- insertBefore
- setAttribute
- getAttribute

> 如果声明一个局部变量与全局变量同名，这个局部变量会遮蔽全局变量
> 从页面链接到多个 JavaScript 文件时，所有全局变量都定义在一个全局空间中

## SECTION 5

> 使用地理定位 API 时，都要使用小数值，西经和南纬都用负数表示。

如何确定位置
- IP 地址 任何地方都可以使用，IP 地址通常解析为你的 ISP 本地分局的位置，而不是你的具体位置。可以认为这种方法在城市级（有时甚至在街区级）很可靠
- GPS 它能利用卫星提供极其精确的位置信息。不过，要使用 GPS，你的设备必须能看到天空，而且可能需要花很长时间才能得到位置
- 蜂窝电话 可以根据你与一个或多个蜂窝电话基站的距离确定你的位置
- Wi-Fi 使用一个或多个 Wi-Fi 接入点完成三角定位

> 没办法知道设备采用哪一种方法得到位置，因为要由浏览器实现来确定如何得到位置

- 当浏览器支持地理定位时，它的`navigation`对象中有一个`geolocation`属性
- `geoloction`属性是一个对象，其中包含整个地理定位 API。这个 API 的主要方法是`getCurrentPosition(successHandler, errorHandler, options)`，他的工作是获取浏览器的位置。如果成功获取到位置就会调用方法参数中的函数，会向函数传入一个`position`对象，其中包括一个有经度和纬度的`coordinates`对象，`position`对象有一个`croods`属性，其中包含指向`coordinates`的一个引用。
- 关于返回的错误对象`error.code`是错误码，`error.message`可能会有一些额外的信息。

> 要计算两个坐标之间的距离，几乎所有人都会使用半正矢公式

**Google Maps**
- 引入`<script src="http://maps.google.com/maps/api/js?sensor=true"></script>`，一定要原样输入，如果只是使用地图不需要你的位置，可以输入`sensor=false`
- Google API 希望纬度和经度包装在一个单独的对象中。要获得这样的一个对象，可以使用 Google 提供的一个构造函数：`var googleLatAndLong = new google.maps.LatLng(latitude, longtude)`
- Google 提供了一些选项，可以设置这些选项来控制如何创建地图。
```javascript
var mapOption = {
    zoom: 10,   //zoom可以指定为0-21的一个值，较大的数对应着进一步放大
    center: googleLatAndLong,   //这是我们创建的新对象。我们希望地图在这个位置居中
    mapTypeId: google.maps.MapTypeId.ROADMAP    //还可以试试SATELLIETE和HYBRID作为这个选项值
}
```
- `map = new google.maps.Map(mapDiv, mapOptions)`这是 Google 提供的另一个 API ，它取一个元素和我们的选项，创建并返回一个地图对象。

**增加一个大头钉标记**
- 首先创建一个新函数`addMaker`，然后使用 Google API 创建一个标记
```javascript
function addMarker(map, latlong, title, content) {  //地图，google样式的经纬度， 标记的标题，信息窗口的一些内容
    var markerOption = {
        position: latlong,  //经纬度
        map: map,   //地图
        title: title,   //标题
        clickable: true //是否可点击
    }；

    var marker = new google.maps.Marker(markerOptions); //使用 Google API 提供的另一个构造函数创建maker对象，并传入我们的配置对象

//接下来，定义特定于信息窗口的一些选项，要创建这个信息窗口，然后使用 Google API 创建一个新的 InfoWindow 对象。
    var infoWindowOptions = {   //为信息窗口定义一些选项
        content: content,
        position: latlong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOption);//用它创建信息窗口

    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map); 
    })
}
```
