const input = document.getElementById("input");
const sBtn = document.getElementById("searchBtn");
const weather = document.getElementById("weather");

sBtn.addEventListener("click", () => {
    console.log("Button clicked");
    const cityName = input.value.trim();

    if (cityName === "") {
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9c1fb7c8d10ff4f4216554f28e97463d`;
    weather.innerHTML = `<h2>loading</h2>`



    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
 
            if (data.cod !== 200) {

                weather.innerHTML =
                    `<h2>City is not found</h2>`;
                return;
            }

             const icon = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            const temperature = data.main.temp - 273.15;

            weather.innerHTML = `          
<h2>${data.name}</h2>
<img src="${iconUrl}" alt="Weather Icon">
<p>Temperature: ${temperature.toFixed(1)} °C</p>
<p>Wind Speed: ${data.wind.speed} m/s</p>
`;
        });
});

