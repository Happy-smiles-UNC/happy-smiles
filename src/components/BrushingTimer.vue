<script setup>
import { ref, computed } from 'vue'

// Timer state
const isTimerRunning = ref(false)
const currentTimer = ref('') // 'morning' or 'night'
const timeRemaining = ref(120) // 2 minutes in seconds
const initialTime = 120 // 2 minutes

// Format the time as MM:SS
const formattedTime = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60)
  const seconds = timeRemaining.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

// Timer functionality
let timerInterval = null

function startTimer(period) {
  // If timer is already running, stop it first
  if (isTimerRunning.value) {
    stopTimer()
  }
  
  // Set up the new timer
  currentTimer.value = period
  timeRemaining.value = initialTime
  isTimerRunning.value = true
  
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      // Timer finished
      stopTimer()
      alert("Great job! You've completed your brushing session.")
    }
  }, 1000)
}

function stopTimer() {
  clearInterval(timerInterval)
  isTimerRunning.value = false
  timeRemaining.value = initialTime
}

function pauseTimer() {
  clearInterval(timerInterval)
  isTimerRunning.value = false
}
</script>

<template>
  <div class="brushing-timer">
    <h2>Twice-Daily Brushing Timer</h2>
    
    <div class="timer-container">
      <div class="timer-section">
        <h3>Morning</h3>
        <div 
          class="timer-circle" 
          :class="{ 'active': currentTimer === 'morning' && isTimerRunning }"
          @click="startTimer('morning')"
        >
          <div class="time">{{ currentTimer === 'morning' ? formattedTime : '2:00' }}</div>
        </div>
      </div>
      
      <div class="timer-section">
        <h3>Night</h3>
        <div 
          class="timer-circle" 
          :class="{ 'active': currentTimer === 'night' && isTimerRunning }"
          @click="startTimer('night')"
        >
          <div class="time">{{ currentTimer === 'night' ? formattedTime : '2:00' }}</div>
        </div>
      </div>
    </div>
    
    <div class="controls">
      <button class="control-button" @click="pauseTimer" :disabled="!isTimerRunning">Pause</button>
      <button class="control-button" @click="stopTimer" :disabled="!isTimerRunning">Reset</button>
    </div>
    
    <div class="instructions" v-if="!isTimerRunning">
      <p>Click on either timer to start a 2-minute brushing countdown.</p>
      <p class="tip">Tip: Dentists recommend brushing your teeth for at least 2 minutes, twice a day.</p>
    </div>
  </div>
</template>

<style scoped>
.brushing-timer {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.2rem;
}

.timer-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.timer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.timer-circle {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 8px solid #4299e1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  background-color: white;
}

.timer-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(66, 153, 225, 0.5);
}

.timer-circle.active {
  border-color: #68d391;
}

.time {
  font-size: 3.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.control-button {
  padding: 0.8rem 2.5rem;
  border: none;
  border-radius: 8px;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.control-button:hover {
  background-color: #3182ce;
}

.control-button:disabled {
  background-color: #90cdf4;
  cursor: not-allowed;
  opacity: 0.7;
}

.instructions {
  text-align: center;
  margin-top: 2rem;
  color: #718096;
}

.tip {
  font-style: italic;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(72, 187, 120, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
  }
}

@media (max-width: 768px) {
  .timer-circle {
    width: 140px;
    height: 140px;
  }
  
  .time {
    font-size: 2.5rem;
  }
}
</style> 