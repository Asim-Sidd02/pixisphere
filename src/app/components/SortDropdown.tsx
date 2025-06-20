import React from "react";

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  selectedSort,
  onSortChange,
}) => {
  return (
    <div className="w-full mb-0"> {/* Remove bottom margin */}
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-200 text-sm font-medium transition duration-200 ease-in-out hover:bg-gray-700"
      >
        <option value="" className="text-gray-500">
          Sort by
        </option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="ratingHighLow">Rating: High to Low</option>
        <option value="recentlyAdded">Recently Added</option>
      </select>
    </div>
  );
};


export default SortDropdown;
