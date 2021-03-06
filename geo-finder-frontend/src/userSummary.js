console.log("userSummary")
const GET_SUMMARY_URL = `${BASE_URL}/getSummaryOfUser`;


function viewSummary(){
    let summaryDiv = document.getElementById("summary")
    summaryDiv.addEventListener('click', (ev)=>{
        ev.preventDefault();
        // if (!CLICK_CHECK.has("summary-view-button")){
        //     CLICK_CHECK.add("summary-view-button")
            getUserSummary(USER_ID)
        // } 
    })
}

function getUserSummary(userId){
    console.log(userId)
    return fetch(GET_SUMMARY_URL + "/" + userId)
    .then(response => response.json())
    .then(summaries => {
        viewAndDeleteSummary(summaries)
        })
}

function viewAndDeleteSummary(summaries){
    console.log(summaries)
    let summaryOl = document.getElementById("summaries-ol")
    let deleteUserSummeries = document.getElementById("summary-delete-button")
    deleteUserSummeries.style.display = "block"
    deleteUserSummeries.addEventListener('click', ()=>{
        deleteSummaryRquest(summaries)
        deleteUserPoints()
        while (summaryOl.firstChild) {
            summaryOl.firstChild.remove()
        }
        let summaryDiv = document.getElementById("summaryDiv")
        summaryDiv.style.display = "block"
        deleteUserSummeries.style.display = "none"
    })
    displaySummaryDivDOM(summaries)
    hideEachDisplay(CSS_ID_ARRAY)
    onlyDisplay(["after-login-navbar", "after-login", "display-Summary"])
}

function displaySummaryDivDOM(summariesArray){
        let displaySummaryDiv = document.getElementById("display-Summary")
        let summaryOl = document.getElementById("summaries-ol")
        if (summariesArray.length === 0){
            let summaryDiv = document.createElement("div")
            summaryDiv.textContent = "No Summary!!"
            displaySummaryDiv.append(summaryDiv)
        } else{
            while (summaryOl.firstChild) {
                summaryOl.firstChild.remove()
            }
            summariesArray.forEach(summary => {
                let summaryLi = document.createElement("li")
                summaryLi.classList = "summaries"
                let summaryP = document.createElement("p")
                summaryP.innerHTML = `Guessed:${summary.guessedAddress}, Actual Address: , Points Earned: ${summary.points}`
                summaryLi.append(summaryP)
                summaryOl.prepend(summaryLi)
            });
        }
}

function deleteSummaryRquest(summariesArray){
    summariesArray.forEach(summary =>{
        fetch(SUMMARIES_URL + '/' + summary.id, {
            method: 'DELETE'
        })
    })
}

function deleteUserPoints(){
    T_POINTS = 00
    fetch(USERS_URL +'/'+ USER_ID, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json"
        },
        body: JSON.stringify({
            points: T_POINTS
        })
    })
    .then(resp => resp.json())
    .then(user => {
        T_POINTS = 0
        updatePoints(T_POINTS)
    })
}

function addSummaryInDatabase(summary_data){
    fetch(SUMMARIES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json"
        },
        body: JSON.stringify({
            user_id: USER_ID,
            input_lat: summary_data.input_lat,
            input_lng: summary_data.input_lng,
            actual_lat: summary_data.actual_lat,
            actual_lng: summary_data.actual_lng,
            points: summary_data.points
        })
      })
      .then(response => response.json())
      .then(updatedSummary => {
            // getUserSummary(USER_ID)
            updateUserPoints()
      })
}

function updatePoints(points){
    let displayedUserPoints = document.getElementById("points")
    displayedUserPoints.textContent = `|| Points:${points} ||`
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let radiusOfEarthInKm = 6371;
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let mathCalculation = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    let moreCalculation = 2 * Math.atan2(Math.sqrt(mathCalculation), Math.sqrt(1-mathCalculation)); 
    let distanceInKm = radiusOfEarthInKm * moreCalculation;
    SUMMARY_DATA.points = Math.ceil(25000/distanceInKm)
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function updateUserPoints () {
    fetch(`http://localhost:3000/getUserByEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json"
        },
        body: JSON.stringify({
          email: EMAIL
        })
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
        updatePoints(user.points)
    })
}
  