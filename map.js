const ADDRESS_ARRAY = [];
let POINTS = 5000;
let LATA;
let LNGA;
let LATB;
let LNGB;

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
            initialize();
            codeLatLng(latitude, longitude);
            placeMarker(event.latLng);
    });
}
let marker;
function placeMarker(location) {
    if(marker){
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location, 
            map: map
        });
    }
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

let geocoder;

function initialize() {
  geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
  let latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        let address = results[1].formatted_address;
        ADDRESS_ARRAY.push(address);
        LATA = lat;
        LNGA = lng;
      } 
    }
  });
}

function showNextImage(){
    console.log("Showing next image...");
}

function compareCoordinates(){
    let answerDiv = document.getElementById('answer');
    let answer = document.createElement('p');
    answer.textContent = "Your guess is in " + ADDRESS_ARRAY[ADDRESS_ARRAY.length - 1];
    answerDiv.appendChild(answer);

    //Get the lat and lng from the random image and the user input
    //Find the distance between both of them
    console.log(LATA, LNGA);
    //There is a maximum of 5000 points
    //The maximum points gets halved if the distance between the two points is 500


}
