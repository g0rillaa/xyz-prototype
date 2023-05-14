
$(document).ready(function() {
    $('#cost').text('Amount Due: $'+getParameterByName('amt'))
    document.getElementById("payment-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Payment submitted successfully! Thank you for flying with FlyDreamAir");
    });
});


function paypal(){
    alert("Redirecting to paypal... (pretend it does this)");
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