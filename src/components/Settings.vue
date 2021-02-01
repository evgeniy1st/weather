<template>
  <div id="settigs">
    <button @click="$emit('settings-close')">close</button>
    <draggable 
    tag="ul" 
    :list="list" 
    class="list-group" 
    handle=".handle" 
    @end="$emit('update-location-list')"
    >
      <li
        class="list-group-item"
        v-for="(location, n) in locationList" 
        :key="n"
      >
      <span class="handle">drag</span>
      <span>{{ n+1 }}</span>
      <span class="location">{{ location }}, </span>
      <button @click="$emit('remove-location', n)">remove</button>
      </li>
    </draggable>

    <div>
      <h6>Add new city</h6>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <form @submit.prevent="writeNewLocation">
        <input v-model="newLocation" @input="resetError">
        <button>add</button>
      </form>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import CONST from '../utils'

export default {
  name: 'Settings',
  props: {
    locationList: Array
  },
  components: {
    draggable
  },

  data() {
    return {
      appid: CONST.APPID,
      units: CONST.UNITS,
      url: CONST.ENDPINT,
      newLocation: null,
      list: this.locationList,
      dragging: false,
      errorMessage: null
    }
  },

  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },

  methods: {
    resetError() {
      if (this.errorMessage) {
        this.errorMessage = null;
      }
    },

    async writeNewLocation() {
      if (!this.newLocation) {
        this.errorMessage = CONST.ERROR_MESSAGE.EMPTY_INPUT
        return;
      }
      try {
        const response = await fetch(this.url + this.newLocation + this.units + this.appid);
        if (response.ok) {
          this.newLocation = '';
          const city = await response.json();
          if (this.locationList.includes(city.name)) {
            this.errorMessage = CONST.ERROR_MESSAGE.DOUBLE_CITY
            return
          } else {
            this.$emit('write-location', city.name);
          }
        } else {
          this.errorMessage = CONST.ERROR_MESSAGE.NO_FORECAST
        }
      } catch (error) {
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
