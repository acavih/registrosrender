<template>
  <v-dialog :value="true" @click:outside="$router.go(-1)">
    <attention-form @submit="addAttention" />
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions({
      addAttentionReq: "attentions/addAttention",
    }),
    async addAttention({ _id, ...attention }) {
      await this.addAttentionReq({
        ...attention,
        user: this.$route.params.partnerId,
      });
      this.$router.go(-1);
    },
  },
};
</script>
