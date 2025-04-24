<template>
  <div class="tutorial-page">
    <h1>Tutorials</h1>
    <p>Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.Here's the tutorials page.</p>
  </div>
</template>

<script>
export default {
  name: 'TutorialPage'
}
</script>

<style scoped>
.tutorial-page {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

h1 {
  color: #42b983;
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  text-align: center;
}

p {
  line-height: 1.6;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .tutorial-page {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
}
</style> 