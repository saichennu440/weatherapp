// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from './utils/cn';
import { WeatherProvider } from './contexts/WeatherContext';
import Navbar from './components/layout/Navbar';
import TabNavigation from './components/layout/TabNavigation';
import CurrentWeather from './components/weather/CurrentWeather';
import Forecast from './components/weather/Forecast';
import HistoricalData from './components/weather/HistoricalData';
import WeatherMap from './components/map/WeatherMap';
import SearchBar from './components/search/SearchBar';
import Footer from './components/layout/Footer';
import { CloudDrizzle, Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

type Tab = 'current' | 'forecast' | 'historical' | 'map';

function App() {
  // ——————— LIFT LOCATION STATE ———————
  const [location, setLocation] = useState('London');

  // ——————— TABS & BACKGROUND LOGIC ———————
  const [activeTab, setActiveTab] = useState<Tab>('current');
  const [bgClass, setBgClass] = useState('bg-gradient-to-br from-blue-400 to-sky-700');
  const [weatherIcon, setWeatherIcon] = useState<React.ReactNode>(
    <Sun size={120} className="opacity-20" />
  );

  // Update background based on weather condition & day/night
  const updateBackground = useCallback((condition: string, isDay: boolean) => {
    if (condition.includes('clear')) {
      isDay
        ? setBgClass('bg-gradient-to-br from-blue-400 to-sky-700')
        : setBgClass('bg-gradient-to-br from-blue-900 to-indigo-950');
      setWeatherIcon(<Sun size={120} className="opacity-20" />);
    } else if (condition.includes('cloud')) {
      setBgClass('bg-gradient-to-br from-gray-400 to-slate-700');
      setWeatherIcon(<Cloud size={120} className="opacity-20" />);
    } else if (condition.includes('rain')) {
      setBgClass('bg-gradient-to-br from-slate-600 to-slate-800');
      setWeatherIcon(<CloudRain size={120} className="opacity-20" />);
    } else if (condition.includes('snow')) {
      setBgClass('bg-gradient-to-br from-slate-300 to-slate-500');
      setWeatherIcon(<CloudSnow size={120} className="opacity-20" />);
    } else if (condition.includes('drizzle')) {
      setBgClass('bg-gradient-to-br from-slate-500 to-slate-700');
      setWeatherIcon(<CloudDrizzle size={120} className="opacity-20" />);
    }
  }, []);

  // On mount, show a default clear-sky background
  useEffect(() => {
    updateBackground('clear', true);
  }, [updateBackground]);

  // ——————— SEARCH HANDLER ———————
  // Passed into SearchBar; updates `location` state when user searches
  const handleSearch = useCallback((newLocation: string) => {
    setLocation(newLocation);
  }, []);

  // Passed into CurrentWeather so it can notify us of condition changes
  const handleConditionChange = useCallback(
    (condition: string, isDay: boolean) => {
      updateBackground(condition, isDay);
    },
    [updateBackground]
  );

  return (
    <WeatherProvider>
      <div className={cn("min-h-screen transition-colors duration-1000", bgClass)}>
        <div className="fixed top-40 right-10 opacity-10 lg:block hidden">
          {weatherIcon}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Navbar />

          <div className="mt-6 mb-8">
            {/* Now wired up with a real handler */}
            <SearchBar onSearch={handleSearch} />
          </div>

          <main className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden transition-all duration-300">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="p-6">
              {activeTab === 'current' && (
                <CurrentWeather
                  location={location}
                  onConditionChange={handleConditionChange}
                />
              )}
              {activeTab === 'forecast' && <Forecast location={location} />}
              {activeTab === 'historical' && <HistoricalData location={location} />}
              {activeTab === 'map' && <WeatherMap location={location} />}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
