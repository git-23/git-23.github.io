# DOM

DOM 是一个接口规范，将网页描述为一个对象，同时规定了对象应具有的属性和方法。

DOM 被抽象为树型结构，具有七种不同类型的节点。树的第一层是`document`节点，代表整个网页，第二层是`!doctype html`和`html`节点，前者描述了文档类型，后者构成树结构的根节点。  

七种节点类型分别是`document`, `documentType`, `element`, `attr`, `text`, `comment`, `documentFragment`

## Node 接口

所有的节点类型都具有 Node 接口的属性和方法

**Node 接口的属性**  
- `nodeType`, `nodeName`: 节点的类型、名称
- `nodeValue`: 节点的文本值，只有文本、注释、属性节点有文本值
- `textContent`: 当前节点和它后代所有节点的文本值
- `baseURI`, `ownerDocument`: 文档的 URL 、document
- `nextSibling`, `previousSibling`: 同级节点
- `parentNode`, `parentElement`: 父级节点
- `firstChild`, `lastChild`, `childNodes`: 子级节点
- `isConnected`: 返回一个布尔值，节点是否在文档中

**Node 接口的方法**
- `hasChildNodes()`, `contains()`, `compareDocumentPosition()`, `isEqualNode()`, `isSameNode()`: 判断节点之间关系
- `getRootNode()`: 返回节点所在的`document`，类似`ownerDocument`属性
- `appendChild()`, `removeChild()`: 修改子级节点
- `insertBefore()`, `replaceChild()`: 修改同级节点
- `normalize()`: 清理节点内文本节点
- `cloneNode()`: 创建节点

## ParentNode 接口

父节点具有 ParentNode 接口的属性与方法

**ParentNode 接口的属性**

- `children`, `firstElementChild`, `lastElementChild`: 获得子节点的引用
- `childElementCount`: 子节点数目

**ParentNode 接口的方法**

- `append(node)`, `prepend(node)`: 添加子节点

## ChildNode 接口

子节点具有 ChildNode 接口的属性与方法

**ChildNode 接口的方法**

- `remove()`: 移除节点
- `before()`, `after()`, `replaceWith()`: 修改同级节点

## Document 节点

**document 节点的属性**

- `defaultView`: `window`
- `doctype`, `ducumentElement`, `body`, `head`, `scrollingElement`, `dctiveElement`, `fullscreenElement`: 节点的引用
- `links`, `forms`, `images`, `embeds`, `plugins`, `scripts`, `styleSheets`: 节点集合
- `documentURI`, `URL`, `domain`, `lastModified`, `location`, `title`, `characterSet`, `referrer`, `dir`, `compatMode`: 文档信息
- `hidden`, `visibilityState`, `readyState`, `cookie`, `designMode`, `currentScript`: 文档状态
- `implementation`: 可以创建文档的对象

**document 节点的方法**

- `open()`, `write()`, `writeln()`, `close()`: 写入文档
- `querySelector()`, `querySelsctorAll()`, `getElementsByTagName()`, `getElementsByClassName()`, `getElementsByName()`, `getElementById()`: 根据类型、类、id 获取节点引用
- `elementFromPoint()`, `elementsFromPoint()`: 根据位置获取节点引用
- `createElement()`, `createTextNode()`, `createAttribute()`, `createComment()`, `createDocumentFragment()`: 生成节点
- `createEvent()`: 生成事件
- `addEventListener()`、`removeEventListener()`、`dispatchEvent()`: `EventTarget`接口
- `hasFocus()`: 焦点
- `adoptNode()`, `importNode()`: 拷贝文档节点
- `createNodeIterator()`, `createTreeWalker()`: 遍历节点