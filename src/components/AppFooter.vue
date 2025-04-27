<template>
  <footer class="footer">
    <div class="footer-content">
      
      <!-- Left section: Logo and About -->
      <div class="footer-section about-section">
        <h3>Happy Smiles</h3>
        <p>Your companion for building healthy dental habits</p>
      </div>

      <!-- Middle section: Quick Links -->
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

      <!-- Right section: Resources -->
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

    <!-- Second row: Team Members -->
    <div class="footer-content team-content">
      <div class="team-section">
        <h4><font-awesome-icon icon="fa-solid fa-users" class="icon" /> Team Members</h4>
        <ul class="team-list">
          <li>Freya Liu</li>
          <li>Hlim Ksor</li>
          <li>Shweta Deshmukh</li>
          <li>Vyshnavi Charugulla</li>
        </ul>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p>Designed to inspire healthy smiles <font-awesome-icon icon="fa-solid fa-tooth" class="icon" /></p>
      <p>&copy; 2025 Happy Smiles. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer {
  background-color: #f1f8ff;
  padding: 2rem 1rem 0;
  margin-top: 2rem;
  font-family: 'Nunito', sans-serif;
  color: #2d3436;
  font-size: 1rem;
  border-top: 1px solid #dcdde1;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 2rem;
}

.footer-section {
  flex: 1;
  min-width: 220px;
  margin-bottom: 2rem;
}

.about-section {
  flex: 1.5;
}

.footer-section h3, .team-section h4 {
  color: #00b894;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-family: 'Baloo 2', cursive;
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
  color: #00b894;
}

.team-content {
  justify-content: center;
  padding-top: 0;
}

.team-section {
  text-align: center;
}

.team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-list li {
  margin-bottom: 0.3rem;
}

.footer-bottom {
  background-color: #f0f0f0;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
}

.footer-bottom p {
  margin: 0.3rem 0;
}

.icon {
  margin-right: 0.5rem;
  color: #00b894;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-section, .about-section {
    margin-bottom: 1.5rem;
  }

  .team-content {
    margin-top: 1rem;
  }
}
</style>
