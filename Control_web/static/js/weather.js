const API_KEY = "c942f5d1e10d4b2cb4c8f53f599fccd9";

function onGeoOk() {
  //const lat = position.coords.latitude;
  //const lng = position.coords.longitude;
  const lat = 41.9018359;
  const lng = -87.630292;
  console.log("You live in", lat, lng);
  //For Fahrenheit use units=imperial, For Celsius use units=metric, at end of url
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`;
  //https://api.openweathermap.org/data/2.5/weather?lat=41.9018359&lon=-87.630292&appid=c942f5d1e10d4b2cb4c8f53f599fccd9&units=imperial

  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}℉ `;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you!!");
}
onGeoOk();
//For normal PC with GPS
//navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const weather = document.querySelector("#weather span:first-child");
//       const city = document.querySelector("#weather span:last-child");
//       city.innerText = data.name;
//       weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
//     });
