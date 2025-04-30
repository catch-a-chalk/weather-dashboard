<template>
  <div class="weather-display" v-if="weatherData?.current">
    <h2>{{ weatherData.location.name }}, {{ weatherData.location.country }} </h2>
    <div class="weather-main">
      <img
        :src="weatherData.current.condition.icon"
        :alt="weatherData.current.condition.text"
      >
      <p class="temperature"> {{ Math.round(weatherData.current.temp_c) }}°C</p>
    </div>
    <p class="weather-description">
      {{ capitalizeFirstLetter(weatherData.current.condition.text) }}
    </p>
    <div class="weather-details">
      <p>Местное время: {{ weatherData.location.localtime }}</p>
      <p>Ощущается как: {{ Math.round(weatherData.current.feelslike_c) }}°C</p>
      <p>Влажность: {{ weatherData.current.humidity }}%</p>
      <p>Ветер: {{ weatherData.current.wind_kph }} км/ч</p>
    </div>
  </div>
  <div v-else>Выберите город из списка</div>
</template>

<script setup>
import { useWeatherStore } from '../stores/weatherStore';
import { computed } from 'vue';

const weatherStore = useWeatherStore();
const weatherData = computed(() => weatherStore.weatherData);

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>