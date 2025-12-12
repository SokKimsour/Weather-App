import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Loading from "./components/Loading";
import Forecast from "./components/Forecast";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "b84e215a85abb5eea6c6f6b932ce58e8";
  async function fetchForecast(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Forecast not found");
      const data = await res.json();
      setForecast(data.list);
    } catch (err) {
      console.error(err);
      setForecast(null);
    }
  }
  async function fetchWeather(cityName) {
    setLoading(true);
    setForecast(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      console.log(data)
      await fetchForecast(data.name);
    } catch (err) {
      console.error(err);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLoading(true);
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
          const res = await fetch(url);
          const data = await res.json();
          setWeather(data);
          await fetchForecast(data.name);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 flex flex-col justify-center items-center 50  bg-gray-300 rounded-xl p-6 shadow-2xl border border-white/40">
      <h1 className="text-4xl font-bold text-black mb-6">Weather App</h1>
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl mb-6">
        <SearchBar setCity={fetchWeather} />
      </div>
      {/* Current Weather */}
      <div className="w-full bg-blue-300 rounded-2xl shadow-2xl border border-gray-50 p-6 text-center mb-6">
        {loading ? (
          <Loading />
        ) : weather ? (
          <CurrentWeather weather={weather} />
        ) : (
          <p className="text-white text-lg">Please search for a city.</p>
        )}
      </div>
      {/* Forecast */}
      <div className="w-full">
        {loading && !forecast ? (
          <Loading />
        ) : forecast ? (
          <Forecast forecast={forecast} />
        ) : (
          <p className="text-white/70 text-center">No forecast to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
