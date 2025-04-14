// Create Vue application
const app = Vue.createApp({
    data() {
      return {
        // Random User Profile 
        user: {
          firstName: '',
          lastName: '',
          age: '',
          photo: ''
        },
        // Weather module 
        weather: {
          temperature: '',
          wind: '',
          description: '',
          city: '',
          province: '',
          country: ''
        },
        // Inputs for weather
        weatherInputs: {
          city: 'London',
          province: 'Ontario',
          country: 'Canada'
        },
        // Dictionary module state
        dictionary: {
          word: '',
          phonetic: '',
          definition: ''
        },
        wordInput: 'Hi'// Input for dictionary search
     }
    },
    methods: {
      // Fetch random user profile from API
       fetchRandomProfile() {
        
          fetch('http://comp6062.liamstewart.ca/random-user-profile')
          .then(response => {
          if (response.ok) {
            console.log('Random Profile recived');
            return response.json();
          }
          else {
            console.error('Error fetching random user profile:', error);
          }})
         .then(data =>{          
          this.user.firstName = data.first_name;
          this.user.lastName = data.last_name;
          this.user.age = data.age;
          this.user.photo = data.profile_picture;
         })
       },
      // Fetch weather information based on given inputs
      fetchWeather() {
        const url = `https://comp6062.liamstewart.ca/weather-information?city=${this.weatherInputs.city}&province=${this.weatherInputs.province}&country=${this.weatherInputs.country}`;
        fetch(url)
        .then(response => {
          if (response.ok) {
            console.log('Weather data recived');
            return response.json();
          } 
          else {
            console.error('Error fetching weather information:', error);
          }
        })
        //const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.weather.city}&province=${this.weather.province}&country=${this.weather.country}`;
        .then(data => {
          this.weather.temperature = data.temperature;
          this.weather.wind = data.wind_speed;
          this.weather.description = data.weather_description;  
        })
      },
      // Fetch dictionary definition for a word
      fetchDefinition() {
        
        fetch(`https://comp6062.liamstewart.ca/define?word=${this.wordInput}`)
        .then(response => {
          if (response.ok) {
            console.log('Dictionary response recived');
            return response.json();
            
          } else {
            console.error('Error fetching dictionary definition:', error);
          }})
          .then(data => {
            // Check if the response contains a valid definition           
              if (data && Array.isArray(data) && data.length > 0) {
                const receved = data[0]; // Get the first dictionary result
                this.dictionary.word = receved.word;
                this.dictionary.phonetic = receved.phonetic;
                this.dictionary.definition = receved.definition;
              } 
              else {
                console.error('No definition found.');
              }
        })
      }
    },
    mounted() {
      this.fetchRandomProfile();
      this.fetchWeather();
      this.fetchDefinition(); 
    }
});
// Mount the Vue application to the DOM
app.mount('#app');
  