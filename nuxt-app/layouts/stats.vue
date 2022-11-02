<template>
  <v-app v-if="loaded">
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      :mini-variant="miniVariant"
      :clipped="clipped"
      width="500"
      :value="drawerActive"
      fixed
      app
    >
      <v-card>
        <v-card-title> Filtrar por fecha </v-card-title>
        <v-card-text>
          <menu-datepicker v-model="rangeDates.start" :label="'Fecha desde'" />
          <menu-datepicker v-model="rangeDates.end" :label="'Fecha hasta'" />
        </v-card-text>
      </v-card>
      <v-card elevation="0">
        <v-card-title> Filtros de socio </v-card-title>
        <v-card-text>
          <input-resource
            multiple
            :label="'Sexos'"
            :rType="'sexos'"
            v-model="filters.partners.sexo"
          />
          <input-resource
            multiple
            :label="'Estados socio o no'"
            :rType="'sexos'"
            v-model="filters.partners.socioono"
          />
          <input-resource
            multiple
            :label="'Nacionalidad'"
            :rType="'nacionalidads'"
            v-model="filters.partners.nacionalidad"
          />
          <input-resource
            multiple
            :label="'Residencia'"
            :rType="'residencias'"
            v-model="filters.partners.ciudadresidencia"
          />
        </v-card-text>
      </v-card>
      <v-card elevation="0">
        <v-card-title> Filtros de atenciones </v-card-title>
        <v-card-text>
          <input-resource
            multiple
            :label="'Tipo atenciones'"
            :rType="'tipoaenciones'"
            v-model="filters.partners.tipoaenciones"
          />
          <input-resource
            multiple
            :label="'Derivado a'"
            :rType="'derivaciones'"
            v-model="filters.partners.derivadoa"
          />
          <input-resource
            multiple
            :label="'Derivado de'"
            :rType="'derivaciones'"
            v-model="filters.partners.derivadode"
          />
          <input-resource
            multiple
            :label="'Derivado de'"
            :rType="'derivaciones'"
            v-model="filters.partners.derivadode"
          />
          <input-resource
            multiple
            :label="'Proyectos'"
            :rType="'proyectos'"
            v-model="filters.partners.Proyectos"
          />
          <input-resource
            multiple
            :label="'Motivos de atención'"
            :rType="'motivosatencions'"
            v-model="filters.partners.motivosatencion"
          />
          <input-resource
            multiple
            :label="'Formación'"
            :rType="'formacions'"
            v-model="filters.partners.formacion"
          />
          <input-resource
            multiple
            :label="'Voluntariado'"
            :rType="'Voluntariados'"
            v-model="filters.partners.voluntariado"
          />
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark>
      <v-btn icon @click.stop="$router.go(-1)" dark>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <user-menu-component />
    </v-app-bar>
    <v-main>
      <template v-if="$auth.loggedIn">
        <v-container fluid>
          <Nuxt> </Nuxt>
        </v-container>
      </template>
      <template v-else>
        {{ $auth.loggedIn }}
        not logged
      </template>
    </v-main>
  </v-app>
</template>

<script>
import UserMenuComponent from "~/components/auth/UserMenuComponent.vue";
import RedirectComponent from "~/components/RedirectComponent.vue";
import { mapMutations, mapState, mapActions } from "vuex";
import InputResource from "../components/resources/InputResource.vue";
import MenuDatepicker from "../components/MenuDatepicker.vue";

export default {
  name: "StatsLayout",
  components: {
    RedirectComponent,
    UserMenuComponent,
    InputResource,
    MenuDatepicker,
  },
  data() {
    return {
      title: "Estadísticas registros",
      loaded: true,
      clipped: true,
      // mm/dd/yyyy
      rangeDates: {
        start: "02-01-2022",
        end: "12-31-2022",
      },
      filters: {
        partners: {
          sexo: [],
          socioono: [],
          nacionalidad: [],
          ciudadresidencia: [],
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
        this.updateFilters(this.filters);
      },
    },
  },
  computed: {
    ...mapState({
      drawerActive: (s) => s.stats.drawerActive,
    }),
  },
  /* async mounted() {
    await this.refreshDataset;
  }, */
  methods: {
    ...mapActions({
      getRangeDateAttentions: "attentions/getRangeDateAttentions",
    }),
    ...mapMutations({
      updateFilters: "stats/updateFilters",
    }),
    async refreshDataset() {
      await this.getRangeDateAttentions({
        sd: this.rangeDates.start,
        ed: this.rangeDates.end,
      });
    },
  },
};
</script>
