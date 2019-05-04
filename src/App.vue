<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile :to="link.url" v-for="link in links" :key="link.title">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/"
        v-if="isUserLoggedIn"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar flat app dark color="primary">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link class="main-link" tag="span" to="/">Co-part store</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="link in links" :key="link.title" :to="link.url">
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn 
        @click="onLogout()"
        flat to="/"
        v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError()"
        :value="true"
      >
        {{ error }}
        <v-btn dark flat @click="closeError()">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "bookmark_border", url: "/orders" },
          { title: "New Ad", icon: "note_add", url: "/new" },
          { title: "My Ads", icon: "list", url: "/list" }
        ]
      } else {
        return [
          { title: "Login", icon: "lock", url: "/login" },
          { title: "Registration", icon: "face", url: "/registration" }
        ]
      }
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError")
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style scoped>
.main-link {
  cursor: pointer;
  font-family: "Gilroy", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
}
</style>
