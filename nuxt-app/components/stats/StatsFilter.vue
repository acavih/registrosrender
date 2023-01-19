<template>
  <v-card :disabled="refreshingAttentions" :loading="refreshingAttentions">
    <v-card-text>
      <v-card elevation="0">
        <v-card-title> Filtro de fecha </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <menu-datepicker
                v-model="rangeDates.sd"
                :label="'Fecha desde'"
              />
            </v-col>
            <v-col cols="6">
              <menu-datepicker
                v-model="rangeDates.ed"
                :label="'Fecha hasta'"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card elevation="0">
        <v-card-title> Filtros de socio </v-card-title>
        <v-card-text>
          <input-resource
            multiple
            :label="'Sexos'"
            :resourceType="'sexos'"
            :readOnly="true"
            v-model="filters.partners.sexo"
          />
          <input-resource
            multiple
            :label="'Estados socio o no'"
            :resourceType="'sexos'"
            :readOnly="true"
            v-model="filters.partners.socioono"
          />
          <input-resource
            multiple
            :label="'Nacionalidad'"
            :resourceType="'nacionalidads'"
            :readOnly="true"
            v-model="filters.partners.nacionalidad"
          />
          <input-resource
            multiple
            :label="'Residencia'"
            :resourceType="'residencias'"
            :readOnly="true"
            v-model="filters.partners.ciudadresidencia"
          />
          <input-resource
            multiple
            :label="'Como nos conocio'"
            :resourceType="'comoNosConoció'"
            :readOnly="true"
            v-model="filters.partners.howDidKnowUs"
          />
        </v-card-text>
      </v-card>
      <v-card elevation="0">
        <v-card-title> Filtros de atenciones </v-card-title>
        <v-card-text>
          <input-resource
            multiple
            :label="'Tipo atenciones'"
            :resourceType="'tipoatenciones'"
            :readOnly="true"
            v-model="filters.attentions.tipoaenciones"
          />
          <input-resource
            multiple
            :label="'Derivado a'"
            :resourceType="'derivaciones'"
            :readOnly="true"
            v-model="filters.attentions.derivadoa"
          />
          <input-resource
            multiple
            :label="'Derivado de'"
            :resourceType="'derivaciones'"
            :readOnly="true"
            v-model="filters.attentions.derivadode"
          />
          <input-resource
            multiple
            :label="'Derivado de'"
            :resourceType="'derivaciones'"
            :readOnly="true"
            v-model="filters.attentions.derivadode"
          />
          <input-resource
            multiple
            :label="'Proyectos'"
            :resourceType="'proyectos'"
            :readOnly="true"
            v-model="filters.attentions.Proyectos"
          />
          <input-resource
            multiple
            :label="'Motivos de atención'"
            :resourceType="'motivosatencions'"
            :readOnly="true"
            v-model="filters.attentions.motivosatencion"
          />
          <input-resource
            multiple
            :label="'Formación'"
            :resourceType="'formacions'"
            :readOnly="true"
            v-model="filters.attentions.formacion"
          />
          <input-resource
            multiple
            :label="'Voluntariado'"
            :resourceType="'Voluntariados'"
            :readOnly="true"
            v-model="filters.attentions.voluntariado"
          />
          <input-resource
            multiple
            :label="'Lugar atencion'"
            :resourceType="'lugaratencions'"
            :readOnly="true"
            v-model="filters.attentions.lugaratencion"
          />
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import MenuDatepicker from "../MenuDatepicker.vue";
import InputResource from "../resources/InputResource.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  components: { MenuDatepicker, InputResource },
  data() {
    return {
      refreshingAttentions: false,
      rangeDates: {
        sd: null,
        ed: null,
      },
      filters: {
        partners: {
          sexo: [],
          socioono: [],
          nacionalidad: [],
          ciudadresidencia: [],
          howDidKnowUs: [],
        },
        attentions: {
          tipoaenciones: [],
          derivadoa: [],
          derivadode: [],
          Proyectos: [],
          motivosatencion: [],
          formacion: [],
          voluntariado: [],
        },
      },
    };
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.updateFilters(this.filters)
      }
    },
    rangeDates: {
      deep: true,
      async handler() {
        if (this.rangeDates.sd === null || this.rangeDates.ed === null) {
          return
        }
        this.refreshingAttentions = true
        await this.retrieveRangeDate(this.rangeDates)
        setTimeout(() => {
          this.refreshingAttentions = false
        }, 1500);
      }
    }
  },
  methods: {
    ...mapActions('attentions', ['retrieveRangeDate']),
    ...mapMutations('stats', {updateFilters: 'filters'})
  }
};
</script>
