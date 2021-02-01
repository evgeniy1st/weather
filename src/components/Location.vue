<template>
  <div id="location">    
    <p v-if="!loading">
      <span class="location">{{ location }}, </span>
      <span>{{locationData.sys.country}}</span>
      <br>
      <img :src="urlImg + locationData.weather[0].icon + `.png`" alt="">
      <span>{{Math.round(locationData.main.temp)}}&#176;C</span>
      <br>
      <span>feels like {{Math.round(locationData.main.feels_like)}}&#176;C. </span>
      <span>{{locationData.weather[0].description[0].toUpperCase() + locationData.weather[0].description.slice(1)}}</span>
      <br>
      <span>{{locationData.wind.speed}}/</span><span>{{locationData.wind.deg}} </span>
      <span>Pressure: {{locationData.main.pressure}} hPa</span>
      <br>
      <span>Humidity: {{locationData.main.humidity}}%</span>
      <span>Visibility: {{(locationData.visibility / 1000).toFixed(1)}} km</span>
      <br>
    </p>
    <div v-show="loading"><h1>Загрузка</h1></div>
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
    }
  },

  async created() {
    this.loading = true;
    const response = await fetch(this.url + this.location + this.units + this.appid);
    this.locationData = await response.json()
    this.loading = false;
  }
}
</script>

<style>
#app {
  font-weight: bold;
}

</style>
