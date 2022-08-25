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
        <partners-table
          :options-table="options"
          :partners="partners"
          :loading="loading"
          :total-docs="totalDocs"
        />
      </v-card-text>
    </v-card>
    <nuxt />
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import PartnersTable from '../../../components/partners/PartnersTable.vue'
export default Vue.extend({
  name: 'PartnersIndex',
  components: { PartnersTable },
  data () {
    const { page = 1, itemsPerPage = 20 } = this.$route.query
    return {
      qUser: this.$route.query.qUser || '',
      loading: false,
      options: {
        itemsPerPage: Number(itemsPerPage),
        page: Number(page)
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
