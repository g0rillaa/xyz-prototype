var session = ""

$(document).ready(function() {
    resizeImg()
    var name = readCookie("session")
    if(name !== null && name !== ""){
        $('#welcome').text(`Welcome, ${name}`)
        session = name
        $('#login-btn').text('Logout')
    }
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

function loginDialog(){
    if(session == ""){
        $('#login-dialog').css('top', 'calc(50% - 200px)')
    } else {
        session = ""
        writeCookie("session", "", 30)
        window.location.reload()
    }
    
}

function closeLoginDialog(){
    $('#login-dialog').css('top', '-1000px')
}

function login(){
    var u = $('#usr').val()
    var p = $('#pwd').val()
    if(u == "" || p == ""){
        return alert('Please enter your credentials')
    }
    var accounts = readCookie("accounts")
    var found = ""
    if(accounts == null){
        return alert('Invalid credentials.')
    } else {
        json = JSON.parse(accounts)
        json.forEach(e => {
            if(u == e.username && p == e.password){
                found = e.username
                session = found
                writeCookie("session", found, 30)
                closeLoginDialog()
                $('#login-btn').text('Logout')
                $('#welcome').text(`Welcome, ${session}`)
            }
        })
    }
    if(found == ""){
        return alert('Invalid credentials.')
    }
}

function register(){
    var u = $('#usr').val()
    var p = $('#pwd').val()
    if(u == "" || p == ""){
        return alert('Please enter your credentials')
    }
    var doc = {username: u, password: p}
    var accounts = readCookie("accounts")
    if(accounts == null){
        writeCookie("accounts", JSON.stringify([doc]), 30)
    } else {
        json = JSON.parse(accounts)
        var exists = false
        json.forEach(e => {
            if(e.username == u){
                exists = true
            }
        })
        if(exists){
            return alert("Username already in use.")
        }
        json.push(doc)
        writeCookie("accounts", JSON.stringify(json), 30)
    }
    alert(`Thank you for registering, ${u}.`)
    closeLoginDialog()
    session = u
    writeCookie("session", u, 30)
    $('#welcome').text(`Welcome, ${u}`)
    $('#login-btn').text('Logout')
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


function writeCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}