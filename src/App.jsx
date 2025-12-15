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
    <div className="relative h-screen w-full overflow-hidden flex justify-center items-center bg-[url('src/assets/pexels-pixabay-53594.jpg')] bg-cover bg-center "> 
      <div className="w-full max-w-4xl flex flex-col justify-center items-center 
                bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-2xl 
                border border-white/30">
        <h1 className="text-4xl font-bold text-black mb-6">Weather App</h1>

        {/* Search */}
        <div className="flex justify-center w-full mb-6">
          <SearchBar setCity={fetchData} setForecast={setForecast} />
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
          ) : (
            forecast && <Forecast forecast={forecast} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
