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
      <v-text-field
        id="searchBox" 
        placeholder="Search..."
        hint="Press enter to search"
        @keydown.enter="update"
      >
      <v-spacer></v-spacer>
      </v-text-field>
      <v-icon @click="update">mdi-magnify</v-icon>
    </v-app-bar>

    <v-main>
      
      <v-btn>Prev page</v-btn>
      <v-btn>next page</v-btn>
      <div>{{data}}</div>
      <v-btn>Prev page</v-btn>
      <v-btn>next page</v-btn>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'App',

  components: {

  },
  computed: {
    data () {
      return this.$store.state.data
    }
  },
  methods: {
    update() {
      this.$store.dispatch("getData")
    }
  },

  data: () => ({
    return: {
      
    }
  }),
};
</script>

<style scoped>

</style>
