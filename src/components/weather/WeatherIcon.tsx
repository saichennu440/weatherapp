import React from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, CloudLightning, CloudFog, Sunset } from 'lucide-react';

type WeatherIconProps = {
  code: number;
  size?: number;
  isDay?: boolean;
  className?: string;
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  code, 
  size = 24, 
  isDay = true, 
  className = "" 
}) => {
  // Weather condition codes based on OpenWeatherMap API
  // https://openweathermap.org/weather-conditions
  
  // Thunderstorm
  if (code >= 200 && code < 300) {
    return <CloudLightning size={size} className={`text-yellow-300 ${className}`} />;
  }
  
  // Drizzle
  if (code >= 300 && code < 400) {
    return <CloudDrizzle size={size} className={`text-blue-300 ${className}`} />;
  }
  
  // Rain
  if (code >= 500 && code < 600) {
    return <CloudRain size={size} className={`text-blue-400 ${className}`} />;
  }
  
  // Snow
  if (code >= 600 && code < 700) {
    return <CloudSnow size={size} className={`text-slate-200 ${className}`} />;
  }
  
  // Atmosphere (fog, mist, etc.)
  if (code >= 700 && code < 800) {
    return <CloudFog size={size} className={`text-gray-400 ${className}`} />;
  }
  
  // Clear
  if (code === 800) {
    return isDay 
      ? <Sun size={size} className={`text-yellow-400 ${className}`} /> 
      : <Sunset size={size} className={`text-orange-300 ${className}`} />;
  }
  
  // Clouds
  if (code > 800 && code < 900) {
    return <Cloud size={size} className={`text-gray-300 ${className}`} />;
  }
  
  // Default
  return <Cloud size={size} className={className} />;
};

export default WeatherIcon;