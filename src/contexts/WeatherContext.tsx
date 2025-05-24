import React, { createContext, useState, useContext, ReactNode } from 'react';

type WeatherContextType = {
  location: string;
  setLocation: (location: string) => void;
  unit: 'celsius' | 'fahrenheit';
  toggleUnit: () => void;
  favoriteLocations: string[];
  addFavorite: (location: string) => void;
  removeFavorite: (location: string) => void;
};

const defaultContext: WeatherContextType = {
  location: 'London',
  setLocation: () => {},
  unit: 'celsius',
  toggleUnit: () => {},
  favoriteLocations: [],
  addFavorite: () => {},
  removeFavorite: () => {},
};

const WeatherContext = createContext<WeatherContextType>(defaultContext);

export const useWeather = () => useContext(WeatherContext);

type WeatherProviderProps = {
  children: ReactNode;
};

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<string>('London');
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [favoriteLocations, setFavoriteLocations] = useState<string[]>([]);

  const toggleUnit = () => {
    setUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const addFavorite = (location: string) => {
    if (!favoriteLocations.includes(location)) {
      setFavoriteLocations([...favoriteLocations, location]);
    }
  };

  const removeFavorite = (location: string) => {
    setFavoriteLocations(favoriteLocations.filter(loc => loc !== location));
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        unit,
        toggleUnit,
        favoriteLocations,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};