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
    <div className="bg-gray-200 rounded-2xl w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex space-x-4 px-4">
        {daily.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString("en-US", {
            weekday: "long",
          });

          return (
            <div
              key={index}
              className="flex-shrink-0 w-36 bg-blue-300 rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-200"
            >
              <p className="font-semibold text-white mb-2">{day}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto w-20 h-20 mb-2"
              />

              <p className="text-white font-bold text-lg">
                {Math.round(item.main.temp)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
