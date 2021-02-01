<template>
  <div id="location">    
    <div>
      <span class="location">{{ location }}, </span>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <div v-if="loading && !errorMessage"><h1>Загрузка</h1></div>
      <template v-if="locationData && !loading">
        <span>{{locationData.sys.country}}</span>
        <br>
        <img :src="urlImg + locationData.weather[0].icon + `.png`" alt="">
        <span>{{Math.round(locationData.main.temp)}}&#176;C</span>
        <br>
        <span>feels like {{Math.round(locationData.main.feels_like)}}&#176;C. </span>
        <span>{{locationData.weather[0].description[0].toUpperCase() + locationData.weather[0].description.slice(1)}}</span>
        <br>
        <span>{{locationData.wind.speed}}/</span><span>{{getWindDirection(locationData.wind.deg)}} </span>
        <span>Pressure: {{locationData.main.pressure}} hPa</span>
        <br>
        <span>Humidity: {{locationData.main.humidity}}%</span>
        <span>Visibility: {{(locationData.visibility / 1000).toFixed(1)}} km</span>
      </template>
    </div>
  </div>
</template>

<script>
import CONST from '../utils'
export default {
  name: 'Location',
  props: {
    location: String,
    n: Number
  },

  data() {
    return {
      loading: false,
      urlImg: CONST.URLIMG,
      appid: CONST.APPID,
      units: CONST.UNITS,
      url: CONST.ENDPINT,
      locationData: null,
      errorMessage: null
    }
  },

  created() {
    this.loadData()
  },

  methods: {
    getWindDirection(deg) {
      const val = Math.floor((deg / 22.5) + 0.5);
      const windDirection = CONST.WIND_DIRECTION;
      return windDirection[(val % 16)];
    },

    async loadData() {
    try {
      this.loading = true;
      const response = await fetch(this.url + this.location + this.units + this.appid);
      if (response.status == 200) {
        this.locationData = await response.json()
        this.loading = false;
      } else {
        this.loading = false;
        this.errorMessage = CONST.ERROR_MESSAGE.FAILED
      }
    } catch(error) {
      this.errorMessage = error.message;
    }
    }
  }
}
</script>

<style>
#app {
  font-weight: bold;
}

</style>
