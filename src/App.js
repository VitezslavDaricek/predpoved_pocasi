import React, { Component } from 'react';
import './App.css'; // Import CSS
import TemperatureChart from './components/TemperatureChart'; // Import komponenty grafu

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      weather: [],
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('city.list.json');
      const cities = await response.json();
      this.setState({ cities });
    } catch (error) {
      console.error("Chyba při načítání seznamu měst:", error);
    }
  }

  fetchWeather = async (city) => {
    const apiKey = '145de51f904bf72d38ba21d735e4d721';
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.setState({ weather: data.list.slice(0, 5), error: null });
    } catch (error) {
      console.error("Chyba při načítání počasí:", error);
      this.setState({ error: "Město nebylo nalezeno nebo se vyskytla chyba.", weather: [] });
    }
  }

  handleInputChange = (event) => {
    const city = event.target.value.trim().split(',')[0];
    this.fetchWeather(city);
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
          onChange={this.handleInputChange}
        />
        <datalist id="city-list">
          {cities.map(city => (
            <option key={city.id} value={`${city.name}, ${city.country}`} />
          ))}
        </datalist>
        <div id="weather-container">
          {error && <p>{error}</p>}
          {weather.length > 0 && (
            <>
              {weather.map((item, index) => {
                const date = new Date(item.dt * 1000);
                return (
                  <div key={index} className="weather-item">
                    <strong>{date.toLocaleDateString()}</strong>
                    <p>Teplota: {item.main.temp}°C</p>
                  </div>
                );
              })}
              <TemperatureChart weather={weather} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
