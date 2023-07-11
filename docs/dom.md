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