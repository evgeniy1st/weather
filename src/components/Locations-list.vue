<template>
  <div class="wrapper">
    <button class="settings-btn" @click="$emit('settings-open')"><span class="no-location-text" v-if="locationList.length === 0">No cities. Add new city in settings</span></button>
    <div class="location-list">
    <div
    class="location-container"
    v-for="(location, n) in locationList" 
    :key="n"
    >
    <Location 
    :location="location" 
    :n="n" 
    />
    </div>
  </div>
  </div>
</template>

<script>
import Location from './Location';

export default {
  name: 'LocationsList',
  props: {
    locationList: Array
  },
  components: {
    Location
  }
}
</script>

<style scoped>
  .wrapper {
    box-sizing: border-box;
    margin: 0 auto;
  }

  .location-list {
    box-sizing: border-box;
    margin: 0 auto;
  }

  .location-container {
    box-sizing: border-box;
    margin: 0 auto;
    width: 320px;
  }

  .settings-btn {
    display: inline-block;
    background-image: url('../img/settings.png');
    background-repeat: no-repeat;
    background-size: 40px;
    background-position: center right;
    border: none;
    box-shadow: none;
    width: 100%;
    height: 50px;
    background-color: transparent;
    opacity: 0.8;
    margin: 5px 0;
    cursor: pointer;
  }

  .settings-btn:hover {
    opacity: 1;
  }

  .settings-btn:active {
    opacity: 0.7;
  }
</style>
