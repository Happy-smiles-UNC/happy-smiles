<template>
  <div class="tutorial-page">
    <h1>
      <font-awesome-icon :icon="['fas', 'graduation-cap']" class="icon" />
      Tutorials
    </h1>

    <div class="tutorial-grid">
      <a 
        v-for="(tutorial, index) in tutorials" 
        :key="index"
        :href="tutorial.link" 
        target="_blank"
        rel="noopener noreferrer" 
        class="tutorial-card"
      >
        <h3>{{ tutorial.title }}</h3>
        <p>{{ tutorial.description }}</p>
        <div class="tutorial-link">
          🎥 Watch Tutorial
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'TutorialPage',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      tutorials: [
        {
          title: "Daily Care for a Healthy Smile",
          description: "Brush properly, floss daily, and choose the right oral care products for healthy teeth and gums.",
          link: "https://youtu.be/2yxa67n5JR4"
        },
        {
          title: "How To Use A Manual Toothbrush",
          description: "Learn the correct brushing angles, technique, and how to maintain your toothbrush for optimal care.",
          link: "https://youtu.be/vcbBWs5WPu4?si=ItN3Iy_Ju81fDdnU"
        },
        {
          title: "How To Use An Electric Toothbrush",
          description: "Master the use of electric toothbrushes for maximum plaque removal and gentle gum care.",
          link: "https://youtu.be/SBETJnUwwwc?si=WUfnDG6ZbBtTINVC"
        },
        {
          title: "Regular vs. Electric Toothbrush",
          description: "Compare manual and electric toothbrushes in terms of plaque removal, ease of use, and effectiveness.",
          link: "https://youtu.be/NUdYqjcscuM?si=1U3R5UKv5U2OLq4x"
        },
        {
          title: "How To Floss",
          description: "Learn proper flossing techniques and discover flossing tools like water flossers for better gum health.",
          link: "https://youtu.be/rm5oAAeoEnI?si=GCyqYccosU7gBiHX"
        },
        {
          title: "How To Use Mouthwash",
          description: "Understand when and how to use mouthwash effectively as part of your daily dental routine.",
          link: "https://youtu.be/3Upt4sx6jV4?si=8TETlRHlt_OdhTlh"
        },
        {
          title: "How To Brush Your Tongue",
          description: "Maintain fresh breath and oral health by properly cleaning your tongue using a brush or scraper.",
          link: "https://youtu.be/FBc6bU-v8ZQ?si=ghR_iycx4ixPHABS"
        },
        {
          title: "Fluoride Benefits and Risks",
          description: "Explore the role of fluoride in preventing cavities, along with alternative options like xylitol.",
          link: "https://youtu.be/j2sMqSDLd4k?si=fy4ql12xSvXEvsCk"
        },
        {
          title: "All the Info You'll Ever Need",
          description: "Dive deep into comprehensive oral care essentials in this all-in-one guide.",
          link: "https://youtu.be/7k3wjTOhYwY?si=eh2QlTnbYhsnRZN5"
        }
      ]
    }
  }
}
</script>

<style scoped>
.tutorial-page {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  font-family: 'Nunito', sans-serif;
}

h1 {
  color: #42b983;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  text-align: center;
  font-weight: 800;
}

.icon {
  margin-right: 0.5rem;
  color: #00b894;
}

.tutorial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.tutorial-card {
  background-color: #f1f8ff;
  border-radius: 8px;
  border: 1px solid #dfe6e9;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}

.tutorial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.tutorial-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.8rem;
}

.tutorial-card p {
  flex-grow: 1;
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 1rem;
}

.tutorial-link {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.tutorial-link:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .tutorial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .tutorial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
