var locations = ["Sydney", "Melbourne", "Perth", "Gold Coast", "Singapore", "Los Angeles", "Dubai", "Tokyo", "Jakarta"]
var oldSelected = {dep: "Sydney", arr: "Melbourne"}

$(document).ready(function() {
    setLocationOptions()
    $('#dep-select').on('change', function() {
        updateLocations()
    });
    $('#arr-select').on('change', function() {
        updateLocations()
    });
});

function setLocationOptions(){
    locations.forEach(location => {
        $('#dep-select').append($('<option>', {
            value: location,
            text: location
        }))
        $('#dep-select').val('Sydney')
        $('#arr-select').append($('<option>', {
            value: location,
            text: location
        }))
        $('#arr-select').val('Melbourne')
    })
}

function updateLocations(){
    var dep = $('#dep-select')
    var arr = $('#arr-select')
    if(dep.val() == arr.val()){
        dep.val(oldSelected.dep)
        arr.val(oldSelected.arr)
        return alert("Departure and Arrival locations must be different.")
    }
    oldSelected.dep = dep.val()
    oldSelected.arr = arr.val()
}


function selectSeat(){
    var session = readCookie("session")
    if(session == null || session == ""){ return alert("Please create an account on the home page to continue.") }
    window.location.href = `../selectseat?route=${$('#dep-select').val()}-${$('#arr-select').val()}`;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}