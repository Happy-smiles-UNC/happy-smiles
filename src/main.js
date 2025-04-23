import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import $ from 'jquery'
import 'leaflet/dist/leaflet.css'

// Make jQuery available globally
window.$ = window.jQuery = $

// Create and configure the Vue application
const app = createApp(App)

// Use router
app.use(router)

// Use Highcharts
app.use(HighchartsVue, {
  highcharts: Highcharts
})

// Mount the app
app.mount('#app')
