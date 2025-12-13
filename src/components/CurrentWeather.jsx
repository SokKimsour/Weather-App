export default function CurrentWeather({ weather }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="flex justify-between items-center w-full p-4 text-black">
      {/* Left */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 mb-4 md:mb-0">

        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          className="w-[70%] drop-shadow-2xl" 
        />
      </div>

      {/* Right */}
      <div className="flex-1 text-center space-y-6 text-white">
        <p className="text-left text-xl font-medium opacity-80 text-white">{day}</p>
         <h2 className="text-left text-5xl font-extrabold text-white">
          {weather.name}
        </h2>
        <p className="text-left text-3xl font-extrabold mb-2">
          Temperature: {Math.round(weather.main.temp)}°C
        </p>      
        <p className="text-left capitalize text-xl font-semibold">{weather.weather[0].description}</p>
      </div>
    </div>
  )
}
