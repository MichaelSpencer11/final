<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/mspencer009/final2"
        target="_blank"
        text
      >
        <span class="mr-2">Github repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        label="Search Public APIs"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
        hint="Search Public APIs" 
        :value="search"
        @input="updateSearch"
        @keyup.enter="doSearch"
      >{{this.search}}
      </v-text-field>
      <v-btn @click="doSearch">
        <v-icon  class="flex align-center">mdi-magnify</v-icon>
      </v-btn>
      <v-btn @click="showCategoryList">
        Categories
        <v-icon class="flex align-center">mdi-solar-panel-large</v-icon>
      </v-btn>
      
      <v-divider></v-divider>
    </v-sheet>
    <v-card-text>
      <v-card>
        <v-btn v-for="category in categories" 
              :key="category"
              @click="selectCategory(category)">
          {{category}}
        </v-btn>
      </v-card>
      <v-data-table  :headers="headers"
                     :items="display"
                     :items-per-page="5"
                     class="elevation-1"
                     :item-key="entriesByCategory.API">
      </v-data-table>
    </v-card-text>
    </v-main>
  </v-app>
</template>

<script>
import UtilityMethods from './components/UtilityMethods.vue'

export default {
  name: 'App',

  components: {
    UtilityMethods
  },
  computed: {
    data() {
      return this.$store.getters.getData
    },
    entries() {
      return this.$store.getters.getEntries
    },
    display() {
      return this.$store.getters.getDisplay
    },
    categories() {
      return this.$store.getters.getCategories
    },
    entriesByCategory() {
      return this.$store.getters.getEntriesByCategory
    },
    search() {
      return this.$store.getters.getSearch
    },
    entriesBySearch() {
      return this.$store.getters.getEntriesBySearch
    },
    headers() {
      return this.$store.getters.getHeaders
    }
  },
  methods: {
    updateSearch(search) {
      this.$store.dispatch("updateSearch", search)
    },
    showCategoryList() {
      this.$store.dispatch("clearEntries")
      this.$store.dispatch("getCategoryList")
    },
    selectCategory(category) {
      this.$store.dispatch("displayEntries", category)
    },
    doSearch() {
      this.$store.dispatch("search", this.$store.getters.getSearch)
    }
  },
  mounted() {
    this.$store.dispatch("getData")
    this.showCategoryList
  },
  data: () => ({
    return: {
      
    }
  }),
};
</script>

<style scoped>

</style>
