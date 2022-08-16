<template>
  <v-card>
    <v-card-title>
      Lista de socios
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="partners"
        :server-items-length="totalDocs"
        :headers="headersTable"
        :options.sync="options"
        :footer-props="footerProps"
      >
        <template #item.actions="{ item }">
          <v-btn
            color="primary"
            elevation="0"
            small
          >
            Ver miembro
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
export default Vue.extend({
  name: 'PartnersIndex',
  data () {
    return {
      headersTable: [
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Tarjeta sip', value: 'sipcard' },
        { text: 'Correo electrónico', value: 'correoelectronico' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Acciones', value: 'actions' }
      ],
      options: {
        itemsPerPage: 20
      },
      footerProps: {
        'items-per-page-options': [20, 40, 60, 80, 100]
      }
    }
  },
  computed: {
    ...mapState('partners', ['partners', 'totalDocs'])
  },
  mounted () {
    this.retrievePartners()
  },
  methods: {
    ...mapMutations('partners', ['setPartners']),
    async retrievePartners () {
      const data = await this.$axios.get('/partners')
      this.setPartners(data.data.payload)
    }
  }
})
</script>
