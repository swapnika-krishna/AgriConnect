
import { useState } from "react";
import axios from "axios";
import { CloudSun, Droplets, Wind, ThermometerSun, Search } from "lucide-react";

function Weather() {
  const [city, setCity] = useState("Kuppam");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather?city=${encodeURIComponent(city)}`
      );

      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to get weather information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-heading">
        <span>SMART FARMING</span>
        <h1>Weather Information</h1>
        <p>Check weather conditions to make smarter farming decisions.</p>
      </div>

      <form className="weather-search" onSubmit={getWeather}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit" disabled={loading}>
          <Search size={18} />
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}, {weather.country}</h2>

          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
            />
            <div>
              <h1>{Math.round(weather.temperature)}°C</h1>
              <p>{weather.condition}</p>
            </div>
          </div>

          <p className="feels-like">
            Feels like {Math.round(weather.feelsLike)}°C
          </p>

          <div className="weather-details">
            <div>
              <ThermometerSun />
              <strong>{Math.round(weather.temperature)}°C</strong>
              <span>Temperature</span>
            </div>

            <div>
              <Droplets />
              <strong>{weather.humidity}%</strong>
              <span>Humidity</span>
            </div>

            <div>
              <Wind />
              <strong>{weather.windSpeed} m/s</strong>
              <span>Wind Speed</span>
            </div>

            <div>
              <CloudSun />
              <strong>{Math.round(weather.feelsLike)}°C</strong>
              <span>Feels Like</span>
            </div>
          </div>

          <p className="weather-note">
            Weather information can help farmers plan irrigation
            and field activities. Always check local conditions before making decisions.
          </p>
        </div>
      )}

      {!weather && !loading && !error && (
        <p className="weather-hint">Search for a city to view its weather.</p>
      )}
    </div>
  );
}

export default Weather;
