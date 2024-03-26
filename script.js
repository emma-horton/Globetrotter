// Display different views
function displayStartPage() {
    document.body.classList.add("startpage-background");
    document.getElementById("header").style.display = "block";
    document.getElementById("choose-indicator-popup").style.display = "flex";
    document.getElementById("choose-country-popup").style.display = "none";
    document.getElementById("dashboard-header").style.display = "none";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "none";       
}

function displayFirstDashboard() {
    document.body.classList.remove("startpage-background");
    document.getElementById("header").style.display = "none";
    document.getElementById("choose-indicator-popup").style.display = "none";
    document.getElementById("choose-country-popup").style.display = "none";
    document.getElementById("dashboard-header").style.display = "block";
    document.getElementById("indicator-dashboard-grid").style.display = "flex";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "flex";
    
    document.getElementById("next-btn").onclick = displayCountryPopup;
}

function displayCountryPopup() {
    document.getElementById("header").style.display = "none";
    document.getElementById("choose-indicator-popup").style.display = "none";
    document.getElementById("choose-country-popup").style.display = "flex";
    document.getElementById("dashboard-header").style.display = "none";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "none";
    document.getElementById("timeslider-and-navigation").style.display = "none";        
}

function displaySecondDashboard() {
    document.getElementById("header").style.display = "none";
    document.getElementById("choose-indicator-popup").style.display = "none";
    document.getElementById("choose-country-popup").style.display = "none";
    document.getElementById("dashboard-header").style.display = "block";
    document.getElementById("indicator-dashboard-grid").style.display = "none";
    document.getElementById("country-dashboard-grid").style.display = "flex";
    document.getElementById("timeslider-and-navigation").style.display = "flex";        
}

displayStartPage();

function optionSelected(value) {
    console.log(value + " selected");
    document.getElementById("dashboard-header").innerHTML = value;
    displayFirstDashboard();
}

// add onclick event if a country is chosen on the map
// it should call this function to show the second dashboard:
// displaySecondDashboard();

