export default function Forecast({ forecast }) {
  const daily = [];
  let pastDay = ""
  for(let i = 0; i < forecast.length; i++){
    const day = forecast[i]
    const currentDay = new Date(day.dt * 1000).toDateString();
    if(currentDay !== pastDay){
      daily.push(day)
      pastDay=currentDay
    }
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex space-x-4 px-2">
        {daily.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <div
              key={index}
              className="flex-shrink-0 w-32 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/10 hover:bg-white/20 transition-all duration-300 transform"
            >
              <p className="font-medium text-white/90 mb-2 text-sm uppercase tracking-wide">{day}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto w-12 h-12 mb-2 drop-shadow-md"
              />

              <p className="text-white font-bold text-xl">
                {Math.round(item.main.temp)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
