<template>
  <div class="clinic-map-container">
    <h2>Find Dental Clinics Near You</h2>
    
    <div class="map-controls">
      <div class="location-search">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Enter your location" 
          class="location-input"
        >
        <button @click="searchLocation" class="search-btn">Search</button>
      </div>
      
      <div class="filter-options">
        <label>
          <input type="checkbox" v-model="filters.general" @change="filterClinics">
          General Dentistry
        </label>
        <label>
          <input type="checkbox" v-model="filters.pediatric" @change="filterClinics">
          Pediatric
        </label>
        <label>
          <input type="checkbox" v-model="filters.orthodontic" @change="filterClinics">
          Orthodontic
        </label>
      </div>
    </div>
    
    <div class="map-container">
      <div id="clinic-map" ref="mapContainer"></div>
      <p v-if="loading" class="loading-message">Loading map data...</p>
    </div>
    
    <div class="clinic-list" v-if="clinics.length > 0">
      <h3>Dental Clinics</h3>
      <ul>
        <li v-for="(clinic, index) in filteredClinics" :key="index" class="clinic-item" @click="centerMapOnClinic(clinic)">
          <div class="clinic-details">
            <h4>{{ clinic.name }}</h4>
            <p class="clinic-address">{{ clinic.address }}</p>
            <p class="clinic-type">{{ clinic.type }}</p>
            <p class="clinic-distance" v-if="clinic.distance">{{ clinic.distance.toFixed(1) }} miles away</p>
          </div>
          <button class="directions-btn" @click.stop="getDirections(clinic)">Get Directions</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import { defineComponent } from 'vue';
import $ from 'jquery';

