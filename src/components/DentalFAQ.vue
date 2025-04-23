<template>
  <div class="dental-faq">
    <h2>Dental Frequently Asked Questions</h2>
    <div class="faq-list">
      <ol>
        <li>
          <strong>How long and how often should I brush my teeth?</strong><br />
          Brush your teeth twice a day for two minutes each time. Set a stopwatch or timer to make sure you're giving your teeth enough attention.
        </li>
        <li>
          <strong>What type of toothbrush should I use?</strong><br />
          The American Dental Association (ADA) recommends a soft-bristled brush for removing plaque and food debris. A toothbrush with a small head can better reach all areas of the mouth. An electric toothbrush is a good option for those with difficulty brushing or limited manual dexterity.
        </li>
        <li>
          <strong>What toothpaste should I use?</strong><br />
          From fighting cavities and whitening teeth to improving sensitivity, different toothpaste types are available depending on your particular needs. Having trouble deciding? Talk to your dentist or dental hygienist about which toothpaste is right for you.
        </li>
        <li>
          <strong>Can I over brush my teeth?</strong><br />
          You can overbrush, so make sure you are using a gentle touch when wielding your toothbrush. Overly vigorous brushing can lead to abrasion, gum recession, and sensitivity.
        </li>
        <li>
          <strong>How often should I replace my toothbrush?</strong><br />
          Replace your toothbrush when it begins to show wear or every three to four months, whichever comes first. Change your toothbrush after any illness to help avoid reinfection.
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
.dental-faq {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
  text-align: center;
}

.placeholder-text {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}
</style> 
