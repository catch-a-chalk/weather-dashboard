<template>
  <div>
    <h2>Прогноз погоды с детальной информацией по крупнейшим городам России.</h2>
    <CitySelector/>
    <WeatherDisplay v-if="weatherStore.weatherData"/>
    <Loader v-if="weatherStore.isLoading"/>
    <ErrorDisplay v-if="weatherStore.error" :message="useWeatherStore.error"/>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../stores/weatherStore';
import CitySelector from '../components/CitySelector.vue';
import WeatherDisplay from '../components/WeatherDisplay.vue';
import Loader from '../components/Loader.vue';
import ErrorDisplay from '../components/ErrorDisplay.vue';

const weatherStore = useWeatherStore();
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>