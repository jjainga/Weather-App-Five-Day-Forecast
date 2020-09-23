// Create buttons for each city
console.log("Hello");
var cityInput = $("#search").val();
var cityList = [];

//Functions
getList();
newCity();
//Dynamically creates buttons from localStorage
function newButton () {
    for(var i = 0; i < cityList.length; i++) {

    var nextCity = $("<button>");
    var buttonDiv =$("<div>");
    //Setting classes and id's for button
    nextCity.addClass(cityList[i]);
    nextCity.addClass("button");
    nextCity.addClass("cityBtn");

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

// Store buttons in local storage
function saveCity () {
    var savedList = JSON.stringify(cityList);
        console.log(savedList);
    localStorage.setItem("Location", savedList);
}
// Pull from localstorage
function getList () {
    var locationList = JSON.parse(localStorage.getItem("Location"));
    if(locationList != null) {
        cityList = [];
    cityList = locationList;
        console.log(cityList);
    }
    else {

    }}

// Create ajax request to pull information
function getInfo() {
var cityName = $(this).attr("id");
    console.log(cityName);
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&APPID=5327fb59791319226e02244852ddbabb";
$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response) {
// Create layout for city selected
    console.log(response);
    var weatherGrid = $("<div>");
        weatherGrid.addClass("grid-x")
    var weatherDisplay = $("<div>");
        weatherDisplay.addClass("cell medium-8 medium-cell-block-y");
    //Creating time display for current day and time information
    var timeDisplay = $("<div>");
        timeDisplay.addClass("cell medium-4 medium-cell-block-y")
        timeDisplay.attr("style", "float: right");
        timeDisplay.attr("style", "text-align: right");
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
    //Creating Header for today
    var todayText = $("<h1>");
        todayText.text("Today");
    //Creating tag for current day and time
    var currentTime = $("<h5>");
        currentTime.text(moment().format('llll'))
    //Creating tag for sunrise and sunset
    var sunriseP = $("<p>");
    var sunsetP = $("<p>");
    var sunriseTime = new Date((response.sys.sunrise * 1000)).toString();
    var sunsetTime = new Date((response.sys.sunset * 1000)).toString();
        
        console.log(sunriseTime)
        sunriseP.text("Sunrise: " + sunriseTime[16] + sunriseTime[17] + sunriseTime[18] + sunriseTime[19] + sunriseTime[20]);
        sunsetP.text("Sunset: " + sunsetTime[16] + sunsetTime[17] + sunsetTime[18] + sunsetTime[19] + sunsetTime[20]);
        console.log(new Date((response.sys.sunrise * 1000)).toString());
$("#weatherInfo").empty();
//Appending Weather Info
weatherDisplay.append(locationName);
weatherDisplay.append(tempIconDisplay);
weatherDisplay.append(locationHumidity);
tempIconDisplay.append(tempDisplay);
tempIconDisplay.append(weartherIcon);
//Appending time Info
timeDisplay.append(todayText);
timeDisplay.append(currentTime);
timeDisplay.append(sunriseP);
timeDisplay.append(sunsetP);
weatherGrid.append(weatherDisplay);
weatherGrid.append(timeDisplay);
$("#weatherInfo").append(weatherGrid);
})}

// Create Five day forecast for selected city
function fiveDay() {
    var cityName = $(this).attr("id");
    console.log(cityName);
var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=5327fb59791319226e02244852ddbabb"
$.ajax({
    url: queryUrl,
    method: "GET"    
}).then(function(response) {
//Create display for 5 day  forecast
    console.log(response);
var fiveDayGroup = $("#fiveDayGroup");
    
fiveDayGroup.empty();
//arrary for day names
var dayOfWeekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var currentDay = String(moment().format('dddd'));
        console.log(currentDay);
        console.log(dayOfWeekArr);
//Create for loop to create each day's forecast
for (var i = 0; i < response.list.length; i = i + 8 ) {
//Create index to select what day of the week each display is
    var dayofWeekIndex = (i / 8) + 1;
        console.log(dayofWeekIndex);
//Determine where the current day is within the dayOfWeekArr
    var currentDayIndex = dayOfWeekArr.indexOf(currentDay);
        console.log(currentDayIndex);
//Select the day of week for each display
    var forecastIndex = currentDayIndex + dayofWeekIndex; 
//Create new div for each display to live in
    var dayForecast = $("<div>");
        dayForecast.addClass("cell medium-2").attr("style", "display: inline-block");
        dayForecast.attr("id", "fiveDayForecast")
//Creating header and icons
    var dayOfWeek = $("<h4>").text(dayOfWeekArr[forecastIndex]);
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
    var humidityForecast = $("<p>");
        humidityForecast.text("Humidity: " + response.list[i].main.humidity + "%");
//Appending forcast to the new div
dayForecast.append(dayOfWeek);
dayForecast.append(iconPic);
dayForecast.append(tempMax);
dayForecast.append(tempMin);
dayForecast.append(humidityForecast);
//Appending section
fiveDayGroup.append(dayForecast);
}
//Appending to page
$("#weatherInfoHub").append(fiveDayGroup);
})}


//Click event to push citys into cityList array
$(".top-bar").on("click", "#searchBtn", newCity)
$("#buttonLocation").on("click", ".cityBtn", getInfo);
$("#buttonLocation").on("click", ".cityBtn", fiveDay);