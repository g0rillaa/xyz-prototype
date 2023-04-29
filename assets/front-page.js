$(document).ready(function() {
    resizeImg()
});


$(window).on('resize', function() {
    resizeImg()
});

function resizeImg(){
    var img = $('#cover-image');
    img.css('height', '100vh')
}


function bookFlight(){
    window.location.href = "./book";
}