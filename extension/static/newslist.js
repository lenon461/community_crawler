
let data;

document.addEventListener('DOMContentLoaded', function () {

    function createLists(productList) {
        var ul = document.createElement('ul');
        ul.setAttribute('id', 'proList');

        if(productList){

        document.getElementById('NewsLists').appendChild(ul);
            productList.forEach(renderProductList);
        }
        const temp = productList;
        productList =  ['Electronics Watch', 'House wear Items', 'Kids wear'];


        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class', 'item');

            ul.appendChild(li);

            li.innerHTML = li.innerHTML + element;
        }
    }

    var url = 'https://us-central1-tribal-isotope-228803.cloudfunctions.net/function-2/'; //A local page

    function load(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                createLists(JSON.parse(xhr.responseText));
    }
          };
        xhr.open('GET', url, true);
        
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type');
        xhr.setRequestHeader('Access-Control-Max-Age', '3600');
        xhr.send('');
    }
    document.getElementById('updatedAt').innerHTML = new Date().toString();

    const updatedAt = document.getElementById('updatedAt').innerHTML;
    if(new Date(updatedAt).getDate() !== new Date().getDate()){
        load(url, (response) => {
            console.log(response)
    
            document.getElementById('updatedAt').innerHTML = new Date().toString();
        })
        document.getElementById('updatedAt').innerHTML = new Date().toString();
        document.getElementById('status').innerHTML = 'newly updated'
    }
    else {
        document.getElementById('status').innerHTML = 'Thank You'
    }

    load(url, (response) => {
        console.log(response)

        document.getElementById('updatedAt').innerHTML = new Date().toString();
    })


});
