<template>
  <v-sheet>
    <v-row>
      <v-col cols="6">
        <attentions-by-type />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import AttentionsByType from "./charts/AttentionsByType.vue";
export default {
  components: { AttentionsByType },
};
</script>

<style>
</style>
