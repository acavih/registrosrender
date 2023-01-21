<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" color="primary" dark v-bind="attrs" v-on="on">
        Añadir atención
      </v-btn>
    </template>

    <attention-editor v-if="dialog" ref="form" @submit="doCreateAttention" />
  </v-dialog>
</template>

<script>
import AttentionEditor from "./AttentionEditor.vue";
import { mapActions } from "vuex";
export default {
  components: { AttentionEditor },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions('attentions', ['createAttention']),
    async doCreateAttention(attentionInfo) {
      const payload = {
        ...attentionInfo,
        user: this.$route.params.partnerId
      }
      await this.createAttention(payload)
      this.dialog = false
      // TODO: Evitar tener que recuperar todas la atenciones...
      this.$emit('reload')
      this.$dialog.notify.success('La atención fue añadida')
    }
  }
};
</script>
