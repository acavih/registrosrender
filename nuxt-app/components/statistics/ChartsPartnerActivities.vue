<template>
  <v-row>
    <v-col :cols="6">
      <attentions-derivadoa />
    </v-col>
    <v-col :cols="6">
      <attentions-derivadode />
    </v-col>
    <v-col :cols="6">
      <attentions-type-attention />
    </v-col>
    <v-col :cols="6">
      <attentions-proyectos />
    </v-col>
    <v-col :cols="12">
      <attentions-place-attention />
    </v-col>
    <v-col :cols="12">
      <attentions-formation />
    </v-col>
    <v-col :cols="12">
      <attentions-voluntariado />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import AttentionsDerivadoa from './charts/AttentionsDerivadoa.vue'
import AttentionsDerivadode from './charts/AttentionsDerivadode.vue'
import AttentionsFormation from './charts/AttentionsFormation.vue'
import AttentionsPlaceAttention from './charts/AttentionsPlaceAttention.vue'
import AttentionsProyectos from './charts/AttentionsProyectos.vue'
import AttentionsTypeAttention from './charts/AttentionsTypeAttention.vue'
import AttentionsVoluntariado from './charts/AttentionsVoluntariado.vue'
export default Vue.extend({
  components: {
    AttentionsDerivadoa,
    AttentionsDerivadode,
    AttentionsTypeAttention,
    AttentionsProyectos,
    AttentionsPlaceAttention,
    AttentionsFormation,
    AttentionsVoluntariado

  }
})
</script>
