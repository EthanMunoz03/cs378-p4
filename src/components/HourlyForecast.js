import React from 'react';
import HourlyForecastItem from './HourlyForecastItem';

const HourlyForecast = ({ weather, getWeatherIcon }) => {
    
  if (!weather || !weather.hourly) return null;

  const currentTime = new Date();
  const localTimeString = currentTime.toLocaleString("en-US", { timeZone: weather.timezone });
  const localTime = new Date(localTimeString);
  const localHour = localTime.getHours();

  const timeArray = weather.hourly.time.map(t => new Date(t).getHours());
  const startIndex = timeArray.findIndex(hour => hour === localHour);
  const displayStartIndex = startIndex !== -1 ? startIndex : 1;

  return (
    <div>
      <div className="hourly-forecast">
        {weather.hourly.time.slice(displayStartIndex, displayStartIndex + 10).map((time, index) => (
          <HourlyForecastItem
            key={index}
            time={time}
            temperature={weather.hourly.temperature_2m[displayStartIndex + index]}
            weatherCode={weather.hourly.weather_code[displayStartIndex + index]}
            getWeatherIcon={getWeatherIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
