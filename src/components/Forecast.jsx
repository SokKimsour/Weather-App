export default function Forecast({ forecast }) {
  return (
    <div className="bg-gray-200 rounded-2xl w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex space-x-4 px-4">
        {forecast.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
          const day = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
          return (
            <div
              key={index}
              className="flex-shrink-0 w-36 bg-blue-300 rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-200"
            >
              <p className="font-semibold text-white mb-1">{day}</p>
              <p className="text-white/80 mb-2">{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto w-20 h-20 mb-2"
              />
              <p className="text-white font-bold text-lg">{Math.round(item.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
