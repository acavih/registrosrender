<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" :disabled="disabled" color="primary" dark v-bind="attrs" v-on="on">
        Actualizar socio
      </v-btn>
    </template>

    <partner-editor :initialPartnerData="initialPartnerData" v-if="dialog" @submit="doUpdatePartner" />
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import PartnerEditor from './PartnerEditor.vue';
export default {
  components: { PartnerEditor },
  props: {
    initialPartnerData: {
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
    ...mapActions('partners', ['updatePartner']),
    async doUpdatePartner(partnerInfo) {
      try {
        await this.updatePartner(partnerInfo)
        this.dialog = false
        this.$dialog.notify.success('El socio se creó con éxito')
      } catch (error) {
        console.error(error)
        this.$dialog.notify.error('Hubo un problema al crear el socio...')
      }
    }
  }
};
</script>
