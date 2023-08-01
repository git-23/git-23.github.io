# CSS

## 盒子模型

默认盒模型的`height`与`width`属性设置的是 context 区域的大小。可以指定`box-sizing`属性为`border-box`使用替代盒模型

元素的外边距会产生重叠，边距具有简写方式，顺序为上右下左

## 对齐

可以使用`text-align`指定文本对其的方式，这个属性会被继承

## 媒体查询

可以在`<link>`标记中使用`media`属性指定应用样式表的设备类型。也可以在 CSS 中使用`@media`规则增加媒体查询

screen 指定有屏幕的设备，print 指定打印机设备，(max-device-width:480px) 指定屏幕的宽度不超过480像素。使用 and 连接

## 选择器

`div p{}`(后代选择器)，`div>p{}`(子代选择器)，`a:hover{}`(伪类选择器)

## 字体

可以使用`font-family`属性指定一组有共同特征的字体。有五种字体系列，`sans-serif`(无衬线字体)、`serif`(衬线字体)、`monospace`(等宽字体)、`cursive`(手写字体)、`fantasy`(装饰字体)

可以使用`@font-face`规则引入 Web 字体，`font-family`属性指定字体的名字，`src`属性指定可以得到字体资源的 URL

指定字体大小的单位有`px`, `em`, `%`以及关键字，`em`和`%`与父元素继承的`font-size`属性为基准。可以为`<body>`字体大小指定一个关键字，其余元素相对进行调整

指定颜色的方法有关键字、RGB、十六进制码三种，十六进制码中的每两位对应一个颜色分量

可以使用`font`属性指定字体大小/行高，字体等

## 背景与边框

可以使用`background`属性同时指定背景颜色、图片、铺放方式

可以使用`border`属性同时指定边框粗细、样式、颜色

## 布局

使用`float`浮动指定了宽度的元素，使用`clear`属性清除浮动带来的重叠

指定`display`属性为`table`进行表格显示，将每个行的`display`属性设置为`table-row`，每一个单元格的`display`属性设置为`table-cell`。可以使用`border-spacing`属性确定单元格之间的间距