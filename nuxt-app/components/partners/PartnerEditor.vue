<template>
  <v-sheet>
    <v-card>
      <v-card-title>
        Editor de socios
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col :cols="2">
            <v-text-field label="Código" v-model="partner.codigo" />
          </v-col>
          <v-col :cols="5">
            <v-text-field label="Nombre" v-model="partner.nombre" />
          </v-col>
          <v-col :cols="5">
            <v-text-field label="Apellidos" v-model="partner.apelldios" />
          </v-col>

          <v-col :cols="6">
            <v-text-field label="Teléfono" v-model="partner.telefono" />
          </v-col>
          <v-col :cols="6">
            <v-text-field label="Correo elecrónico" v-model="partner.correoelectronico" />
          </v-col>

          <v-col :cols="6">
            <v-text-field label="Tarjeta sip" v-model="partner.sipcard" />
          </v-col>
          <v-col :cols="6">
            <menu-datepicker v-model="partner.fechanacimiento" :label="'Fecha de nacimiento'" />
          </v-col>

          <v-col :cols="3">
            <input-resource :label="'Sexos'" v-model="partner.sexo" />
          </v-col>
          <v-col :cols="3">
            <input-resource :label="'Socio o no'" v-model="partner.socioono" />
          </v-col>
          <v-col :cols="3">
            <input-resource :label="'Ciudad residencia'" v-model="partner.ciudadresidencia" />
          </v-col>
          <v-col :cols="3">
            <input-resource :label="'Nacionalidad'" v-model="partner.nacionalidad" />
          </v-col>

          <v-col :cols="12">
            <input-resource :label="'Como nos conoció'" v-model="partner.howDidKnowUs" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" elevation="0" color="primary">
          Guardar socio
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import MenuDatepicker from '../MenuDatepicker.vue'
import InputResource from '../resources/InputResource.vue'
export default {
  components: { MenuDatepicker, InputResource },
  data () {
    return {
      partner: {
        nombre: '',
        codigo: '',
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
        ciudadresidencia: '',
        howDidKnowUs: ''
      }
    }
  }
}
</script>
