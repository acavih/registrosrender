<template>
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
</template>

<script>
export default {
  props: {
    partners: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const { itemsPerPage = 20, page = 1 } = this.$route.query;

    return {
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
  watch: {
    options: {
      deep: true,
      handler() {
        this.$emit("update:options", this.options);
      },
    },
  },
};
</script>

<style>
</style>
