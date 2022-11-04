<template>
  <v-dialog :value="true" @click:outside="$router.go(-1)">
    <partner-form :partnerToEdit="partner" @submit="updatePartner" />
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PartnerForm from "../../../../../components/partners/PartnerForm.vue";
export default {
  components: { PartnerForm },
  name: "EditPartner",
  head() {
    return {
      title: "Editar socio",
    };
  },
  computed: {
    ...mapState({
      partners: (s) => s.partners.partners,
    }),
    partner() {
      return this.partners.filter(
        (p) => p._id === this.$route.params.partnerId
      )[0];
    },
  },
  mounted() {},
  methods: {
    ...mapActions({
      updatePartnerReq: "partners/updatePartner",
    }),
    async updatePartner(data) {
      await this.updatePartnerReq({
        ...data,
      });
      this.$router.go(-1);
    },
  },
};
</script>
