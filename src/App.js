import React, { Component } from 'react';
import './App.css'; // Import CSS pro stylování aplikace
import TemperatureChart from './components/TemperatureChart'; // Import komponenty pro vykreslení grafu

class App extends Component {
  constructor(props) {
    super(props);
    // Inicializace stavu komponenty
    this.state = {
      cities: [], // Seznam měst pro našeptávač
      weather: [],  // Předpověď počasí pro vybrané město
      error: null,  // Chybová hlášení
    };
  }

   // Načítání seznamu měst při mountování komponenty
  async componentDidMount() {
    try {
      const response = await fetch('city.list.json'); // Načítání JSON souboru s městy
      const cities = await response.json(); // Převedení odpovědi na JSON
      this.setState({ cities });  // Uložení měst do stavu
    } catch (error) {
      console.error("Chyba při načítání seznamu měst:", error); // Chybová hlášení do konzole
    }
  }

  // Funkce pro načítání předpovědi počasí z API
  fetchWeather = async (city) => {
    const apiKey = '145de51f904bf72d38ba21d735e4d721';  // API klíč pro OpenWeatherMap
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );  // Načítání dat o počasí z API
      if (!response.ok) {
        throw new Error("Network response was not ok"); // Vyvolání chyby, pokud odpověď není v pořádku
      }
      const data = await response.json(); // Převedení odpovědi na JSON
      this.setState({ weather: data.list.slice(0, 5), error: null }); // Uložení předpovědi do stavu
    } catch (error) {
      console.error("Chyba při načítání počasí:", error); // Chybová hlášení do konzole
      this.setState({ error: "Město nebylo nalezeno nebo se vyskytla chyba.", weather: [] }); // Nastavení chybové zprávy a vymazání předpovědi
    }
  }

   // Funkce pro zpracování změny v textovém poli
  handleInputChange = (event) => {
    const city = event.target.value.trim().split(',')[0]; // Získání názvu města z vstupu
    this.fetchWeather(city);  // Načtení předpovědi počasí pro zvolené město
  }

  render() {
    const { cities, weather, error } = this.state;

    return (
      <div id="app">
        <h1>Předpověď počasí</h1>
        <input
          type="text"
          id="city-input"
          list="city-list"
          placeholder="Zadejte město..."
          onChange={this.handleInputChange} // Zpracování změny v textovém poli
        />
        <datalist id="city-list">
          {cities.map(city => (
            <option key={city.id} value={`${city.name}, ${city.country}`} />  // Návrhy měst v našeptávači
          ))}
        </datalist>
        <div id="weather-container">
          {error && <p>{error}</p>}
          {weather.length > 0 && (
            <>
              {weather.map((item, index) => {
                const date = new Date(item.dt * 1000);  // Převedení timestampu na datum
                return (
                  <div key={index} className="weather-item">
                    <strong>{date.toLocaleDateString()}</strong>  {/* Zobrazení data */}
                    <p>Teplota: {item.main.temp}°C</p>  {/* Zobrazení teploty */}
                  </div>
                );
              })}
              <TemperatureChart weather={weather} />  {/* Komponenta pro zobrazení grafu teploty */}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
