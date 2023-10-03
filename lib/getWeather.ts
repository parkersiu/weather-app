export default async function getWeather(
  location: { lat: number; lon: number }[]
) {
  console.log(location);
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${location[0].lat}&lon=${location[0].lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${process.env.API_KEY}`,
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
