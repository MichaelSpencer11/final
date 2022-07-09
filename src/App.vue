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
      <span>
      <v-text-field
        label="Search Public APIs"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
        hint="Press Enter to search" 
        :value="search"
        @input="updateSearch"
        @keyup.enter="doSearch"
      >{{this.search}}
      </v-text-field>
      <v-btn @click="doSearch">
        <v-icon  class="flex align-center">mdi-magnify</v-icon>
      </v-btn>
      </span>
      <div class="text-center">
    <v-dialog
      v-model="dialog"
      fullscreen
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="showCategoryList"
        >
          Categories
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Categories
        </v-card-title>

        <v-card-text>
          Please choose a category.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-card>
            <v-btn-toggle
              v-model="toggle_exclusive"
              tile
              color="deep-purple accent-3"
              group
            >
            <v-card>
          <v-btn v-for="(category, index) in categories" 
                  :key="index"
                  text
                  @click="selectCategory(category)"
                  >{{category}}
          </v-btn>
          </v-card>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="setDialog(false)"
          >
            Accept
          </v-btn>
          </v-card>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      <v-divider></v-divider>
    </v-sheet>
      <v-data-table  :headers="headers"
                     :items="display"
                     :items-per-page="5"
                     class="elevation-1"
                     :item-key="entriesByCategory.API">
      </v-data-table>
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
    },
    dialog() {
      return this.$store.getters.getDialog
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
    },
    setDialog(bool) {
      this.$store.dispatch("setDialog", bool)
    }
  },
  mounted() {
    this.$store.dispatch("getData")
    this.$store.dispatch("getCategoryList")
    this.$store.dispatch("setDialog", false)
  },
  data: () => ({
    return: {
    }
  }),
};
</script>

<style scoped>

</style>
