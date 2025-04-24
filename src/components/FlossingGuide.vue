<template>
  <div class="flossing-guide">
    <h2>Flossing Guide</h2>

    <h3>What type of floss should I use?</h3>
    <p>There are two types of floss from which to choose:</p>

    <ol>
      <li>Nylon (or multifilament) floss</li>
      <li>PTFE (monofilament) floss</li>
    </ol>

    <p>
      Nylon floss is available waxed and unwaxed, and in a variety of flavors. Because this type of floss is composed of many strands of nylon, it may sometimes tear or shred, especially between teeth with tight contact points. While more expensive, single filament (PTFE) floss slides easily between teeth, even those with tight spaces between teeth, and is virtually shred-resistant. When used properly, both types of floss are excellent at removing plaque and debris.
    </p>

    <div class="floss-type-img">
      <img :src="images.flosstype" alt="Floss Types" />
    </div>

    <h3>How To Floss?</h3>

    <div class="flossing-technique-img">
      <img :src="images.flossing" alt="Flossing Technique" />
    </div>

    <p><strong>Preparation:</strong> Wrap about 18 inches of floss around your middle fingers, leaving about 3 inches of floss between your hands for cleaning.</p>
    <p><strong>Technique:</strong> Gently slide the floss between your teeth using a zig-zag motion. Be careful not to snap the floss into your gums.</p>
    <p><strong>Cleaning:</strong> Curve the floss around the base of each tooth, making sure you go beneath the gumline. Move the floss up and down against the tooth to remove plaque and food particles.</p>
    <p><strong>Daily Routine:</strong> Floss at least once a day to remove dental plaque and food particles that brushing cannot reach.</p>

    <h3>Proper Flossing Technique</h3>
    <ol>
      <li>Starting with about 18 inches of floss, wind most of the floss around each middle finger, leaving an inch or two of floss to work with.</li>
      <li>Holding the floss tautly between your thumbs and index fingers, slide it gently up-and-down between your teeth.</li>
      <li>Gently curve the floss around the base of each tooth, making sure you go beneath the gumline. Never snap or force the floss, as this may cut or bruise delicate gum tissue.</li>
      <li>Use clean sections of floss as you move from tooth to tooth.</li>
      <li>To remove the floss, use the same back-and-forth motion to bring the floss up and away from the teeth.</li>
    </ol>

    <div class="floss-img">
      <img :src="images.floss" alt="Floss" />
    </div>

    <h3>When to Floss?</h3>
    <p>It’s preferable to floss before brushing your teeth to dislodge food and plaque, which can then be brushed away more effectively.</p>

    <h3>Alternative Flossing Tools</h3>
    <p>If traditional string floss is challenging to use, consider a water flosser. Water flossers are effective at cleaning between teeth and along the gumline and are particularly useful for people with braces or other dental appliances.</p>

    <h3>How To Use Mouthwash?</h3>
    <p><strong>Necessity of Mouthwash:</strong> While not essential for everyone, mouthwash can be beneficial, especially for those looking to enhance their oral hygiene beyond brushing and flossing.</p>
    <p><strong>Proper Usage:</strong> Use one measuring cup (typically the bottle cap) of mouthwash. Wait about 30 minutes after brushing your teeth before using mouthwash to avoid washing away the fluoride from your toothpaste.</p>
    <p><strong>Choosing a Mouthwash:</strong> Any mouthwash can be helpful, but consider your specific needs: Some formulas are aimed at freshening breath, while others help combat plaque or treat conditions like gingivitis. Consult with a dental professional if you're unsure which type is best for you.</p>
  </div>
</template>

<script>
import flossImage from '@/assets/Images/floss.jpg';
import flossingImage from '@/assets/Images/flossing_technique.jpg';
import flosstypeImage from '@/assets/Images/floss_types.jpg';

export default {
  name: 'FlossingGuide',
  data() {
    return {
      images: {
        floss: flossImage,
        flossing: flossingImage,
        flosstype: flosstypeImage,
      }
    };
  }
};
</script>

<style scoped>
.flossing-guide {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: black;
}

h2 {
  color: #42b983;
  margin-bottom: 1rem;
  text-align: center;
}

h3 {
  color: #42b983;
  margin-bottom: 1rem;
  margin-top: 1rem;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem auto;
}

strong {
  font-weight: bold;
}
</style>

