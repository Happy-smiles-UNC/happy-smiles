<template>
  <div class="faq-page">
    <h2>❓ Dental Frequently Asked Questions</h2>
    <div class="faq-list">
      <ol>
        <li>
          <strong>🪥 How long and how often should I brush my teeth?</strong><br />
          Brush your teeth <strong>twice a day for two minutes</strong> each time. Use a timer to keep track!
        </li>
        <li>
          <strong>🦷 What type of toothbrush should I use?</strong><br />
          The ADA recommends a <strong>soft-bristled toothbrush</strong> with a small head. Electric brushes are great for extra cleaning and easier handling.
        </li>
        <li>
          <strong>🧴 What toothpaste should I use?</strong><br />
          Choose toothpaste based on your needs—<em>cavity protection, sensitivity relief, or whitening</em>. When in doubt, ask your dentist.
        </li>
        <li>
          <strong>⚠️ Can I over brush my teeth?</strong><br />
          Yes! Brushing too hard can cause <strong>gum damage and enamel wear</strong>. Be gentle and let your brush do the work.
        </li>
        <li>
          <strong>♻️ How often should I replace my toothbrush?</strong><br />
          Every 3–4 months, or sooner if the bristles are worn. And always replace after an illness to prevent reinfection.
        </li>
      </ol>
    </div>
  </div>
</template>


<script>
export default {
  name: 'DentalFAQ'
}
</script>

<style scoped>
.faq-page {
  background-color: white;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 850px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Nunito', sans-serif;
}

h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Baloo 2', cursive;
  font-size: 2rem;
}

.faq-list ol {
  padding-left: 1.5rem;
  line-height: 1.8;
  color: #333;
}

.faq-list li {
  margin-bottom: 1.5rem;
  background-color: #f1f8ff;
  padding: 1rem;
  border-left: 6px solid #00cec9;
  border-radius: 8px;
  font-size: 1.05rem;
}

</style> 
