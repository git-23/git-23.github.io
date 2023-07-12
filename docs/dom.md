# DOM

DOM 是 Javascript 操作网页的接口，它将网页描述为一个对象，使用对象上提供的方法进行网页的操作。

DOM 本身只是一个接口规范，描述了对象应具有的属性和方法，可以用任何语言实现。

**DOM 的结构**  

DOM 是由节点按照不同层级抽象成的树形结构。第一层是`document`节点，代表整个网页。第二层是它的两个子节点`!doctype html`和`html`节点，前者描述了文档类型，后者构成树结构的根节点。

**节点的类型**

- `Document`：表示整个文档，可以通过`document`对象来访问。
- `DocumentType`：描述了文档的类型。
- `Element`：表示 HTML 中的元素。
- `Attr`：表示元素节点的属性。
- `Text`：表示元素节点的文本内容。
- `Comment`：表示文档中的注释。
- `DocumentFragment`：一个独立的文档节点，可以包含多个子节点，但它本身不是文档的一部分。可以使用它来减少重流和重绘。

## Node 接口

所有的节点对象都继承了 Node 对象，拥有 Node 对象上的属性和方法。

### Node 对象的属性

**关于节点自身**

- `nodeType`：返回整数值，表示节点的类型。
- `nodeName`：返回字符串，表示节点的名称
- `nodeValue`：返回字符串，表示节点本身的文本值。只有文本节点、注释节点，属性节点有文本值，该属性可读写。
- `textContent`：返回当前节点和它后代所有节点的文本值，该属性可读写。
- `baseURI`：返回字符串，表示当前网页的绝对路径。
- `ownerDocument`：返回一个对象，当前节点所在的顶层文档对象。

**关于节点之间关系的**

- `nextSibling`: 返回一个对象，当前节点后面紧邻的同级节点。
- `previousSibling`：返回一个对象，当前节点前面紧邻的同级节点。
- `parentNode`：返回一个对象，当前节点的父节点。只有可能是元素节点、文档节点、文档片段节点三种类型。
- `parentElement`：返回一个对象，当前节点的父元素节点。只返回元素节点，如果父节点是其它类型，返回`null`。
- `firstChild`：返回一个对象，当前节点的第一个子节点。
- `lastChild`：返回一个对象，当前节点的最后一个子节点。
- `childNodes`：返回一个`NodeList`集合，包含当前节点的所有子节点。属性节点算作元素节点的一部分，不算在子节点中。
- `isConnected`：返回一个布尔值，表示当前文档是否在文档之中。

### Node 对象的方法

**检查节点的状态**

- `hasChildNodes()`：返回一个布尔值，表示当前节点是否具有子节点。
- `contains(node)`：返回一个布尔值，参数节点是否满足下列三个条件之一：
    - 参数节点为当前节点。
    - 参数节点为当前节点的子节点。
    - 参数节点为当前节点的后代节点。
- `compareDocumentPosition(node)`：返回一个六比特位的二进制数，用来确定参数节点和当前节点的关系。
- `isEqualNode(node)`：返回一个布尔值，用来判断参数节点与当前节点是否相等。
    - 节点类型相同。
    - 节点属性相同。
    - 节点子节点相同。
- `isSameNode(node)`：返回一个布尔值，用来判断参数节点和当前节点是否为同一个节点。
- `getRootNode()`：返回当前节点的根节点，与`ownerDocument`属性功能相同。但`getRootNode()`方法应用于根节点时会返回根节点，`ownerDocument`属性则返回`null`。

**修改节点之间的关系**

- `appendChild(node)`：返回作为参数的节点，将参数节点作为最后一个子节点插入到当前节点。
- `insertBefore(newNode, referenceNode)`：返回插入的节点，将`newNode`节点作为`referenceNode`前面的节点插入到当前节点中。
- `removeChild(node)`：返回被移除的节点，从当前节点的子节点中移除作为参数的节点。
- `replaceChild(newChild, oldChild)`：返回被替换的节点，用`newChild`替换`oldChild`在文档中的位置。
- `normalize()`：清理当前节点内部的所有文本节点。
    - 去除空的文本节点。
    - 合并毗邻的文本节点。

