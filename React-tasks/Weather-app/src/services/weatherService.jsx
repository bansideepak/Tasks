import axios from "axios";

const weatherService = {
  API_KEY: "a56443afdc99edf1608a6b320f188825",
  BASE_URL: "https://api.openweathermap.org/data/2.5",

  fetchWeather: async (city) => {
    try {
      const response = await axios.get(`${weatherService.BASE_URL}/weather`, {
        params: {
          q: city,
          units: "metric",
          appid: weatherService.API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  },
};

export default weatherService;
