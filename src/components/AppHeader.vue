<template>
  <header class="app-header">
    <div class="logo-container">
      <img alt="Happy Smiles logo" class="logo" src="../assets/logo.svg" width="60" height="60" />
      <h1 class="app-name">Happy Smiles</h1>
    </div>
    <nav class="nav-menu">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/clinics" class="nav-link">Find Clinics</router-link>
      <router-link to="/tips" class="nav-link">Tips</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 1rem;
}

.app-name {
  font-size: 1.5rem;
  color: #42b983;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

.nav-link:hover, .router-link-active {
  color: #42b983;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b983;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    padding: 1rem;
  }
  
  .logo-container {
    margin-bottom: 1rem;
  }
  
  .nav-menu {
    width: 100%;
    justify-content: space-around;
    gap: 0.5rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}
</style> 