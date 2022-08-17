<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        Lista de socios
        <v-spacer />
        <v-btn to="/admin/partners/addPartner" color="primary" elevation="0">
          Añadir miembro
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="qUser" hint="Código · Nombre · Apellidos · Teléfono · Tarjeta SIP · Correo electronico" label="Buscar usuarios" />
        <v-data-table
          :loading="loading"
          :items="partners"
          :server-items-length="totalDocs"
          :headers="headersTable"
          :options.sync="options"
          :footer-props="footerProps"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn
              color="primary"
              elevation="0"
              small
              :to="'/admin/partners/' + item._id"
            >
              Ver miembro
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <nuxt />
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
export default Vue.extend({
  name: 'PartnersIndex',
  data () {
    const { page = 1, itemsPerPage = 20 } = this.$route.query
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
        itemsPerPage: Number(itemsPerPage),
        page: Number(page)
      },
      qUser: this.$route.query.qUser || '',
      loading: false,
      footerProps: {
        'items-per-page-options': [20, 40, 60, 80, 100]
      }
    }
  },

  computed: {
    ...mapState('partners', ['partners', 'totalDocs'])
  },
  watch: {
    options: {
      deep: true,
      handler () {
        const { itemsPerPage, page } = this.options
        this.$router.push({
          path: this.$route.path,
          query: { itemsPerPage, page, qUser: this.qUser }
        })
      }
    },
    qUser: 'retrievePartners',
    '$route.query': {
      deep: true,
      handler: 'retrievePartners'
    }
  },
  mounted () {
    this.retrievePartners()
  },
  methods: {
    ...mapMutations('partners', ['setPartners']),
    async retrievePartners () {
      this.loading = true
      const data = await this.$axios.get('/partners', {
        params: {
          ...this.options,
          qUser: this.qUser
        }
      })
      this.setPartners(data.data.payload)
      this.loading = false
    }
  }
})
</script>
