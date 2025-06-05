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

<style lang="scss" scoped>

.city-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.city-selector__select {
  padding: 8px 12px;
  border: 1px solid $very-light-grey;
  border-radius: 4px;
  font-size: 16px;
  min-width: 200px;
}

.city-selector__button {
  padding: 8px 16px;
  background-color: $medium-sea-green;
  color: $gainsboro;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.city-selector__button:disabled {
  background-color: $very-light-grey;
  cursor: not-allowed;
}
</style>