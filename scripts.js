const input = document.getElementById("input");
const sBtn = document.getElementById("searchBtn");
const weather = document.getElementById("weather");

sBtn.addEventListener("click", () => {
    const city = input.value.trim();

    searchWeather(city);
});
function searchWeather(city) {
    if (city == "") {
        return;
    }
    showLoading();
    fetchWeather(city);
}
function showLoading() {
    weather.innerHTML = `<h2>Loading...</h2>`;
}

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c1fb7c8d10ff4f4216554f28e97463d`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayWeather(data);
    } catch (error) {
        showError("Network error...");
    }
}
    function showError(message) {
        weather.innerHTML = `<h2>${message}</h2>`;
    }
    function displayWeather(data){
       const celsius = data.main.temp - 273.15;

       const condition = data.weather[0].description;

       weather.innerHTML = `
       <h2>${data.name}</h2>
       <p class="temp">Temperature: <strong>${celsius.toFixed(1)} °C</strong></p>
        <p>Condition: <span>${condition}</span></p>
        <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>`;
    }