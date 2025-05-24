import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';

// Mock historical data
const generateHistoricalData = (days: number) => {
  const today = new Date();
  const data = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Generate some random but plausible weather data
    // Base temperature that gradually changes with seasonal patterns
    const baseTemp = 15 + Math.sin((date.getMonth() + date.getDate()/31) * Math.PI/6) * 10;
    
    // Daily randomness
    const tempHigh = baseTemp + Math.random() * 5;
    const tempLow = baseTemp - Math.random() * 7;
    const rainfall = Math.random() > 0.7 ? Math.random() * 20 : 0;
    
    data.push({
      day,
      date: date.toISOString().split('T')[0],
      tempHigh: Math.round(tempHigh * 10) / 10,
      tempLow: Math.round(tempLow * 10) / 10,
      rainfall,
      humidity: 50 + Math.random() * 40,
    });
  }
  
  return data;
};

const timeRanges = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 14 Days', value: 14 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 90 Days', value: 90 },
];

const HistoricalData: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState(() => generateHistoricalData(7));
  
  const handleRangeChange = (range: typeof timeRanges[0]) => {
    setSelectedRange(range);
    setChartData(generateHistoricalData(range.value));
    setDropdownOpen(false);
  };
  
  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-gray-800 border border-white/20">
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${entry.name.includes('temp') ? '°C' : entry.name === 'rainfall' ? ' mm' : '%'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="text-white animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold">Historical Weather Data</h2>
        
        <div className="mt-4 md:mt-0 relative">
          <button 
            className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>{selectedRange.label}</span>
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg z-10 border border-white/20">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleRangeChange(range)}
                  className="block w-full text-left px-4 py-2 hover:bg-white/20 transition first:rounded-t-lg last:rounded-b-lg"
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
        <h3 className="text-xl font-semibold mb-4">Temperature Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
                label={{ 
                  value: 'Temperature (°C)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'rgba(255,255,255,0.7)' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
              <Line 
                type="monotone" 
                dataKey="tempHigh" 
                name="High Temp"
                stroke="#ef4444" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="tempLow" 
                name="Low Temp"
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold mb-4">Precipitation & Humidity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
                label={{ 
                  value: 'Rainfall (mm)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'rgba(255,255,255,0.7)' }
                }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
                label={{ 
                  value: 'Humidity (%)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { fill: 'rgba(255,255,255,0.7)' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
              <Line 
                type="monotone" 
                dataKey="rainfall" 
                name="Rainfall"
                stroke="#0ea5e9" 
                strokeWidth={2}
                yAxisId="left"
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                name="Humidity"
                stroke="#8b5cf6" 
                strokeWidth={2}
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;