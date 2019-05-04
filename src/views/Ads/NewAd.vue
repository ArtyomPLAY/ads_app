<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">Create new Ad</h1>
        <v-form ref="form" v-model="valid" validation>
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>
        <v-layout
        align-center
        row mb-3
        justify-space-between
        wrap
        >
          <v-flex xs12 md2>
            <v-btn
              depressed class="warning"
              @click="triggerUpload()"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
            ref="fileInput"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onFileChange"
            >
            
          </v-flex>
          <v-flex xs12 md3>
            <v-switch
              label="Add to promo?"
              v-model="promo"
              color="primary"
            ></v-switch>
          </v-flex>
          <v-flex xs12 md2>
            <v-layout>
              <v-btn class="success" 
              @click="createAd()"
              :disabled="!valid || !image || loading"
              :loading="loading"
              >Create Ad
            </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <img 
            :src="imageSrc"
            v-if="imageSrc"
            class="preview-image"
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image){
        //logic
        const ad = {
          title: this.title, 
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd',ad)
          .then(() => this.$router.push('/list'))
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
};
</script>

<style scoped>
.preview-image {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 10px 20px #00000046;
}
</style>
