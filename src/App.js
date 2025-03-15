import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedLocations, setSavedLocations] = useState([
    { name: 'Austin', lat: 30.2672, lon: -97.7431 },
    { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=precipitation_sum&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=auto`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const fetchLocationCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en&count=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0];
        return { name: city, lat: location.latitude, lon: location.longitude };
      } else {
        throw new Error('City not found.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      setError('Failed to find the city. Please try again.');
      return null;
    }
  };

  const handleSearch = async () => {
    const locationData = await fetchLocationCoordinates(searchTerm);
    if (locationData) {
      setSearchTerm('');
      setSavedLocations((prevLocations) => [...prevLocations, locationData]);
      setSelectedLocation(locationData);
      fetchWeather(locationData);
      setError(null);
      return true;
    }
    return false;
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    fetchWeather(location);
  };

  const getCurrentHourForLocation = () => {
    if (!weather || !weather.current || !weather.timezone) return new Date().getHours();

    const currentTime = new Date(weather.current.time);
    const localTime = currentTime.toLocaleString("en-US", { timeZone: weather.timezone });
    return new Date(localTime).getHours();
  };

  const isNight = getCurrentHourForLocation() < 6 || getCurrentHourForLocation() > 18;

  const getWeatherIcon = (code) => {
    if (code === 0) return isNight ? 'night.png' : 'sunny.png';
    if (code === 1 || code === 2 || code === 3) return isNight ? 'cloudy-night.png' : 'cloudy-day.png';
    if (code >= 51 && code <= 67) return isNight ? 'rainy-night.png' : 'rainy-day.png';
    if (code >= 71 && code <= 77) return isNight ? 'snow-night.png' : 'snow-day.png';
    if (code >= 80 && code <= 99) return isNight ? 'stormy-rain.png' : 'stormy.png';
    return 'cloudy-windy.png';
  };

  return (
    <div className="container">

      {/* Header with Search Bar and Saved Locations*/}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        savedLocations={savedLocations}
        handleLocationClick={handleLocationClick}
        error={error}
      />

      {/* Weather Information */}
      {selectedLocation && weather && (
        <>
          <CurrentWeather
            weather={weather}
            selectedLocation={selectedLocation}
            isNight={isNight} 
            getWeatherIcon={getWeatherIcon}
          />

          <HourlyForecast
            weather={weather}
            getWeatherIcon={getWeatherIcon}
          />
        </>
      )}
    </div>
  );
}

export default App;
