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

## Markdown 的基础语法

### 标题

可以在词组或句子前加上`#`符号使其成为标题，根据添加`#`符号的数量可以控制标题的等级。

```markdown
# Heading level 1

## Heading level 2
```

**语法规范**

- 在`#`符号与标题间放置一个空格
- 在标题的前后放置空行

### 段落

用空行分隔文字使其成为段落。

```markdown
I really like using Markdown.

I think I'll use it to format all of my documents from now on.
```

**语法规范**

- 不要在段落前使用缩进

### 强调

**加粗**

```markdown
This **word** is bold.
```

**斜体**

```markdown
This *word* is italic.
```

**加粗斜体**

```markdown
This ***word*** is bold and italic.
```

**代码**

```markdown
This `word` is code.
```

### 块引用

可以在段落的前面使用`>`符号创造一个块引用。

```markdown
> The first paragraph.
>
> The second paragraph.
```

*实现效果*

> The first paragraph.
>
> The second paragraph.

**嵌套使用**

```markdown
> The first paragraph.
>> The nexted blockquote.
```

*实现效果*

> The first paragraph.
>> The nexted blockquote.

**包含其它语法**

在 blockquote 的内部可以包含其它的 Markdown 格式元素，但不是全部的都能使用，需要进行尝试确定哪些语法是可用的。

### 列表

**有序列表**

有序列表可以使用数字 + `.`的形式创建。

```markdown
1. First item
2. Second item
3. Third item
```

列表项前面的数字不必是按顺序的，但第一项必须是数字 1 。

**无序列表**

无序列表可以使用`-`创建。

```markdown
- First item
- Second item
- Third item
```

可以使用缩进嵌套无序列表。

```markdown
- First item
- Second item
    - indented item
- Third item
```

列表中可以使用缩进嵌套其它元素。

### 代码块

可以使用```创建代码块并标注使用的编程语言。

```markdown
    ```javascript
    console.log('hello world!');
    ```
```

也可以使用一个 Tab 或四个空格的缩进创建代码块。

### 分隔线

可以使用`***`或者`---`创造一个分隔线。

### 链接

将链接的文本放在`[]`中，并将链接的地址放在`()`中紧随在链接文本所在的中括号后。

```markdown
[markdown官方文档](markdownguide.org)
```

作为可选项的是链接的标题。用双引号包裹放在链接地址的后面，当鼠标悬停在链接上时会显示。

```markdown
[markdown官方文档](markdownguide.org "The best document of markdown")
```

对于邮箱和 URL 地址，可以将其放在`<>`中创建链接。

```markdown
<https://www.markdownguide.org>
```

**更改链接的格式**

对于加粗或者斜体，可以使用`*`将链接文本和链接地址整个包裹起来。如果是想把链接文本标注为代码，需要在`[]`中使用``对其进行包裹。

```markdown
**[markdown官方文档](markdownguide.org)**
[`markdown官方文档`](markdownguide.org)
```

**引用链接**

常规的链接格式放在文本中时不利于文本的可读性，可以使用引用链接来增强文本的可读性。

引用链接分为两个部分：

- 第一部分是两个`[]`，第一个中括号放入链接的文本，第二个中括号放入链接的标志。两个中括号中间可以插入一个空格。
    ```markdown
    [markdown官方文档][1]
    ```
- 第二部分是`[]`包裹的链接标志，后面跟着`:`符号，同时还有链接的地址和链接的标题。链接的地址可以选择用`<>`包裹，链接的标题选择`""`、`''`、`()`中的一个进行包裹。同时链接的标题是可选项。
    ```markdown
    [1]: markdownguide.org "the best document of mardown"
    ```

**语法规范**

对于链接地址中出现的空格、`(`、`)`应该使用%20、%28、%29进行代替。

### 图片

可以使用`![]()`的格式创建图片，`[]`中填入图片的替换文本`()`中填入图片的地址和标题（标题可选，在鼠标悬停时显示）。

可以在链接的文本区域中使用图片的格式，制作图片链接。

## Markdomn 保存为 PDF

在 VSCode 中下载 Markdown Preview Enhanced 插件。下载好后在预览的 Markdown 文件中右键选择在浏览器中打开。在浏览器中按下快捷键 Ctrl + P 打印为 PDF。