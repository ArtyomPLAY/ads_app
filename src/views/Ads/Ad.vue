<template>
  <v-container>
    <v-layout row v-if="ad">
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <edit-ad-modal :ad="ad"></edit-ad-modal>
            <v-btn depressed class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-container>
            <v-layout row>
              <v-flex xs12 class="text-xs-center pt-5 pb-5">
                <v-progress-circular :size="100" :width="4" color="primary" indeterminate></v-progress-circular>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="text-xs-center">
        <h1 class="text--secondary">Error 404</h1>
        <v-btn large depressed color="primary" @click="$router.push('/')">Home page</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAdModal from "../../components/EditAdModal.vue"
export default {
  props: ["id"],
  components: {
    EditAdModal
  },
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id)
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>
