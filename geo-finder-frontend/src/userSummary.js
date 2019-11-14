console.log("userSummary")
const GET_SUMMARY_URL = `${BASE_URL}/getSummaryOfUser`;
//  get summaryData from Map.js?
let CLICK_CHECK = new Set([])

function viewSummary(){
    let summaryDiv = document.getElementById("summary")
    summaryDiv.addEventListener('click', (ev)=>{
        ev.preventDefault();
        console.log(USER_ID)
        getUserSummary(USER_ID)
    })
}

function addSummary(SUMMARY_DATA){
    fetch(SUMMARIES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json"
        },
        body: JSON.stringify({
            user_id: USER_ID,
            input_lat: SUMMARY_DATA.input_lat,
            input_lng: SUMMARY_DATA.input_lng,
            actual_lat: SUMMARY_DATA.actual_lat,
            actual_lng: SUMMARY_DATA.actual_lng,
            points: points
        })
      })
      .then(response => response.json())
      .then(updatedPoints => updatePoints(updatedPoints))
}

function updatePoints(updatedPoints){
    let displayedUserPoints = document.getElementById("points")
    displayedUserPoints.textContent = updatedPoints.points
}

function getUserSummary(userId){
    console.log(userId)

    return fetch(GET_SUMMARY_URL + "/" + userId)
      .then(response => response.json())
      .then(summaries => {
            createSummaryDiv(summaries)
        })
}

function createSummaryDiv(summaries){
    console.log(summaries)
    let displaySummaryDiv = document.getElementById("display-Summary")
    let deleteUserSummeries = document.createElement("button")
    deleteUserSummeries.textContent = "Clear Summary"
    deleteUserSummeries.addEventListener('click', (ev)=>{
        ev.preventDefault();
        
        deleteSummaryRquest(summaries)
        deleteUserPoints()
        while (displaySummaryDiv.firstChild) {
            displaySummaryDiv.firstChild.remove()
        }
        let summaryDiv = document.createElement("div")
        summaryDiv.textContent = "Summary Deleted!!"
        displaySummaryDiv.append(summaryDiv)
        displaySummaryDiv.prepend(deleteUserSummeries)
        
    })
    displaySummaryDivDOM(summaries)
    hideEachDisplay(CSS_ID_ARRAY)
    onlyDisplay(["after-login-navbar", "after-login", "display-Summary"])
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
        console.log("UPDATED USER" ,user);
        getUser(EMAIL)
    })
}

function displaySummaryDivDOM(summariesArray){
    if (!CLICK_CHECK.has("clicked")){
        CLICK_CHECK.add("clicked")
        let displaySummaryDiv = document.getElementById("display-Summary")
        if (summariesArray.length === 0){
            let summaryDiv = document.createElement("div")
            summaryDiv.textContent = "No Summary!!"
            displaySummaryDiv.append(summaryDiv)
        } else{
            summariesArray.forEach(summary => {
                let summaryDiv = document.createElement("div")
                summaryDiv.classList = "summaries"
                summaryDiv.textContent = "hello"
                displaySummaryDiv.append(summaryDiv)
            });
        }
    }
}

