# HTML5

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
    - `map.panTo(latlong)`方法取这个 LatLng 对象并滚动地图，使你的新位置位于地图中心

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

**地理定位 API**

**方法**
- getCurrentPosition
```javascript
var positionOptions = {
    enableHighAccuracy: false,  //启用高精度
    timeout: Infinity,  //控制浏览器确定位置的时间，可以设定为一个值，单位为毫秒
    maximumAge: 0   //设置了一个位置的最大年龄，超过这个年龄后浏览器需要重新计算位置
}
```
- watchPosition 返回一个`watchId`，可以在任何时候使用这个 id 取消监视行为。
    1. 你的应用调用`watchPosition`，传入一个成功处理函数
    2. `watchPosition`在后台不断监视着你的位置
    3. 你的位置改变时，`watchPosition`调用成功处理函数来报告你的新位置
    4. `watchPosition`继续监视你的位置（并向成功处理程序报告），直到你调用`clearWatch`将它清除
- clearWatch 参数为`watchId`

**属性**

**相关的对象**  
- Position
    - coords
    - timestamp
- Coordinates
    - latitude 纬度
    - longitude 经度
    - accuracy 精度
    - altitude
    - altitudeAccuracy
    - heading  朝向
    - speed 速度

## SECTION 6

> 这种使用`XMLHttpRequest`获取数据的模式通常成为 Ajax 或 XHR

**如何从 JavsScript 做出请求**
1. 首先从一个 URL 开始，`var url = "http://xxx.com/xx.json";`
2. 接下来创建一个请求对象，`var request = new XMLHttpRequest();`
3. 接下来告诉请求对象我们希望它获取哪个 URL，以及要使用哪种请求，`request.open("GET", url)`
    > open 只是用一个 URL 建立一个请求，并告诉这个请求对象要使用哪种请求。
4. 提供一个处理程序，数据到达时就会调用这个处理程序
    ```javascript
    request.onload = function() {
        if (request.status == 200) {
            alert(reauest.responseText);
            //可以从request对象的responseText属性得到响应
        }
    }
    ```
5. 告诉请求对象去获取数据，为此要使用`send()`方法
    ```javascript
    request.send(null)
    //null 表示不发送任何数据
    ```

> `XMLHttpRequest`可以获取各种各样的数据。有些是 XML，但更多是 JSON (JavaScript Object Notation)

**关于 JSON**
*使用两个简单的方法调用可以让 JSON串 和 JS对象 相互转换*
- `JSON.stringify(obj)`将对象转为 JSON字符串
- `JSON.parse(jsonString)`将 JSON字符串 转为对象
- 关于转换，并不是所有的一切都能转换为一个 JSON串，例如，方法就不能被转换为一个 JSON串

> 我打赌你们肯定是碰到跨域问题了，因为你在从一个服务器请求数据，而页面并非来自这里。浏览器认为这是一个安全问题。
> 这是一个浏览器安全策略，如果从某个域提供页面本身，安全策略不同从另一个域获取数据

**JS 可接受的行为**
1. 用户(通过浏览器)对一个 HTML 页面做出请求(当然，也包括所有相关的 Javascript 和 CSS)
2. GoodDomain.com 的页面需要得到 GoodDomain.com 的一些数据，对这些数据做出了一些 XMLHttpRequest 请求
    *数据与页面处于同一个服务器*

**JS 不能接受的行为**
1. 浏览器对 GoodDomain.com 上的一个页面做出请求，这可能包括 JavaScript 和 CSS 文件（同样位于 GoodDomain.com）
2. 不过，现在代码希望从另一个来源得到数据，也就是 BadDomain.com.
    1. 页面使用 XMLHttpRequest 向 BadDomain.com 请求数据
    2. 浏览器看到这个请求指向与页面不同的域，就会停下，请求被拒绝
    3. BadDomain.com 服务器根本没有看到请求，在它看到请求之前，浏览器安全策略已经中止了这个请求

> 如果所构建的应用主要依赖你自己的数据，使用 XMLhttpRequest 通常是最好的办法

