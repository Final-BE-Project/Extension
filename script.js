window.onload = function get_body() {

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
}

