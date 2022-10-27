<template>
  <v-card :disabled="loading">
    <v-card-title> Listado de socios </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="partners"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalItems"
      >
        <template #[`item.actions`]="{ item }">
          <v-btn color="secondary" small elevation="0">Ver detalles</v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import InputResource from "../../../components/resources/InputResource.vue";

export default {
  components: { InputResource },
  name: "PartnerList",
  data() {
    const { itemsPerPage = 20, page = 1 } = this.$route.query;
    return {
      loading: false,
      options: {
        itemsPerPage: Number(itemsPerPage),
        page: Number(page),
      },
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Tarjeta sip", value: "sipcard" },
        { text: "Correo electrónico", value: "correoelectronico" },
        { text: "Telefono", value: "telefono" },
        { text: "Acciones", value: "actions", align: "right" },
      ],
    };
  },
  head() {
    return {
      title: "Listado de socios",
    };
  },
  computed: {
    ...mapState("partners", ["partners", "totalItems"]),
  },
  async mounted() {
    await this.retrieveData();
  },
  watch: {
    options: {
      deep: true,
      async handler() {
        await this.retrieveData();
        this.$router.push({ query: this.options });
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
        await this.retrievePartners(this.options);
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
