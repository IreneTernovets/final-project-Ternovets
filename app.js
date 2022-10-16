function transformedDate(timestamp) {
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
let date = new Date(timestamp * 1000);
let hours = date.getHours();
let minutes = date.getMinutes();
let weekDay = days[date.getDay()];
let day = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear().toString().slice(-2);
if (minutes < 10) {
    minutes = `0${minutes}`;
}
if (hours < 10) {
    hours = `0${hours}`;
}
return `${hours}:${minutes} - ${weekDay}, ${day} ${month} '${year}`;
}

function search(city) {
    let apiKey = "6e6d2f7795d4a628640bafdb43dd9260";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrent);
}

function handleSubmit(respond) {
respond.preventDefault();
let city = document.querySelector("#city-input");
search(city.value);
}

function formatDate(timestamp) {
let date = new Date(timestamp * 1000)
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(respond) {
let forecast = respond.data.daily;
let forecastElement = document.querySelector("#weather-forecast-container");
let forecastHTML = `<div class="weather-forecast-item">`
forecast.forEach(function(forecastDay, index){
    if (index < 4) {
      forecastHTML += 
`<ul class="weather-forecast-list">
    <li class="forecast-day">${formatDate(forecastDay.dt)}</li>
    <li><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width = "50"></li>
    <li class="forecast-temperature"><span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span><span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span></li>
</ul>`  
    }
})


forecastHTML += `</div>`
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
    console.log(coordinates)
    let apiKey = "6e6d2f7795d4a628640bafdb43dd9260";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}

function displayCurrent(response) {
let city = document.querySelector("#primary-city");
let temperature = document.querySelector("#primary-temperature");
let iconElement = document.querySelector("#primary-weather-icon");
let icon = response.data.weather[0].icon;
let description = document.querySelector("#primary-description");
let cloudiness = document.querySelector("#primary-cloudiness");
let humidity = document.querySelector("#primary-humidity");
let windSpeed = document.querySelector("#primary-wind-speed");
let date = document.querySelector("#primary-time");



city.innerHTML = response.data.name;
temperature.innerHTML = `0${Math.round(response.data.main.temp)}°`;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
description.innerHTML = response.data.weather[0].description;
cloudiness.innerHTML = `${response.data.clouds.all} %`;
humidity.innerHTML = `${response.data.main.humidity} %`;
windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} m / s`;
date.innerHTML = `Updated at ${transformedDate(response.data.dt)}`;

getForecast(response.data.coord);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Kyiv");