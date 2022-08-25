<template>
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
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    partners: {
      required: true,
      default: () => ([]),
      type: Array
    },
    totalDocs: {
      required: true,
      default: null,
      type: Number
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    },
    optionsTable: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      headersTable: [
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Tarjeta sip', value: 'sipcard' },
        { text: 'Correo electrónico', value: 'correoelectronico' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Query', value: 'qUser' },
        { text: 'Acciones', value: 'actions' }
      ],
      options: this.optionsTable,
      footerProps: {
        'items-per-page-options': [20, 40, 60, 80, 100]
      }
    }
  },
  watch: {
    options () {
      this.$emit('update:optionsTable', this.options)
    }
  }
})
</script>
