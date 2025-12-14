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
    <form onSubmit={handleSubmit} className="relative flex w-[80%]">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for a city..."
        className="w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 ml-2 rounded-md"
      >
        Search
      </button>

      {showDropdown && filteredCities.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md z-10">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
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
