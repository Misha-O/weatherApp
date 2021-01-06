import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  getCurrentDate,
} from "./utils/formatData.js";

const api = {
  key: "1d607509e5126d85adbdcf88e4c52472",
  url: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector("[data-search]");
const city = document.querySelector("[data-city]");
const currentDate = document.querySelector("[data-date]");
const mainTemp = document.querySelector("[data-temp]");
const condition = document.querySelector("[data-condition]");
const wind = document.querySelector("[data-wind]");
const lowHighTemp = document.querySelector("[data-low-high]");
const icon = document.querySelector("[data-icon]");

searchBox.addEventListener("keypress", setQuery);
mainTemp.addEventListener("click", tempUnits);

function setQuery(e) {
  if (e.key === "Enter") {
    getResults(searchBox.value);
    searchBox.value = "";
    searchBox.blur();
  }
}

async function getResults(query) {
  try {
    const res = await fetch(
      `${api.url}weather?q=${query}&units=metric&appid=${api.key}`
    );
    const weather = await res.json();
    displayResults(weather);
  } catch (error) {
    alert("Incorrect name of the city. Please try again.");
  }
}

function displayResults(weather) {
  console.log(weather);
  console.log(weather.coord.lon);
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;
  currentDate.innerHTML = getCurrentDate();

  mainTemp.innerHTML = `${Math.round(
    weather.main.temp
  )}<span data-unit>°c</span>`;

  wind.innerHTML = `
  ${Math.round(weather.wind.speed)} <span>m/s</span>
  `;

  lowHighTemp.innerHTML = `
  Low: ${Math.floor(weather.main.temp_min)}<span>°c</span><br>
  High: ${Math.round(weather.main.temp_max)}<span>°c</span>
  `;

  condition.innerText = `${weather.weather[0].description}`;

  wxIcon(weather.weather[0].icon);
}

function tempUnits(e) {
  if (e.target.hasAttribute("data-unit") && mainTemp.innerHTML) {
    if (e.target.innerText === "°c") {
      let num = mainTemp.textContent.trim().split("°c");

      let fahrenheit = celsiusToFahrenheit(Math.round(parseInt(num)));
      mainTemp.innerHTML = `
      ${fahrenheit} <span data-unit>F</span>`;
    }
    if (e.target.innerText === "F") {
      let num = mainTemp.textContent.trim().split("F");
      let fahrenheit = fahrenheitToCelsius(Math.round(parseInt(num)));
      mainTemp.innerHTML = `
      ${Math.round(fahrenheit)} <span data-unit>°c</span>`;
    }
  }
}

function wxIcon(path) {
  icon.innerHTML = `
  <img src="http://openweathermap.org/img/wn/${path}.png" alt="Wx icon">
  `;
}
