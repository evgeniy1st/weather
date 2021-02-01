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
      <input v-model="newLocation">
      <button @click="writeNewLocation">add</button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

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
      appid: `&appid=f9b67de5dadca5ac83f5c454e3da8dbf`,
      units: `&units=metric`,
      url: `https://api.openweathermap.org/data/2.5/weather?q=`,
      newLocation: null,
      list: this.locationList,
      dragging: false
    }
  },

  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },

  methods: {
    async writeNewLocation() {
      if (!this.newLocation || this.locationList.includes(this.newLocation)) {
        return;
      }
      try {
        const response = await fetch(this.url + this.newLocation + this.units + this.appid);
        if (response.ok) {
          this.newLocation = '';
          const city = await response.json();
          this.$emit('write-location', city.name)
        }
      } catch (e) {
        alert(e.message)
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
