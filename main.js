
const URL = `https://www.google.com/maps/embed/v1/streetview?location=47.6094421,-122.3359409=AIzaSyDkGbD7qHuZq_WyAmnH15854cbm3h5bTlc`

let sv;

document.addEventListener('DOMContentLoaded',() => {
    newViewClickListener();
})





function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}



function TryRandomLocation(callback) {
    console.log('2')
    var lat = getRandomInRange(-90,90,1);
    var lng = getRandomInRange(-180,180,1);
    sv = new google.maps.StreetViewService();
    console.log('sv',sv)
  
    // Try to find a panorama within 50 metres 
    sv.getPanorama({
        
        location: new google.maps.LatLng(lat,lng),
        radius: 200000
    }, callback);
  }
  
  function HandleCallback(data, status) {
      console.log('3')
      if (status === 'OK') {
        let streetViewImage =  document.getElementById('street-view-image');
        console.log('4')  
        console.log('data length', data.length)
        let latitude = data.location.latLng.lat()
        console.log('latitude',latitude)
        let longitude = data.location.latLng.lng()
        console.log('longitude', longitude)
        new_coordinates = `${latitude},${longitude}`
        streetViewImage.src = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyDkGbD7qHuZq_WyAmnH15854cbm3h5bTlc&location=${latitude},${longitude}&heading=210&pitch=10&fov=35`
        
        

      } else {
        console.log('5')
        // Nothing here! Let's try another location.
        TryRandomLocation(HandleCallback);
      }
  }

  function changeView(coordinates){
       let URL = ``
       let newViewButton = document.getElementById('new-view-button');
    //   newViewButton.src = 

  }
  
  function newViewClickListener(){
      let newViewButton = document.getElementById('new-view-button');
      newViewButton.addEventListener('click', () => {
        TryRandomLocation(HandleCallback);
      })


  }
    
  


