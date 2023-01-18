<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" color="primary" dark v-bind="attrs" v-on="on">
        Editar atención
      </v-btn>
    </template>

    <attention-editor :initialValue="initialDataAttention" v-if="dialog" ref="form" @submit="doUpdateAttention" />
  </v-dialog>
</template>

<script>
import AttentionEditor from "./AttentionEditor.vue";
import { mapActions } from "vuex";
export default {
  components: { AttentionEditor },
  props: {
    initialDataAttention: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions('attentions', ['updateAttention']),
    async doUpdateAttention(attentionInfo) {
      const payload = {
        ...attentionInfo,
        user: this.$route.params.partnerId
      }
      await this.updateAttention(payload)
      this.dialog = false
      // TODO: Evitar tener que recuperar todas la atenciones...
      this.$store.dispatch('attentions/getUserAttentions', this.$route.params.partnerId)
      this.$dialog.notify.success('La atención fue actualizada')
    }
  }
};
</script>