export default defineComponent({
  name: 'DentalClinicMap',
  data() {
    return {
      map: null,
      searchQuery: '',
      userLocation: null,
      clinics: [],
      filteredClinics: [],
      clinicMarkers: [],
      userMarker: null,
      loading: false,
      filters: {
        general: true,
        pediatric: true,
        orthodontic: true
      }
    };
  },
  mounted() {
    // Initialize map with a default location (Chapel Hill, NC - UNC)
    this.initMap([35.9132, -79.0558]);
    
    // Try to get user's location
    this.getUserLocation();
    
    // Load mock clinic data (in a real app, this would come from an API)
    this.loadMockClinicData();
  },
  methods: {
    initMap(center) {
      // Create Leaflet map
      this.map = L.map(this.$refs.mapContainer).setView(center, 13);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(this.map);
      
      // Create a custom icon for dental clinics
      this.clinicIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      // Create a custom icon for user location
      this.userIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    },
    getUserLocation() {
      if (navigator.geolocation) {
        this.loading = true;
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.userLocation = [latitude, longitude];
            
            // Center map on user location
            this.map.setView(this.userLocation, 13);
            
            // Add marker for user location
            if (this.userMarker) {
              this.userMarker.setLatLng(this.userLocation);
            } else {
              this.userMarker = L.marker(this.userLocation, { icon: this.userIcon })
                .addTo(this.map)
                .bindPopup('<strong>Your Location</strong>')
                .openPopup();
            }
            
            // Update distances for clinics
            this.updateClinicDistances();
            
            this.loading = false;
          },
          (error) => {
            console.error('Error getting location:', error);
            this.loading = false;
            
            // Use default location (UNC Chapel Hill) if user location cannot be determined
            this.userLocation = [35.9132, -79.0558];
            this.updateClinicDistances();
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    searchLocation() {
      if (!this.searchQuery.trim()) return;
      
      this.loading = true;
      
      // Use OpenStreetMap Nominatim API for geocoding
      $.getJSON(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`, (data) => {
        if (data && data.length > 0) {
          const location = data[0];
          this.userLocation = [parseFloat(location.lat), parseFloat(location.lon)];
          
          // Center map on searched location
          this.map.setView(this.userLocation, 13);
          
          // Add marker for user location
          if (this.userMarker) {
            this.userMarker.setLatLng(this.userLocation);
          } else {
            this.userMarker = L.marker(this.userLocation, { icon: this.userIcon })
              .addTo(this.map)
              .bindPopup(`<strong>${this.searchQuery}</strong>`)
              .openPopup();
          }
          
          // Update distances for clinics
          this.updateClinicDistances();
        } else {
          alert('Location not found. Please try a different search.');
        }
        
        this.loading = false;
      }).fail(() => {
        alert('Error searching for location. Please try again.');
        this.loading = false;
      });
    },
    loadMockClinicData() {
      // In a real app, this would fetch data from an API
      // For demo purposes, we're using mock data
      
      // Mock data for dental clinics around Chapel Hill, NC area
      this.clinics = [
        {
          id: 1,
          name: 'Chapel Hill Dental Care',
          type: 'General Dentistry',
          address: '123 Franklin St, Chapel Hill, NC',
          location: [35.9132, -79.0558],
          phone: '(919) 555-1234'
        },
        {
          id: 2,
          name: 'Pediatric Dental Specialists',
          type: 'Pediatric',
          address: '456 Raleigh Rd, Chapel Hill, NC',
          location: [35.9220, -79.0380],
          phone: '(919) 555-5678'
        },
        {
          id: 3,
          name: 'Carolina Orthodontics',
          type: 'Orthodontic',
          address: '789 Hillsborough St, Chapel Hill, NC',
          location: [35.9025, -79.0650],
          phone: '(919) 555-9012'
        },
        {
          id: 4,
          name: 'UNC School of Dentistry',
          type: 'General Dentistry',
          address: '385 S Columbia St, Chapel Hill, NC',
          location: [35.9069, -79.0528],
          phone: '(919) 555-3456'
        },
        {
          id: 5,
          name: 'Smile Experts',
          type: 'General Dentistry',
          address: '234 Durham Rd, Chapel Hill, NC',
          location: [35.9310, -79.0280],
          phone: '(919) 555-7890'
        },
        {
          id: 6,
          name: 'Kids Teeth Specialists',
          type: 'Pediatric',
          address: '567 Carrboro Rd, Carrboro, NC',
          location: [35.9100, -79.0750],
          phone: '(919) 555-2345'
        }
      ];
      
      // Update distances
      this.updateClinicDistances();
      
      // Add markers for each clinic
      this.addClinicMarkers();
      
      // Filter clinics based on initial filter settings
      this.filterClinics();
    },
    addClinicMarkers() {
      // Clear existing markers
      if (this.clinicMarkers.length > 0) {
        this.clinicMarkers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.clinicMarkers = [];
      }
      
      // Add markers for each clinic
      this.clinics.forEach(clinic => {
        const marker = L.marker(clinic.location, { icon: this.clinicIcon })
          .addTo(this.map)
          .bindPopup(`
            <strong>${clinic.name}</strong><br>
            ${clinic.address}<br>
            ${clinic.type}<br>
            ${clinic.phone}
          `);
        
        this.clinicMarkers.push(marker);
      });
    },
    updateClinicDistances() {
      if (!this.userLocation) return;
      
      // Calculate distance from user location to each clinic
      this.clinics.forEach(clinic => {
        clinic.distance = this.calculateDistance(
          this.userLocation[0], this.userLocation[1],
          clinic.location[0], clinic.location[1]
        );
      });
      
      // Sort clinics by distance
      this.clinics.sort((a, b) => a.distance - b.distance);
      
      // Update filtered clinics
      this.filterClinics();
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      // Haversine formula to calculate distance between two points on Earth
      const R = 3958.8; // Earth radius in miles
      const dLat = this.toRadians(lat2 - lat1);
      const dLon = this.toRadians(lon2 - lon1);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    toRadians(degrees) {
      return degrees * (Math.PI / 180);
    },
    filterClinics() {
      // Filter clinics based on selected types
      this.filteredClinics = this.clinics.filter(clinic => {
        if (clinic.type === 'General Dentistry' && !this.filters.general) return false;
        if (clinic.type === 'Pediatric' && !this.filters.pediatric) return false;
        if (clinic.type === 'Orthodontic' && !this.filters.orthodontic) return false;
        return true;
      });
      
      // Update marker visibility
      this.clinicMarkers.forEach((marker, index) => {
        const clinic = this.clinics[index];
        const isVisible = 
          (clinic.type === 'General Dentistry' && this.filters.general) ||
          (clinic.type === 'Pediatric' && this.filters.pediatric) ||
          (clinic.type === 'Orthodontic' && this.filters.orthodontic);
        
        if (isVisible) {
          if (!this.map.hasLayer(marker)) {
            marker.addTo(this.map);
          }
        } else {
          if (this.map.hasLayer(marker)) {
            this.map.removeLayer(marker);
          }
        }
      });
    },
    centerMapOnClinic(clinic) {
      this.map.setView(clinic.location, 15);
      
      // Find and open the popup for this clinic
      const index = this.clinics.findIndex(c => c.id === clinic.id);
      if (index !== -1 && this.clinicMarkers[index]) {
        this.clinicMarkers[index].openPopup();
      }
    },
    getDirections(clinic) {
      if (!this.userLocation) {
        alert('Your location is needed to get directions. Please allow location access or search for your location.');
        return;
      }
      
      // Open Google Maps with directions
      const startLat = this.userLocation[0];
      const startLng = this.userLocation[1];
      const endLat = clinic.location[0];
      const endLng = clinic.location[1];
      
      const url = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}&travelmode=driving`;
      window.open(url, '_blank');
    }
  }
});
</script>

<style scoped>
.clinic-map-container {
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

.map-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.location-search {
  display: flex;
  gap: 0.5rem;
}

.location-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #3aa876;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.map-container {
  position: relative;
  height: 400px;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
}

#clinic-map {
  height: 100%;
  width: 100%;
}

.loading-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 1000;
}

.clinic-list {
  margin-top: 1.5rem;
}

.clinic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clinic-item:hover {
  background-color: #f9f9f9;
}

.clinic-details {
  flex: 1;
}

.clinic-details h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.clinic-address, .clinic-type, .clinic-distance {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.clinic-type {
  color: #42b983;
  font-weight: 500;
}

.directions-btn {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.9rem;
}

.directions-btn:hover {
  background-color: #e0e0e0;
}

@media (min-width: 768px) {
  .map-controls {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  .location-search {
    flex: 1;
    max-width: 400px;
  }
}
</style> 