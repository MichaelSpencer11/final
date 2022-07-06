import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    search: '',
    entries: [],
    entriesByCategory: [],
    entriesBySearch: [],
    display: [],
    categories: [],
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
    },
    getEntriesByCategory: state => {
      return state.entriesByCategory
    },
    getSearch: state => {
      return state.search
    },
    getEntriesBySearch: state => {
      return state.entriesBySearch
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
    clearDisplay (state) {
      state.display = []
      state.entriesByCategory = []
    },
    setCategories (state, array) {
      state.categories = array
    },
    setEntriesByCategory (state, array){
      state.entriesByCategory = array
    },
    setEntriesBySearch (state, array) {
      state.entriesBySearch = array
    }
  },
  actions: {
    async getData(context, getters) {
      console.log('Initializing...')
      const data = await axios.get(`http://localhost:8080/entries`)
      context.commit("setData", data)
      context.commit("setEntries", data)
      var entries = data.data.entries
      //context.commit("setDisplay", entries)
      console.log('Done.')
    },
    getAPIList(context) {
      context.commit("setDisplayAPI")
    },
    getCategoryList(context) {
      var entries = context.rootGetters.getEntries
      var categories = []
      entries.forEach(entry => categories.push(entry.Category))
      context.dispatch("removeDuplicates", categories)
      //context.commit("setDisplay", context.getters.getCategories)
    },
    removeDuplicates(context, array) {
                for(var i = 0; i<array.length; i++){
                  if(array[i] == array[i + 1]){
                    array[i] = array[i] + "-test"
                  }
                }
                array = array.filter(function(value, index, arr){
                  return !value.includes("-test")
                });
                context.commit("setCategories", array)
    },
    displayEntries(context, category) {
      context.commit("clearDisplay")
      var entries = context.getters.getEntries
      var entriesByCategory = entries.filter(value => value.Category == category)
      context.commit("setEntriesByCategory", entriesByCategory)
      //context.commit("setDisplay", entriesByCategory)
    },
    search(context) {
      var entriesBySearch = context.getters.getEntries
      entriesBySearch.filter(value => value.Description.includes(context.getters.getSearch))
      context.commit("setEntriesBySearch", entriesBySearch)
    },
    clearEntries(context) {
      context.commit("setEntriesBySearch", [])
    }
  },
  modules: {
  }
})
