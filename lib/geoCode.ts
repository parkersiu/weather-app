export default async function geoCode() {
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
