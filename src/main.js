import Vue from 'vue'
import App from './App.vue'


class WeatherWidget extends HTMLElement {
  constructor() {
    super();
    this.elId = 'app'
  }
  connectedCallback() {
    this.id = this.elId
  }
  attributeChangedCallback() {
  }
}
customElements.define('weather-widget', WeatherWidget);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
