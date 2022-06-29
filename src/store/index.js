import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    post: {},
    searchString: ''
  },
  getters: {
    getData: state => {
      return state.data.filter(data => data.entries.API)
    }
  },
  mutations: {
    setData (state, data) {
      state.post = data;
    }
    
  },
  actions: {
    async getData(context) {
      const {data} = await axios.get(`https://api.publicapis.org/entries`);
      context.commit("setData", data)
    }
  },
  modules: {
  }
})
