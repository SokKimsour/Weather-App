import { useState } from "react";

export default function SearchBar({ setCity,fetchWeather }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    setCity(input.trim()); 
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city..."
        className="flex-1 p-2 rounded-l-md border bg-white border-gray-300"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </form>
  );
}
