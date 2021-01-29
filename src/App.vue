<template>
  <div id="app">
    <LocationsList msg="Welcome to Your Vue.js App"/>
    <div v-for="(location, n) in weather" v-bind:key="n">
    <p v-bind:key="n">
      <span class="location">{{ location.name }}, </span>
      <span>{{location.sys.country}}</span>
      <br>
      <img :src="urlImg + location.weather[0].icon + `.png`" alt="">
      <span>{{Math.round(location.main.temp)}}&#176;C</span>
      <br>
      <span>feels like {{Math.round(location.main.feels_like)}}&#176;C</span>
      <button @click="removeLocation(n)">remove</button>
    </p>
  </div>

  <p>
    <input v-model="newLocation">
    <button @click="addLocation">add</button>
  </p>

  </div>
</template>

<script>
import LocationsList from './components/Locations-list'

export default {
  name: 'App',
  components: {
    LocationsList
  },

  data() {
    return {
      appid: `&appid=f9b67de5dadca5ac83f5c454e3da8dbf`,
      units: `&units=metric`,
      url: `https://api.openweathermap.org/data/2.5/weather?q=`,
      urlImg: `http://openweathermap.org/img/wn/`,
      newLocation: null,
      locationList: [],
      weather: []
    }
  },

  mounted() {
    if (localStorage.getItem('locationList')) {
      try {
        this.locationList = JSON.parse(localStorage.getItem('locationList'));
        this.locationList.map(location => {
          fetch(this.url + location + this.units + this.appid)
            .then((response) => {
              return response.json();
          })
            .then((data) => {
              this.weather.push(data);
            });
        })
      } catch(e) {
        localStorage.removeItem('locationList');
      }
    }
  },

  // watch: {
  //   weather: function() {
  //     if (this.weather.length > 0) {
  //       console.log(this.weather)
  //     }
  //   }
  // },

  methods: {
    addLocation() {
      if (!this.newLocation) {
        return;
      }

      fetch(this.url + this.newLocation + this.units + this.appid)
            .then((response) => {
              if (response.ok){
                this.locationList.push(this.newLocation);
                this.newLocation = '';
                this.savelocationList();
                return response.json();
              }
            })
            .then((data) => {
              if (data) {
                this.weather.push(data);
              }
            })
            .catch(error => alert(error.message))
    },
    removeLocation(item) {
      this.locationList.splice(item, 1);
      this.weather.splice(item, 1);
      this.savelocationList();
    },
    savelocationList() {
      const parsed = JSON.stringify(this.locationList);
      localStorage.setItem('locationList', parsed);
    }
  }
}
</script>

<style>
#app {
  font-weight: bold;

}

</style>
