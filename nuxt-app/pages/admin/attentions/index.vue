<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        Últimas atenciones
      </v-card-title>
      <v-card-text>
        <v-data-table :server-items-length="totalAttentions" :items="attentionList" :headers="headers" :options.sync="options">
          <template #[`item.actions`]="{item}">
            <v-btn :to="'/admin/partners/' + item.user._id" small color="primary" dark elevation="0">Ver socio</v-btn>
          </template>
          <template #[`item.socio`]="{item}">
            {{item.user.nombre}} {{item.user.apellidos}}
          </template>
          <template #[`item.fechaatencion`]="{item}">
            {{item.fechaatencion | dateFilter}}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import globalMixin from '@/mixins/global'
export default {
  mixins: [globalMixin],
  data() {
    return {
      attentionList: [],
      totalAttentions: 0,
      options: {
        itemsPerPage: 20,
        page: 1
      },
      headers: [
        {text: 'Fecha de atención', value: 'fechaatencion'},
        {text: 'Comentario', value: 'comentario'},
        {text: 'Socio', value: 'socio'},
        {text: 'Acciones', value: 'actions'},
      ]
    }
  },
  async mounted() {
    await this.retrieveAttentions()
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.retrieveAttentions()
      }
    }
  },
  methods: {
    async retrieveAttentions() {
      const attentions = await this.$axios.get('/attentions/last', {
        params: this.options
      })
      this.attentionList = attentions.data.payload.attentions
      this.totalAttentions = attentions.data.payload.totalAttentions
    }
  }
}
</script>
