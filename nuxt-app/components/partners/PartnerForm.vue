<template>
  <v-card tag="form" @submit.prevent="submitData">
    <v-card-title>Editor de socios</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="partnerData.codigo" label="Codigo" />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.nombre" label="Nombre" />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.apellidos" label="Apellidos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="partnerData.correoelectronico" label="Correo electrónico" />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.telefono" label="Telefono" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <menu-datepicker v-model="partnerData.fechanacimiento" label="Fecha de nacimiento" />
        </v-col>
        <v-col>
          <v-text-field v-model="partnerData.sipcard" label="Tarjeta sip" />
        </v-col>
      </v-row>
      <v-textarea v-model="partnerData.observaciones" label="Observaciones">
        {{ partnerData.observaciones }}
      </v-textarea>
      <v-textarea v-model="partnerData.cosaspendientes" label="Cosas pendientes">
        {{ partnerData.cosaspendientes }}
      </v-textarea>

      <v-row>
        <v-col>
          <input-resource v-model="partnerData.sexo" :multiple="false" :type-resource="'sexos'" :label="'Introduzca el sexo'" />
        </v-col>
        <v-col>
          <input-resource v-model="partnerData.socioono" :multiple="false" :type-resource="'socioonos'" :label="'Introduzca socio o no'" />
        </v-col>
        <v-col>
          <input-resource v-model="partnerData.ciudadresidencia" :multiple="false" :type-resource="'residencias'" :label="'Introduzca la residencia'" />
        </v-col>
        <v-col>
          <input-resource v-model="partnerData.nacionalidad" :multiple="false" :type-resource="'nacionalidads'" :label="'Introduzca la nacionalidad'" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn elevation="0" color="secondary" @click="$emit('go-back')">
        Volver
      </v-btn>
      <v-btn color="primary" type="submit" elevation="0">
        Guardar miembro
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import InputResource from '../resources/InputResource.vue'

const defaultMemberData = {
  codigo: '',
  nombre: '',
  apellidos: '',
  fechanacimiento: '',
  sipcard: '',
  correoelectronico: '',
  telefono: '',
  observaciones: '',
  cosaspendientes: '',
  sexo: '',
  socioono: '',
  nacionalidad: '',
  ciudadresidencia: ''
}

export default Vue.extend({
  name: 'FormPartner',
  components: { InputResource },
  props: {
    partnerToEdit: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      partnerData: {}
    }
  },
  created () {
    this.partnerData = this.partnerToEdit === null
      ? { ...defaultMemberData }
      : {
          ...this.partnerToEdit,
          fechanacimiento: new Date(this.partnerToEdit.fechanacimiento)
        }
  },
  methods: {
    submitData () {
      this.$emit('submit-partner', this.partnerData)
    }
  }
})
</script>
