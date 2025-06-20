"use client";

import { useEffect, useMemo, useState } from "react";
import PhotographerCard from "./components/PhotographerCard";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import { Filter } from "lucide-react";
import debounce from "lodash.debounce";

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function HomePage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // Number of visible photographers
  const [showFilter, setShowFilter] = useState(false); // State to control filter sidebar visibility

  const availableCities = useMemo(
    () => [...new Set(photographers.map((p) => p.location))],
    [photographers]
  );

  const availableStyles = useMemo(
    () => [...new Set(photographers.flatMap((p) => p.styles))],
    [photographers]
  );

  // Fetch photographers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/photographers');
        const data = await res.json();
        setPhotographers(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch photographers', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Debounce search input
  const debounced = useMemo(() => debounce((val) => setDebouncedSearch(val), 300), []);
  useEffect(() => {
    debounced(searchQuery);
  }, [searchQuery]);

  // Apply filters
  useEffect(() => {
    let results = photographers.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.location.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));

      const matchesStyles =
        selectedStyles.length === 0 || selectedStyles.every((style) => p.styles.includes(style));

      const matchesCity = selectedCity === '' || p.location === selectedCity;
      const matchesRating = selectedRating === 0 || p.rating >= selectedRating;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

      return matchesSearch && matchesStyles && matchesCity && matchesRating && matchesPrice;
    });

    if (sortBy === 'priceLowHigh') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'ratingHighLow') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'recent') {
      results.sort((a, b) => b.id - a.id); // simulate recent using ID
    }

    setFilteredPhotographers(results);
  }, [photographers, debouncedSearch, selectedStyles, selectedCity, selectedRating, minPrice, maxPrice, sortBy]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Load 5 more photographers
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          📸 Explore Photographers
        </h1>

        {/* Mobile Filter Button */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <SearchBar searchTerm={searchQuery} onSearchChange={setSearchQuery} />
          <SortDropdown
            selectedSort={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Sidebar (collapsible on mobile) */}
          <FilterSidebar
            selectedStyles={selectedStyles}
            selectedCity={selectedCity}
            selectedRating={selectedRating}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onStyleChange={(style) => {
              if (selectedStyles.includes(style)) {
                setSelectedStyles(selectedStyles.filter((s) => s !== style));
              } else {
                setSelectedStyles([...selectedStyles, style]);
              }
            }}
            onCityChange={setSelectedCity}
            onRatingChange={setSelectedRating}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            availableCities={availableCities}
            availableStyles={availableStyles}
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
          />

          {/* Photographer Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 animate-pulse p-4 rounded-2xl h-80 shadow-md"
                />
              ))
            ) : filteredPhotographers.length > 0 ? (
              filteredPhotographers.slice(0, visibleCount).map((photographer) => (
                <PhotographerCard
                  key={photographer.id}
                  photographer={photographer}
                  onViewProfile={(id) => window.location.href = `/photographer/${id}`}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-400">
                No photographers match your filters.
              </p>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {filteredPhotographers.length > visibleCount && (
          <div className="mt-6 text-center">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
