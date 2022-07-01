import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    searchString: '',
    entries: [],
    display: [],
    categories: []
  },
  getters: {
    getData: state => {
      return state.data
    },
    getEntries: state => {
      return state.entries
    },
    getDisplay: state => {
      return state.display
    },
    getCategories: state => {
      return state.categories
    }
  },
  mutations: {
    setData (state, data) {
      state.data = data
    },
    setEntries (state, data) {
      state.entries = data.data.entries
    },
    setDisplay (state, data) {
      state.display = data
    },
    setDisplayAPI (state) {
      state.display = []
      state.display = state.entries.forEach((state,entry) => state.display.push(entry.API))
    },
    setDisplayCategory (state) {
      state.display = []
      
    },
    addCategory(state, entry) {
      state.display.add(entry.Category)
    },
    removeDuplicates (state, array, key) {
      for (key = 0; key < array.length; key++){
        if(array[key] === array[key+1]) {
          array.pop(array[key])
        } else {
          
        }
      }
      state.categories = array
    }
  },
  actions: {
    async getData(context, getters) {
      console.log('Initializing...')
      const data = await axios.get(`http://localhost:8080/entries`)
      context.commit("setData", data)
      context.commit("setEntries", data)
      var entries = data.data.entries
      context.commit("setDisplay", entries)
      console.log('Done.')
    },
    getAPIList(context) {
      context.commit("setDisplayAPI")
    },
    getCategoryList(context, getters) {
      var entries = context.rootGetters.getEntries
      var categories = []
      entries.forEach(entry => categories.push(entry.Category))
      context.commit("removeDuplicates", categories, 0)
      context.commit("setDisplay", categories)
    }
  },
  modules: {
  }
})