**其他方法获取数据**
- 确实还有一种基于 JSON 的方法，成为 JSONP(JSON with Padding)
- 基本来说，这种方法就是让`<script>`标记完成获取数据的工作
    1. 我们的 HTML 中包括一个`<script>`元素。这个 script 的源实际上是一个 Web 服务的 URL，这个 Web 服务将为我们提供数据的 JSON 对象
    2. 浏览器遇到页面中的`<script>`元素时，再向src URL发出一个 HTTP 请求
    3. 服务器像对待其他 HTTP 请求一样处理这个请求，并在响应中发回 JSON
    4. JSON 响应的形式是字符串，再由浏览器解析和解释。任何数据类型都会转换为真正的 JavaScript 对象和值，另外所有的代码都将执行
- 有填充的 JSON
    1. 与前面一样，包含一个`<script>`元素。这个 script 的源是一个 Web 服务的 URL，这个 Web 服务将为我们提供 JSON 数据
    2. 与前面一样，浏览器遇到页面中的 script 元素，并向 src URL 发送一个 HTTP 请求
    3. 仍与前面一样，服务器正常处理这个请求，发回 JSON 串之前，首先把他包装到一个函数调用中
    4. 解析和解释 JSON 响应时，它包装在一个函数调用中。所以会调用这个函数，并把由 JSON 串创建的对象传入这个函数

> 只要我们希望浏览器为我们完成一个 JSONP 类型操作，就可以创建一个新的`<script>`元素

**定时器**
- `setInterval(handleRefrsh, 3000);`

**浏览器缓存**
> 如果你反复地获取同一个 URL，浏览器为了提高效率会把它缓存起来，所以你会反复地得到相同的缓存文件
> 对于这个问题，有一个像 Web 一样老的简便"疗法"。我们只需要在 URL 末尾增加一个随机数，就会诱使浏览器认为它是以前从来没有见过的一个新 URL
    ```javascript
    var url = "http://gumball.wickedlysmart.com/?callback=updataSales" + "&random=" + (new Date()).getTime();
    ```

## SECTION 7

**画布元素**
- `<canvas id="" width="" height="">`可以设置它在 Web 页面中所占据的空间大小，默认的宽度和高度分别是300px、150px，在 CSS 中设置会对画布的大小进行缩放
- 如果用户的浏览器不支持画布，可以在画布元素中放入希望显示给他们的文本

**在画布上绘图**
绘制一个矩形
```javascript
window.onload = function() {
    var canvas = document.getElementById('tshirtCanvas');

    var context = canvas.getContext('2D');
    //请求画布提供一个可供绘制的上下文

    context.fillRect(10, 10, 100, 100);
    //矩形在画布上的 x, y位置，以及矩形的宽度和高度
}
```

**上下文方法**
- fillStyle 指定颜色
- fillRect 填充矩形
- strokeRect  矩形轮廓

> 画布是 Web 页面中显示的图形区，上下文是与画布关联的一个对象。它定义了一组属性和方法，可以用来在画布上进行绘制。甚至可以保存上下文的状态，以后再恢复，有时这会很方便。
> 画布设计用来支持多个接口，除了 2D，还有 3D，以及我们还没有想到的其他接口。通过使用上下文，就能在同一个画布元素中处理不同的接口。不能直接在画布上绘制，因为你需要一个上下文来指定使用哪个接口。

**检测浏览器是否支持画布**
```javascript
var canvas = document.getElementById("tshirtCanvas");
if (canvas.getContext) {
    //you have canvas
} else {
    //sorry no canvas API support
}
```

> 选择表单控件的`selectedIndex`属性会返回你在下拉菜单中所选属性的编号。每个选项列表都会转换为一个数组，各个选项会按一定顺序放在这个数组中。每个选项是一个对象

**绘制一个三角形**
```javascript
context.beginPath();    //告诉画布我们要开始一个新路径
context.moveTo(100, 150);   //移动到画布上一个指定点
context.lineTo(250, 75);    //描路径
context.lineTo(125, 30);
context.closePath();    //闭合路径

context.lineWidth = 5;
context.stroke();
context.fillStyle = "red";
comtext.fill();
```

**绘制一个圆**
```javascript
context.beginPath();
context.arc(150, 150, 50, 0, 2 * Math.PI, true)
//圆心、半径、弧的起始角和终止角和创建圆弧方向（顺时针为 false ，逆时针为 true）
//角可以负方向度量，也可以按正方向度量
```

