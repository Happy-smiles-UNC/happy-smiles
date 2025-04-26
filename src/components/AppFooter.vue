<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="team-section">
        <h4><font-awesome-icon icon="fa-solid fa-users" class="icon" /> Team Members</h4>
        <ul class="team-list">
          <li>Freya</li>
          <li>Hlim</li>
          <li>Shweta</li>
          <li>Vyshnavi</li>
          <!-- Add more if you have -->
        </ul>
      </div>

      <div class="footer-info">
        <p>Made with <font-awesome-icon icon="fa-solid fa-tooth" class="icon" /> by Team Happy Smiles</p>
        <p>&copy; 2025 Happy Smiles. All rights reserved.</p>
      </div>
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
  padding: 2rem 1rem;
  margin-top: 2rem;
  font-family: 'Nunito', sans-serif;
  color: #2d3436;
  font-size: 1rem;
  border-top: 1px solid #dcdde1;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-section {
  text-align: center;
  margin-bottom: 1rem;
}

.team-section h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #00b894;
}

.team-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.team-list li {
  margin: 0.2rem 0;
}

.footer-info {
  text-align: center;
  margin-top: 1rem;
}

.icon {
  margin-right: 0.5rem;
  color: #00b894;
}
</style>
