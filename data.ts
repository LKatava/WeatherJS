//esbuild main.ts --bundle --outfile=main.js --format=esm

import { fetchWeatherApi } from 'openmeteo';
	
const params = {
	"latitude": 45.3516,
	"longitude": 19.0023,
	"current": ["temperature_2m", "relative_humidity_2m", "is_day", "rain"],
	"hourly": "temperature_80m",
	"daily": ["temperature_2m_max", "temperature_2m_min"],
	"timeformat": "unixtime",
	"timezone": "auto"
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature2m: current.variables(0)!.value(),
		relativeHumidity2m: current.variables(1)!.value(),
		isDay: current.variables(2)!.value(),
		rain: current.variables(3)!.value(),
	},
	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval())
			.map((t: number): string => {
				const date = new Date((t + utcOffsetSeconds) * 1e3);
				const hours = date.getUTCHours().toString().padStart(2, '0'); // Format hours as 'HH'
				return `${hours}:00`; // Return time as 'HH:00'
			})
			.slice(0, 24), // Limit to the first 24 hours
	
		temperature80m: (() => {
			const variable = hourly.variables(0);
			if (variable) { // Check if 'variable' is not null
				const values = variable.valuesArray();
				if (values) {
					return Array.from(values).slice(0, 24); // Convert Float32Array to number[] and limit to 24 entries
				}
			}
			return []; // Return an empty array if 'variable' is null or 'valuesArray' is null
		})()
	},
	daily:{
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval())
			.map((t: number): string => {
				const date = new Date((t + utcOffsetSeconds) * 1000);
				const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				return daysOfWeek[date.getUTCDay()]; // Return the name of the day of the week
			})
			.slice(0, 7), // Limit to 7 days
	
		temperature2mMax: (() => {
			const variable = daily.variables(0);
			if (variable) { // Check if 'variable' is not null
				const values = variable.valuesArray();
				if (values) {
					return Array.from(values).slice(0, 7); // Convert Float32Array to number[] and limit to 7 entries
				}
			}
			return []; // Return an empty array if 'variable' is null or 'valuesArray' is null
		})(),
	
		temperature2mMin: (() => {
			const variable = daily.variables(1);
			if (variable) { // Check if 'variable' is not null
				const values = variable.valuesArray();
				if (values) {
					return Array.from(values).slice(0, 7); // Convert Float32Array to number[] and limit to 7 entries
				}
			}
			return []; // Return an empty array if 'variable' is null or 'valuesArray' is null
		})()
	},
};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toString(),
		weatherData.hourly.temperature80m[i]
	);
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		weatherData.daily.time[i].toString(),
		weatherData.daily.temperature2mMax[i],
		weatherData.daily.temperature2mMin[i]
	);
}