**画布 API 中提供的文本方法和属性**
- context.textAlign
- context.fillText
- context.strokeText
- context.font
- context.textBaseline
- context.shadowBlur
- context.shadowOffsetX
- context.shadowOffsetY
- context.shadowColor



**在画布上放置图像**
1. 要把这个图片放到画布上，首先需要一个 JavaScript image 对象
    ```javascript
    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png"
    ```
2. `context.drawImage(twitterBird, 20, 120, 70, 70);`
3. 图片不会立即加载，绘制之前要确保图片已经完成加载
    ```javascript
    twitterBird.onload = funciton() {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };
    ```

## SECTION 8

**video 元素**
- contrals 提供控件
- autoplay 一旦加载视频就自动播放
- src
- width, height
- poster 不播放电影时显示的海报图片
- loop
- preload 设置为 none ,在点击播放之前不下载视频、设置为 metadata 只下载视频元数据、设置为 auto ,让浏览器自己决定

**方法**
- load
- play
- canPlayType
    > 可以用`canPlayType`通过编程询问视频对象能不能播放某种格式

> 画布可以用作为视频的显示表面，来实现定制控件或视频的其他效果

#### 如何完成视频处理
1. 视频播放器在后台解码，并播放视频
2. 视频逐帧地复制到一个隐藏的缓冲画布并进行处理
    **创建缓冲区**
    ```javascript
    buffer.drowImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    //从视频中得到一个图像。将视频指定为源，drawImage会得到一个视频帧作为图像数据
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
    //从画布上下文中获取图像数据，然后把它存储在一个变量frame中，以便处理
    ```
    **处理缓冲区**
    ```javascript
    var length = frame.data.length/4
    //frame的长度实际上是画布大小的4倍，因为每个像素都有四个值：RGBA
    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];
        if (effectFunction) {
            effectFunction(i, r, g, b, frame.data);
            //传入像素的位置、RGB值、以及frame.data数组，效果函数会用新的像素值更新frame.data数组
        }
    }
    ```

    **逐帧处理**
    ```javascript
    setTimeout(processFrame, 0);
    //告诉 JavaScript 尽快再次运行 processFrame
    ```

    **效果滤光器函数**
    ```javascript
    function noir(pos, r, g, b, data) {
        var brightness = (3*r + 4*g + b) >>> 3;
        if (brightness < 0) brightness = 0;
        data[pos * 4 + 0] = brightness;
        data[pos * 4 + 1] = brightness;
        data[pos * 4 + 2] = brightness;
    }
    ```
3. 处理一帧之后，将它复制到另一个显示画布来观看
    ```javascript
    display.putImageData(frame, 0, 0);
    //这个方法取帧中的数据，把它写到画布上指定的x, y位置
    ```

> 在 Web 上分发视频更有可能出现问题。另外，通过网络向一个浏览器或移动设备分发视频时，视频比特率的影响更大
> 流式视频通常作为一个通用词汇，表示从 Web 得到视频发送到你的浏览器。不过渐进式视频和流式视频实际上都只是技术术语。这本书中我们一直在使用渐进式视频，这说明，我们获取视频时，都会使用 HTTP 获取一个文件，如 HTML 文件或图像，而且总是在获取时对它解码并播放。流式视频则使用一个协议分发视频，这个协议经过高度优化，可以采用一种最优的方式分发视频。

#### 检测错误
**使用 error 事件**
```javascript
video.addEventListener("error", errorHandler, false);
//当出现错误的时候，会调用 errorHandler 函数
```

**错误码**
- `error.code = 1` 如果通过网络得到视频的过程被网络中止（可能是应用户的请求）
- `error.code = 2` 网络获取视频时如果被一个网络错误中断
- `error.code = 3` 如果视频解码失败
- `error.code = 4` 如果不支持指定的视频源，可能由于 URL 由问题

## SECTION 9

**Cookie 如何工作**
1. 浏览器获取一个 Web 页面，服务器可以随响应发送一个 Cookie
2. 下次浏览器向服务器发送请求时，它会随请求同时发送之前收到的 Cookie
3. 服务器可以使用 Cookie 实现个性化的体验，Cookie 与一个域关联

**HTML5 Web存储**
1. 页面可以在浏览器的本地存储中存储一个或多个键值对
2. 然后用键来获取相应的值

