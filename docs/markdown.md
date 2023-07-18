# Markdown 的使用

Markdown 是一种轻量级的标记语言，它允许人们用易读易写的纯文本格式编写文档。然后转换成有效的 HTML 文档。

## Markdown 文件在原生 JavaScript 网页上的显示

在使用 Markdown 编写文档后，如何将其在网页中显示出来？

### Markdown 文件的读取

可以使用 AJAX 通讯来获取存储在服务器的 Markdown 文件。

```javascript
let xhr = new XMLHttpRequest();

xhr.open('GET', './test.md', true);
xhr.onreadystatechange = function() {
if (xhr.readyState === 4 && xhr.status === 200) {
    var markdownText = xhr.responseText;
    
    // 在这里处理markdownText
}
};
xhr.send();
```

这里使用浏览器提供的`XMLHttpRequest`对象，通过创建的`xhr`实例与服务器进行通讯，并将得到的文本保存在`markdownText`变量中。

但此时得到的 Markdown 文档只是文本文件，需要将其解析为 HTML 文件进行显示。这样才可以为文档添加 CSS 样式。

### Markdown 转换为 HTML 格式

可以使用 GitHub 提供的开源库`marked`将 Markdown 文档转换为 DOM 节点插入到网页中。

可以通过 CDN 引入`marked`库。

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

通过`marked`提供的函数`parse()`可以将 Markdown 文档转换为 DOM 节点。

```javascript
document.getElementById('content').innerHTML = marked.parse(markdownText);
```

上述代码选取了`id`为`content`的元素节点作为容器，并将 Markdown 文档转换的 DOM 节点作为它的内容。

但现在在网页上展示的文档是没有样式的，可以使用现有的样式库为文档添加样式。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
```

这里通过 CDN 引入了一份模仿 GitHub 风格的 Markdown 样式的 CSS 文件，只需要在作为容器的元素节点上添加`markdown-body`的类标签即可。

```html
<div id="content" class="markdown-body"></div>
```
### 代码块的高亮显示

可以通过`highlight.js`库来实现代码的高亮显示，在[highlight.js的官网](https://highlightjs.org/)可以选择不同的 CSS 样式显示代码。

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
```

第二行通过 CDN 引入了`highlight.js`库，第一行则是引入了一个类似 GitHub 风格的 CSS 样式。

在引入`highlight.js`样式后，使用`hljs.highlightAll()`函数即可进行代码的高亮显示。  

`hljs.highlightAll()`会在当前的 DOM 文档中寻找`<pre><code>`标签包裹的部分进行高亮显示。

## Markdomn 保存为 PDF

在 VSCode 中下载 Markdown Preview Enhanced 插件。下载好后在预览的 Markdown 文件中右键选择在浏览器中打开。在浏览器中按下快捷键 Ctrl + P 打印为 PDF。