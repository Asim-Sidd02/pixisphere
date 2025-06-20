import React from "react";
import { X } from "lucide-react";

interface FilterProps {
  selectedStyles: string[];
  selectedCity: string;
  selectedRating: number;
  minPrice: number;
  maxPrice: number;
  onStyleChange: (style: string) => void;
  onCityChange: (city: string) => void;
  onRatingChange: (rating: number) => void;
  onPriceChange: (min: number, max: number) => void;
  availableCities: string[];
  availableStyles: string[];
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterProps> = ({
  selectedStyles,
  selectedCity,
  selectedRating,
  minPrice,
  maxPrice,
  onStyleChange,
  onCityChange,
  onRatingChange,
  onPriceChange,
  availableCities,
  availableStyles,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 md:static md:translate-x-0 top-0 left-0 h-full md:h-auto w-80 md:w-64 p-5 bg-gray-900 text-gray-200 shadow-lg rounded-none md:rounded-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close icon on mobile */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400 hover:text-white transition" />
          </button>
        </div>

        {/* Desktop Heading */}
        <h2 className="text-lg font-semibold mb-4 hidden md:block">Filters</h2>

        {/* Price Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Price Range (₹)</label>
          <div className="flex gap-2 mt-1">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Min"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Rating</label>
          {[4, 3, 2].map((r) => (
            <div key={r} className="flex items-center mt-1">
              <input
                type="radio"
                name="rating"
                value={r}
                checked={selectedRating === r}
                onChange={() => onRatingChange(r)}
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              <label>{r} stars & above</label>
            </div>
          ))}
        </div>

        {/* Styles */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Styles</label>
          {availableStyles.map((style) => (
            <div key={style} className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => onStyleChange(style)}
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              <label>{style}</label>
            </div>
          ))}
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-medium">City</label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