#### 本地存储 API

```javascript
localStorage.setItem('sticky_0', 'Pick up dry cleaning');
//可以使用 setItem 方法存入某个键值对
localStorage['sticky_0'] = 'Pick up dry cleaning';

var sticky = localStorage.getItem('sticky_0');
//可以使用键从 localStorage 获取相应的值
var sticky = localStorage['sticky_0'];

for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    alert(value);
}
//提供了属性 length 和方法 key()

localStorage.clear();
//它会删除与维护这个页面的源关联的所有数据项

localStorage.removeItem(key);
//取一个数据项的键，并从 localStorage 将这个数据项删除
```

> 每个域都有 5MB，在超出 5MB 的存储空间后，可能后抛出一个 QUOTA_EXCEEDED_ERR 的异常
> 每个浏览器都会维护它自己的本地存储。所以如果你在 Safari 中创建了即时贴，就只能在 Safari 中看到它们

> 只能存储字符串作为localStorage数据项的值，但完全可以把一个数组转换为字符串，例如使用 JSON 方法

> 如果把使用 localStorage 的所有地方都替换为全局变量 sessionStorage，数据项就只会在浏览器会话期间存储。

## SECTION 10

**Web 工作线程如何工作**
1. 要使用工作线程，浏览器首先必须创建一个或多个工作线程来帮助完成计算任务。每个工作线程都由各自的 JavaScript 文件定义，其中包含完成工作所需的全部代码
2. 工作线程生活在一个相当受限的世界中。它们无法访问主浏览器代码能够访问的很多运行时对象，如 DOM 或主代码中的所有变量和函数
3. 要让一个工作线程开始工作，浏览器通常会向它发送一个消息。工作线程代码接受这个消息，查看其中是否有特殊的指令，然后开始工作
4. 工作线程完成它的工作时，会发回消息，并提供它处理的最终结果。主浏览器代码会得到这些结果，把它们以某种方式结合到页面中。

> 如果支持工作线程，全局作用域 window 中会定义属性 Worker
    ```javascript
    if (window['Worker']) {
        var status = document.getElementById('status');
        status.innerHTML = 'Bummer, no Web workers';
    }
    ```

**Web工作线程**
- 创建新的工作线程
    ```javascript
    var worker = new Worker('worker.js');
    ```
- 要让工作线程做一些工作，一种方法是向它发送一个消息
    ```javascript
    worker.postMessage('ping');
    //postMessage 可以发送字符串、数组、甚至 JSON 对象
    //不能发送一个函数，因为函数可能包括一个 DOM 引用，导致工作线程有可能会改变 DOM
    ```
- 要想接受一个工作线程的消息，需要为工作线程的`onmessage`属性定义一个处理程序，一旦工作线程发来消息，就会调用我们的处理程序
    ```javascript
    worker.onmessage = function (event) {
        var message = 'Worker says' + event.data;
        document.getElementById('output').innerHTML = message;
        //data 属性包含工作线程发送的消息，target 属性是发出这个消息的工作线程的一个引用
    };
    ```
- 编写工作线程，每个工作线程都可以接受消息，只需要为工作线程提供一个处理程序来处理接受到的消息。
    ```javascript
    onmessage = pingPong;
    //将工作线程的 onmessage 属性赋为 pingPong 函数
    function pingPong(event) {
        if (event.data == 'ping') {
            postMseeage('pong');
        }
        //如果传入的消息种包含字符串 ping ，就发回一个消息 pong
        //工作线程的消息将返回给创建这个工作线程的代码
    }
    ```

Web 工作线程可以使用 importScripts 向工作线程导入一个或多个 Javascript 文件
```javascript
importScripts('http://bigscience.org/nuclear.js',
              'http://nasa.gov/rocket.js',
              'mylibs/autmsmasher.js');
//调用函数时，会按顺序获取和执行各个 JavaScript URL
```

#### 计算 MandelBrot 集合

```javascript
for (i = 0; i < numberOgRows; i++) {    //需要循环处理图像的每一行
    var taskForRow = createTaskForRow(i);   //taskForRow 对象包含计算一行所需的全部数据
    var row = computeRow(taskForRow);
    //对于每一行，需要计算这一行的像素
    drawRow(row);
    //在屏幕上绘制每一行
}

```
