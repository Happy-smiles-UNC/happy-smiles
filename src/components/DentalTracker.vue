<template>
  <div class="dental-tracker">
    <h1>Happy Smiles Dental Tracker</h1>
    <p class="subtitle">Keep track of your daily dental hygiene habits</p>
    
    <div class="card">
      <form @submit.prevent="saveActivity" class="tracker-form">
        <div class="form-group">
          <label for="brushed">
            <span class="emoji">🪥</span> Did you brush today?
          </label>
          <input type="checkbox" id="brushed" v-model="brushed">
        </div>
        
        <div class="form-group">
          <label for="flossed">
            <span class="emoji">🧵</span> Did you floss today?
          </label>
          <input type="checkbox" id="flossed" v-model="flossed">
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
      streak: 0,
      activityHistory: []
    }
  },
  mounted() {
    // Initialize jQuery elements and event handlers
    this.initializeJQuery();
    
    // Fetch activity history
    this.fetchActivityHistory();
  },
  methods: {
    initializeJQuery() {
      // Using jQuery to add animation effects to UI elements
      $('.dental-tracker h1').hide().fadeIn(800);
      $('.subtitle').hide().fadeIn(1200);
      
      // Add hover effects to the submit button using jQuery
      $('.submit-btn').hover(
        function() {
          $(this).css('transform', 'scale(1.05)');
        },
        function() {
          $(this).css('transform', 'scale(1)');
        }
      );
      
      // Add click animation to checkboxes
      $('#brushed, #flossed').on('change', function() {
        if ($(this).is(':checked')) {
          $(this).closest('.form-group').css('background-color', 'rgba(66, 185, 131, 0.1)');
          $(this).closest('.form-group').find('.emoji').addClass('emoji-bounce');
        } else {
          $(this).closest('.form-group').css('background-color', 'transparent');
          $(this).closest('.form-group').find('.emoji').removeClass('emoji-bounce');
        }
      });
    },
    saveActivity() {
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      fetch("/save-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: date,
          brushed: this.brushed,
          flossed: this.flossed
        })
      })
      .then(response => response.json())
      .then(data => {
        // Add to local history and reset form
        this.activityHistory.unshift({
          date: date,
          brushed: this.brushed,
          flossed: this.flossed
        });
        
        // Update streak logic
        if (this.brushed && this.flossed) {
          this.streak += 1;
          
          // Use jQuery to animate the streak counter
          $('.streak-info h2').css('color', '#ff6b6b');
          $('.streak-info h2').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        } else {
          this.streak = 0;
        }
        
        // Reset form
        this.brushed = false;
        this.flossed = false;
        
        // Clear checkbox styling
        $('.form-group').css('background-color', 'transparent');
        $('.emoji').removeClass('emoji-bounce');
        
        // Show success message with jQuery animation
        const $successMessage = $('<div class="success-message">Great job! Your activity has been tracked.</div>');
        $('body').append($successMessage);
        $successMessage.fadeIn().delay(3000).fadeOut(function() {
          $(this).remove();
        });
      })
      .catch(error => {
        console.error("Error saving activity:", error);
        
        // Show error message with jQuery
        const $errorMessage = $('<div class="error-message">There was an error saving your activity. Please try again.</div>');
        $('body').append($errorMessage);
        $errorMessage.fadeIn().delay(3000).fadeOut(function() {
          $(this).remove();
        });
      });
    },
    fetchActivityHistory() {
      // Fetch activity history from the server
      fetch("/activity-history")
        .then(response => response.json())
        .then(data => {
          // Convert the object to an array of activities
          const activitiesArray = Object.keys(data).map(date => ({
            date,
            brushed: data[date].brushed,
            flossed: data[date].flossed
          }));
          
          // Sort by date (most recent first)
          activitiesArray.sort((a, b) => new Date(b.date) - new Date(a.date));
          
          this.activityHistory = activitiesArray;
          
          // Calculate streak based on consecutive days with both activities completed
          this.calculateStreak(activitiesArray);
        })
        .catch(error => {
          console.error("Error fetching activity history:", error);
          
          // Fallback to sample data for demo purposes
          this.generateSampleData();
        });
    },
    calculateStreak(activities) {
      if (!activities || activities.length === 0) {
        this.streak = 0;
        return;
      }
      
      // Sort activities by date (most recent first)
      const sortedActivities = [...activities].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      // Check if the most recent activity is today or yesterday
      const mostRecentDate = new Date(sortedActivities[0].date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (mostRecentDate < yesterday) {
        // The streak is broken if most recent activity is before yesterday
        this.streak = 0;
        return;
      }
      
      // Count consecutive days with both activities completed
      let currentStreak = 0;
      let currentDate = new Date(today);
      
      for (const activity of sortedActivities) {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        
        // Check if this activity is from the expected date in the streak
        const expectedDate = new Date(currentDate);
        expectedDate.setHours(0, 0, 0, 0);
        
        // If there's a gap in the dates, the streak is broken
        if (activityDate.getTime() !== expectedDate.getTime()) {
          break;
        }
        
        // If both activities were completed, add to streak
        if (activity.brushed && activity.flossed) {
          currentStreak++;
          
          // Move to the previous day to continue checking the streak
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          // If both weren't completed, the streak is broken
          break;
        }
      }
      
      this.streak = currentStreak;
    },
    generateSampleData() {
      // Generate sample data for demo purposes (if API fails)
      const today = new Date();
      this.activityHistory = [];
      
      // Generate some sample history data for the past week
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        // Random data for demo purposes
        const brushed = Math.random() > 0.3;
        const flossed = Math.random() > 0.5;
        
        this.activityHistory.push({
          date: dateString,
          brushed,
          flossed
        });
      }
      
      // Calculate streak based on the sample data
      this.calculateStreak(this.activityHistory);
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
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.emoji {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

label {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

input[type="checkbox"] {
  width: 24px;
  height: 24px;
  cursor: pointer;
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
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
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
</style> 