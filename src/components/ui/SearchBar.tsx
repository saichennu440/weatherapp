// src/components/ui/SearchBar.tsx
import React, { useState } from 'react';

type Props = {
  onSearch: (location: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter city name"
        className="flex-grow p-2 rounded-l-lg border border-r-0"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
