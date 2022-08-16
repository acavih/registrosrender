<template>
  <v-dialog :value="true" @click:outside="$router.go(-1)">
    <partner-form />
  </v-dialog>
</template>
<script>
import Vue from 'vue'
import PartnerForm from '@/components/partners/PartnerForm.vue'
export default Vue.extend({
  name: 'AddPartner',
  components: { PartnerForm }
})
</script>
