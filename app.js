const weatherContainer = document.getElementById("weather-container");

function fetchWeather(city) {
    const apiKey = '145de51f904bf72d38ba21d735e4d721';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
            console.log("API Response status:", response.status);  
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather data:", data); 
            displayWeather(data);
        })
        .catch(error => {
            console.error("Chyba při načítání počasí:", error);
            weatherContainer.innerHTML = "Město nebylo nalezeno nebo se vyskytla chyba.";
        });
}

function displayWeather(data) {
    weatherContainer.innerHTML = '';  // Vymazání starých dat
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

document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("city-input");

    // Načtení měst z JSON souboru
    fetch('city.list.json')
        .then(response => response.json())
        .then(cities => {
            const datalist = document.getElementById("city-list");
            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = `${city.name}, ${city.country}`;
                datalist.appendChild(option);
            });
        });

    cityInput.addEventListener("input", function() {
        const city = cityInput.value.trim().split(',')[0];
        console.log("Selected city:", city);
        fetchWeather(city);
    });
});