**创建新的节点**

- `cloneNode(Boolen)`：对当前节点进行克隆，返回克隆的节点，作为参数的布尔值表示是否克隆子节点。
    - 不会克隆节点的事件监听器和事件回调函数。
    - 可能会出现相同的`id`属性。
    - 返回的节点不在文档当中。

## ParentNode 接口

如果一个节点是父节点，那么它就会混入(mixin)`ParentNode`接口，具有该对象的属性与方法。

### ParentNode 的属性

- `children`：返回一个`HTMLCollection`实例，成员是当前节点的所有元素子节点。
- `firstElementChild`：返回当前节点的第一个元素子节点。
- `lastElementChild`：返回当前节点的最后一个元素子节点。
- `childElementCount`：返回当前节点所有元素子节点的数目。

### ParentNode 的方法

- `append(node)`：无返回值，在当前节点最后一个元素子节点后面添加节点。
    - 不仅可以添加元素子节点，也可以添加文本子节点，参数为字符串。
- `prepend(node)`：无返回值，同`append()`，添加位置为当前节点第一个元素子节点的前面。

## ChildNode 接口

如果一个节点具有父节点，那么它就会拥有`ChildNode`接口的方法。

**ChildNode 的方法**

- `remove()`：从父节点移除当前节点。
- `before(node, node, ...)`：在当前节点的前面插入一个或多个同级节点。
- `after(node, node, ...)`：在当前节点的后面插入一个或多个同级节点。
- `replaceWith(node)`：用参数节点替换当前节点。

*插入或替换的节点除了元素节点外，也可以选择文本节点。用字符串作为参数即可。*

## Document 对象

`document`节点对象代表整个文档，只要浏览器载入 HTML 文档，该对象就存在了。

### `document`对象的属性

**快捷方式属性**

- `defaultView`：返回节点所属的`window`对象。
- `doctype`：返回文档类型节点。
- `ducumentElement`：返回文档的根元素节点，一般是`html`所在的节点。
- `body`：返回`body`元素节点，可写。
- `head`：返回`head`元素节点，可写。
- `scrollingElement`：返回文档的滚动元素，一般是`html`元素节点。
- `dctiveElement`：返回当前获得焦点的元素节点。
- `fullscreenElement`：返回以全屏状态展示的元素节点。

**节点集合属性**

- `links`：返回一个`HTMLCollection`实例，包括所有设置了`href`属性的`<a>`和`<area>`节点。
- `forms`：返回一个`HTMLCollection`实例，包括文档中所有的`form`节点。
- `images`：返回一个`HTMLCollection`实例，包括页面中所有`img`节点。
- `embeds`
- `plugins`
- `scripts`
- `styleSheets`：返回一个StyleSheetList实例，包括网页内嵌或引入的样式表集合。

**文档静态信息属性**

- `documentURI`、`URL`：返回当前文档的网址。
- `domain`：返回当前文档的域名，次级域名可以把该属性设置为对应的上级域名，达到同源共享 Cookie 等资源。设置该属性时会导致端口改为`null`。
- `location`：返回浏览器提供的原生对象`Location`。
- `lastModified`：返回一个字符串，表示文档最近修改的时间。页面有 Javascript 生成的内容，总是返回当前时间。
- `title`：返回当前文档的标题，可写。
- `characterSet`：返回当前文档的编码。
- `referrer`：返回一个字符串，表示当前文档的访问者来自哪里。
- `dir`：返回一个字符串，表示文字方向。
- `compatMode`：返回当前浏览器处理文档的模式。

**文档状态属性**

- `hidden`：返回一个布尔值，表示当前窗口是否可见。
- `visibilityState`：返回文档的可见状态。
    - `visible`：页面可见。
    - `hidden`：页面不可见。
    - `prerender`：页面正在渲染。
    - `unloaded`：圆面从内存里面卸载了。
