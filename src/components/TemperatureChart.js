import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

class TemperatureChart extends Component {
  getChartData = () => {
    const { weather } = this.props;

    const labels = weather.map(item => new Date(item.dt * 1000).toLocaleDateString());
    const temperatures = weather.map(item => item.main.temp);

    return {
      labels,
      datasets: [
        {
          label: 'Teplota (°C)',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  render() {
    return (
      <div className="chart-container">
        <Line data={this.getChartData()} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    );
  }
}

export default TemperatureChart;