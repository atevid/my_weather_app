//Time

let now = new Date();
let date = document.querySelector("#currentDate");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

date.innerHTML = `${day} ${hours}:${minutes}`;

//City and Temperature

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="weather-forecast">`;
  let forecastDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  forecastDays.forEach(function(day) {
forecastHTML =
  forecastHTML +
  ` 
<ul>
 <li>
    ${day}  <img src="" alt=""> 
    <div class="forecast-temp"> 
     <span class="temp-fore-max">18°</span>  
     <span class="temp-fore-min">12°</span> 
    </div>   
 </li>
</ul>
`;
  });
  forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;}

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
 document.querySelector("#wind").innerHTML = response.data.wind.speed;
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#condition").innerHTML = response.data.weather[0].description;
 document.querySelector("#city").innerHTML = response.data.name;
document
  .querySelector("#icon")
  .setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description)



 celsiusTemperature = response.data.main.temp;
}

function search(city) {
let apiKey = "126c20b90ebb15582267fe5043978b84";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  search(city);
}

function searchLocation(position) {

  let apiKey = "126c20b90ebb15582267fe5043978b84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
 
  axios.get(apiUrl).then(showTemperature);
}

function showCurrentTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let city = document.querySelector("#enterYourCity");
city.addEventListener("submit", showCity);

//current

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", showCurrentTemperature)

function showFareTemp (event) {
  event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
  let fareTemp = (celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML = Math.round(fareTemp)
}

function showCelsiusTemp (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;



let fareConvert = document.querySelector("#fare");
fareConvert.addEventListener("click", showFareTemp);

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", showCelsiusTemp);


search("Prague"); 

displayForecast();