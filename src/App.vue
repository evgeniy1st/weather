<template>
  <div class="main-container">
    <LocationsList
      v-show="!settings"
      :locationList="locationList"
      @settings-open="settings=true"     
      />

      <Settings
      v-if="settings"
      :locationList="locationList"
      @settings-close="settings=false"
      @remove-location="removeLocation"
      @write-location="addLocation"
      @update-location-list="savelocationList"
      />
  </div>
</template>

<script>
import CONST from './utils'
import LocationsList from './components/Locations-list'
import Settings from './components/Settings'

export default {
  name: 'App',
  components: {
    LocationsList, Settings
  },

  data() {
    return {
      settings: false,
      appid: CONST.APPID,
      units: CONST.UNITS,
      url: CONST.ENDPINT,
      newLocation: null,
      locationList: []
    }
  },

  mounted() {
    if (localStorage.getItem('locationList')) {
        const locationList = JSON.parse(localStorage.getItem('locationList'));
        try {
          this.locationList = locationList;
        } catch (error) {
          localStorage.removeItem('locationList');
        }
      }
  },

  methods: {
    addLocation(location) {
      if (location) {
        this.locationList.push(location);
        this.savelocationList();
      }
    },
    removeLocation(item) {
      this.locationList.splice(item, 1);
      this.savelocationList();
    },
    savelocationList() {
      const parsed = JSON.stringify(this.locationList);
      localStorage.setItem('locationList', parsed);
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
  .main-container {
    font-family: 'Roboto Condensed', sans-serif;
    box-sizing: border-box;
    margin: 0 auto;
    width: 320px;
    padding: 10px;
  }
</style>
