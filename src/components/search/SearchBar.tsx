// src/components/search/SearchBar.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

type SearchBarProps = {
  onSearch: (location: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto flex">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for any city..."
          className="block w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-l-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-lg transition"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
