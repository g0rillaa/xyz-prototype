
$(document).ready(function() {
    $('#cost').text('Amount Due: $'+getParameterByName('amt'))
    document.getElementById("payment-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Payment submitted successfully! Thank you for flying with FlyDreamAir");
        addCookie()
    });
});


function paypal(){
    alert("Payment submitted successfully! Thank you for flying with FlyDreamAir");
    addCookie()
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function addCookie(){
    var rand = Math.floor(Math.random()*99999)
    var seats = "seats"
    if(Number(getParameterByName('seats')) == 1){seats = "seat"}
    var doc = {
        id: rand,
        route: getParameterByName('route'),
        amt: getParameterByName('amt'),
        seats: getParameterByName('seats')
    }
    writeCookie("past-booking", JSON.stringify(doc), 30)
}

function writeCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function home(){
    window.location.href = `../`;
}