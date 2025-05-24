import React from 'react';
import { MapPin, Calendar, BarChart2, Cloud } from 'lucide-react';
import { cn } from '../../utils/cn';

type TabItem = {
  id: 'current' | 'forecast' | 'historical' | 'map';
  label: string;
  icon: React.ReactNode;
};

type TabNavigationProps = {
  activeTab: string;
  onTabChange: (tab: any) => void;
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    { id: 'current', label: 'Current', icon: <Cloud className="w-5 h-5" /> },
    { id: 'forecast', label: 'Forecast', icon: <Calendar className="w-5 h-5" /> },
    { id: 'historical', label: 'Historical', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'map', label: 'Map', icon: <MapPin className="w-5 h-5" /> },
  ];

  return (
    <div className="flex border-b border-white/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center px-6 py-4 text-sm font-medium transition-all duration-200 focus:outline-none",
            activeTab === tab.id
              ? "text-white border-b-2 border-white -mb-px"
              : "text-white/60 hover:text-white hover:bg-white/10"
          )}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;