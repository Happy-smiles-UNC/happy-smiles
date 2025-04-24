<template>
  <div class="tips-page">
    <h2>🪥 Dental Health Tips</h2>
    
    <ul class="tips-list">
      <li>🦷 <strong>Floss daily:</strong> Clean between your teeth once a day to prevent plaque buildup.</li>
      <li>🪥 <strong>Dental Visits:</strong> See your dentist every 6 months for a checkup and cleaning.</li>
      <li>🧴 <strong>Use Fluoride Toothpaste:</strong> Strengthens enamel and prevents cavities.</li>
      <li>🥗 <strong>Eat Healthy:</strong> Limit sugary snacks and eat more fruits and veggies.</li>
      <li>🚭 <strong>Quit Smoking:</strong> It causes gum disease and stains your teeth.</li>
      <li>😬 <strong>Use a Mouthguard:</strong> Especially if you play sports!</li>
      <li>🤰 <strong>Pregnant?</strong> Keep brushing and visit your dentist.</li>
      <li>👶 <strong>Start Early:</strong> Begin brushing when the first tooth appears.</li>
    </ul>

    <div class="cta-box">
      <h3>✨ Ready to build better brushing habits?</h3>
      <p>Track your daily dental care with our smile tracker!</p>
      <a href="/tracker" class="cta-button">Open Tracker</a>
    </div>
  </div>
</template>



<script>
export default {
  name: 'TipsPage'
}
</script>

<style scoped>
.tips-page {
  background-color: white;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 850px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Nunito', sans-serif;
  color: black;
}

h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Baloo 2', cursive;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tips-list li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  background-color: #f1f8ff;
  padding: 1rem;
  border-left: 6px solid #00cec9;
  border-radius: 8px;
  line-height: 1.6;
  color: black;
}

.cta-box {
  margin-top: 2rem;
  background: #dff9fb;
  padding: 1.5rem;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.cta-box p {
  color: black;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #00cec9;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>

