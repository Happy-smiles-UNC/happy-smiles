<template>
  <div class="about-page">
    <h2><font-awesome-icon icon="fa-solid fa-tooth" class="icon" /> About Happy Smiles</h2>

    <section class="about-section">
      <p>
        At <strong>Happy Smiles</strong>, we believe that oral health education should be simple, engaging, and accessible to everyone. Our mission is to help families build strong dental hygiene habits that lead to a lifetime of healthy smiles.
      </p>

      <h3>Why We Exist</h3>
      <p>
        Many people don't receive proper oral health education early on, leading to preventable issues like cavities and gum disease. We're here to change that. Through interactive tools, tracking, and simple tips, we help users—especially children—understand and enjoy dental care.
      </p>

      <h3>What We Offer</h3>
      <ul>
        <li>Fun brushing tutorials and guides</li>
        <li>Daily dental care tracking tools</li>
        <li>Kid-friendly tips for healthy habits</li>
        <li>Encouraging reminders and interactive learning</li>
      </ul>

      <p>
        Whether you're a parent, a child, or just someone looking to improve your oral hygiene, Happy Smiles is here to support your journey. Together, we can make every smile a confident and healthy one.
      </p>
    </section>
  </div>
</template>

<script>
// Import FontAwesome component because you're using it here
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'AboutPage',
  components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped>
.about-page {
  margin: 2rem auto;
  padding: 2rem;
  max-width: 900px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Nunito', sans-serif;
}

h2 {
  color: #42b983;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 800; /* extra bold */
  font-size: 2.2rem;
}

.about-section {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #333;
}

.about-section h3 {
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700; /* bold */
  color: #2d3436;
}

.about-section ul {
  margin-left: 2rem;
  padding-left: 1rem;
  list-style-type: disc;
}

.about-section ul li {
  margin-bottom: 0.5rem;
}

.about-section p {
  margin-bottom: 1.5rem;
}

.icon {
  margin-right: 0.5rem;
  color: #00b894;
}
</style>