- `readyState`：返回当前文档的状态。
    - `loading`：加载 HTML 代码阶段。
    - `interactive`：加载外部资源阶段。
    - `complete`：加载完成。
- `cookie`
- `designMode`：具有`on`、`off`两个值，控制当前文档是否可编辑。
- `currentScript`：用在`<script>`脚本中，返回当前脚本所在的 DOM 节点。
- `implementation`：返回一个`DOMImplementation`对象，该对象有三个方法。
    - `createDocument()`：创建一个 XML文档。
    - `createHTMLDocuemnt()`：创建一个 HTML 文档。
    - `createDocuemntType()`：创建一个 DocumentType 对象。

### `document`对象的方法

- `open()`：清除当前文件所有内容，使当前文件处于可写状态。
- `write()`：向当前文档写入内容。
- `writeln()`：向当前文档写入内容，会添加换行符。
- `close()`：关闭用`open()`方法打开的文档。

现在有更符合标准的方法，比如`innerHTML`属性赋值，尽量避免使用`write()`方法。

- `querySelector()`：使用一个 CSS 选择器作为参数，返回第一个匹配的元素节点。
- `querySelsctorAll()`：返回一个`NodeList`对象，包含所有匹配该选择器的节点。
- `getElementsByTagName()`：参数是 HTML 标签名，返回一个`HTMLCollection`实例，实时反应 HTML 文档的变化，可以在任意元素节点上调用。
- `getElementsByClassName()`：参数是`class`类名，返回一个`HTMLCollection`实例，实时反应 HTML 文档的变化，可以在任意元素节点上调用。
- `getElementsByName()`：选取拥有`name`属性的元素，返回一个`NodeList`实例。
- `getElementById()`：选取指定`id`的元素节点，比`qurrySelector()`方法效率要高。
- `elementFromPoint()`：返回位于页面指定位置最上层的元素节点。
- `elementsFromPoint()`：返回一个数组，成员是指定位置的所有元素。
- `createElement()`：参数是元素的标签名，返回生成的元素节点。
- `createTextNode()`：生成文本节点，参数是生成文本节点的内容。
- `createAttribute()`：生成一个新的属性节点，参数是生成属性节点的名称。
- `createComment()`：生成一个新的注释节点，参数是字符串，生成注释节点的内容。
- `createDocumentFragment()`：生成一个空的文档片段对象。
- `createEvent()`：生成一个事件对象，参数是事件类型。
- `addEventListener()`、`removeEventListener()`、`dispatchEvent()`：继承自`EventTarget`接口。
- `hasFocus()`：返回一个布尔值，表示当前文档是否有元素被激活或获取焦点。
- `adoptNode()`：将参数节点及其子节点从原有文档移除，归属到当前文档。
- `importNode(node, deep)`：将参数节点及其子节点拷贝，归属到当前文档。可以选择浅拷贝和深拷贝，默认为浅拷贝。
- `createNodeIterator(node, para)`：返回一个子节点遍历器，第一个参数是根节点，第二个参数是所要遍历的节点类型。返回的第一个节点总是根节点。
    - `NodeFilter.SHOW_ALL`：所有节点
    - `NodeFilter.SHOW_ELEMENT`：元素节点
    - `NodeFilter.SHOW_TEXT`：文本节点
    - `NodeFilter.SHOW_COMMENT`：注释节点
- `createTreeWalker()`：参数同`createNodeIterator()`，区别在于返回的是`TreeWalker`实例，并且第一个节点不是根节点。
- `execCommand(command, showDefaultUI, input)`：在可编辑的情况下改变内容的样式。
    - `command`：所要实施的样式。
    - `showDefaultUI`：是否使用默认的界面。
    - `input`：该样式的辅助内容。
- `queryCommandSupport(command)`：返回一个布尔值，浏览器是否支持`execCommand()`的某个命令。
- `queryCommandEnabled()`：返回一个布尔值，表示当前是否可用`document.execCommand()`的某个命令。
- `getSelection()`
