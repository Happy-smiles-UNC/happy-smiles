// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Correctly combined icons in one import:
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

// Add all icons to library
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

// Register component globally
app.component('font-awesome-icon', FontAwesomeIcon)
