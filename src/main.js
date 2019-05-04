import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import * as fb from 'firebase'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCkZjK4DlU5Rzo4sXS1xZilU0hR-5HDvLw',
      authDomain: 'itc-ads-31a88.firebaseapp.com',
      databaseURL: 'https://itc-ads-31a88.firebaseio.com',
      projectId: 'itc-ads-31a88',
      storageBucket: 'itc-ads-31a88.appspot.com',
      messagingSenderId: '1037262943960'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
