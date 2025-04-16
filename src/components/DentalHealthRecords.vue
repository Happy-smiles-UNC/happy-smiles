<template>
  <div class="health-records">
    <h2>Your Dental Health Records</h2>
    <p v-if="loading">Loading your health records...</p>
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="connectFHIR" class="connect-btn">Connect to Health Records</button>
    </div>
    
    <div v-else-if="isConnected" class="records-container">
      <div class="patient-info">
        <h3>Patient Information</h3>
        <p><strong>Name:</strong> {{ patientName }}</p>
        <p><strong>DOB:</strong> {{ formatDate(patientDOB) }}</p>
        <p><strong>ID:</strong> {{ patientId }}</p>
      </div>
      
      <div class="dental-chart">
        <h3>Dental Health History</h3>
        <highcharts :options="chartOptions"></highcharts>
      </div>
      
      <div class="dental-observations">
        <h3>Dental Observations</h3>
        <div v-if="dentalObservations.length === 0" class="no-records">
          <p>No dental observations found in your health record.</p>
        </div>
        <table v-else class="records-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Value</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(obs, index) in dentalObservations" :key="index">
              <td>{{ formatDate(obs.date) }}</td>
              <td>{{ obs.type }}</td>
              <td>{{ obs.value }}</td>
              <td>{{ obs.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="dental-conditions">
        <h3>Dental Conditions</h3>
        <div v-if="dentalConditions.length === 0" class="no-records">
          <p>No dental conditions found in your health record.</p>
        </div>
        <ul v-else class="conditions-list">
          <li v-for="(condition, index) in dentalConditions" :key="index" class="condition-item">
            <span class="condition-date">{{ formatDate(condition.date) }}</span>
            <span class="condition-name">{{ condition.name }}</span>
            <span class="condition-status" :class="condition.status">{{ condition.status }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div v-else class="connect-container">
      <p>Connect to your health records to see your dental history.</p>
      <button @click="connectFHIR" class="connect-btn">Connect to Health Records</button>
    </div>
  </div>
</template>

<script>
import FHIR from 'fhirclient';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DentalHealthRecords',
  data() {
    return {
      loading: false,
      error: null,
      isConnected: false,
      client: null,
      patientId: null,
      patientName: '',
      patientDOB: null,
      dentalObservations: [],
      dentalConditions: [],
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Dental Visit History'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Count'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Visits',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
          name: 'Procedures',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      }
    };
  },
  mounted() {
    // Check if we're in the FHIR authorization callback
    if (window.location.search.includes('code=')) {
      this.handleAuthCallback();
    } else {
      // Try to load from a previous session
      this.tryLoadExistingSession();
    }
  },
  methods: {
    connectFHIR() {
      this.loading = true;
      this.error = null;
      
      // SMART Health IT FHIR server for testing
      const fhirServerUrl = 'https://launch.smarthealthit.org/v/r4/sim/eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYTEtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQtUHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir';
      
      FHIR.oauth2.authorize({
        clientId: 'happy_smiles_app',
        scope: 'launch/patient patient/*.read openid profile',
        redirectUri: window.location.origin + window.location.pathname,
        fhirServiceUrl: fhirServerUrl
      }).catch(err => {
        this.loading = false;
        this.error = `Failed to connect to FHIR server: ${err.message}`;
        console.error('FHIR connection error:', err);
      });
    },
    async handleAuthCallback() {
      this.loading = true;
      try {
        // Complete the authorization process
        this.client = await FHIR.oauth2.ready();
        
        // Get patient information
        const patient = await this.client.patient.read();
        this.patientId = patient.id;
        
        // Get name
        if (patient.name && patient.name.length > 0) {
          const name = patient.name[0];
          this.patientName = `${name.given ? name.given.join(' ') : ''} ${name.family || ''}`.trim();
        }
        
        // Get DOB
        this.patientDOB = patient.birthDate;
        
        // Fetch dental observations
        await this.fetchDentalObservations();
        
        // Fetch dental conditions
        await this.fetchDentalConditions();
        
        // Update chart with mock data (in real app, would use actual data)
        this.updateChartWithMockData();
        
        this.isConnected = true;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = `Failed to process health records: ${error.message}`;
        console.error('FHIR processing error:', error);
      }
    },
    async tryLoadExistingSession() {
      try {
        this.client = await FHIR.oauth2.ready();
        
        // If we have a client, we're already connected
        if (this.client) {
          // Fetch patient info and data
          const patient = await this.client.patient.read();
          this.patientId = patient.id;
          
          // Get name
          if (patient.name && patient.name.length > 0) {
            const name = patient.name[0];
            this.patientName = `${name.given ? name.given.join(' ') : ''} ${name.family || ''}`.trim();
          }
          
          // Get DOB
          this.patientDOB = patient.birthDate;
          
          // Fetch dental observations
          await this.fetchDentalObservations();
          
          // Fetch dental conditions
          await this.fetchDentalConditions();
          
          // Update chart with mock data (in real app, would use actual data)
          this.updateChartWithMockData();
          
          this.isConnected = true;
        }
      } catch (error) {
        // No existing session or error
        console.log('No existing FHIR session or error:', error);
        this.isConnected = false;
      }
    },
    async fetchDentalObservations() {
      try {
        // Search for dental observations
        // LOINC codes for dental observations:
        // 41950-7 - Dental findings narrative
        // 38053-7 - Dental history narrative
        const observations = await this.client.request(`Observation?patient=${this.patientId}&code=41950-7,38053-7`);
        
        // Process the observations
        if (observations.entry && observations.entry.length > 0) {
          this.dentalObservations = observations.entry.map(entry => {
            const resource = entry.resource;
            return {
              date: resource.effectiveDateTime || resource.issued,
              type: resource.code.coding[0].display || 'Dental Observation',
              value: resource.valueString || resource.valueQuantity?.value || 'N/A',
              notes: resource.note ? resource.note[0].text : ''
            };
          });
        } else {
          // If no real data, create mock dental observations
          this.createMockDentalObservations();
        }
      } catch (error) {
        console.error('Error fetching dental observations:', error);
        this.createMockDentalObservations();
      }
    },
    async fetchDentalConditions() {
      try {
        // Search for dental conditions
        // ICD-10 codes starting with K00-K14 are for diseases of oral cavity
        const conditions = await this.client.request(`Condition?patient=${this.patientId}&category=dental`);
        
        // Process the conditions
        if (conditions.entry && conditions.entry.length > 0) {
          this.dentalConditions = conditions.entry.map(entry => {
            const resource = entry.resource;
            return {
              date: resource.onsetDateTime || resource.recordedDate,
              name: resource.code.coding[0].display || 'Dental Condition',
              status: resource.clinicalStatus?.coding[0].code || 'unknown'
            };
          });
        } else {
          // If no real data, create mock dental conditions
          this.createMockDentalConditions();
        }
      } catch (error) {
        console.error('Error fetching dental conditions:', error);
        this.createMockDentalConditions();
      }
    },
    createMockDentalObservations() {
      // Create mock dental observations for demo purposes
      const today = new Date();
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);
      const threeMonthsAgo = new Date(today);
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      const sixMonthsAgo = new Date(today);
      sixMonthsAgo.setMonth(today.getMonth() - 6);

      this.dentalObservations = [
        {
          date: sixMonthsAgo.toISOString(),
          type: 'Dental Examination',
          value: 'Completed',
          notes: 'Regular 6-month check-up. No cavities found.'
        },
        {
          date: threeMonthsAgo.toISOString(),
          type: 'Dental Cleaning',
          value: 'Completed',
          notes: 'Professional cleaning performed. Minor plaque buildup removed.'
        },
        {
          date: oneMonthAgo.toISOString(),
          type: 'Fluoride Treatment',
          value: 'Completed',
          notes: 'Preventative fluoride application to strengthen enamel.'
        }
      ];
    },
    createMockDentalConditions() {
      // Create mock dental conditions for demo purposes
      const today = new Date();
      const twoYearsAgo = new Date(today);
      twoYearsAgo.setFullYear(today.getFullYear() - 2);
      const oneYearAgo = new Date(today);
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      this.dentalConditions = [
        {
          date: twoYearsAgo.toISOString(),
          name: 'Minor Gingivitis',
          status: 'resolved'
        },
        {
          date: oneYearAgo.toISOString(),
          name: 'Dental Caries (Cavity)',
          status: 'resolved'
        },
        {
          date: today.toISOString(),
          name: 'Mild Plaque Buildup',
          status: 'active'
        }
      ];
    },
    updateChartWithMockData() {
      // Update chart with mock data
      // In a real app, this would use actual visit data from FHIR
      const visitData = [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0];
      const procedureData = [2, 0, 1, 0, 2, 0, 1, 0, 0, 3, 0, 0];
      
      this.chartOptions.series[0].data = visitData;
      this.chartOptions.series[1].data = procedureData;
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
});
</script>

<style scoped>
.health-records {
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

h3 {
  color: #555;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.connect-container, .error-message {
  text-align: center;
  padding: 2rem;
}

.connect-btn {
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

.connect-btn:hover {
  background-color: #3aa876;
}

.records-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.patient-info {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.dental-chart {
  margin-bottom: 1.5rem;
}

.records-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.records-table th, .records-table td {
  border: 1px solid #eee;
  padding: 10px;
  text-align: left;
}

.records-table th {
  background-color: #f5f5f5;
  font-weight: 500;
}

.no-records {
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  font-style: italic;
  color: #777;
}

.conditions-list {
  list-style: none;
  padding: 0;
}

.condition-item {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.condition-date {
  color: #777;
  font-size: 0.9rem;
}

.condition-name {
  font-weight: 500;
  flex: 1;
  margin: 0 1rem;
}

.condition-status {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.condition-status.active {
  background-color: #ffeaea;
  color: #ff6b6b;
}

.condition-status.resolved {
  background-color: #e6f7ef;
  color: #42b983;
}

.error-message {
  color: #ff6b6b;
  background-color: #ffeaea;
  padding: 1rem;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .records-container {
    grid-template-columns: 1fr 1fr;
  }
  
  .patient-info {
    grid-column: 1 / -1;
  }
  
  .dental-chart {
    grid-column: 1 / -1;
  }
}
</style> 