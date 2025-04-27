<template>
  <div class="faq-page">
    <h2><font-awesome-icon icon="fa-solid fa-question-circle" class="icon" /> Dental Frequently Asked Questions</h2>
    <div class="faq-list">
      <ol>
        <li>
          <strong><font-awesome-icon icon="fa-solid fa-toothbrush" class="icon" /> How long and how often should I brush my teeth?</strong><br />
          Brush your teeth twice a day for two minutes each time.<br />
          Use a timer to keep track!
        </li>
        
        <li>
          <strong><font-awesome-icon icon="fa-solid fa-tooth" class="icon" /> What type of toothbrush should I use?</strong><br />
          The ADA recommends a soft-bristled toothbrush with a small head.<br />
          Electric brushes are great for extra cleaning and easier handling.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-pump-soap" class="icon" /> What toothpaste should I use?</strong><br />
          Choose toothpaste based on your needs — <em>cavity protection, sensitivity relief, or whitening</em>.<br />
          When in doubt, ask your dentist.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="icon" /> Can I over brush my teeth?</strong><br />
          Brushing too hard can cause gum damage and enamel wear.<br />
          Be gentle and let your brush do the work.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-recycle" class="icon" /> How often should I replace my toothbrush?</strong><br />
          Replace your toothbrush every 3–4 months, or sooner if the bristles are worn.<br />
          Always replace it after an illness to prevent reinfection.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-bolt" class="icon" /> Why is flossing important?</strong><br />
          Flossing removes plaque and food particles between your teeth where a toothbrush can’t reach,<br />
          helping prevent cavities and gum disease.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-glass-water-droplet" class="icon" /> Is mouthwash necessary?</strong><br />
          Mouthwash can help reduce bacteria, freshen breath, and add fluoride protection <br />
          but it’s not a substitute for brushing and flossing.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-apple-whole" class="icon" /> What foods are good for my teeth?</strong><br />
          Crunchy fruits and vegetables, cheese, and calcium-rich foods strengthen teeth.<br />
          Try to limit sugary snacks.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-smoking-ban" class="icon" /> How does smoking affect dental health?</strong><br />
          Smoking can cause gum disease, tooth loss, and oral health problems including oral cancer.<br />
          Quitting smoking greatly improves your oral health.
        </li>

        <li>
          <strong><font-awesome-icon icon="fa-solid fa-child" class="icon" /> When should children first see a dentist?</strong><br />
          Children should visit a dentist by their first birthday, or within six months after their first tooth erupts.
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
  color: #555; /* lighter color for answers */
}

.faq-list li {
  margin-bottom: 1.5rem;
  background-color: #f1f8ff;
  padding: 1rem;
  border-left: 6px solid #00cec9;
  border-radius: 8px;
  font-size: 1.05rem;
}

.faq-list li strong {
  display: block;
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
  color: #2d3436; /* darker color for questions */
}

.icon {
  margin-right: 0.5rem;
  color: #00b894;
}
</style>
