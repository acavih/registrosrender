<template>
  <v-sheet>
    <v-toolbar elevation="0">
      <v-toolbar-title>
        Pruebas
      </v-toolbar-title>
      <v-spacer />
      <v-btn color="primary" elevation="0" @click="addingEnfermedad = true">
        Añadir prueba
      </v-btn>
    </v-toolbar>
    <v-simple-table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Enfermedad</th>
          <th>Resultado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="enfermedad in enfermedades" :key="enfermedad._id">
          <td>
            <menu-datepicker v-model="enfermedad.dateTest" />
          </td>
          <td>
            <input-resource v-model="enfermedad.enfermedad" :label="'Enfermedad'" :type-resource="'enfermedad'" />
          </td>
          <td>
            <v-checkbox v-model="enfermedad.result" />
          </td>
          <td>
            <v-btn small elevation="0" color="error">
              Eliminar
            </v-btn>
            <v-btn small elevation="0" color="primary">
              Salvar
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="addingEnfermedad" width="500">
      <v-card tag="form" @submit.prevent="addEnfermedad">
        <v-card-title>
          Añadir nuevo test
        </v-card-title>
        <v-card-text>
          <menu-datepicker v-model="testCreating.dateTest" />
          <input-resource v-model="testCreating.enfermedad" :label="'Enfermedad'" :type-resource="'enfermedad'" />
          <v-checkbox v-model="testCreating.result" label="Test positvo" />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit">
            Guardar test
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import Vue from 'vue'
import InputResource from '../resources/InputResource.vue'
import MenuDatepicker from '../MenuDatepicker.vue'
export default Vue.extend({
  components: { InputResource, MenuDatepicker },
  props: {
    enfermedades: {
      type: Array,
      default: () => ([])
    },
    attentionId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      addingEnfermedad: false,
      listEnfermedades: this.enfermedades,
      testCreating: {
        result: false,
        dateTest: new Date(),
        enfermedad: '',
        attention: this.attentionId
      }
    }
  },
  watch: {
    listEnfermedades () {
      this.$emit('update:enfermedades', this.listEnfermedades)
    }
  },
  methods: {
    async addEnfermedad () {
      console.log(this.testCreating)
      const enfermedad = await this.$axios.post('/enfermedades', this.testCreating)
      this.listEnfermedades.push(enfermedad.data.payload)
      this.testCreating.result = false
      this.testCreating.dateTest = new Date()
      this.testCreating.enfermedad = null
      this.addingEnfermedad = false
    }
  }
})
</script>
