<template>
<v-container>
  <v-layout row>
    <v-flex v-if="!loading && orders.length !== 0" xs12 sm6 offset-sm3>
      <h1 class="text--secondary mb-2">Orders</h1>
      <v-list
          subheader
          two-line
        >
          <v-list-tile avatar
          v-for="order in orders"
          :key="order.id"
          >

            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn class="primary" depressed
              :to="'/ad/'+order.adId"
              >Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
    </v-flex>
    <v-container v-else-if="loading">
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular 
          :size="100"
          :width="4"
          color="primary"
          indeterminate>
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex v-else xs12 class="xs-text-center">
      <h1 class="text--secondary">
        You have no orders yet!
      </h1>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', orderId)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
      
    }
  },
  created () {
    
  }
}
</script>
