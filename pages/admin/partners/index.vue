<template>
  <v-card>
    <v-card-title>
      Lista de socios
    </v-card-title>
    <v-card-text>
      aaa
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
export default Vue.extend({
  name: 'PartnersIndex',
  mounted () {
    this.retrievePartners()
  },
  methods: {
    ...mapMutations('partners', ['setPartners']),
    async retrievePartners () {
      const data = await this.$axios.get('/partners')
      console.log(data)
    }
  }
})
</script>
