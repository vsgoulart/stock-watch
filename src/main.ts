import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import App from './App.vue'
import { store } from './store'

Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://159.89.15.214:8080/', {
  store,
  format: 'json',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 500,
})
Vue.use(VueMaterial)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
