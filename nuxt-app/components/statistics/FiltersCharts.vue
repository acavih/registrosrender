<template>
  <v-row>
    <v-col :cols="12">
      <div>
        <input-resource v-model="filters.partners.sexo" :multiple="false" :type-resource="'sexos'" :label="'Filtro sexo'" />
      </div>
    </v-col>
    <v-col :cols="12">
      <input-resource v-model="filters.partners.ciudadresidencia" :multiple="false" :type-resource="'residencias'" :label="'Filtro residencia'" />
    </v-col>
    <v-col :cols="12">
      <input-resource v-model="filters.partners.nacionalidad" :multiple="false" :type-resource="'nacionalidads'" :label="'Filtro nacionalidad'" />
    </v-col>
    <v-col :cols="12">
      <input-resource v-model="filters.partners.socioono" :multiple="false" :type-resource="'socioonos'" :label="'Filtro socioono'" />
    </v-col>
  </v-row>
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
