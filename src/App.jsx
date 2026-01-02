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

  function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Forecast not found");
        return res.json();
      })
      .then((data) => setForecast(data.list))
      .catch((err) => {
        console.error(err);
        setForecast(null);
      });
  }

  function fetchData(cityName) {
    setLoading(true);
    setForecast(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        console.log(data);
        fetchForecast(data.name);
      })
      .catch((err) => {
        console.error(err);
        setWeather(null);
        setForecast(null);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLoading(true);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          fetchForecast(data.name);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex justify-center items-center bg-[url('src/assets/pexels-pixabay-53594.jpg')] bg-cover bg-center">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-4xl flex flex-col justify-center items-center 
                bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl 
                border border-white/20 z-10 m-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <h1 className="text-5xl font-bold text-white mb-8 tracking-wide drop-shadow-lg">Weather App</h1>

        {/* Search */}
        <div className="flex justify-center w-full mb-8">
          <SearchBar setCity={fetchData} setForecast={setForecast} />
        </div>

        {/* Current Weather */}
        <div className="w-full bg-white/10 rounded-3xl shadow-lg border border-white/10 p-6 text-center mb-8 transform transition-all hover:bg-white/15">
          {loading ? (
            <Loading />
          ) : weather ? (
            <CurrentWeather weather={weather} />
          ) : (
            <p className="text-white text-xl font-light">Search for a city to get started.</p>
          )}
        </div>

        {/* Forecast */}
        <div className="w-full">
          {loading && !forecast ? (
            <Loading />
          ) : (
            forecast && <Forecast forecast={forecast} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
