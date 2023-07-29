let bookList = [
    ['Head First HTML 与 CSS (第二版)', true],
    ['Head First HTML5 Programming (中文版)', true],
    ['JavaScript 高级程序设计 第4版', false],
    ['ES6标准入门 (第3版)', false],
    ['你不知道的JavaScript (上卷)', false],
    ['你不知道的JavaScript (中卷)', false],
    ['你不知道的JavaScript (下卷)', false],
    ['Web性能权威指南', false],
    ['HTTP权威指南', false],
    ['Node与Express开发', false],
    ['Webpack 官方文档', false],
    ['Vue 官方文档', false],
], docsList = [
    'markdown.md',
    'dom.md',
    'html&css.md',
    'html5.md',
    'javascript.md',
    '函数.md',
    '期约与异步函数.md',
];

function addEventListenerInButton() {
    let todo = document.getElementById('todo');
    let list = document.getElementById('list');
    let page = document.getElementById('page');

    todo.addEventListener('click', clickTodo);
    list.addEventListener('click', clickList);
    page.addEventListener('click', () => void window.open('https://git-23.github.io/running_page/', '_self'));
}

function clickTodo() {
    let todoSection = document.createElement('ol');
    for (let item of bookList) {
        let bookItem = document.createElement('li');
        bookItem.innerHTML = item[0];
        bookItem.style.textDecoration = item[1] ? 'line-through' : 'none';
        todoSection.append(bookItem);
    }
    let container = document.getElementById('container');
    container.innerHTML = '';
    container.append(todoSection);
}

function clickList() {
    let container = document.getElementById('container');
    container.innerHTML = '';
    for (let item of docsList) {
        let docsItem = document.createElement('button');
        docsItem.innerHTML = item;
        container.append(docsItem);
        docsItem.addEventListener('click', () => void displayNote(item))
    }
}

function displayNote(item) {
    let url = './docs/' + item;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const markdownDOM = marked.parse(xhr.responseText);
            let container = document.getElementById('container');
            container.innerHTML = markdownDOM;
            hljs.highlightAll()
        }
    };
    xhr.send();
}

addEventListenerInButton();

