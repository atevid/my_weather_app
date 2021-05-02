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

function formatForecastDate(timestamp) {
let date = new Date (timestamp * 1000);
let day = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

return days[day];


}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="weather-forecast">`;
  
  forecast.forEach(function(forecastDay, index) {

if (index < 6 && index > 0) {
  forecastHTML =
    forecastHTML +
    ` 
<ul>
 <li>
    ${formatForecastDate(
      forecastDay.dt
    )} <br>  <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="45" class="float-left> 
    <div class="forecast-temp"> 
     <span class="temp-fore-max">${Math.round(forecastDay.temp.max)}°</span>  
   
    </div>   
 </li>
</ul>
`;
}
  });
  
  forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "126c20b90ebb15582267fe5043978b84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast)
}

function showTemperature(response) {

   celsiusTemperature = response.data.main.temp;
   
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
 document.querySelector("#wind").innerHTML = response.data.wind.speed;
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#condition").innerHTML = response.data.weather[0].description;
 document.querySelector("#city").innerHTML = response.data.name;
document
  .querySelector("#icon")
  .setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description)



 getForecast(response.data.coord)
}

function search(city) {
let apiKey = "126c20b90ebb15582267fe5043978b84";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity");
  search(city.value);
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


let form = document.querySelector("#enterYourCity");
form.addEventListener("submit", showCity);


search("Praha"); 