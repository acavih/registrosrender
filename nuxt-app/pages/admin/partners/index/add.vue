<template>
  <v-dialog @click:outside="$router.go(-1)" :value="true">
    <partner-form
      @cancel="$router.go(-1)"
      @submit="(data) => addPartner(data)"
    />
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import PartnerForm from "../../../../components/partners/PartnerForm.vue";
export default {
  components: { PartnerForm },
  name: "add.vue",
  head() {
    return {
      title: "Añadir socio",
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      addPartner: "partners/addPartner",
    }),
  },
};
</script>
