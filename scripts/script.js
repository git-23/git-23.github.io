let docsList = ['markdown.md',
                'dom.md',
                'commonJS.md',
                'html&css.md',
                'html5.md',
                'javascript.md'];

function renderButton(docsList) {
    for (let item in docsList) {
        let Item = document.createElement('a');
        Item.innerText = docsList[item];
        let ListItemNode = document.createElement('li');
        ListItemNode.appendChild(Item);
        document.getElementById('menu').insertAdjacentElement('beforeend', ListItemNode);
        ListItemNode.addEventListener('click', function () {renew(docsList[item])});
    }
}

function renew(docsName) {
    console.log('ddd' + docsName)
    let xhr = new XMLHttpRequest();

    docsName = './docs/' + docsName;
    xhr.open('GET', docsName, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var markdownText = xhr.responseText;
        
        // 在这里处理markdownText
        document.getElementById('noteDisplay').innerHTML = marked.parse(markdownText);
        hljs.highlightAll()
    }
    };
    xhr.send();
}

renderButton(docsList);