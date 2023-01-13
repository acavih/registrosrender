<template>
  <v-sheet>
    <v-card>
      <v-card-title>Socios</v-card-title>
      <v-card-text>
        contenido
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.retrievePartners()
  },
  methods: {
    ...mapActions('partners', ['retrievePartners'])
  }
}
</script>
