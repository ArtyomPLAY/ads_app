<template>
<v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-1">
              <v-toolbar class="elevation-0" dark color="primary">
                <v-toolbar-title>Sign up</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" 
                v-model="valid" 
                lazy-validation>
                  <v-text-field 
                  prepend-icon="person" 
                  name="email" 
                  label="Email" 
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  ></v-text-field>
                  <v-text-field 
                  id="password" 
                  prepend-icon="lock" 
                  name="password" 
                  label="Password" 
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  ></v-text-field>
                  <v-text-field 
                  id="confirm-password" 
                  prepend-icon="lock" 
                  name="confirm-password" 
                  label="Confirm password" 
                  type="password"
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                @click="onSubmit()"
                :disabled="!valid || loading"
                color="primary" flat
                :loading="loading"
                >Create new account</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be 6 chars at least!'
      ],
      confirmPasswordRules: [
        v => !!v || 'Please, confirm password' ,
        v => (v && v === this.password) || 'Passwords are not equal'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() =>{})
      }
    }
  }
}
</script>
