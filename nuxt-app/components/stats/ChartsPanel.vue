<template>
  <v-card>
    <v-card-title>
      Graficos
      <v-spacer />
      <v-btn color="primary" elevation="0">
        Atenciones ({{attentionsFiltered.length}})
      </v-btn>
      <v-btn color="primary" elevation="0" style="margin-left: 10px;">
        Usuarios ({{uniqUsers.length}})
      </v-btn>
    </v-card-title>
    <v-card-text> contenido </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters('stats', ['attentionsFiltered', 'uniqUsers'])
  }
}
</script>
