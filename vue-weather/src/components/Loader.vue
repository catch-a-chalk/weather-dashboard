<template>
  <div class="loader" v-if="isLoading">
    <div class="loader-spinner"></div>
    <p class="loader-text">Загрузка данных...</p>
  </div>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>

<style lang="scss">
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;

  &-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid $black;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  &-text {
    color: $black;
    font-size: 14px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>