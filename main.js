import {weatherData} from './data.js';

console.log(weatherData);

function setWeatherIcon(elementId, condition) {
    const iconElement = document.getElementById(elementId);
    if (condition === 'day') {
        iconElement.src = 'https://img.icons8.com/fluency/1000/sun.png'; // Replace with actual day icon path
    } else if (condition === 'night') {
        iconElement.src = 'https://img.icons8.com/fluency/1000/full-moon--v1.png" alt="full-moon--v1'; // Replace with actual night icon path
    } else if (condition === 'rain') {
        iconElement.src = 'rain-icon.png'; // Replace with actual rain icon path
    } else {
        iconElement.src = 'https://img.icons8.com/fluency/1000/day-and-night.png" alt="day-and-night'; // Replace with actual default icon path
    }
}

// Set current weather data
document.getElementById('current-temp').textContent = `Temperature: ${Math.round(weatherData.current.temperature2m)}°C`;
console.log(weatherData.current.temperature2m);
document.getElementById('current-humidity').textContent = `Humidity: ${weatherData.current.relativeHumidity2m}%`;
document.getElementById('day-night-status').textContent = weatherData.current.isDay ? 'Day' : 'Night';
document.getElementById('rain-status').textContent = weatherData.current.rain ? 'Rain' : 'No Rain';

// Set icon for current weather
if (weatherData.current.rain) {
    setWeatherIcon('current-icon', 'rain');
} else if (weatherData.current.isDay) {
    setWeatherIcon('current-icon', 'day');
} else {
    setWeatherIcon('current-icon', 'night');
}

// Set daily weather data
//document.getElementById('max-min-temp').textContent = `Max: ${(weatherData.daily.temperature2mMax)}°C, Min: ${Math.round(weatherData.daily.temperature2mMin)}°C`;
const dailyTableBody = document.getElementById('daily-weather-table');
const dailyyData = weatherData.daily;

dailyyData.time.forEach((time, index) => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    const tempMinCell = document.createElement('td');
    const tempMaxCell = document.createElement('td');

    timeCell.textContent = time;
    tempMaxCell.textContent = `${Math.round(dailyyData.temperature2mMax[index])}°C`;

    tempMinCell.textContent = `${Math.round(dailyyData.temperature2mMin[index])}°C`;

    row.appendChild(timeCell);
    row.appendChild(tempMinCell);
    row.appendChild(tempMaxCell);
    dailyTableBody.appendChild(row);
});

// Set hourly weather data
const hourlyTableBody = document.getElementById('hourly-weather-table');
const hourlyData = weatherData.hourly;

hourlyData.time.forEach((time, index) => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    const tempCell = document.createElement('td');

    timeCell.textContent = time;
    tempCell.textContent = `${Math.round(hourlyData.temperature80m[index])}°C`;

    row.appendChild(timeCell);
    row.appendChild(tempCell);
    hourlyTableBody.appendChild(row);
});