import axios from 'axios';

// This would normally be accessed from environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// If API key is not available, use mock data
const useMockData = !API_KEY || API_KEY === 'YOUR_API_KEY';

// Function to fetch current weather data
export const fetchCurrentWeather = async (location: string) => {
  if (useMockData) {
    // Return mock data for demonstration
    console.warn('Using mock data because API key is not configured');
    return mockCurrentWeather;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Function to fetch forecast data
export const fetchForecast = async (location: string) => {
  if (useMockData) {
    console.warn('Using mock data because API key is not configured');
    return mockForecastData;
  }

  if (!location || location.trim() === '') {
    throw new Error('Location is required');
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: location.trim(),
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};



// Function to fetch historical data
export const fetchHistoricalData = async (location: string, start: number, end: number) => {
  if (useMockData) {
    // Return mock data for demonstration
    console.warn('Using mock data because API key is not configured');
    return mockHistoricalData;
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/history/city`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric',
        start,
        end
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

// Mock data for demonstration purposes
const mockCurrentWeather = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  base: 'stations',
  main: {
    temp: 15.2,
    feels_like: 14.8,
    temp_min: 13.9,
    temp_max: 16.7,
    pressure: 1012,
    humidity: 76
  },
  visibility: 10000,
  wind: { speed: 3.6, deg: 220 },
  clouds: { all: 0 },
  dt: 1635760000,
  sys: {
    type: 2,
    id: 2019646,
    country: 'GB',
    sunrise: 1635739200,
    sunset: 1635775800
  },
  timezone: 0,
  id: 2643743,
  name: 'London',
  cod: 200
};

const mockForecastData = {
  city: {
    id: 2643743,
    name: 'London',
    coord: { lon: -0.1257, lat: 51.5085 },
    country: 'GB',
    population: 1000000,
    timezone: 0
  },
  cod: '200',
  message: 0.0355,
  cnt: 7,
  list: Array(7).fill(null).map((_, index) => ({
    dt: Math.floor(Date.now() / 1000) + (index * 86400),
    sunrise: Math.floor(Date.now() / 1000) - 36000,
    sunset: Math.floor(Date.now() / 1000) + 36000,
    temp: {
      day: 15 + Math.random() * 5,
      min: 10 + Math.random() * 5,
      max: 18 + Math.random() * 7,
      night: 12 + Math.random() * 3,
      eve: 14 + Math.random() * 4,
      morn: 11 + Math.random() * 3
    },
    feels_like: {
      day: 14 + Math.random() * 5,
      night: 11 + Math.random() * 3,
      eve: 13 + Math.random() * 4,
      morn: 10 + Math.random() * 3
    },
    pressure: 1012 + Math.random() * 10,
    humidity: 65 + Math.floor(Math.random() * 20),
    weather: [{
      id: [800, 801, 802, 500][Math.floor(Math.random() * 4)],
      main: ['Clear', 'Clouds', 'Clouds', 'Rain'][Math.floor(Math.random() * 4)],
      description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)],
      icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)]
    }],
    speed: 2 + Math.random() * 5,
    deg: Math.floor(Math.random() * 360),
    clouds: Math.floor(Math.random() * 100),
    pop: Math.random()
  })),
  daily: Array(7).fill(null).map((_, index) => ({
    dt: Math.floor(Date.now() / 1000) + (index * 86400),
    temp: {
      min: 10 + Math.random() * 5,
      max: 18 + Math.random() * 7
    },
    weather: [{
      id: [800, 801, 802, 500][Math.floor(Math.random() * 4)],
      main: ['Clear', 'Clouds', 'Clouds', 'Rain'][Math.floor(Math.random() * 4)],
      description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
    }],
    humidity: 65 + Math.floor(Math.random() * 20),
    wind_speed: 2 + Math.random() * 5
  }))
};

const mockHistoricalData = {
  city: {
    id: 2643743,
    name: 'London',
    coord: { lon: -0.1257, lat: 51.5085 },
    country: 'GB'
  },
  cod: '200',
  message: 'Success',
  list: Array(30).fill(null).map((_, index) => ({
    dt: Math.floor(Date.now() / 1000) - (index * 86400),
    main: {
      temp: 15 + Math.sin(index / 3) * 5,
      feels_like: 14 + Math.sin(index / 3) * 5,
      pressure: 1012 + Math.sin(index / 5) * 10,
      humidity: 65 + Math.sin(index / 4) * 15
    },
    weather: [{
      id: [800, 801, 802, 500][Math.floor(Math.random() * 4)],
      main: ['Clear', 'Clouds', 'Clouds', 'Rain'][Math.floor(Math.random() * 4)],
      description: ['clear sky', 'few clouds', 'scattered clouds', 'light rain'][Math.floor(Math.random() * 4)]
    }],
    wind: {
      speed: 2 + Math.random() * 5,
      deg: Math.floor(Math.random() * 360)
    },
    clouds: {
      all: Math.floor(Math.random() * 100)
    },
    rain: index % 3 === 0 ? { '3h': Math.random() * 5 } : undefined
  }))
};