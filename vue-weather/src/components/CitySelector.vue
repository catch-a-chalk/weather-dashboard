<template>
  <div class="city-selector">
    <select
      v-model="selectedCity"
      @change="handleCityChange"
      class="city-selector__select"
    >
      <option value="" disabled>Выберите город</option>
      <option
        v-for="city in cities"
        :key="city"
        :value="city"
      >
        {{ city }}
      </option>
    </select>
    <button
      @click="fetchWeather"
      class="city-selector__button"
      :disabled="!selectedCity"
      >
        Обновить
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWeatherStore } from '../stores/weatherStore';

const weatherStore = useWeatherStore();
const selectedCity = ref('');
const cities = weatherStore.cities;

const handleCityChange = () => {
  if (selectedCity.value) {
    weatherStore.fetchWeather(selectedCity.value);
  }
};

const fetchWeather = () => {
  if (selectedCity.value) {
    weatherStore.fetchWeather(selectedCity.value);
  }
}

onMounted(() => {
  selectedCity.value = cities[0];
  weatherStore.fetchWeather(selectedCity.value);
})
</script>