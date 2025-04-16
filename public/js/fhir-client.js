/**
 * Happy Smiles FHIR Client Helper
 * A utility script for SMART on FHIR integration based on course examples
 */

// Define the FHIR client in a global namespace
window.HappySmilesFHIR = (function() {
  // Default FHIR server URL (SMART Health IT sandbox)
  const DEFAULT_FHIR_SERVER = 'https://launch.smarthealthit.org/v/r4/fhir';
  
  // Track client state
  let fhirClient = null;
  let currentPatient = null;
  let isConnected = false;
  
  /**
   * Initialize the FHIR client
   * @param {Object} options - Configuration options
   * @returns {Promise} Promise that resolves when client is ready
   */
  function initialize(options = {}) {
    return new Promise((resolve, reject) => {
      const clientOptions = {
        // Use provided server or default
        serverUrl: options.serverUrl || DEFAULT_FHIR_SERVER,
        // Use provided patient ID or null to select at runtime
        patientId: options.patientId || null,
        // SMART scopes
        scope: options.scope || 'launch/patient patient/*.read openid profile'
      };
      
      // Initialize FHIR client
      try {
        // If SMART on FHIR client library is loaded
        if (typeof FHIR !== 'undefined') {
          // Handle SMART on FHIR authorization, returning a ready client
          FHIR.oauth2.ready()
            .then(client => {
              fhirClient = client;
              isConnected = true;
              
              // Load patient info
              return client.patient.read();
            })
            .then(patient => {
              currentPatient = patient;
              resolve({
                client: fhirClient,
                patient: currentPatient
              });
            })
            .catch(err => {
              console.error('FHIR client error:', err);
              reject(err);
            });
        } else {
          reject(new Error('FHIR client library not loaded'));
        }
      } catch (error) {
        console.error('Error initializing FHIR client:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Connect to FHIR server
   * @param {Object} options - Configuration options
   */
  function connect(options = {}) {
    const clientId = options.clientId || 'happy_smiles_app';
    const redirectUri = options.redirectUri || window.location.origin + window.location.pathname;
    const fhirServiceUrl = options.serverUrl || DEFAULT_FHIR_SERVER;
    
    // Start SMART authorization process
    FHIR.oauth2.authorize({
      clientId: clientId,
      scope: options.scope || 'launch/patient patient/*.read openid profile',
      redirectUri: redirectUri,
      fhirServiceUrl: fhirServiceUrl
    });
  }
  
  /**
   * Get a resource by type and ID
   * @param {string} resourceType - FHIR resource type
   * @param {string} id - Resource ID
   * @returns {Promise} Promise that resolves with the resource
   */
  function getResource(resourceType, id) {
    if (!fhirClient) {
      return Promise.reject(new Error('FHIR client not initialized'));
    }
    
    return fhirClient.request(`${resourceType}/${id}`);
  }
  
  /**
   * Search for resources by type and query parameters
   * @param {string} resourceType - FHIR resource type
   * @param {Object} params - Query parameters
   * @returns {Promise} Promise that resolves with search results
   */
  function searchResources(resourceType, params = {}) {
    if (!fhirClient) {
      return Promise.reject(new Error('FHIR client not initialized'));
    }
    
    // Build search URL with parameters
    let searchUrl = `${resourceType}?`;
    
    // Add patient context if not specified in params
    if (!params.patient && currentPatient) {
      searchUrl += `patient=${currentPatient.id}&`;
    }
    
    // Add the rest of the params
    Object.keys(params).forEach(key => {
      searchUrl += `${key}=${params[key]}&`;
    });
    
    // Remove trailing ampersand
    searchUrl = searchUrl.slice(0, -1);
    
    // Execute search
    return fhirClient.request(searchUrl);
  }
  
  /**
   * Get patient demographics
   * @returns {Promise} Promise that resolves with patient demographics
   */
  function getPatientDemographics() {
    if (!currentPatient) {
      return Promise.reject(new Error('No patient selected'));
    }
    
    // Extract and format demographic information
    const name = currentPatient.name && currentPatient.name[0] 
      ? `${currentPatient.name[0].given ? currentPatient.name[0].given.join(' ') : ''} ${currentPatient.name[0].family || ''}`.trim()
      : 'Unknown';
      
    const gender = currentPatient.gender || 'Unknown';
    const birthDate = currentPatient.birthDate || 'Unknown';
    
    // Calculate age if birthDate is available
    let age = 'Unknown';
    if (birthDate !== 'Unknown') {
      const dob = new Date(birthDate);
      const ageDiffMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiffMs);
      age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    
    return Promise.resolve({
      id: currentPatient.id,
      name,
      gender,
      birthDate,
      age
    });
  }
  
  /**
   * Get dental-specific observations for the current patient
   * @returns {Promise} Promise that resolves with dental observations
   */
  function getDentalObservations() {
    if (!currentPatient) {
      return Promise.reject(new Error('No patient selected'));
    }
    
    // LOINC codes for dental observations
    const dentalCodes = [
      '41950-7', // Dental findings narrative 
      '38053-7'  // Dental history narrative
    ].join(',');
    
    return searchResources('Observation', { 
      patient: currentPatient.id,
      code: dentalCodes 
    });
  }
  
  /**
   * Get dental conditions for the current patient
   * @returns {Promise} Promise that resolves with dental conditions
   */
  function getDentalConditions() {
    if (!currentPatient) {
      return Promise.reject(new Error('No patient selected'));
    }
    
    // Search for dental conditions
    // We can use category=dental or search for specific ICD-10 codes for dental conditions (K00-K14)
    return searchResources('Condition', { 
      patient: currentPatient.id,
      category: 'dental'
    });
  }
  
  // Public API
  return {
    initialize,
    connect,
    getResource,
    searchResources,
    getPatientDemographics,
    getDentalObservations,
    getDentalConditions,
    isConnected: () => isConnected,
    getClient: () => fhirClient,
    getPatient: () => currentPatient
  };
})(); 