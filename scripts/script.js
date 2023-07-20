let docsList = ['markdown.md',
                'dom.md',
                'markdownSyntax.md',
                'commonJS.md',
                'html&css.md',
                'html5.md'];

function renderButton(docsList) {
    for (let item in docsList) {
        let buttonNode = document.createElement('button');
        buttonNode.innerText = docsList[item];
        document.getElementById('menu').insertAdjacentElement('beforeend', buttonNode);
        buttonNode.addEventListener('click', function () {renew(docsList[item])});
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
        document.getElementById('content').innerHTML = marked.parse(markdownText);
        hljs.highlightAll()
    }
    };
    xhr.send();
}

renderButton(docsList);