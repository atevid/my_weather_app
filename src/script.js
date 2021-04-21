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

function showTemperature(response) {
  console.log(response.data)
 document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
 document.querySelector("#wind").innerHTML = response.data.wind.speed;
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#condition").innerHTML = response.data.weather[0].description;
 document.querySelector("#city").innerHTML = response.data.name;
document
  .querySelector("#icon")
  .setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description)

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

search ("Prague");

