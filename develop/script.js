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
function getInfo() {
var cityName = $(this).attr("id");
    console.log(cityName);
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&APPID=5327fb59791319226e02244852ddbabb";
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
    weartherIcon.attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png");
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
})}

//TODO:// Create Five day forecast for selected city
function fiveDay() {
    var cityName = $(this).attr("id");
    console.log(cityName);
var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=5327fb59791319226e02244852ddbabb"
$.ajax({
    url: queryUrl,
    method: "GET"    
}).then(function(response) {
//TODO://Create display for 5 day  forecast
    console.log(response);
var fiveDayGroup = $("<section>");
    fiveDayGroup.addClass("grid-x")
//loop for each day
for (var i = 0; i <= response.list.length; i + 8 ) {
if ( i > 40) {
    break;
}
else{
    var dayForecast = $("<div>");
        dayForecast.addClass("cell").attr("style", "display: inline-block");
        dayForecast.attr("id", response.list[i].dt_txt)
//Creating header and icons
    var dayOfWeek = $("<h2>").text(response.list[i].dt_text);
    var iconPic = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
    var tempMax = $("<h5>");
    var tempMin = $("<h5>");
//Converting kelvin to F/C
    var maxTempF = Math.floor((response.list[i].main.temp_max - 273.15) * 1.8 + 32); 
    var maxTempC = Math.floor(response.list[i].main.temp_max - 273.15);
    var minTempF = Math.floor((response.list[i].main.temp_min - 273.15) * 1.8 + 32); 
    var minTempC =  Math.floor(response.list[i].main.temp_min - 273.15);
        console.log(maxTempF, minTempF, maxTempC, minTempC);
//Setting temp values
        tempMax.text(maxTempF + "\xB0" + "F" + "/" + maxTempC + "\xB0" + "C")
        tempMin.text(minTempF + "\xB0" + "F" + "/" + minTempC + "\xB0" + "C")
//Getting humidity
    var humidityForecast = $("<h5>");
        humidityForecast.text(response.list[i].main.humidity + "%");
//Appending forcast to the page
dayForecast.append(dayOfWeek);
dayForecast.append(iconPic);
dayForecast.append(tempMax);
dayForecast.append(tempMin);
dayForecast.append(humidityForecast);

fiveDayGroup.append(dayForecast);
}}
$("#mainGrid").append(fiveDayGroup);
})}


//Click event to push citys into cityList array
$(".top-bar").on("click", "#searchBtn", newCity)
$(".cityBtn").on("click", getInfo);
$(".cityBtn").on("click", fiveDay);