import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Komponenta pro vykreslení grafu teploty
class TemperatureChart extends Component {
  
  // Funkce pro získání dat pro graf
  getChartData = () => {
    const { weather } = this.props; // Získání dat o počasí z props

    // Převedení časových údajů na čitelné datumy pro popisky osy X
    const labels = weather.map(item => new Date(item.dt * 1000).toLocaleDateString());

    // Získání teploty pro každý záznam
    const temperatures = weather.map(item => item.main.temp);

    // Vytvoření objektu, který obsahuje data a konfiguraci pro graf
    return {
      labels,
      datasets: [
        {
          label: 'Teplota (°C)',  // Popisek pro dataset
          data: temperatures, // Teploty, které budou vykresleny v grafu
          borderColor: 'rgba(75, 192, 192, 1)', // Barva čáry grafu
          borderWidth: 2, // Tloušťka čáry
          fill: false,  // Čára nebude vyplněná
        },
      ],
    };
  };

  // Vykreslení grafu pomocí komponenty Line z react-chartjs-2
  render() {
    return (
      <div className="chart-container">
        <Line data={this.getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    );
  }
}

export default TemperatureChart;
