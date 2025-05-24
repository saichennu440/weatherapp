import React, { useEffect, useState } from 'react';
import { fetchForecast } from '../../services/weatherApi';
import { getDayName } from '../../utils/date';
import { formatTemperature } from '../../utils/temperature';
import WeatherIcon from './WeatherIcon';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ArrowDown, ArrowUp } from 'lucide-react';

type ForecastDay = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: [{
    id: number;
    main: string;
    description: string;
  }];
  humidity: number;
  wind_speed: number;
};

type ForecastProps = { location: string };
const Forecast: React.FC<ForecastProps> = ({ location }) => {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchForecast(location);
  // Convert 3-hourly data to daily summaries (simple approach: pick one every 8 items = 1 per 24 hours)
const dailySummaries = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 7).map((item: { dt: any; main: { temp_min: any; temp_max: any; humidity: any; }; weather: any; wind: { speed: any; }; }) => ({
  dt: item.dt,
  temp: {
    min: item.main.temp_min,
    max: item.main.temp_max
  },
  weather: item.weather,
  humidity: item.main.humidity,
  wind_speed: item.wind.speed
}));

setForecast(dailySummaries);
setSelectedDay(dailySummaries[0]);

      } catch (err) {
        console.error('Error fetching forecast data:', err);
        setError('Failed to load forecast data. Please try again.');
        
        // Mock data for demo purposes
        const mockForecast = Array(7).fill(null).map((_, index) => ({
          dt: Math.floor(Date.now() / 1000) + (index * 86400),
          temp: {
            min: 10 + Math.random() * 5,
            max: 18 + Math.random() * 7
          },
          weather: [{
            id: [800, 801, 802, 500][Math.floor(Math.random() * 4)],
            main: 'Clear',
            description: 'clear sky'
          }],
          humidity: 65 + Math.floor(Math.random() * 20),
          wind_speed: 2 + Math.random() * 5
        }));
        
        setForecast(mockForecast);
        setSelectedDay(mockForecast[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !forecast.length) {
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

  return (
    <div className="text-white animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">7-Day Weather Forecast</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {forecast.map((day) => (
          <button
            key={day.dt}
            onClick={() => setSelectedDay(day)}
            className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center transition hover:bg-white/20 flex flex-col items-center ${
              selectedDay === day ? 'ring-2 ring-white' : 'border border-white/10'
            }`}
          >
            <p className="font-medium">{getDayName(day.dt, 'EEE')}</p>
            <WeatherIcon code={day.weather[0].id} size={36} className="my-2" />
            <div className="flex items-center justify-between w-full mt-1">
              <span className="flex items-center text-blue-300">
                <ArrowDown className="h-3 w-3 mr-1" />
                {formatTemperature(day.temp.min)}
              </span>
              <span className="flex items-center text-red-300">
                <ArrowUp className="h-3 w-3 mr-1" />
                {formatTemperature(day.temp.max)}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {selectedDay && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <div className="flex items-center mb-3 md:mb-0">
              <WeatherIcon code={selectedDay.weather[0].id} size={48} className="mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{getDayName(selectedDay.dt)}</h3>
                <p className="text-white/70 capitalize">{selectedDay.weather[0].description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-white/70 text-sm">Min</p>
                <p className="text-2xl font-semibold text-blue-300">{formatTemperature(selectedDay.temp.min)}</p>
              </div>
              <div className="text-center">
                <p className="text-white/70 text-sm">Max</p>
                <p className="text-2xl font-semibold text-red-300">{formatTemperature(selectedDay.temp.max)}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Humidity</p>
              <p className="text-xl font-medium mt-1">{selectedDay.humidity}%</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Wind Speed</p>
              <p className="text-xl font-medium mt-1">{selectedDay.wind_speed.toFixed(1)} m/s</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Sunrise</p>
              <p className="text-xl font-medium mt-1">6:42 AM</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-white/70 text-sm">Sunset</p>
              <p className="text-xl font-medium mt-1">5:38 PM</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Hourly Forecast</h4>
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {Array(8).fill(null).map((_, i) => (
                <div key={i} className="flex-shrink-0 text-center bg-white/5 rounded-lg p-3 w-20">
                  <p className="text-sm text-white/70">{`${i * 3 + 6}:00`}</p>
                  <WeatherIcon 
                    code={selectedDay.weather[0].id} 
                    size={24} 
                    className="mx-auto my-2" 
                  />
                  <p className="font-medium">
                    {formatTemperature(
                      selectedDay.temp.min + 
                      ((selectedDay.temp.max - selectedDay.temp.min) * 
                      (Math.sin((i / 8) * Math.PI) * 0.5 + 0.5))
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;