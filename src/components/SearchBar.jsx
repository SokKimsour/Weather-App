import { useState } from "react";
const cities = [
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "Phnom Penh, Cambodia",
  "Sydney, Australia",
  "Berlin, Germany",
  "Moscow, Russia",
];
export default function SearchBar({ setCity }) {
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (city) => {
    setCity(city);
    setInputValue("");
    setFilteredCities([]);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) setCity(inputValue);
    setInputValue("");
    setFilteredCities([]);
    setShowDropdown(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-lg z-50"
    >
      <div className="relative w-full flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search for a city..."
          className="w-full py-3 px-6 pr-12 rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {showDropdown && filteredCities.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className="px-6 py-3 text-white hover:bg-white/20 cursor-pointer transition-colors duration-200 border-b border-white/10 last:border-none"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
