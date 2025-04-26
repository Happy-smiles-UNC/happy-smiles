import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import $ from 'jquery'
import 'leaflet/dist/leaflet.css'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import all FontAwesome solid icons you need
import { 
  faTooth, 
  faTeethOpen, 
  faCheck, 
  faFire, 
  faClockRotateLeft, 
  faLightbulb,
  faHome,
  faMap,
  faInfoCircle,
  faToothbrush, 
  faPumpSoap, 
  faTriangleExclamation, 
  faRecycle, 
  faBolt, 
  faGlassWaterDroplet, 
  faAppleWhole, 
  faSmokingBan, 
  faChild, 
  faQuestionCircle, 
  faFaceGrinBeam,
  faFaceSmile,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

// Add all icons to the library
library.add(
  faTooth, 
  faTeethOpen, 
  faCheck, 
  faFire, 
  faClockRotateLeft, 
  faLightbulb,
  faHome,
  faMap,
  faInfoCircle,
  faToothbrush, 
  faPumpSoap, 
  faTriangleExclamation, 
  faRecycle, 
  faBolt, 
  faGlassWaterDroplet, 
  faAppleWhole, 
  faSmokingBan, 
  faChild, 
  faQuestionCircle,
  faFaceGrinBeam,
  faFaceSmile,
  faUsers
)

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

// Register Font Awesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Mount the app
app.mount('#app')
