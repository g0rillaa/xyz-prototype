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
    window.location.href = "../selectseat";
}