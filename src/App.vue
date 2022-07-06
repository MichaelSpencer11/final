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
      <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        label="Search Public APIs"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
        hint="Press enter to search"
      ><v-spacer></v-spacer>
      </v-text-field>
      <v-icon @click="update" class="flex align-center" @keydown.enter="update">mdi-magnify</v-icon>
      <v-divider></v-divider>
      <v-toolbar class="primary lighten-2">
        <v-toolbar-items>
          <v-btn @click="showAPIList" borderless color="white" group="true">API</v-btn>
          <v-btn borderless color="white" group="true">Description</v-btn>
          <v-btn @click="showCategoryList" borderless color="white" group="true">Category</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-sheet>
    <v-card-text>
      <v-card>
        {{display}}
      </v-card>
      <v-card>
        <v-btn v-for="category in categories" 
              :key="category"
              @click="selectCategory(category)">
          {{category}}
        </v-btn>
      </v-card>
      <v-card>
        <v-btn v-for="entry in entriesByCategory" 
              :key="entry.API"
              @click="selectCategory">{{entry}}</v-btn>
      </v-card>
    </v-card-text>
  </v-card>
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
    data () {
      return this.$store.getters.getData
    },
    entries () {
      return this.$store.getters.getEntries
    },
    display () {
      return this.$store.getters.getDisplay
    },
    categories () {
      return this.$store.getters.getCategories
    },
    entriesByCategory () {
      return this.$store.getters.getEntriesByCategory
    }
  },
  methods: {
    update() {
      this.$store.dispatch("getData")
    },
    showAPIList() {
      this.$store.dispatch("getAPIList")
    },
    showCategoryList() {
      this.$store.dispatch("getCategoryList")
    },
    selectCategory(category) {
      this.$store.dispatch("displayEntries", category)
    }
  },
  mounted () {
    this.$store.dispatch("getData")
  },
  data: () => ({
    return: {
      
    }
  }),
};
</script>

<style scoped>

</style>
