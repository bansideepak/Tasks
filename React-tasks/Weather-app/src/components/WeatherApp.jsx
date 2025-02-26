import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import ErrorMessage from "./ErrorMessage";
import weatherService from "../services/weatherService";

const WeatherApp = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockData = {
    "New York": {
      name: "New York",
      sys: { country: "US" },
      main: { temp: 11, humidity: 65, pressure: 1012 },
      wind: { speed: 5.2 },
      weather: [{ main: "Clouds", description: "scattered clouds" }],
    },
    London: {
      name: "London",
      sys: { country: "UK" },
      main: { temp: 11, humidity: 72, pressure: 1008 },
      wind: { speed: 4.1 },
      weather: [{ main: "Rain", description: "light rain" }],
    },
    Tokyo: {
      name: "Tokyo",
      sys: { country: "JP" },
      main: { temp: 18, humidity: 60, pressure: 1015 },
      wind: { speed: 3.6 },
      weather: [{ main: "Clear", description: "clear sky" }],
    },
  };

  // Load initial cities (only if API key is missing)
  useEffect(() => {
    if (weatherService.API_KEY === "YOUR_API_KEY") {
      // Use mock data for demo
      setWeatherData(mockData);
      setCities(Object.keys(mockData));
    }
  }, []);

  // Fetch weather data when cities change
  useEffect(() => {
    const fetchData = async () => {
      if (cities.length === 0 || weatherService.API_KEY === "YOUR_API_KEY")
        return;

      setLoading(true);
      setError(null);

      try {
        const newWeatherData = { ...weatherData };

        for (const city of cities) {
          if (!newWeatherData[city]) {
            try {
              const data = await weatherService.fetchWeather(city);
              newWeatherData[city] = data;
            } catch (cityError) {
              console.error(`Error fetching data for ${city}:`, cityError);
            }
          }
        }

        setWeatherData(newWeatherData);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cities]);

  // Add a new city
  const addCity = (city) => {
    if (!city) return;
    if (cities.includes(city)) return;

    setCities([...cities, city]);
  };

  // Remove a city
  const removeCity = (city) => {
    setCities(cities.filter((c) => c !== city));

    setWeatherData((prev) => {
      const newData = { ...prev };
      delete newData[city];
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-100 text-center mb-8">
          Weather App
        </h1>

        <SearchBar onSearch={addCity} />

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            <p className="mt-2 text-white">Loading weather data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map(
              (city) =>
                weatherData[city] && (
                  <WeatherCard
                    key={city}
                    data={weatherData[city]}
                    onRemove={() => removeCity(city)}
                  />
                )
            )}
          </div>
        )}

        {cities.length === 0 && !loading && (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-white">Add a city to see weather information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
