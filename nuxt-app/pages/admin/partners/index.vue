<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        Socios
        <v-spacer />
        <v-btn color="secondary" style="margin-right: 10px;" elevation="0" @click="toggleExpandAll">
          {{ isAllExpanded ? 'Contraer todo' : 'Expandir todo'}}
        </v-btn>
        <add-partner-button :disabled="false" />
      </v-card-title>
      <v-card-text>
        <v-text-field label="Buscar socio" v-model="searchQuery" />
        <v-data-table
          :headers="headers"
          :items="partnersList"
          :items-per-page="20"
          :server-items-length="totalItems"
          :options.sync="options"
          show-expand
          :expanded.sync="expanded"
          item-key="_id"
        >
          <template #[`item.actions`]="{item}">
            <v-btn color="primary" small elevation="0" :to="'/admin/partners/' + item._id">Ver detalles</v-btn>
          </template>
          <template #[`item.data-table-expand`]="{item, expand, isExpanded}">
            <v-badge :color="item.cosaspendientes ? 'blue' : 'transparent'" overlap dot>
              <v-btn @click="expand(!isExpanded)" color="primary" icon small elevation="0">
                <v-icon>
                  {{isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'}}
                </v-icon>
              </v-btn>
            </v-badge>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              More info about {{ item.nombre }}
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import AddPartnerButton from '@/components/partners/AddPartnerButton.vue';
import { mapActions, mapState } from "vuex";
export default {
  components: { AddPartnerButton },
  head() {
    return {
      title: 'Listado de socios'
    }
  },
  data () {
    return {
      searchQuery: this.$route.query.searchQuery || '',
      expanded: [],
      options: {
        page: Number(this.$route.query.page || 1),
        itemsPerPage: Number(this.$route.query.itemsPerPage || 20)
      },
      headers: [
        { text: '', value: 'data-table-expand' },
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
    },
    isAllExpanded() {
      return this.partnersList.length === this.expanded.length
    }
  },
  watch: {
    query() {
      this.$router.push({query: this.query})
      this.retrievePartners(this.query)
    }
  },
  methods: {
    ...mapActions('partners', ['retrievePartners']),
    toggleExpandAll () {
      this.expanded = this.isAllExpanded ? [] : this.partnersList
    }
  }
}
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content
{
  box-shadow: none !important;
}
</style>
