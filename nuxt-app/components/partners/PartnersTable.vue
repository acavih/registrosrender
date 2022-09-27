<template>
  <v-data-table
    :loading="loading"
    :items="partners"
    :server-items-length="totalDocs"
    :headers="headersTable"
    :options.sync="options"
    :footer-props="footerProps"
    :item-key="'_id'"
    :expanded.sync="expandedItems"
    show-expand
  >
    <template #top>
      <v-toolbar elevation="0" />
    </template>
    <template #[`item.actions`]="{ item }">
      <v-btn
        color="secondary"
        elevation="0"
        small
        :to="'/admin/partners/' + item._id"
      >
        Ver miembro
      </v-btn>
    </template>
    <template #[`item.data-table-expand`]="{ item, expand, isExpanded }">
      <template v-if="item.cosaspendientes || item.comentario">
        <v-badge dot overlap>
          <v-btn icon elevation="0" @click="expand(!isExpanded)">
            <v-icon>
              {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
          </v-btn>
        </v-badge>
      </template>
      <template v-else>
        <v-btn icon elevation="0" @click="expand(!isExpanded)">
          <v-icon>
            {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </template>
    </template>
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-sheet class="pa-5" color="transparent">
          <v-card outlined>
            <v-card-text>
              <v-alert v-if="item.qUser" color="grey darken-3" dark>
                {{ item.qUser }}
              </v-alert>
              <v-alert v-if="item.comentario" color="blue" dark>
                {{ item.comentario }}
              </v-alert>
              <v-alert v-if="item.cosaspendientes" type="warning">
                {{ item.cosaspendientes }}
              </v-alert>
            </v-card-text>
          </v-card>
        </v-sheet>
      </td>
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
    allExpanded: {
      type: Boolean,
      default: false
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
        { text: '', value: 'data-table-expand' },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Tarjeta sip', value: 'sipcard' },
        { text: 'Correo electrónico', value: 'correoelectronico' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Acciones', value: 'actions' }
      ],
      expandedItems: [],
      options: this.optionsTable,
      footerProps: {
        'items-per-page-options': [20, 40, 60, 80, 100]
      }
    }
  },
  computed: {
    isAllItemsExpanded () {
      return this.expandedItems.length === this.partners.length
    }
  },
  watch: {
    options () {
      this.$emit('update:optionsTable', this.options)
    },
    allExpanded () {
      this.expandedItems = this.isAllItemsExpanded ? [] : this.partners
    },
    expandedItems () {
      console.log('CHANGED EXPANDED ITEMS')
      this.$emit('update:isAllItemsExpanded', this.isAllItemsExpanded)
    }
  }
})
</script>
