import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full mb-0"> {/* Remove bottom margin */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name, location, or tag..."
        className="w-full p-3 border border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-200 transition duration-200 ease-in-out hover:bg-gray-700"
      />
    </div>
  );
};


export default SearchBar;
