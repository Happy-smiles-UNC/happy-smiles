<template>
  <div class="dental-tracker">
    <h1>Happy Smiles Dental Tracker</h1>
    <p class="subtitle">Keep track of your daily dental hygiene habits</p>
    
    <div class="card">
      <form @submit.prevent="saveActivity" class="tracker-form">
        <div class="form-group">
          <label>
            <span class="emoji">🪥</span> Did you brush today?
          </label>
          <div class="button-group">
            <button 
              type="button" 
              class="option-btn" 
              :class="{ active: brushed === true }"
              @click="brushed = true"
            >Yes</button>
            <button 
              type="button" 
              class="option-btn" 
              :class="{ active: brushed === false && brushedSelected }"
              @click="setNotBrushed"
            >No</button>
          </div>
        </div>
        
        <div class="form-group">
          <label>
            <span class="emoji">🧵</span> Did you floss today?
          </label>
          <div class="button-group">
            <button 
              type="button" 
              class="option-btn" 
              :class="{ active: flossed === true }"
              @click="flossed = true"
            >Yes</button>
            <button 
              type="button" 
              class="option-btn" 
              :class="{ active: flossed === false && flossedSelected }"
              @click="setNotFlossed"
            >No</button>
          </div>
          <div v-if="showMessage" class="message-box">
              <p>Please select an option to start tracking your dental hygiene habits.</p>
            </div>
        </div>
        
        <button type="submit" class="submit-btn">Track My Smile</button>
      </form>
    </div>

    <div class="streak-info" v-if="streak > 0">
      <h2>Current Streak: {{ streak }} days</h2>
      <p>Keep it up for a healthier smile!</p>
    </div>

    <div class="history-card" v-if="activityHistory.length > 0">
      <h2>Your Activity History</h2>
      <ul class="history-list">
        <li v-for="(activity, index) in activityHistory" :key="index">
          <span class="date">{{ formatDate(activity.date) }}</span>
          <span class="activity-icon" :class="{ completed: activity.brushed }">🪥</span>
          <span class="activity-icon" :class="{ completed: activity.flossed }">🧵</span>
        </li>
      </ul>
    </div>

    <div class="tips-card">
      <h2>Dental Health Tips</h2>
      <ul class="tips-list">
        <li>Brush at least twice a day for two minutes each time</li>
        <li>Replace your toothbrush every 3-4 months</li>
        <li>Floss daily to clean between teeth where your brush can't reach</li>
        <li>Limit sugary snacks and drinks</li>
        <li>Visit your dentist regularly for check-ups</li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'DentalTracker',
  data() {
    return {
      brushed: false,
      flossed: false,
      brushedSelected: false,
      flossedSelected: false,
      streak: 0,
      activityHistory: [],
      showMessage: false
    }
  },
  mounted() {
    // Initialize jQuery elements and event handlers
    this.initializeJQuery();
    
    // Fetch activity history from localStorage
    this.fetchActivityHistory();
  },
  methods: {
    setNotBrushed() {
      this.brushed = false;
      this.brushedSelected = true;
    },
    setNotFlossed() {
      this.flossed = false;
      this.flossedSelected = true;
    },
    initializeJQuery() {
      $('.dental-tracker h1').hide().fadeIn(800);
      $('.subtitle').hide().fadeIn(1200);
      
      $('.submit-btn').hover(
        function() {
          $(this).css('transform', 'scale(1.05)');
        },
        function() {
          $(this).css('transform', 'scale(1)');
        }
      );
      
      $('.form-group').on('click', '.option-btn', function() {
        const group = $(this).closest('.form-group');
        if ($(this).text() === 'Yes') {
          group.find('.emoji').addClass('emoji-bounce');
          group.css('background-color', 'rgba(66, 185, 131, 0.1)');
        } else {
          group.find('.emoji').removeClass('emoji-bounce');
          group.css('background-color', 'transparent');
        }
      });
    },
    saveActivity() {
      if (!this.brushedSelected && this.brushed === false) {
        this.brushedSelected = true;
      }
      if (!this.flossedSelected && this.flossed === false) {
        this.flossedSelected = true;
      }
      
      const date = new Date().toISOString().split('T')[0]; 
      
      try {
        let storedData = localStorage.getItem('dentalActivityHistory');
        let activityData = storedData ? JSON.parse(storedData) : {};
        
        activityData[date] = {
          brushed: this.brushed,
          flossed: this.flossed
        };
        
        localStorage.setItem('dentalActivityHistory', JSON.stringify(activityData));
        
        this.activityHistory.unshift({
          date: date,
          brushed: this.brushed,
          flossed: this.flossed
        });
        
        if (this.brushed && this.flossed) {
          this.streak += 1;
          localStorage.setItem('dentalStreak', this.streak);
          
          $('.streak-info h2').css('color', '#ff6b6b');
          $('.streak-info h2').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        } else {
          this.streak = 0;
          localStorage.setItem('dentalStreak', 0);
        }
        
        this.brushed = false;
        this.flossed = false;
        this.brushedSelected = false;
        this.flossedSelected = false;
        
        $('.form-group').css('background-color', 'transparent');
        $('.emoji').removeClass('emoji-bounce');
        
        const $successMessage = $('<div class="success-message">Great job! Your activity has been tracked.</div>');
        $('body').append($successMessage);
        $successMessage.fadeIn().delay(3000).fadeOut(function() {
          $(this).remove();
        });
      } catch (error) {
        console.error("Error saving activity to localStorage:", error);
        
        const $errorMessage = $('<div class="error-message">There was an error saving your activity. Please try again.</div>');
        $('body').append($errorMessage);
        $errorMessage.fadeIn().delay(3000).fadeOut(function() {
          $(this).remove();
        });
      }
    },
    fetchActivityHistory() {
      try {
        const storedData = localStorage.getItem('dentalActivityHistory');
        const storedStreak = localStorage.getItem('dentalStreak');
        
        if (storedData) {
          const activityData = JSON.parse(storedData);
          
          const activitiesArray = Object.keys(activityData).map(date => ({
            date,
            brushed: activityData[date].brushed,
            flossed: activityData[date].flossed
          }));
          
          activitiesArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          
          this.activityHistory = activitiesArray;
          
          if (storedStreak !== null) {
            this.streak = parseInt(storedStreak);
          } else {
            this.calculateStreak(activitiesArray);
          }
        } else {
          // just show a message to the user to start tracking
          this.showMessage = true;
        }
      } catch (error) {
        console.error("Error fetching activity history from localStorage:", error);
      }
    },
    calculateStreak(activities) {
      if (!activities || activities.length === 0) {
        this.streak = 0;
        return;
      }
      
      // most recent first
      const sortedActivities = [...activities].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      const mostRecentDate = new Date(sortedActivities[0].date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (mostRecentDate < yesterday) {
        this.streak = 0;
        localStorage.setItem('dentalStreak', 0);
        return;
      }
      
      let currentStreak = 0;
      let currentDate = new Date(today);
      
      for (const activity of sortedActivities) {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        
        const expectedDate = new Date(currentDate);
        expectedDate.setHours(0, 0, 0, 0);
        
        if (activityDate.getTime() !== expectedDate.getTime()) {
          break;
        }
        
        if (activity.brushed && activity.flossed) {
          currentStreak++;
          
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
      
      this.streak = currentStreak;
      localStorage.setItem('dentalStreak', currentStreak);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }
}
</script>

<style scoped>
.dental-tracker {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.tracker-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  border-radius: 8px;
  transition: background-color 0.3s;
  margin-bottom: 10px;
}

.emoji {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

label {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.button-group {
  display: flex;
  gap: 10px;
  width: 100%;
}

.option-btn {
  background-color: #f5f5f5;
  color: #666;
  border: none;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
  min-width: 90px;
}

.option-btn:hover {
  background-color: #e0e0e0;
}

.option-btn.active {
  background-color: #42b983;
  color: white;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #3aa876;
}

.streak-info {
  text-align: center;
  margin-bottom: 2rem;
}

.streak-info h2 {
  color: #ff6b6b;
  margin-bottom: 0.5rem;
}

.history-card, .tips-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.history-list, .tips-list {
  list-style: none;
  padding: 0;
}

.history-list li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.history-list li:last-child {
  border-bottom: none;
}

.date {
  flex: 1;
  font-weight: bold;
}

.activity-icon {
  font-size: 1.3rem;
  margin-left: 1rem;
  opacity: 0.3;
}

.activity-icon.completed {
  opacity: 1;
}

.tips-list li {
  padding: 8px 0;
  position: relative;
  padding-left: 1.5rem;
}

.tips-list li::before {
  content: "✓";
  color: #42b983;
  position: absolute;
  left: 0;
}

@media (max-width: 600px) {
  .dental-tracker {
    padding: 1rem;
  }
  
  .form-group {
    padding: 15px 10px;
  }
  
  .button-group {
    gap: 15px;
  }
  
  .option-btn {
    padding: 16px;
    font-size: 1.1rem;
    font-weight: bold;
    min-height: 60px;
  }
  
  .submit-btn {
    padding: 16px;
    font-size: 1.2rem;
    min-height: 60px;
    margin-top: 1.5rem;
  }
  
  label {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
  
  .emoji {
    font-size: 1.8rem;
  }
}

/* New styles for jQuery animations */
.emoji-bounce {
  animation: bounce 0.6s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.success-message, .error-message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  display: none;
}

.success-message {
  background-color: #42b983;
}

.error-message {
  background-color: #ff6b6b;
}

.message-box {
  padding: 20px 10px;
}
</style> 