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

button.addEventListener("click", onClick);

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
      } else {
        weather.style.display = "none";
        error.style.display = "block";
      }
      wind.innerText = data.wind.speed + "km/h";
      temp.innerText = Math.round(data?.main?.temp);
      city.innerText = data?.name;
      humidity.innerText = data.main.humidity + "% ";
      if (data.weather[0].main == "Clouds") {
        weathericon.src = "./images/clouds.png";
        rain.style.display = "none";
        snow.style.display = "none";

        mist.style.display = "none";
        body.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(./images/eRwDMy.jpg)";
      } else if (data.weather[0].main == "Clear") {
        weathericon.src = "./images/clear.png";
        mist.style.display = "none";
        rain.style.display = "none";
        snow.style.display = "none";

        body.style.backgroundImage = "url(./images/eRwDMy.jpg)";
      } else if (data.weather[0].main == "Drizzle") {
        weathericon.src = "./images/drizzle.png";
        drizzle.style.display = "block";
        rain.style.display = "none";
        snow.style.display = "none";
        mist.style.display = "none";
        body.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(./images/eRwDMy.jpg)";
      } else if (data.weather[0].main == "Mist") {
        weathericon.src = "./images/mist.png";
        mist.style.display = "block";
        rain.style.display = "none";
        snow.style.display = "none";
        body.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(./images/eRwDMy.jpg)";
      } else if (
        data.weather[0].main == "Rain" ||
        data.weather[0].main == "Haze" ||
        data.weather[1].main == "Rain"
      ) {
        weathericon.src = "./images/rain.png";
        snow.style.display = "none";
        mist.style.display = "none";
        rain.style.display = "block";
        body.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(./images/eRwDMy.jpg)";
      } else if (data.weather[0].main == "Snow") {
        weathericon.src = "./images/snow.png";
        mist.style.display = "none";
        rain.style.display = "none";
        snow.style.display = "block";
        body.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(./images/eRwDMy.jpg)";
      }

      console.log(data);
    });
}
