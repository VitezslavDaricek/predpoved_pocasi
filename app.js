document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("city-input");
    const weatherContainer = document.getElementById("weather-container");

    // Načtené měst z JSON souboru
    fetch('city.list.json')
        .then(response => response.json())
        .then(cities => {
            const datalist = document.getElementById("city-list");
            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = `${city.id},
                                ${city.name},
                                ${city.state},
                                ${city.country},
                                ${city.coord.lon},    
                                ${city.coord.lat}`;
                datalist.appendChild(option);
            });
        });

        cityInput.addEventListener("input", function() {
            const city = cityInput.value.split(',')[0];
            fetchWeather(city);
        });

        function fetchWeather(city) {
            const apiKey = '145de51f904bf72d38ba21d735e4d721';  // Vkládání API klíče z OpenWeatherMap
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    weatherContainer.innerHTML = "Město nebylo nalezeno.";
                });
        }

        function displayWeather(data) {
            weatherContainer.innerHTML = '';    // Vymazání starých dat
            const list = data.list.slice(0, 5);  // Zobrazení předpovědi na 5 dní
            list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const weatherItem = document.createElement("div");
                weatherItem.classList.add("weather-item");
                weatherItem.innerHTML = `
                    <strong>${date.toLocaleDateString()}</strong>
                    <p>Teplota: ${item.main.temp}°C</p>
                `;
                weatherContainer.appendChild(weatherItem);
            }); 
        }
});
