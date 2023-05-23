var total = Number(getParameterByName('amt'))
$(document).ready(function() {
    updateMoney()

    $('input[type="checkbox"]').change(function() {
        if ($(this).is(":checked")) {
            total = total + Number(this.value)
            updateMoney()
        } else {
            total = total - Number(this.value)
            updateMoney()
        }
    })
});

function updateMoney(){
    $('#currentPrice').text(`$${total}`)
}

function paymentPage(){
    window.location.href = `../payment?route=${getParameterByName('route')}&amt=${total}&seats=${getParameterByName('seats')}`;
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

function home(){
    window.location.href = `../`;
}