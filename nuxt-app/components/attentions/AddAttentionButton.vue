<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" color="primary" dark v-bind="attrs" v-on="on">
        Añadir atención
      </v-btn>
    </template>

    <attention-editor @submit="doCreateAttention" />
  </v-dialog>
</template>

<script>
import AttentionEditor from "./AttentionEditor.vue";
import { mapActions } from "vuex";
export default {
  components: { AttentionEditor },
  props: {
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions('attention', ['createAttention']),
    async doCreateAttention(resourceInfo) {
      const payload = {
        name: resourceInfo.name,
        type: this.activeType
      }
      await this.createAttention(payload)
      this.dialog = false
    }
  }
};
</script>
