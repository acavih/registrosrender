<template>
  <v-dialog :value="true" @click:outside="$router.go(-1)">
    <partner-form @go-back="$router.go(-1)" @submit-partner="submitPartner" />
  </v-dialog>
</template>
<script>
import Vue from 'vue'
import PartnerForm from '@/components/partners/PartnerForm.vue'
export default Vue.extend({
  name: 'AddPartner',
  components: { PartnerForm },
  methods: {
    async submitPartner (partner) {
      try {
        const partnerCreation = await this.$axios.post('/partners', partner)
        this.$dialog.notify.info(partnerCreation.data.message, {})
        this.$router.go(-1)
      } catch (error) {
        if (error.isAxiosError) {
          return this.$dialog.notify.error('Hubo un error durante la creación de el socio', {})
        }
        this.$dialog.notify.error('Hubo un error interno', {})
      }
    }
  }
})
</script>
