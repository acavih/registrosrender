<template>
  <v-card tag="form" @submit.prevent="submitAttention">
    <v-card-title>
      Editor de atenciones
    </v-card-title>
    <v-card-text>
      <menu-datepicker v-model="attention.fechaatencion" label="Fecha atencion" />

      <v-row>
        <v-col>
          <input-resource v-model="attention.tipoaenciones" :label="'Tipo de atenciones'" :type-resource="'tipoatenciones'" :multiple="true" />
        </v-col>
        <v-col>
          <input-resource v-model="attention.motivosatencion" :label="'Motivos de atencion'" :type-resource="'motivosatencions'" :multiple="true" />
        </v-col>
      </v-row>
      <input-resource v-model="attention.Proyectos" :label="'Proyectos'" :type-resource="'proyectos'" :multiple="true" />
      <v-row>
        <v-col>
          <input-resource v-model="attention.derivadoa" :label="'Derivado a'" :type-resource="'derivaciones'" :multiple="true" />
        </v-col>
        <v-col>
          <input-resource v-model="attention.derivadode" :label="'Derivado de'" :type-resource="'derivaciones'" :multiple="true" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input-resource v-model="attention.tipoaenciones" :label="'Formacion'" :type-resource="'formacions'" :multiple="true" />
        </v-col>
        <v-col>
          <input-resource v-model="attention.formacion" :label="'Voluntariado'" :type-resource="'voluntariados'" :multiple="true" />
        </v-col>
      </v-row>
      <input-resource v-model="attention.lugaratencion" :label="'Lugar de atencion'" :type-resource="'lugaratencions'" />

      <v-textarea v-model="attention.comentario" label="Comentario">
        {{ attention.comentario }}
      </v-textarea>

      <menu-datepicker v-model="attention.fechacosaspendientes" label="Fecha cosas pendientes" />
      <v-textarea v-model="attention.cosaspendientes" label="Cosas pendientes">
        {{ attention.cosaspendientes }}
      </v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" elevation="0" type="submit">
        Guardar atencion
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import InputResource from '../resources/InputResource.vue'
export default Vue.extend({
  components: { InputResource },
  props: {
    attentionToEdit: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      attention: {
        comentario: '',
        fechaatencion: new Date(),
        tipoaenciones: [],
        Proyectos: [],
        motivosatencion: [],
        derivadoa: [],
        derivadode: [],
        formacion: [],
        voluntariado: [],
        lugaratencion: null,
        cosaspendientes: '',
        fechacosaspendientes: new Date()
      }
    }
  },
  created () {
    if (this.attentionToEdit) {
      this.attention.comentario = this.attentionToEdit.comentario
      this.attention.tipoaenciones = this.attentionToEdit.tipoaenciones
      this.attention.Proyectos = this.attentionToEdit.Proyectos
      this.attention.fechaatencion = this.attentionToEdit.fechaatencion
      this.attention.motivosatencion = this.attentionToEdit.motivosatencion
      this.attention.derivadoa = this.attentionToEdit.derivadoa
      this.attention.derivadode = this.attentionToEdit.derivadode
      this.attention.formacion = this.attentionToEdit.formacion
      this.attention.voluntariado = this.attentionToEdit.voluntariado
      this.attention.lugaratencion = this.attentionToEdit.lugaratencion
      this.attention.cosaspendientes = this.attentionToEdit.cosaspendientes
      this.attention.fechacosaspendientes = this.attentionToEdit.fechacosaspendientes
    }
  },
  methods: {
    submitAttention () {
      this.$emit('submit-attention', this.attention)
    }
  }
})
</script>
