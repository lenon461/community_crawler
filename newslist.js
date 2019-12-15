
document.addEventListener('DOMContentLoaded', function () {

    createLists();
    function createLists() {
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'proList');

        productList = ['Electronics Watch', 'House wear Items', 'Kids wear', 'Women Fashion'];

        document.getElementById('NewsLists').appendChild(ul);
        productList.forEach(renderProductList);

        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class', 'item');

            ul.appendChild(li);

            li.innerHTML = li.innerHTML + element;
        }
    }

    var url = 'https://us-central1-tribal-isotope-228803.cloudfunctions.net/function-1/'; //A local page

    function load(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                alert(xhr.responseText);
            }
          };
        xhr.open('GET', url, true);
        
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
        xhr.setRequestHeader('Access-Control-Max-Age', '3600');
        xhr.send('');
    }
    load(url, (response) => {
        console.log("loaded")
        console.log(response)
    })

});
