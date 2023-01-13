<template>
  <v-sheet>
    <v-card>
      <v-card-title>Socios</v-card-title>
      <v-card-text>
        <v-text-field label="Buscar socio" v-model="searchQuery" />
        <v-data-table
          :headers="headers"
          :items="partnersList"
          :items-per-page="20"
          :server-items-length="totalItems"
          :options.sync="options"
        >
          <template #[`item.actions`]="{item}">
            <v-btn color="primary" small elevation="0" :to="'/admin/partners/' + item._id">Ver detalles</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: 'Listado de socios'
    }
  },
  data () {
    return {
      searchQuery: this.$route.query.searchQuery || '',
      options: {
        page: Number(this.$route.query.page),
        itemsPerPage: Number(this.$route.query.itemsPerPage)
      },
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Email', value: 'correoelectronico' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Acciones', value: 'actions' },
      ],
    }
  },
  mounted() {
    this.retrievePartners(this.query)
  },
  computed: {
    ...mapState('partners', ['partnersList', 'totalItems']),
    query() {
      return {
        ...this.options,
        searchQuery: this.searchQuery
      }
    }
  },
  watch: {
    query() {
      this.$router.push({query: this.query})
      this.retrievePartners(this.query)
    }
  },
  methods: {
    ...mapActions('partners', ['retrievePartners'])
  }
}
</script>
