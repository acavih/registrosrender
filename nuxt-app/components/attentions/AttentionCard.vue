<template>
  <v-card outlined style="margin: 10px 0px;" >
    <v-card-title class="primary white--text" style="padding: 5px; margin-bottom: 10px; padding-left: 15px;">
      {{attention.fechaatencion | dateFilter}} ({{attention.tipoaenciones | nameResources}})
    </v-card-title>
    <v-card-text>
      <v-alert v-if="attention.lugaratencion">
        {{attention.lugaratencion.name}}
      </v-alert>

      <v-simple-table>
        <tbody>
          <tr v-for="{key, value} in resourcesKey" :key="key">
            <td>{{value}}</td>
            <td>{{attention[key] | nameResources}}</td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-alert color="primary" dark style="margin-bottom: 0px;">
        {{attention.comentario}}
      </v-alert>

      <v-alert color="error" v-if="attention.cosaspendientes || attention.fechacosaspendientes">
        Cosas pendientes {{attention.fechacosaspendientes}}: {{attention.cosaspendientes}}
      </v-alert>
    </v-card-text>
    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
import globalMixin from '@/mixins/global'
import AddAttentionButton from './AddAttentionButton.vue'
export default {
  components: { AddAttentionButton },
  mixins: [globalMixin],
  filters: {
    nameResources(v) {
      return v.map(a => a.name).join(', ')
    }
  },
  data() {
    return {
      resourcesKey: [
        {key: 'Proyectos', value: 'Proyectos'},
        {key: 'derivadode', value: 'Derivado de'},
        {key: 'derivadoa', value: 'Derivado a'},
        {key: 'motivosatencion', value: 'Motivos de atención'},
        {key: 'formacion', value: 'Formación'},
        {key: 'voluntariado', value: 'Voluntariado'}
      ]
    }
  },
  props: {
    attention: {
      type: Object,
      required: true
    }
  }
}
</script>
