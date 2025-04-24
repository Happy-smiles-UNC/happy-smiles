<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Happy Smiles</h3>
        <p>Your companion for building healthy dental habits</p>
      </div>
      
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul class="footer-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/timer">Brushing Timer</router-link></li>
          <li><router-link to="/clinics">Find Clinics</router-link></li>
          <li><router-link to="/tips">Dental Tips</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>Resources</h3>
        <ul class="footer-links">
          <li><router-link to="/tutorials">Tutorials</router-link></li>
          <li><router-link to="/brushing">Brushing Techniques</router-link></li>
          <li><router-link to="/flossing">Flossing Guide</router-link></li>
          <li><router-link to="/faq">Dental FAQ</router-link></li>
          <li><router-link to="/clinics">Find a Dentist</router-link></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Happy Smiles. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background-color: #f9f9f9;
  color: #555;
  padding: 2rem 0 0 0;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 2rem;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: #42b983;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #42b983;
}

.footer-bottom {
  background-color: #f0f0f0;
  text-align: center;
  padding: 1rem 0;
  margin-top: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    padding: 0 1rem;
  }
  
  .footer-section {
    margin-bottom: 1.5rem;
  }
}
</style> 