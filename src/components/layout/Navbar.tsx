import React from 'react';
import { Cloud } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <Cloud className="h-8 w-8 text-white" />
        <h1 className="text-2xl font-bold text-white tracking-tight">WeatherApp</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-white/80 hover:text-white transition">
          °C / °F
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition backdrop-blur-sm">
          My Locations
        </button>
      </div>
    </nav>
  );
};

export default Navbar;