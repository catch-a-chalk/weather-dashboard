import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
import type { WeatherApiResponse } from '../types/weather';

interface WeatherState {
  cities: string[];
  selectedCity: string | null;
  weatherData: WeatherApiResponse | null;
  isLoading: Boolean;
  error: string | null;
}

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherState => ({
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
    async fetchWeather(cityName: string): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
        if (!API_KEY) throw new Error('API key is missing');

        const response = await axios.get<WeatherApiResponse>(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&lang=ru`
        );

        this.weatherData = response.data;
        this.selectedCity = cityName;
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          this.error = err.response?.data?.error?.message ||
          'Ошибка загрузки данных. Попробуйте другой город или повторите позже.';
        } else if (err instanceof Error) {
          this.error = err.message;
        } else {
          this.error = 'Неизвестная ошибка';
        }

        console.error('Weather fetch error:', err);
      } finally {
        this.isLoading = false;
      }
    }
  }
});