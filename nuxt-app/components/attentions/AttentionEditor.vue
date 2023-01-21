<template>
  <v-card tag="form" @submit.prevent="$emit('submit', attentionData)">
    <v-card-title>
      Editor de atenciones
    </v-card-title>
    <v-card-text>
      <partner-details :readOnly="true" :currentPartner="currentPartner" />
      <v-row style="margin-top: 20px;">
        <v-col cols="12">
          <menu-datepicker :label="'Fecha de atención'" v-model="attentionData.fechaatencion" />
        </v-col>
        <v-col cols="6">
          <input-resource :resourceType="'tipoatenciones'" :label="'Tipo de atenciones'" v-model="attentionData.tipoaenciones" />
        </v-col>
        <v-col cols="6">
          <input-resource :resourceType="'motivosatencions'" :label="'Motivos de atencion'" v-model="attentionData.motivosatencion" />
        </v-col>
        <v-col cols="12">
          <input-resource :resourceType="'proyectos'" :label="'Proyectos'" v-model="attentionData.Proyectos" />
        </v-col>
        <v-col cols="6">
          <input-resource :resourceType="'derivaciones'" :label="'Derivado a'" v-model="attentionData.derivadoa" />
        </v-col>
        <v-col cols="6">
          <input-resource :resourceType="'derivaciones'" :label="'Derivado de'" v-model="attentionData.derivadode" />
        </v-col>
        <v-col cols="6">
          <input-resource :resourceType="'formacions'" :label="'Formacion'" v-model="attentionData.formacion" />
        </v-col>
        <v-col cols="6">
          <input-resource :resourceType="'voluntariados'" :label="'Voluntariado'" v-model="attentionData.voluntariado" />
        </v-col>
        <v-col cols="12">
          <input-resource :multiple="false" :resourceType="'lugaratencions'" :label="'Lugar de atención'" v-model="attentionData.lugaratencion" />
        </v-col>
        <v-col cols="12">
          <v-textarea label="Comentario" v-model="attentionData.comentario" />
        </v-col>
        <v-col cols="12">
          <menu-datepicker :label="'Fecha de cosas pendientes'" v-model="attentionData.fechacosaspendientes" />
        </v-col>
        <v-col cols="12">
          <v-textarea label="Cosas pendientes" v-model="attentionData.cosaspendientes" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import MenuDatepicker from '../MenuDatepicker.vue'
import InputResource from '../resources/InputResource.vue'
import { mapState } from "vuex";
import PartnerDetails from '../partners/PartnerDetails.vue';

const initialData = {
  comentario: '',
  fechaatencion: null,
  tipoaenciones: [],
  Proyectos: [],
  motivosatencion: [],
  derivadoa: [],
  derivadode: [],
  formacion: [],
  voluntariado: [],
  diagnosticos: [],
  lugaratencion: null,
  cosaspendientes: '',
  fechacosaspendientes: null
}

export default {
  components: { MenuDatepicker, InputResource, PartnerDetails },
  props: {
    initialValue: {
      type: Object,
      default: () => initialData
    }
  },
  data() {
    return {
      attentionData: {...this.initialValue}
    }
  },
  computed: {
    ...mapState('partners', ['currentPartner'])
  },
  methods: {
    reset() {
      console.log('resetendo...')
      this.attentionData = {...initialData}
    }
  }
}
</script>
