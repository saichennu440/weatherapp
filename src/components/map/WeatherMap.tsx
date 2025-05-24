import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Layers, ThermometerSnowflake, Cloud, Droplets, Wind } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { formatTemperature } from '../../utils/temperature';

// Fix for default marker icon in React Leaflet
import L from 'leaflet';
import { cn } from '../../utils/cn';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

type MapLayerType = 'temperature' | 'precipitation' | 'clouds' | 'wind';

const WeatherMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('temperature');
  
  // Demo locations with mock weather data
  const locations = [
    { 
      id: 1,
      name: 'London', 
      country: 'UK',
      position: [51.505, -0.09] as [number, number],
      temp: 12,
      humidity: 65,
      weather: 'Partly Cloudy'
    },
    { 
      id: 2,
      name: 'Paris', 
      country: 'France',
      position: [48.8566, 2.3522] as [number, number],
      temp: 14,
      humidity: 58,
      weather: 'Clear'
    },
    { 
      id: 3,
      name: 'Berlin', 
      country: 'Germany',
      position: [52.5200, 13.4050] as [number, number],
      temp: 9,
      humidity: 72,
      weather: 'Light Rain'
    },
  ];
  
  // OpenWeatherMap tile layer URLs
  const mapLayers = {
    temperature: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={apiKey}',
    precipitation: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={apiKey}',
    clouds: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid={apiKey}',
    wind: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={apiKey}'
  };
  
  // Layer selection buttons with icons and labels
  const layerOptions = [
    { id: 'temperature' as MapLayerType, label: 'Temperature', icon: <ThermometerSnowflake className="h-5 w-5" /> },
    { id: 'precipitation' as MapLayerType, label: 'Precipitation', icon: <Droplets className="h-5 w-5" /> },
    { id: 'clouds' as MapLayerType, label: 'Clouds', icon: <Cloud className="h-5 w-5" /> },
    { id: 'wind' as MapLayerType, label: 'Wind', icon: <Wind className="h-5 w-5" /> },
  ];

  return (
    <div className="text-white animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Interactive Weather Map</h2>
        
        <div className="flex flex-wrap gap-2">
          {layerOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setActiveLayer(option.id)}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg transition-colors",
                activeLayer === option.id 
                  ? "bg-white text-blue-600" 
                  : "bg-white/10 hover:bg-white/20 text-white"
              )}
            >
              <span className="mr-1">{option.icon}</span>
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 h-[500px] overflow-hidden">
        <div className="h-full w-full rounded-lg overflow-hidden">
          <MapContainer 
            center={[51.505, -0.09]} 
            zoom={4} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            {/* Base map layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Weather layer */}
            <TileLayer
              url={mapLayers[activeLayer].replace('{apiKey}', 'your_api_key_placeholder')}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              opacity={0.6}
            />
            
            {/* Location markers */}
            {locations.map(location => (
              <Marker key={location.id} position={location.position}>
                <Popup>
                  <div className="text-gray-800">
                    <h3 className="font-semibold">{location.name}, {location.country}</h3>
                    <p className="mt-1">{formatTemperature(location.temp)} | {location.weather}</p>
                    <p className="text-sm">Humidity: {location.humidity}%</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-white/70 text-sm">Temperature Map</p>
          <p className="text-sm mt-1">Shows temperature variations using color gradients.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-white/70 text-sm">Precipitation Map</p>
          <p className="text-sm mt-1">Displays rainfall and precipitation patterns.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-white/70 text-sm">Cloud Coverage</p>
          <p className="text-sm mt-1">Shows cloud density and coverage across regions.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-white/70 text-sm">Wind Patterns</p>
          <p className="text-sm mt-1">Visualizes wind direction and speed globally.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;