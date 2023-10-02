async function geoCode() {
  const city: string = "carlsbad";
  const state: string = "ca";
  const country: string = "us";
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${process.env.API_KEY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch geo data");
  }
  const data = await res.json();
  return data;
}
const location = await geoCode();

async function getWeather() {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location[0].lat}&lon=${location[0].lon}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=${process.env.API_KEY}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  const weather = await getWeather();
  console.log(weather);
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
              <span>Sat</span>
              <span className="day-temp">23°C</span>
            </li>
            <li>
              <i className="bx bx-sun"></i>
              <span>Sun</span>
              <span className="day-temp">28°C</span>
            </li>
            <li>
              <i className="bx bx-cloud-rain"></i>
              <span>Mon</span>
              <span className="day-temp">02°C</span>
            </li>
            <li>
              <i className="bx bx-cloud-drizzle"></i>
              <span>Tue</span>
              <span className="day-temp">14°C</span>
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
