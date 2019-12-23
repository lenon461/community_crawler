document.addEventListener('DOMContentLoaded', function () {

    var HomeButton = document.getElementById('HomeButton');
    var NewsButton = document.getElementById('NewsButton');
    var ContactButton = document.getElementById('ContactButton');
    var AboutButton = document.getElementById('AboutButton');
    var rendererTestButton = document.getElementById('rendererTest');

    function openPage(pageName) {
        // Hide all elements with class="tabcontent" by default */
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Remove the background color of all tablinks/buttons
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }

        // Show the specific tab content
        document.getElementById(pageName).style.display = "block";
    }

    HomeButton.addEventListener('click', function () {
        openPage('Home')
    });
    NewsButton.addEventListener('click', function () {
        openPage('News')
    });
    ContactButton.addEventListener('click', function () {
        openPage('Contact')
    });
    AboutButton.addEventListener('click', function () {
        openPage('About')
    });
    rendererTestButton.addEventListener('click', function () {
        const { ipcRenderer } = require('electron')
        ipcRenderer.send('openFile', () => {
            console.log("Event sent.");
        });

    });
    document.getElementById("NewsButton").click();
});


