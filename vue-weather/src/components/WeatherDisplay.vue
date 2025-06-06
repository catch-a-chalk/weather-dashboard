<template>
  <div class="weather-display" v-if="weatherData?.current">
    <h2>{{ weatherData.location.name }}, {{ weatherData.location.country }} </h2>
    <div class="weather-main">
      <img
        :src="weatherData.current.condition.icon"
        :alt="weatherData.current.condition.text"
        class="weather-icon"
      >
      <p class="temperature"> {{ Math.round(weatherData.current.temp_c) }}°C</p>
    </div>
    <p class="weather-description">
      {{ capitalizeFirstLetter(weatherData.current.condition.text) }}
    </p>
    <div class="weather-details">
      <p>Местное время: {{ formatLocalTime(weatherData.location.localtime) }}</p>
      <p>Ощущается как: {{ Math.round(weatherData.current.feelslike_c) }}°C</p>
      <p>Влажность: {{ weatherData.current.humidity }}%</p>
      <p>Ветер: {{ weatherData.current.wind_kph }} км/ч</p>
    </div>
  </div>
  <Loader v-else-if="isLoading" :isLoading="true"/>
  <ErrorDisplay
    v-else-if="error"
    :error="error"
    @retry="fetchWeather"
  />
  <div v-else>Выберите город из списка</div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore';
import { storeToRefs } from 'pinia';

const weatherStore = useWeatherStore();
const { weatherData, isLoading, error } = storeToRefs(weatherStore);
const { fetchWeather } = weatherStore;

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatLocalTime = (timeString: string): string => {
  try {
    const time = new Date(timeString);
    return time.toLocaleDateString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return timeString;
  }
};
</script>

<style lang="scss" scoped>

.weather-display {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: $whitesmoke;
  max-width: 500px;
  margin: 0 auto;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.temperature {
  font-family: 'Rubik', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.weather-details {
  margin-top: 15px;
  text-align: left;
}

.error {
  color: $red;
  margin-top: 20px;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}
</style>