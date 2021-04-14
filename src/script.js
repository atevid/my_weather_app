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
 document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
 document.querySelector("#wind").innerHTML = response.data.wind.speed;
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#condition").innerHTML = response.data.weather[0].description;
document.querySelector("#city").innerHTML = response.data.name;
}

function showCity(event) {
  event.preventDefault();
  let yourCity = document.querySelector("#enterCity").value;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${yourCity.value}`;
  let units = "metric";
  let apiKey = "126c20b90ebb15582267fe5043978b84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${yourCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let city = document.querySelector("#enterYourCity");
city.addEventListener("submit", showCity);

//current

function showCurrentTemperature(response) {
  let currentTemperatureInCity = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let changeToCurrentCity = document.querySelector("#city");
  changeToCurrentCity.innerHTML = currentCity;
  let currentTemperature = Math.round(response.data.main.temp);
  let changeToCurrentTemperature = document.querySelector("#temperature");
  changeToCurrentTemperature.innerHTML = currentTemperature;
  let wind = response.data.wind.speed;
  let windCondition = document.querySelector("#wind");
  windCondition.innerHTML = wind;
  let humidity = response.data.main.humidity;
  let humidityCondition = document.querySelector("#humidity");
  humidityCondition.innerHTML = humidity;
  let condition = response.data.weather[0].description;
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = condition;

  function showTemperatureInCity(event) {
    event.preventDefault();
  }

  let heading = document.querySelector("h1");
  heading.addEventListener("click", showTemperatureInCity);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "126c20b90ebb15582267fe5043978b84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
