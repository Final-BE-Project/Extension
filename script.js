window.onload = function get_body() {


    let x = document.getElementsByTagName('*');
    let old = document.documentElement.innerHTML + "<button id='oldContentButton' type='button' style='position:fixed;top:0;right:0;' onClick='newContent()'>Neutralized Content</button>";;
    localStorage['old'] = old;
    let newContent = [];
    for (let i = x.length; i--;) {
        if (x[i].tagName != 'SCRIPT' && x[i].tagName != 'STYLE' && x[i].tagName != 'HEAD' && x[i].tagName != 'HTML' && x[i].tagName != 'BODY') {
            let y = x[i]
            //console.log(x[i].tagName);
            //console.log(x[i].innerText);

            //POST Request
            fetch('http://127.0.0.1:5000/postData', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                // A JSON payload
                body: JSON.stringify(x[i].innerText)

            }).then(function (response) {
                return response.text();
            }).then(function (text) {

                //console.log('POST response: ');
                //console.log(text);
                text = JSON.parse(text);
                y.innerText = text["message"];
                if (i == 3) {
                    localStorage['new'] = document.documentElement.innerHTML;
                }
                if (i == x.length - 2) {
                    y.innerHTML = y.innerHTML + "<button id='oldContentButton' type='button' style='position:fixed;top:0;right:0;' onClick='oldContent()'>Original Content</button>";
                    var z = document.createElement('script'); // is a node
                    z.innerText = 'function oldContent() {console.log(localStorage["old"]);document.body.parentNode.innerHTML=localStorage["old"];} function newContent(){console.log(localStorage["new"]);document.body.parentNode.innerHTML=localStorage["new"];}';
                    y.appendChild(z);
                }
            });

        }



    }
    //x[0].innerHTML = x[0].innerHTML + " <button style='position:fixed;top:0;right:0;'>Refresh</button>";


    /*

    //GET Request
    fetch('https://beproject202122.pythonanywhere.com/postData')
        .then(function (response) {
            return response.json();
        }).then(function (text) {
            console.log(text.greeting);
            var body = document.getElementsByTagName('body')[0];
            body.innerHTML = text.greeting;
        });

    let body_text = document.getElementsByTagName('body')[0].innerHTML;

    //POST Request
    fetch('https://beproject202122.pythonanywhere.com/postData', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        // A JSON payload
        body: JSON.stringify(body_text)

    }).then(function (response) {
        return response.text();
    }).then(function (text) {

        console.log('POST response: ');
        console.log(text);
    });
    */
}

