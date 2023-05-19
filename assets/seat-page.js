var rows = 20
var columnMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
var seatWeights = ['available', 'available', 'available', 'available', 'available', 'sold', 'sold', 'sold', 'unavailable']

$(document).ready(function() {
    insertSeats()
});

var seatBoundingBoxes = []
var mousePos = {x: 0, y: 0}
var hoveredSeat = "1A"
$(document).mousemove(function(event) {
    mousePos = {x: event.pageX, y: event.pageY}
    var windowY = mousePos.y - $(window).scrollTop();
    if(windowY > $(window).height()-80){
        mousePos = {x: -100, y: -100}
    }
    updateCursor()
    
});

$(window).on('resize', function() {
    updateSeatBoundingBoxes()
});


function insertSeats(){
    var container = $('#seat-rows')
    for(var rowNum=0; rowNum<rows; rowNum++){
        var row = $('<div>', {
            class: 'seat-row'
        })
        for(var seatNum=0; seatNum<7; seatNum++){
            var classDec = 'seat-icon'
            if(seatNum==1 || seatNum ==4){
                classDec = 'seat-icon seat-rm'
            }
            if(seatNum==2 || seatNum ==5){
                classDec = 'seat-icon seat-lm'
            }
            if(rowNum == 10){
                classDec += ' seat-gap'
            }
            row.append($('<img>', {
                class: classDec,
                id: `seat-${rowNum}-${seatNum}`,
                src: '../assets/img/seats/unavailable.png',
                onclick: 'seatClick()'
            }))
        }
        container.append(row)
    }
    updateSeatBoundingBoxes()
    var seats = $(".seat-icon").toArray();
    seats.forEach(seat => {
        var element = $(seat)
        seatWeights.sort(function() {return Math.random() - 0.5});
        element.attr('src', `../assets/img/seats/${seatWeights[0]}.png`)
    })
    
}


function updateSeatBoundingBoxes(){
    var seats = $(".seat-icon").toArray();
    seats.forEach(seat => {
        var element = $(seat)
        var boundingBox = {
            top: element.offset().top,
            left: element.offset().left,
            bottom: element.offset().top + element.height(),
            right: element.offset().left + element.width()
        };
        seatBoundingBoxes.push({
            id: element.attr('id'),
            box: boundingBox
        })
        
    })
}

function updateCursor(){
    var c = $('#seat-cursor')
    var txt = $('#seat-cursor-txt')
    c.css('top', mousePos.y-40)
    c.css('left', mousePos.x+20)

    var hovering = false
    seatBoundingBoxes.forEach(seat => {
        if(mousePos.x > seat.box.left && mousePos.x < seat.box.right && mousePos.y > seat.box.top && mousePos.y < seat.box.bottom){
            var seatTxt = seat.id.split('-')
            var seatStr = `${Number(seatTxt[1])+1}${columnMap[seatTxt[2]]}`
            txt.text(seatStr)
            hovering = true
            hoveredSeat = seat.id
            c.css('opacity', '100%')
        }
    })
    if(!hovering){
        c.css('opacity', '0%')
    }
}

function seatClick(){
    if(hoveredSeat !== ""){
        var elm = $(`#${hoveredSeat}`)
    var id = elm.attr('src')
    if(id == null){
        window.location.reload()
    }
    if(id.includes('available') && !id.includes('unavailable')){
        return elm.attr('src', `../assets/img/seats/selected.png`)
    }
    if(id.includes('unavailable')){
        return alert('Sorry, the selected seat is unavailable.')
    }
    if(id.includes('sold')){
       return alert('Sorry, the selected seat has already been sold.')
    }
    if(id.includes('selected')){
        return elm.attr('src', `../assets/img/seats/available.png`)
    }
    }
}


function bookButton(){
    var selected = []
    var seats = $(".seat-icon").toArray();
    seats.forEach(seat => {
        if(seat.src.includes('selected')){
            var seatTxt = seat.id.split('-')
            selected.push(`${Number(seatTxt[1])+1}${columnMap[seatTxt[2]]}`)
        }
    })
    if(selected.length == 0){
        alert(`Please select at least one seat.`)
    } else {
        alert(`Selected the following seat(s): ${selected}`)
        window.location.href = `../payment?amt=${selected.length*300}`;
    }
    console.log(selected.length)
    
}