<template>
  <v-toolbar class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link to="/">
        <span class="home">Tab tracker</span>
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <router-link to="songs">
        <v-btn class="cyan">
          Browse
        </v-btn>
      </router-link>
    </v-toolbar-items>
    <v-spacer />
    <v-toolbar-items>
      <router-link to="login">
        <v-btn v-if="!$store.state.isUserLoggedIn" class="cyan">
          Login
        </v-btn>
      </router-link>
      <router-link to="register">
        <v-btn v-if="!$store.state.isUserLoggedIn" class="cyan">
          Sign Up
        </v-btn>
      </router-link>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="cyan"
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #E9E
}

</style>
