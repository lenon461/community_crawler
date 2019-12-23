
let data;

document.addEventListener('DOMContentLoaded', function () {

    function createLists(productList) {
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'proList');
        var productArray = JSON.parse(productList.data);

        document.getElementById('NewsLists').appendChild(ul);
        productArray.forEach(element => {
            var li = document.createElement('li');
            var a = document.createElement('a');
            li.setAttribute('id', 'item');

            ul.appendChild(li);
            var pos = element.indexOf(':')
            var title = element.substring(0, pos);
            var link = element.substring(pos, element.length);

            li.innerHTML = li.innerHTML + title;
            li.appendChild(a);
            a.innerText = 'link' + link
            a.setAttribute('href', link)


        });;
    }
    document.getElementsByTagName("item").onclick = function (e) {
        e = e || event
        var target = e.target || e.srcElement
        if (target.nodeName != 'A') return
        var href = target.href
        chrome.tabs.create({ url: href });
        alert(1);
        return false;
    }


    function load(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                const response = JSON.parse(xhr.responseText);
                createLists(response);
            }
        };
        xhr.open('GET', url, true);

        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
        xhr.setRequestHeader('Access-Control-Max-Age', '3600');
        xhr.send('');
    }
    document.getElementById('head').innerHTML = new Date().toString();

    const updatedAt = document.getElementById('updatedAt').innerHTML;


});
