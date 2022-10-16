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

function handleSubmit(respond) {
respond.preventDefault();
let city = document.querySelector("#city-input");
console.log(city);
}

function displayCurrent(response) {
    console.log(response)
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
}


let apiKey = "6e6d2f7795d4a628640bafdb43dd9260";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrent);

let form = document.querySelector("#search-form");
form.addEventListener("sunmit", handleSubmit);