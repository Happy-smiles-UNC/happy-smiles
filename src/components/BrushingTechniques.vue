<template>
  <div class="brushing-techniques">
    <h2>Brushing Techniques</h2>

    <h3>Proper Brushing Technique</h3>
    <div class="bass-technique-img">
      <img :src="images.brushing" alt="Modified Bass Technique" />
    </div>

    <h4>How To Use a Manual Toothbrush?</h4>
    <p><strong>Proper Angle:</strong> Aim the bristles at a 45-degree angle towards the gumline. This angle helps effectively remove plaque without causing irritation to your gums.</p>

    <h4>Brushing Technique:</h4>
    <div class="brushing-steps-grid">
      <div v-for="step in brushingSteps" :key="step.id" class="brushing-step">
        <img :src="step.img" :alt="'Step ' + step.id" class="step-img" />
        <p class="step-text">Step {{ step.id }}: {{ step.text }}</p>
      </div>
    </div>

    <h4>Time Allocation:</h4>
    <p>Divide your mouth into four quadrants: upper left, upper right, lower left, and lower right. Spend at least 30 seconds brushing each quadrant, ensuring thorough cleaning for a total of 2 minutes.</p>

    <h4>Frequency of Brushing:</h4>
    <p>Brush at least twice a day, ideally in the morning and before bedtime, to maintain optimal oral hygiene.</p>

    <h4>Toothbrush Maintenance:</h4>
    <p>Replace your toothbrush or toothbrush head every 3 months, or sooner if the bristles become frayed. Regular replacement ensures your brush is effective in cleaning your teeth and maintaining oral health.</p>

    <h4>How To Use An Electric Toothbrush?</h4>
    <p><strong>Proper Positioning:</strong> Position the bristles at a 45-degree angle to the gums to enhance cleaning along the gumline.</p>
    <p><strong>Brushing Technique:</strong> Hold the brush head against each tooth individually and allow the toothbrush to rotate and vibrate; avoid scrubbing.</p>
    <p><strong>Time Allocation:</strong> Divide the mouth into four quadrants: upper left, upper right, lower left, and lower right. Spend 30 seconds on each quadrant for a total brushing time of 2 minutes.</p>
    <p><strong>Frequency of Brushing:</strong> Brush twice daily, preferably in the morning and before bedtime, to maintain optimal oral hygiene.</p>
    <p><strong>Toothbrush Maintenance:</strong> Replace the electric toothbrush head every 3 months, or sooner if the bristles show signs of wear.</p>

    <h4>Regular vs. Electric Toothbrush</h4>
    <ol>
      <li><strong>Plaque Removal:</strong> Electric toothbrushes can remove more plaque than regular ones, largely due to their advanced brushing technology and consistent head movements.</li>
      <li><strong>Ease of Use:</strong> Electric toothbrushes are generally easier to use as they require less manual effort.</li>
      <li><strong>Brushing Technique:</strong> Electric brushing requires less movement—just guide the brush and let it work.</li>
      <li><strong>Dental Health Improvement:</strong> Electric toothbrushes often reduce plaque and gingivitis more effectively.</li>
      <li><strong>Consistent Performance:</strong> The motorized head provides uniform cleaning.</li>
      <li><strong>Safe for Gums</strong></li>
      <li><strong>Improves Oral Health in People with Orthodontic Appliances</strong></li>
      <li><strong>Easier for People with Limited Mobility:</strong> Ideal for those with arthritis, carpal tunnel, or disabilities.</li>
    </ol>

    <div class="comparison-img">
      <img :src="images.toothbrush" alt="Manual vs Electric Toothbrush" />
    </div>

    <h4>How To Brush Your Tongue?</h4>
    <p><strong>Importance of Brushing the Tongue:</strong> Regular tongue cleaning removes bacteria, prevents bad breath, and enhances taste.</p>
    <p><strong>Using a Toothbrush:</strong> Gently brush your tongue from back to front using your regular brush or one with a tongue cleaner.</p>
    <p><strong>Using a Tongue Scraper:</strong> Gently scrape from the back of the tongue forward, rinsing between strokes.</p>
    <p><strong>Identifying Areas to Clean:</strong> Focus on white-coated areas where bacteria and debris build up.</p>

    <div class="tongue-img">
      <img :src="images.tongue" alt="Tongue Cleaning" />
    </div>
  </div>
</template>


<script>
export default {
  name: 'BrushingTechniques',
  data() {
    return {
      images: {
        brushing: require('@/assets/brushing_technique.png'),
        tongue: require('@/assets/tongue_cleaning.jpg'),
        toothbrush: require('@/assets/manual-toothbrush-vs-electric-toothbrush.jpg'),
        floss: require('@/assets/floss.jpg'),
        flossing: require('@/assets/flossing_technique.jpg'),
        flosstype: require('@/assets/floss_types.jpg'),
      },
      brushingSteps: [
        {
          id: 1,
          img: require('@/assets/step_1.jpeg'),
          text: 'Place the brush at a 45° angle, brushing against the gumline to remove trapped plaque or food debris.'
        },
        {
          id: 2,
          img: require('@/assets/step_2.jpg'),
          text: 'Use gentle, circular motions across the front of your teeth.'
        },
        {
          id: 3,
          img: require('@/assets/step_3.jpg'),
          text: 'Brush the outer, inner, and chewing surfaces of each tooth.'
        },
        {
          id: 4,
          img: require('@/assets/step_4.jpg'),
          text: 'Use the tip of the brush for the inner front teeth with an up-and-down stroke.'
        },
        {
          id: 5,
          img: require('@/assets/step_5.jpg'),
          text: 'Brush your tongue to remove bacteria and keep breath fresh.'
        },
        {
          id: 6,
          img: require('@/assets/step_6.jpg'),
          text: 'Brush for at least two minutes, twice a day.'
        }
      ]
    };
  }
}
</script>

<style scoped>
.brushing-techniques {
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

.brushing-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.brushing-step {
  text-align: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.brushing-step:hover {
  transform: translateY(-5px);
}

.step-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.step-text {
  margin-top: 0.75rem;
  font-size: 1rem;
  color: #444;
}

</style> 
