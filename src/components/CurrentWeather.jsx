export default function CurrentWeather({ weather }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="flex justify-between items-center w-full p-4 text-black">
      {/* Left */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 mb-4 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          {weather.name}, {weather.sys.country}
        </h2>
        <p className="text-xl font-medium opacity-80 text-white">{day}</p>
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          className="w-36 md:h-36 drop-shadow-2xl" 
        />
      </div>

      {/* Right */}
      <div className="flex-1 text-center space-y-6 text-white">
        <p className="text-4xl md:text-5xl font-extrabold mb-2">
          {Math.round(weather.main.temp)}°C
        </p>      
        <p className="capitalize text-xl font-semibold">{weather.weather[0].description}</p>
        <p className="text-lg font-light opacity-90">Feels like: {Math.round(weather.main.feels_like)}°C</p>
        <p className="text-lg font-light opacity-90">Humidity: {weather.main.humidity}%</p>
        <p className="text-lg font-light opacity-90">Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  )
}
