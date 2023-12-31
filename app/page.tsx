import geoCode from "@/lib/geoCode";
import getWeather from "@/lib/getWeather";

const location = await geoCode();

function unixToDay(unix: number) {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const unixInMilliseconds: number = unix * 1000;
  const date = new Date(unixInMilliseconds);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

export default async function Home() {
  const weather = await getWeather(location);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <div className="left-info">
          <div className="pic-gradient"></div>
          <div className="today-info">
            <h2>Today</h2>
            <span>{new Date().toLocaleDateString()}</span>
            <div>
              <i className="bx bx-current-location"></i>
              <span>{location[0].name}</span>
            </div>
          </div>
          <div className="today-weather">
            <i className="bx bx-sun"></i>
            <h1 className="weather-temp">
              {Math.round(weather.current.temp)}°F
            </h1>
            <h3>{weather.current.weather[0].main}</h3>
          </div>
        </div>

        <div className="right-info">
          <div className="day-info">
            <div>
              <span className="title">HUMIDITY</span>
              <span className="value">{weather.current.humidity} %</span>
            </div>
            <div>
              <span className="title">WIND SPEED</span>
              <span className="value">
                {Math.round(weather.current.wind_speed)} mph
              </span>
            </div>
          </div>

          <ul className="days-list">
            <li>
              <i className="bx bx-cloud"></i>
              <span>{unixToDay(weather.daily[1].dt)}</span>
              <span className="day-temp">
                {Math.round(weather.daily[1].temp.min)} -{" "}
                {Math.round(weather.daily[1].temp.max)}°F
              </span>
            </li>
            <li>
              <i className="bx bx-sun"></i>
              <span>{unixToDay(weather.daily[2].dt)}</span>
              <span className="day-temp">
                {Math.round(weather.daily[2].temp.min)} -{" "}
                {Math.round(weather.daily[2].temp.max)}°F
              </span>
            </li>
            <li>
              <i className="bx bx-cloud-rain"></i>
              <span>{unixToDay(weather.daily[3].dt)}</span>
              <span className="day-temp">
                {Math.round(weather.daily[3].temp.min)} -{" "}
                {Math.round(weather.daily[3].temp.max)}°F
              </span>
            </li>
            <li>
              <i className="bx bx-cloud-drizzle"></i>
              <span>{unixToDay(weather.daily[4].dt)}</span>
              <span className="day-temp">
                {Math.round(weather.daily[4].temp.min)} -{" "}
                {Math.round(weather.daily[4].temp.max)}°F
              </span>
            </li>
          </ul>

          <div className="btn-container">
            <button className="loc-button">Search Location</button>
          </div>
        </div>
      </div>
    </main>
  );
}
