import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import BuyModalComponent from '@/components/Shared/BuyModal'
import router from './router/router'
import store from './store/store'
import * as fb from 'firebase'
import Vuetify from 'vuetify'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.config.productionTip = true
Vue.component('app-buy-modal', BuyModalComponent)

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
    new Promise((resolve, reject) => {
      fb.auth().onAuthStateChanged(user => {
        if (user) {
          this.$store.dispatch('autoLoginUser', user)
          resolve()
        }
      })
    })
      .then(() => {
        this.$store.dispatch('fetchAds')
        this.$store.dispatch('fetchOrders')
      })
  },
  render: h => h(App)
}).$mount('#app')
