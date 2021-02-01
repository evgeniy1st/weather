<template>
  <div>
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
      appid: `&appid=f9b67de5dadca5ac83f5c454e3da8dbf`,
      units: `&units=metric`,
      url: `https://api.openweathermap.org/data/2.5/weather?q=`,
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

<style>
#app {
  font-weight: bold;

}

</style>
