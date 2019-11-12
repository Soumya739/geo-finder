document.addEventListener('DOMContentLoaded',() => {
    playGame();
})

function playGame(){
    let play = document.getElementById('play');
    play.addEventListener('click', (ev) => {
        ev.preventDefault();
        document.getElementById('map').style.display = 'inline';
        initMap();
        createButtons();
    })
}

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
      });
    google.maps.event.addListener(map, 'click', function(event) {
            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            hasClicked = true;
            console.log(latitude + ', ' + longitude);
            placeMarker(event.latLng);
    });
}
function placeMarker(location) {
    let marker = new google.maps.Marker({
        position: location, 
        map: map
    });
}

function createButtons(){
    let buttonsDiv = document.getElementById('buttons');
    let skip = document.createElement('button');
    skip.id = "skip"
    skip.textContent = "Skip";
    skip.addEventListener('click', (ev) => {
        ev.preventDefault();
        showNextImage();
    })
    let submit = document.createElement('button');
    submit.id = "submit"
    submit.textContent = "Submit";
    submit.addEventListener('click', (ev) => {
        ev.preventDefault();
        compareCoordinates();
    })
    buttonsDiv.append(skip, submit);
}

function showNextImage(){
    console.log("Showing next image...");
}

function compareCoordinates(){
    console.log("Comparing coordinates...");
}
