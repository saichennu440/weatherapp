import React, { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '../../services/weatherApi';
import LoadingSpinner from '../ui/LoadingSpinner';
import { formatTemperature } from '../../utils/temperature';
import WeatherIcon from './WeatherIcon';

type CurrentWeatherProps = {
  location: string;
  onConditionChange: (condition: string, isDay: boolean) => void;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  location,
  onConditionChange,
}) => {
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if there's a non-empty location
    if (!location.trim()) {
      setWeather(null);
      setError('Please enter a location.');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCurrentWeather(location);
        setWeather(data);

        // Notify parent so it can update background
        const condition = data.weather[0].main.toLowerCase();
        const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
        onConditionChange(condition, isDay);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(`Could not load weather for "${location}"`);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, onConditionChange]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-white">
        <p className="text-xl">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="text-center text-white animate-fadeIn">
      <h1 className="text-4xl font-bold">{weather.name}</h1>
      <WeatherIcon code={weather.weather[0].id} size={96} className="mx-auto my-4" />
      <p className="text-6xl font-extrabold">
        {formatTemperature(weather.main.temp)}
      </p>
      <p className="capitalize">{weather.weather[0].description}</p>

      <div className="flex justify-center space-x-6 mt-6">
        <div>
          <p className="text-sm">Min Temp</p>
          <p className="font-medium">{formatTemperature(weather.main.temp_min)}</p>
        </div>
        <div>
          <p className="text-sm">Max Temp</p>
          <p className="font-medium">{formatTemperature(weather.main.temp_max)}</p>
        </div>
        <div>
          <p className="text-sm">Humidity</p>
          <p className="font-medium">{weather.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
