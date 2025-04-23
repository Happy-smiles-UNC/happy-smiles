import { createRouter, createWebHistory } from 'vue-router'
import DentalTracker from '../components/DentalTracker.vue'
import DentalClinicMap from '../components/DentalClinicMap.vue'
import TipsPage from '../components/TipsPage.vue'
import AboutPage from '../components/AboutPage.vue'
import BrushingTechniques from '../components/BrushingTechniques.vue'
import FlossingGuide from '../components/FlossingGuide.vue'
import DentalFAQ from '../components/DentalFAQ.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DentalTracker
    },
    {
      path: '/clinics',
      name: 'clinics',
      component: DentalClinicMap
    },
    {
      path: '/tips',
      name: 'tips',
      component: TipsPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/brushing',
      name: 'brushing',
      component: BrushingTechniques
    },
    {
      path: '/flossing',
      name: 'flossing',
      component: FlossingGuide
    },
    {
      path: '/faq',
      name: 'faq',
      component: DentalFAQ
    }
  ]
})

export default router 