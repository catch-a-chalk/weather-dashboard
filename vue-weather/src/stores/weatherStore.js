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
        // Вставить сюда API-ключ из https://www.weatherapi.com/
        // или из https://openweathermap.org/
        const API_KEY = '';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}&lang=ru`
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