//TODO: // Create buttons for each city
console.log("Hello");
var cityInput = $("#search").val();
var cityList = [];

//Functions
getList();
newCity ();
//Dynamically creates buttons from localStorage
function newButton () {
    for(var i = 0; i < cityList.length; i++) {

    var nextCity = $("<button>");
    var buttonDiv =$("<div>");
    //Setting classes and id's for button
    nextCity.addClass(cityList[i]);
    nextCity.addClass("button");
    nextCity.addClass("cityBtn");
    // nextCity.addClass("cityBtnStyle")
    nextCity.attr("id", cityList[i]);
    nextCity.attr("type", "button")
    nextCity.text(cityList[i]);
    //Setting classes and id's for div
    buttonDiv.addClass("cell medium-4 shrink");
    //Appending buttons to sidebar
    buttonDiv.append(nextCity);
    $("#buttonLocation").append(buttonDiv);

}}

//Prin new buttons
function newCity () {
    if ($("#search").val() !== "" ) {
        //grabing local storage to update cityList
        getList();
        //Push userInput to array
        cityList.push($("#search").val().trim());
            console.log(cityList);
        //Save user input to localstorage
        saveCity();
        //Clearing userInput field
        $("#search").val("");
        //Removing doubling buttons
        $("#buttonLocation").empty();
        newButton();}
    else if ($("#search").val() == ""){  
        $("#buttonLocation").empty();
        getList();
        newButton();
    }}

//TODO:// Store buttons in local storage
function saveCity () {
    var savedList = JSON.stringify(cityList);
        console.log(savedList);
    localStorage.setItem("Location", savedList);
}
//TODO:// Pull from localstorage
function getList () {
    var locationList = JSON.parse(localStorage.getItem("Location"));
    if(locationList != null) {
        cityList = [];
    cityList = locationList;
        console.log(cityList);
    }
    else {

    }}

//TODO: // Create ajax request to pull information
$(".cityBtn").on("click", function getInfo() {
var cityName = $(this).attr("id");
    console.log(cityName);
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+"&APPID=5327fb59791319226e02244852ddbabb";
$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response) {
//TODO:// Create layout for city selected
    console.log(response);
    var weatherDisplay = $("<div>");
    weatherDisplay.addClass("cell auto");
    //Getting Name of location
    var locationName = $("<h1>");
        locationName.text(response.name);
    //Creating cell to hold temp and icon picture
    var tempIconDisplay = $("<div>");
    tempIconDisplay.addClass("cell")
    //Getting Temp of location and converting to bot imperial and metric
    var tempDisplay = $("<h4>").attr("style", "display: inline-block");
    var locationTemp = response.main.temp;
        console.log(locationTemp);
    var imperialTemp = Math.floor(((locationTemp - 273.15) * 1.8) + 32);
    var metricTemp = Math.floor((locationTemp - 273.15));
        tempDisplay.text(imperialTemp + "\xB0" + "F" + "/" + metricTemp + "\xB0" + "C");
    //Getting weather icon
    var weartherIcon = $("<img>").attr("style", "display: inline-block");
    weartherIcon.attr("src", "http://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    //Getting humidity
    var locationHumidity = $("<p>")
    var humidity = response.main.humidity;
        locationHumidity.text("Humidity: " + humidity + "%");

$("#weatherInfo").empty();
weatherDisplay.append(locationName);
weatherDisplay.append(tempIconDisplay);
weatherDisplay.append(locationHumidity);
tempIconDisplay.append(tempDisplay);
tempIconDisplay.append(weartherIcon);

$("#weatherInfo").append(weatherDisplay);
})})
//Click event to push citys into cityList array
$(".top-bar").on("click", "#searchBtn", newCity)






//TODO:// Create layout for city selected

//TODO:// Create layout for five day forecast for the city selected
