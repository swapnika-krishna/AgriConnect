
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const city = req.query.city || "Kuppam";

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "Weather API key is missing"
      });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || "Unable to fetch weather"
      });
    }

    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description,
      icon: data.weather[0].icon
    });

  } catch (error) {
    res.status(500).json({
      message: "Weather service unavailable"
    });
  }
});

module.exports = router;
