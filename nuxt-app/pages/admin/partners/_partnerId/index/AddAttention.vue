<template>
  <v-dialog :value="true" @click:outside="$router.go(-1)">
    <attention-form />
  </v-dialog>
</template>

<script>
import AttentionForm from "../../../../../components/attentions/AttentionForm.vue";
export default {
  components: { AttentionForm },
  name: "AddAttention",
  head() {
    return {
      title: "Añadir atención",
    };
  },
  mounted() {},
};
</script>
