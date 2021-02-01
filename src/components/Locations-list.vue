<template>
  <div class="location-list">
    <button @click="$emit('settings-open')">settings</button>
    <div 
    v-for="(location, n) in locationList" 
    :key="n"
    >
    <Location 
    :location="location" 
    :n="n" 
    />
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

</style>
