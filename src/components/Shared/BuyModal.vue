<template>
  <v-dialog 
  v-if="$store.getters.user.id != ad.ownerId"
  width="400px"
  v-model="modal">
    <v-btn
    class="success ml-2"
    flat
    slot="activator"
    >Buy</v-btn>
    <v-card v-if="!success">
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">
                Edit ad
              </h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-form
              ref="form"
              v-model="valid"
              lazy-validation >
                <v-text-field
                name="name"
                label="Your name"
                type="text"
                v-model="name"
                placeholder="Ethan"
                required
                :rules="[v => !!v || 'Name is required']"
                ></v-text-field>
                <v-text-field
                name="phone"
                label="Your phone"
                type="text"
                placeholder="+7 (987) 321 17 83"
                v-model="phone"
                required
                :rules="[v => !!v || 'Phone is required']"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
         <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              @click="onCancel()"
              flat
              color="warning"
              :disabled ="localLoading"
              >Cancel</v-btn>
              <v-btn
              @click="onOrder()"
              flat
              class="success"
              :disabled ="localLoading"
              :loading="localLoading"
              >Order</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card
    v-else-if="success"
    class="green" >
      <v-container align-center>
        <v-flex xs12 class="text-xs-center">
          <v-icon
          style="font-size: 96px"
          color="green lighten-4"
          >check_circle</v-icon>
          <h1
          class="green--text text--lighten-5 display-1"
          >Success order</h1>
        </v-flex>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      valid: false,
      modal: false,
      localLoading: false,
      success: false,
      name: '',
      phone: ''
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = 'this.ad.title'
      this.modal = false
    },
    onOrder () {
      if (this.$refs.form.validate()) {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .then(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.success = true
            setTimeout(() => {
              this.modal = false
              this.success = false
            }, 3000)
          })
          .catch(err => {
            this.localLoading = false
            this.$store.dispatch('setError', err)
          })
      }
    }
  }
}
</script>
