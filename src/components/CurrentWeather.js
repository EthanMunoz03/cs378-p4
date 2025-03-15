import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CurrentWeather({ weather, selectedLocation, getWeatherIcon }) {
    
    return (
        <div className="current-weather">
            <div className="main-weather-info">
                <h3 className="city-name">{selectedLocation.name}</h3>
                <img
                    src={`${process.env.PUBLIC_URL}/images/${getWeatherIcon(
                        weather.current.weather_code
                    )}`}
                    alt="Weather Icon"
                    width="100"
                />
                <p className="temperature">{weather.current.temperature_2m}°F</p>
            </div>
            <div className="weather-data">
                <p>Humidity: {weather.current.relative_humidity_2m}%</p>
                <p>Wind Speed: {weather.current.wind_speed_10m} km/h</p>
                <p>Precipitation: {weather.daily.precipitation_sum[0]} mm</p>
            </div>
        </div>
    );
}

export default CurrentWeather;
