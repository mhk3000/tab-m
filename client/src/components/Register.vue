<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <div>
          <v-text-field
            label="Email address"
            v-model="email">
          </v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password">
          </v-text-field>
          <br>
          <div class="error" v-html="error" />
          <v-btn class="cyan" @click='register' dark>Register</v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.error {
  color: red
}
</style>
