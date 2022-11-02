<template>
  <v-sheet>
    <v-row>
      <v-col cols="6">
        <attentions-by-type />
      </v-col>
      <v-col cols="6">
        <attentions-by-motivos-atention />
      </v-col>
      <v-col cols="6">
        <attentions-by-derived-to />
      </v-col>
      <v-col cols="6">
        <attentions-by-derived-from />
      </v-col>
      <v-col cols="12">
        <attentions-by-formation />
      </v-col>
      <v-col cols="12">
        <attentions-by-lugar-atencion />
      </v-col>
      <v-col cols="12">
        <attentions-by-voluntariado />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import AttentionsByDerivedFrom from "./charts/AttentionsByDerivedFrom.vue";
import AttentionsByDerivedTo from "./charts/AttentionsByDerivedTo.vue";
import AttentionsByFormation from "./charts/AttentionsByFormation.vue";
import AttentionsByLugarAtencion from "./charts/AttentionsByLugarAtencion.vue";
import AttentionsByMotivosAtention from "./charts/AttentionsByMotivosAtention.vue";
import AttentionsByType from "./charts/AttentionsByType.vue";
import AttentionsByVoluntariado from "./charts/AttentionsByVoluntariado.vue";
export default {
  components: {
    AttentionsByType,
    AttentionsByDerivedTo,
    AttentionsByDerivedFrom,
    AttentionsByMotivosAtention,
    AttentionsByFormation,
    AttentionsByLugarAtencion,
    AttentionsByVoluntariado,
  },
};
</script>

<style>
</style>
,
    AttentionsByFormation
