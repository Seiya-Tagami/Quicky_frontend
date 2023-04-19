import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faXmark, faCircleExclamation, faEllipsis, faCircleHalfStroke, faPen, faLink, faEraser, faSquare, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark, faCircleExclamation, faEllipsis, faCircleHalfStroke, faPen, faLink, faPenToSquare, faSquare, faEraser)

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
