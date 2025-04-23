import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cities: [
      'Москва', 'Санкт-Петербург', 'Казань',
      'Новосибирск', 'Екатеринбург', 'Нижний Новгород',
      'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'
    ],
    selectedCity: null,
    weatherData: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchWeather(cityName) {
      this.isLoading = true;
      this.error = null;
      try {
        const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&lang=ru`
        );

        this.weatherData = response.data;
        this.selectedCity = cityName;
      } catch (err) {
        this.error = 'Ошибка загрузки данных. Попробуйте другой город или повторите позже.';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
})