<template>
  <div class="settings">
    <div class="container">
      <span class="settings-title">Settings</span>
      <button class="close-btn" @click="$emit('settings-close')"></button>
    </div>
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
      <span class="handle">
        <span class="handle-line"></span>
        <span class="handle-line"></span>
        <span class="handle-line"></span>
        </span>
      <span class="location-name">{{ location }} </span>
      <button class="remove-btn" @click="$emit('remove-location', n)"></button>
      </li>
    </draggable>

    <div>
      <p>Add new city:</p>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <form class="add-form" @submit.prevent="writeNewLocation">
        <input class="input-add-location" v-model="newLocation" @input="resetError">
        <button class="add-btn"></button>
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

<style scoped>
.settings {
  box-sizing: border-box;
  margin: 0 auto;
  width: 320px;
}

.close-btn {
  display: inline-block;
  background-image: url('../img/close.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: none;
  box-shadow: none;
  width: 35px;
  height: 35px;
  background-color: transparent;
  opacity: 0.8;
  margin-left: auto;
  cursor: pointer;
}

.close-btn:hover {
  opacity: 1;
}

.close-btn:active {
  opacity: 0.7;
}

.container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
  align-items: flex-end;
}

.settings-title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
}

.list-group {
  list-style: none;
  margin: 30px auto;
  padding: 0;
}

.list-group-item {
  margin: 15px 0;
  padding: 5px 10px;
  background-color: rgb(206, 206, 206);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.handle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 20px;
  height: 15px;
  margin-right: 20px;
  cursor: move;
}

.handle-line {
  width: 20px;
  height: 2px;
  background-color: #000;
}

.location-name {
  text-transform: uppercase;
}

.remove-btn {
  display: inline-block;
  background-image: url('../img/remove.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: none;
  box-shadow: none;
  width: 25px;
  height: 25px;
  background-color: transparent;
  opacity: 0.8;
  margin-left: auto;
  cursor: pointer;
}

.remove-btn:hover {
  opacity: 1;
}

.remove-btn:active {
  opacity: 0.7;
}

.input-add-location {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid;
  outline: none;
}

.input-add-location:focus {
  border-bottom: 2px solid;
}

.add-btn {
  display: inline-block;
  background-image: url('../img/enter.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: none;
  box-shadow: none;
  width: 35px;
  height: 35px;
  background-color: transparent;
  opacity: 0.8;
  margin-left: auto;
  cursor: pointer;
}

.add-btn:hover {
  opacity: 1;
}

.add-btn:active {
  opacity: 0.7;
}

.add-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message {
  padding: 7px 5px;
  background-color: rgb(255, 125, 125);
  border-radius: 2px;
}
</style>
