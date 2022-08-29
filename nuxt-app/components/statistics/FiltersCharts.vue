<template>
  <v-expansion-panels multiple accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>Filtros de socios</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col :cols="12">
            <input-resource v-model="filters.partners.sexo" removable :multiple="true" :type-resource="'sexos'" :label="'Filtro sexo'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.partners.ciudadresidencia" removable :multiple="true" :type-resource="'residencias'" :label="'Filtro residencia'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.partners.nacionalidad" removable :multiple="true" :type-resource="'nacionalidads'" :label="'Filtro nacionalidad'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.partners.socioono" removable :multiple="true" :type-resource="'socioonos'" :label="'Filtro socioono'" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>Filtros de atenciones</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.tipoaenciones" removable :multiple="true" :type-resource="'tipoatenciones'" :label="'Filtro tipo atencion'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.derivadoa" removable :multiple="true" :type-resource="'derivaciones'" :label="'Filtro por derviado a'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.derivadode" removable :multiple="true" :type-resource="'derivaciones'" :label="'Filtro por derviado de'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.formacion" removable :multiple="true" :type-resource="'formacions'" :label="'Filtro por formacion'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.motivosatencion" removable :multiple="true" :type-resource="'motivosatencions'" :label="'Filtro por motivo de atencion'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.Proyectos" removable :multiple="true" :type-resource="'proyectos'" :label="'Filtro por proyectos'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.voluntariado" removable :multiple="true" :type-resource="'voluntariados'" :label="'Filtro por voluntariado'" />
          </v-col>
          <v-col :cols="12">
            <input-resource v-model="filters.attentions.lugaratencion" removable :type-resource="'lugaratencions'" :label="'Lugar de atencion'" />
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import InputResource from '../resources/InputResource.vue'
export default Vue.extend({
  components: {
    InputResource

  },
  data () {
    return {
      filters: {
        partners: {},
        attentions: {}
      }
    }
  },
  watch: {
    filters: {
      deep: true,
      handler () {
        try {
          this.chartsFilters({ ...this.filters })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  methods: {
    ...mapMutations('statistics', ['chartsFilters'])
  }
})
</script>
