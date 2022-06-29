import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import {mapState} from 'vuex'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  computed: mapState({
    data: state => state.data,
    dataAlias: 'data'
  }),
  render: h => h(App)
}).$mount('#app')
