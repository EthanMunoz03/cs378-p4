import React from 'react';

const HourlyForecastItem = ({ time, temperature, weatherCode, getWeatherIcon }) => {
    
    const hour = new Date(time).getHours();
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return (
        <li className="hourly-forecast-item">
            <p>{formattedHour}{amPm}</p>
            <p>{Math.round(temperature)}°F</p>
            <img src={`${process.env.PUBLIC_URL}/images/${getWeatherIcon(weatherCode)}`} alt="Weather icon" />
        </li>
    );
};

export default HourlyForecastItem;
