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
    dialog: false,
    headers: [{
      text: "API",
      value: "API"
    }, 
    {
      text: "Description",
      value: "Description"
    }, 
    {
      text: "Authentication",
      value: "Auth"
    }, 
    {
      text: "HTTPS",
      value: "HTTPS"
    }, 
    {
      text: "Cors",
      value: "Cors"
    }, 
    {
      text: "Link",
      value: "Link"
    }, 
    {
      text: "Category",
      value: "Category"
    }]
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
    },
    getHeaders: state => {
      return state.headers
    },
    getDialog: state => {
      return state.dialog
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
    clearDisplay (state) {
      state.display = []
      state.entriesBySearch = []
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
    },
    setSearch (state, search) {
      state.search = search
    },
    setDialog(state, bool) {
      state.dialog = bool
    }
  },
  actions: {
    async getData(context, getters) {
      console.log('Initializing...')
      const data = await axios.get(`http://localhost:8080/getdata`)
      context.commit("setData", data)
      context.commit("setEntries", data)
      var entries = data.data.entries
      //context.commit("setDisplay", entries)
      console.log('Done.')
    },
    getCategoryList(context) {
      context.commit("setDialog", true)
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
      context.commit("setDisplay", entriesByCategory)
    },
    search(context, search) {
      context.commit("setCategories", [])
      context.commit("clearDisplay")
      var entriesBySearch = context.getters.getEntries.filter(function(entry){
        if (entry.Description.toLowerCase().includes(search.toLowerCase()) || 
            entry.Category.toLowerCase().includes(search.toLowerCase())){
          return entry
        }
      })
      context.commit("setDisplay", entriesBySearch)
    },
    clearEntries(context) {
      context.commit("setEntriesBySearch", [])
    },
    updateSearch (context, search){
      context.commit("setSearch", search)
    },
    setDialog(context, bool) {
      context.commit("setDialog", bool )
    }
  },
  modules: {
  }
})
