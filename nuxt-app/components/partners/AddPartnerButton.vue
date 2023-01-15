<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" :disabled="disabled" color="primary" dark v-bind="attrs" v-on="on">
        Añadir socio
      </v-btn>
    </template>

    <partner-editor v-if="dialog" @submit="doCreatePartner" />
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import PartnerEditor from './PartnerEditor.vue';
export default {
  components: { PartnerEditor },
  props: {
    disabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions('partners', ['createPartner']),
    async doCreatePartner(partnerInfo) {
      try {
        await this.createPartner(partnerInfo)
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
