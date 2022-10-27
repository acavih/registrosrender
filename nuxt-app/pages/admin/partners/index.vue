<template>
  <v-card :disabled="loading">
    <v-card-title> Listado de socios </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="filters.searchQuery"
        hint="Código · Nombre · Apellidos · Teléfono · Tarjeta SIP · Correo electronico"
        label="Buscar usuarios"
      />
      <partners-table
        :loading="loading"
        :partners="partners"
        :totalItems="totalItems"
        :options.sync="options"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PartnersTable from "../../../components/partners/PartnersTable.vue";
import InputResource from "../../../components/resources/InputResource.vue";

export default {
  components: { InputResource, PartnersTable },
  name: "PartnerList",
  data() {
    const { searchQuery = "" } = this.$route.query;
    return {
      loading: false,
      options: {},
      filters: {
        searchQuery,
      },
    };
  },
  head() {
    return {
      title: "Listado de socios",
    };
  },
  computed: {
    ...mapState("partners", ["partners", "totalItems"]),
    queryToSend() {
      return {
        ...this.options,
        ...this.filters,
      };
    },
  },
  async mounted() {
    await this.retrieveData();
  },
  watch: {
    queryToSend: {
      deep: true,
      async handler() {
        await this.retrieveData();
        this.$router.push({ query: this.queryToSend });
      },
    },
  },
  methods: {
    ...mapActions({
      retrievePartners: "partners/retrievePartners",
    }),
    async retrieveData() {
      try {
        this.loading = true;
        await this.retrievePartners(this.queryToSend);
        console.log(this.formData);
        this.loading = false;
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error);
          return console.log("ERROR DE AXIOS");
        }
        console.log(error);
      }
    },
  },
};
</script>
