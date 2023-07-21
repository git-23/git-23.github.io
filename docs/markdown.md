# Markdown

## Markdown 基础语法

- **Headings**: `#` + space
    - 标题前后使用空白行
    - 根据`#`的数目可使用1-6级标题
- **Paragragh**: 空白行分隔
- **Bold**: `**` + text + `**`
- **Italic**: `*` + text + `*`
- **Bold and Italic**: `***` + text + `***`
- **Code**: `` ` `` + text + `` ` ``
- **Blockquotes**: `>` + space
- **Ordered Lists**: num + `.` + space
- **Unordered Lists**: `-` + space
- **Code Blocks**: `` ``` `` + language + text + `` ``` ``
- **Links**: `[link text](link url "caption")`
- **Reference-style Links**: `[link text][label]` and `[label]: link url "caption"`
- **Images**: `![alt text](img url "title")`
    - The title is optional

## Markdown 转 HTML

**markedjs**  
1. 通过 CDN 引入
    ```html
    <script src='https://cdn.jsdelivr.net/npm/marked/marked.min.js'></script>
    ```
2. 使用`parse()`方法将 Markdown 文件转换为 DOM 节点
    ```javascript
    const markdownDOM = marked.parse(markdownText);
    ```

**样式库**  
1. 引入一份 GitHub 风格的样式库
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css">
    ```
2. 在容器节点上添加类`markdown-body`
    ```html
    <div id="content" class="markdown-body"></div>
    ```

**hightlight.js**
1. 通过 CDN 引入
    ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    ```
2. 引入一份 GitHub 风格的 CSS 样式
    ```html
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">
    ```
3. 使用`highlightAll()`方法在当前的 DOM 文档中寻找`<pre><code>`元素进行高亮显示

**保存为 PDF**
1. 在 VSCode 中下载 Markdown Preview Enhanced 插件
2. 在预览的 Markdown 文件中右键选择在浏览器打开
3. 在浏览器中按下快捷键 Ctrl + P 打印为 PDF
