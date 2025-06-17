import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  // Replace with your OpenWeather API key
  const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

  useEffect(() => {
    getLocationAndWeather();
  }, []);

  const getLocationAndWeather = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setError('Location access denied. Using default location.');
          // Default to Tashkent coordinates
          fetchWeather(41.2995, 69.2401);
        }
      );
    } else {
      setError('Geolocation not supported. Using default location.');
      fetchWeather(41.2995, 69.2401);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      // Mock data for demonstration
      setWeather({
        name: 'Tashkent',
        main: { temp: 25, feels_like: 27 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 }
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Weather</h3>
          <div className="text-2xl">🌤️</div>
        </div>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Weather</h3>
          <div className="text-2xl">❌</div>
        </div>
        <div className="text-center">
          <p className="text-red-600 mb-2">{error}</p>
          <button
            onClick={getLocationAndWeather}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[250px] hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Weather</h3>
        <button
          onClick={getLocationAndWeather}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          🔄
        </button>
      </div>

      {weather && (
        <div className="text-center">
          <div className="text-4xl mb-2">
            {getWeatherIcon(weather.weather[0].icon)}
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="text-gray-600 capitalize mb-2">
            {weather.weather[0].description}
          </div>
          <div className="text-sm text-gray-500">
            <div>📍 {weather.name}</div>
            <div>🌡️ Feels like {Math.round(weather.main.feels_like)}°C</div>
            {weather.wind && (
              <div>💨 Wind {weather.wind.speed} m/s</div>
            )}
          </div>
          {error && (
            <div className="text-xs text-orange-600 mt-2">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;