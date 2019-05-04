<template>
  <v-dialog 
  v-if="$store.getters.user.id == this.ad.ownerId"
  width="400px"
  v-model="modal"
  >
    <v-btn
    class="warning mr-2"
    flat
    slot="activator"
    >Edit</v-btn>
    <v-card>
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
              <v-text-field
              name="Title"
              label="Title"
              type="text"
              v-model="editedTitle"
              ></v-text-field>
              <v-textarea
              name="Description"
              label="Description"
              type="text"
              multi-line
              v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
         <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="onDelete()" flat color="error">Delete Ad</v-btn>
              <v-btn @click="onCancel()" flat color="warning">Cancel</v-btn>
              <v-btn @click="onSave()" flat class="success">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })
        this.modal = false
      }
    },
    onDelete () {
      this.$store.dispatch('deleteAd', this.ad.id)
        .then(() => { 
            this.$router.push('/list')
            //window.location.reload()
          })
        .catch(() => {})
    }
  }
}
</script>
