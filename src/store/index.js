import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    searchString: ''
  },
  getters: {
    getData: state => {
      return state.data
    }
  },
  mutations: {
    setData (state, data) {
      state.data = data;

    }
    
  },
  actions: {
    async getData(context) {
      console.log('Fetching data...')
      const data = await axios.get(`http://localhost:8080/entries`)
      context.commit("setData", data)
      console.log('Done.')
    }
  },
  modules: {
  }
})
