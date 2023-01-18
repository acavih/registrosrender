<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" color="error" style="margin-left: 10px;" dark v-bind="attrs" v-on="on">
        Eliminar socio
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="dark error white--text">
        ¿Estas seguro que deseas eliminar este socio y sus {{attentions.length}} atenciones?
      </v-card-title>
      <v-card-text style="padding-bottom: 0px;">
        <v-alert style="margin: 0px;">
          Esta acción no se puede deshacer
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" elevation="0" @click="doRemovePartner">
          Eliminar atencion
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState('attentions', ['attentions'])
  },
  methods: {
    ...mapActions('partners', ['removePartner']),
    async doRemovePartner() {
      await this.removePartner(this.$route.params.partnerId)
      this.dialog = false
      // this.$store.dispatch('attentions/getUserAttentions', this.$route.params.partnerId)
      this.$dialog.notify.success('El socio fue eliminado')
      this.$router.push('/admin/partners')
    }
  }
};
</script>
