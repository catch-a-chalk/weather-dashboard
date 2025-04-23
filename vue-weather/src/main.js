import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

axios.defaults.baseURL = 'http://api.weatherapi.com/v1';