<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" color="error" style="margin-left: 10px;" dark v-bind="attrs" v-on="on">
        Eliminar atención
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="dark error white--text">
        ¿Estas seguro que deseas eliminar la atención
      </v-card-title>
      <v-card-text style="padding-bottom: 0px;">
        <v-alert style="margin: 0px;">
          Tenga en cuenta que esta acción no se puede deshacer
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" elevation="0" @click="doRemoveAttention">
          Eliminar atencion
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AttentionEditor from "./AttentionEditor.vue";
import { mapActions } from "vuex";
export default {
  components: { AttentionEditor },
  props: {
    attention: {
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
    ...mapActions('attentions', ['removeAttention']),
    async doRemoveAttention() {
      await this.removeAttention(this.attention._id)
      this.dialog = false
      // this.$store.dispatch('attentions/getUserAttentions', this.$route.params.partnerId)
      this.$dialog.notify.success('La atención fue eliminada')
    }
  }
};
</script>
