import cities from "./cities.js";

let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let input = document.querySelector(".input-box");
let city = document.querySelector(".city");
let weathericon = document.querySelector(".weather-icon");
let button = document.querySelector(".search-icon");
let weather = document.querySelector(".wrapper");
let error = document.querySelector(".invalid");
let rain = document.querySelector(".rain");
let body = document.querySelector("body");
let mist = document.querySelector(".mist");
let drizzle = document.querySelector(".drizzle");
let card = document.querySelector(".card");
let search = document.querySelector(".search");
let snow = document.querySelector(".snow");
let citiesDiv = document.querySelector("#cities");
citiesDiv.innerHTML = cities.map((city) => `<option value="${city}">`).join("");

button.addEventListener("click", onClick);
input.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    onClick(e);
  }
});

let Images = {
  snow: "./images/snow.png",
  Clouds: "./images/clouds.png",
  clear: "./images/clear.png",
  mist: "./images/mist.png",
  drizzle: "./images/drizzle.png",
  rain: "./images/rain.png",
};

function resetAnimation() {
  rain.style.display = "none";
  snow.style.display = "none";
  drizzle.style.display = "none";
  mist.style.display = "none";
}

function onClick(e) {
  console.log(input.value);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input.value}&appid=3326a1a9e90bc499d0900d50372d8bf2`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.name) {
        weather.style.display = "flex";
        error.style.display = "none";
        // h1.style.display = "none";
        search.style.outline = "none";
      } else {
        weather.style.display = "none";
        error.style.display = "block";
        search.style.outline = "1px solid red";
      }

      wind.innerText = data.wind.speed + "km/h";
      temp.innerText = Math.round(data?.main?.temp);
      city.innerText = data?.name;
      humidity.innerText = data.main.humidity + "% ";
      const weatherCondition = data.weather[0].main;

      const weatherBg = () => {
        body.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(./images/eRwDMy.jpg)";
      };
      resetAnimation();

      if (weatherCondition == "Snow" || data.main.temp <= 0) {
        weathericon.src = Images["snow"];
        snow.style.display = "block";
        weatherBg();
        return;
      }

      if (weatherCondition == "Clouds") {
        weathericon.src = Images["Clouds"];
        weatherBg();
      } else if (weatherCondition == "Clear") {
        weathericon.src = "./images/clear.png";
        weathericon.src = Images["drizzle"];
        drizzle.style.display = "block";
        weatherBg();
      } else if (weatherCondition == "Mist") {
        weathericon.src = Images["mist"];
        mist.style.display = "block";
        weatherBg();
      } else if (
        weatherCondition == "Rain" ||
        weatherCondition == "Haze" ||
        weatherCondition == "Rain"
      ) {
        weathericon.src = Images["rain"];
        rain.style.display = "block";
        weatherBg();
      }
      console.log(data);
    });
}
