<template>
  <div class="faq-page">
    <h2>Dental Frequently Asked Questions</h2>
    <div class="faq-list">
      <ol>
        <li>
          <div class="question">How long and how often should I brush my teeth?</div>
          Brush your teeth <strong>twice a day for two minutes</strong> each time.<br /> Use a timer to keep track!
        </li>
        
        <li>
          <div class="question">What type of toothbrush should I use?</div>
          The ADA recommends a <strong>soft-bristled toothbrush</strong> with a small head.<br /> Electric brushes are great for extra cleaning and easier handling.
        </li>

        <li>
          <div class="question">What toothpaste should I use?</div>
          Choose toothpaste based on your needs—<em>cavity protection, sensitivity relief, or whitening</em>.<br /> When in doubt, ask your dentist.
        </li>

        <li>
          <div class="question">Can I over brush my teeth?</div>
          Yes! Brushing too hard can cause <strong>gum damage and enamel wear</strong>.<br /> Be gentle and let your brush do the work.
        </li>

        <li>
          <div class="question">How often should I replace my toothbrush?</div>
          Replace your toothbrush every 3–4 months, or sooner if the bristles are worn.<br /> Always replace it after an illness to prevent reinfection.
        </li>

        <li>
          <div class="question">Why is flossing important?</div>
          Flossing removes plaque and food particles between your teeth where a toothbrush can't reach, helping prevent cavities and gum disease.
        </li>

        <li>
          <div class="question">Is mouthwash necessary?</div>
          Mouthwash can help reduce bacteria, freshen breath, and add fluoride protection.<br /> But it's not a substitute for brushing and flossing.
        </li>

        <li>
          <div class="question">What foods are good for my teeth?</div>
          Crunchy fruits and vegetables, cheese, and foods rich in calcium strengthen teeth.<br /> Try to limit sugary snacks.
        </li>

        <li>
          <div class="question">How does smoking affect dental health?</div>
          Smoking can cause gum disease, tooth loss, and oral health problems including oral cancer.<br /> Quitting smoking greatly improves your oral health.
        </li>

        <li>
          <div class="question">When should children first see a dentist?</div>
          Children should visit a dentist by their first birthday or within six months after their first tooth erupts.
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
  margin-bottom: 2rem;
  font-size: 2.2rem;
  text-align: center;
  font-weight: 800;
}

.faq-list ol {
  padding-left: 1.5rem;
  line-height: 1.8;
  color: #555;
}

.faq-list li {
  margin-bottom: 1.5rem;
  background-color: #f1f8ff;
  padding: 1rem;
  border-left: 6px solid #00cec9;
  border-radius: 8px;
  font-size: 1.05rem;
}

.faq-list .question {
  font-weight: 700;
  font-size: 1.15rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
}

.icon {
  margin-right: 0.5rem;
  color: #00b894;
}

strong {
  font-weight: bold;
}
</style>
