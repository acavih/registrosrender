<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      Últimas atenciones
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items-per-page="pagination.limit"
        :page.sync="pagination.page"
        :headers="headers"
        :items="data"
        :loading="loading"
        :server-items-length="totalDocs"
        :footer-props="{
          'items-per-page-options': [20, 40, 60, 80, 100]
        }"
      >
        <template #[`item.user`]="{item}">
          {{ item.user.nombre }} {{ item.user.apellidos }} ({{ item.user.telefono || item.user.correoelectronico }})
        </template>
        <template #[`item.actions`]="{item}">
          <v-btn :to="'/admin/partners/' + item.user._id" elevation="0" color="primary" small>
            Ver usuario
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'LastAttentions',
  data () {
    return {
      loading: false,
      pagination: {
        page: Number(this.$route.query.page) || 1,
        limit: Number(this.$route.query.limit) || 60
      },
      totalDocs: 0,
      data: [],
      headers: [
        { text: 'Comentario', value: 'comentario' },
        { text: 'Socio', value: 'user', width: 400 },
        { text: 'Acciones', value: 'actions', width: 200 }
      ]
    }
  },
  head () {
    return {
      title: 'Últimas atenciones'
    }
  },
  watch: {
    pagination: {
      deep: true,
      handler () {
        this.retrieveData()
        window.scrollTo(0, 0)
      }
    }
  },
  async mounted () {
    await this.retrieveData()
  },
  methods: {
    async retrieveData () {
      try {
        this.loading = true
        const attentionsReq = await this.$axios.get('/attentions/last', {
          params: this.pagination
        })
        this.data = attentionsReq.data.payload.attentions
        this.totalDocs = attentionsReq.data.payload.total
        this.$router.push({
          query: this.pagination
        })
        console.log(this.data[0])
        this.loading = false
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error)
          return console.log('ERROR DE AXIOS')
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
