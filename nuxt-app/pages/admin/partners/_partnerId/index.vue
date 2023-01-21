<template>
  <v-sheet>
    <partner-details :currentPartner="currentPartner" v-if="currentPartner" />
    <v-card style="margin-top: 10px;">
      <v-card-title>
        Listado de atenciones
        <v-spacer />
        <add-attention-button @reload="getUserAttentions($route.params.partnerId)" />
      </v-card-title>
      <v-card-text>
        <attention-iterator :attentions="attentions" />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import AttentionIterator from '@/components/attentions/AttentionIterator.vue';
import { mapGetters, mapActions, mapState } from "vuex";
import globalMixin from '@/mixins/global'
import AddAttentionButton from '@/components/attentions/AddAttentionButton.vue';
import PartnerDetails from '@/components/partners/PartnerDetails.vue';
export default {
  components: { AttentionIterator, AddAttentionButton, PartnerDetails },
  mixins: [globalMixin],
  head() {
    return {
      title: 'Página de socio'
    }
  },
  computed: {
    ...mapGetters('partners', ['getPartnerById']),
    ...mapState('partners', ['currentPartner']),
    ...mapState('attentions', ['attentions'])
  },
  async mounted() {
    const { partnerId } = this.$route.params
    if (this.currentPartner?._id !== partnerId) {
      await this.fetchPartner(partnerId)
    }
    await this.getUserAttentions(partnerId)
  },
  methods: {
    ...mapActions('partners', ['fetchPartner']),
    ...mapActions('attentions', ['getUserAttentions'])
  }
}
</script>
