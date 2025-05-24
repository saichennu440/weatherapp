import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 text-white/70 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/10">
        <p>
          Data provided by <a href="#" className="underline hover:text-white transition">OpenWeatherMap</a>
        </p>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition flex items-center">
            <Github className="h-4 w-4 mr-1" />
            <span>Source</span>
          </a>
          <span>
            Made with <Heart className="h-4 w-4 inline text-red-500" /> in 2025
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;