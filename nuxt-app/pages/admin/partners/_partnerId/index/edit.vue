<template>
  <v-dialog :value="true" @click:outside="$router.go(-1)">
    <partner-form :partner-to-edit="partnerEditing" @go-back="$router.go(-1)" @submit-partner="updatePartner" />
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import PartnerForm from '@/components/partners/PartnerForm.vue'
export default Vue.extend({
  name: 'EditPartner',
  components: { PartnerForm },
  computed: {
    ...mapState('partners', ['partners']),
    partnerEditing () {
      return this.partners.filter(p => p._id === this.$route.params.partnerId)[0]
    }
  },
  methods: {
    ...mapMutations('partners', ['replacePartner']),
    async updatePartner (partner) {
      try {
        const idPartner = this.$route.params.partnerId
        const update = await this.$axios.put('/partners/' + idPartner, partner)
        this.$dialog.notify.info(update.data.message, {})
        this.replacePartner({
          update: partner,
          idPartner
        })
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
