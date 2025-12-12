import { useState } from "react";
import AsyncSelect from "react-select/async";

const API_KEY = "b84e215a85abb5eea6c6f6b932ce58e8";

export default function SearchBar({ setCity }) {
  const [inputValue, setInputValue] = useState("");
  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();

      return data.map((item) => ({
        value: { lat: item.lat, lon: item.lon },
        label: `${item.name}, ${item.country}`,
      }));
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    setCity(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <div className="flex-1">
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onChange={(selected) => {
            if (selected) setCity(selected.label);
          }}
          onInputChange={(val) => setInputValue(val)}
          placeholder="Search for a city..."
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 ml-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}
