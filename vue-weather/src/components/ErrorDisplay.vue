<template>
  <div class="error" v-if="error">
    <svg class="error-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
    </svg>
    <p class="error-message">{{ error }}</p>
    <button class="error-retry" @click="$emit('retry')">Повторить</button>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: null
  }
});

defineEmits(['retry']);
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba($red, 0.1);
  border-radius: 8px;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;

  &-icon {
    width: 48px;
    height: 48px;
    color: $red;
  }

  &-message {
    color: $black;
    margin: 0;
  }

  &-retry {
    padding: 8px 16px;
    background: $white;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: darken($black, 10%);
    }
  }
}
</style>