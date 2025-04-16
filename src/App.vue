<script setup>
import DentalTracker from './components/DentalTracker.vue'
import DentalHealthRecords from './components/DentalHealthRecords.vue'
import DentalClinicMap from './components/DentalClinicMap.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    
    <main class="main-content">
      <DentalTracker />
      <DentalHealthRecords />
      <DentalClinicMap />
    </main>
    
    <AppFooter />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  font-family: 'Poppins', sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 1024px) {
  .main-content {
    padding: 0 2rem;
  }
}
</style>
