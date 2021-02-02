<template>
  <div class="location-cart">    
    <span class="location-name">{{ location }}, </span>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <div v-if="loading && !errorMessage"><img src="../img/placeholder.png" alt=""></div>
    <template v-if="locationData && !loading">
      <span class="location-country">{{locationData.sys.country}}</span>
      <div class="temp-container">
        <img class="icon" :src="urlImg + locationData.weather[0].icon + `.png`" alt="">
      <span class="temp">{{Math.round(locationData.main.temp)}}&#176;C</span>
      </div>

      <div class="feels-like-container">
        <span>Feels like {{Math.round(locationData.main.feels_like)}}&#176;C. </span>
        <span>{{locationData.weather[0].description[0].toUpperCase() + locationData.weather[0].description.slice(1)}}</span>
      </div>

      <div class="container">
        <div>
          <span>{{locationData.wind.speed}}ms/ </span><span>{{getWindDirection(locationData.wind.deg)}} </span>
        </div>
        <span>Pressure: {{locationData.main.pressure}} hPa</span>
      </div>

      <div class="container">
        <span>Humidity: {{locationData.main.humidity}}%</span>
        <span>Visibility: {{(locationData.visibility / 1000).toFixed(1)}} km</span>
      </div>
    </template>  
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

<style scoped>
  .location-cart {
    width: 250px;
    margin: 30px 0;
  }

  .location-name, 
  .location-country {
    font-weight: bold;
    font-size: 20px;
  }
  
  .icon {
    margin-left: auto;
    display: inline-block;
  }

  .temp-container {
    display: flex;
    margin-bottom: 15px;
  }

  .temp {
    font-size: 40px;
  }

  .feels-like-container {
    margin-bottom: 15px;
    font-size: 22px;
  }

  .container {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .container span {
    text-align: left;
    widows: 50%;
  }

  .error-message {
    padding: 7px 5px;
    background-color: rgb(255, 125, 125);
    border-radius: 2px;
}
</style>
