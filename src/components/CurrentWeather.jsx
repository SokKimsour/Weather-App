export default function CurrentWeather({ weather }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 text-white">
      {/* Left - Icon */}
      <div className="flex-1 flex flex-col items-center justify-center mb-6 md:mb-0">
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl animate-float" 
        />
        <p className="capitalize text-xl font-light tracking-wide mt-2">{weather.weather[0].description}</p>
      </div>

      {/* Right - Info */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-2">
        <p className="text-lg font-light opacity-90 tracking-wider">{day}</p>
         <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          {weather.name}
        </h2>
        <div className="text-7xl md:text-8xl font-thin my-4">
          {Math.round(weather.main.temp)}°
        </div>
        <div className="flex gap-6 mt-4 opacity-80">
            <div className="flex flex-col items-center md:items-start">
                <span className="text-xs uppercase tracking-widest">Low</span>
                <span className="text-lg font-semibold">{Math.round(weather.main.temp_min)}°</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
                <span className="text-xs uppercase tracking-widest">High</span>
                <span className="text-lg font-semibold">{Math.round(weather.main.temp_max)}°</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
                <span className="text-xs uppercase tracking-widest">Humidity</span>
                <span className="text-lg font-semibold">{weather.main.humidity}%</span>
            </div>
        </div>
      </div>
    </div>
  )
}
