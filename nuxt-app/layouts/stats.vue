<template>
  <v-app v-if="loaded">
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      clipped
      width="500"
      :value="drawerActive"
      fixed
      app
    >
      <v-card :disabled="refreshingAttentions">
        <v-card-title> Filtro de fecha </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <menu-datepicker
                v-model="rangeDates.start"
                :label="'Fecha desde'"
              />
            </v-col>
            <v-col cols="6">
              <menu-datepicker
                v-model="rangeDates.end"
                :label="'Fecha hasta'"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-chip
            class="mr-4"
            v-for="election in dateElections"
            :key="election.label"
            @click="changeDateTo(election)"
          >
            {{ election.label }}
          </v-chip>
        </v-card-actions>
      </v-card>
      <v-card :disabled="refreshingAttentions" elevation="0">
        <v-card-title> Filtros de socio </v-card-title>
        <v-card-text>
          <input-resource
            multiple
            :label="'Sexos'"
            :rType="'sexos'"
            :readOnly="true"
            v-model="filters.partners.sexo"
          />
          <input-resource
            multiple
            :label="'Estados socio o no'"
            :rType="'sexos'"
            :readOnly="true"
            v-model="filters.partners.socioono"
          />
          <input-resource
            multiple
            :label="'Nacionalidad'"
            :rType="'nacionalidads'"
            :readOnly="true"
            v-model="filters.partners.nacionalidad"
          />
          <input-resource
            multiple
            :label="'Residencia'"
            :rType="'residencias'"
            :readOnly="true"
            v-model="filters.partners.ciudadresidencia"
          />
          <input-resource
            multiple
            :label="'Como nos conocio'"
            :rType="'comoNosConoci??'"
            :readOnly="true"
            v-model="filters.partners.howDidKnowUs"
          />
        </v-card-text>
      </v-card>
      <v-card :disabled="refreshingAttentions" elevation="0">
        <v-card-title> Filtros de atenciones </v-card-title>
        <v-card-text>
          <input-resource
            multiple
            :label="'Tipo atenciones'"
            :rType="'tipoatenciones'"
            :readOnly="true"
            v-model="filters.attentions.tipoaenciones"
          />
          <input-resource
            multiple
            :label="'Derivado a'"
            :rType="'derivaciones'"
            :readOnly="true"
            v-model="filters.attentions.derivadoa"
          />
          <input-resource
            multiple
            :label="'Derivado de'"
            :rType="'derivaciones'"
            :readOnly="true"
            v-model="filters.attentions.derivadode"
          />
          <input-resource
            multiple
            :label="'Derivado de'"
            :rType="'derivaciones'"
            :readOnly="true"
            v-model="filters.attentions.derivadode"
          />
          <input-resource
            multiple
            :label="'Proyectos'"
            :rType="'proyectos'"
            :readOnly="true"
            v-model="filters.attentions.Proyectos"
          />
          <input-resource
            multiple
            :label="'Motivos de atenci??n'"
            :rType="'motivosatencions'"
            :readOnly="true"
            v-model="filters.attentions.motivosatencion"
          />
          <input-resource
            multiple
            :label="'Formaci??n'"
            :rType="'formacions'"
            :readOnly="true"
            v-model="filters.attentions.formacion"
          />
          <input-resource
            multiple
            :label="'Voluntariado'"
            :rType="'Voluntariados'"
            :readOnly="true"
            v-model="filters.attentions.voluntariado"
          />
          <input-resource
            multiple
            :label="'Lugar atencion'"
            :rType="'lugaratencions'"
            :readOnly="true"
            v-model="filters.attentions.lugaratencion"
          />
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="primary" dark>
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
import dayjs from "dayjs";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

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
      title: "Estad??sticas registros",
      loaded: true,
      // mm-dd-yyyy
      rangeDates: {
        start: "01-01-2022",
        end: "12-31-2022",
      },
      dateElections: [
        {
          label: "Este a??o",
          value: {
            start: "01-01-" + year,
            end: "12-31-" + year,
          },
        },
        {
          label: "Este mes",
          value: {
            start: month + 1 + "-01-" + year,
            end: month + 1 + "-30-" + year,
          },
        },
      ],
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
          lugaratencion: [],
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
    rangeDates: {
      deep: true,
      handler() {
        this.refreshDataset(this.filters);
      },
    },
  },
  computed: {
    ...mapState({
      drawerActive: (s) => s.stats.drawerActive,
      refreshingAttentions: (s) => s.stats.loading,
    }),
  },
  async mounted() {
    await this.refreshDataset();
  },
  methods: {
    ...mapActions({
      getRangeDateAttentions: "attentions/getRangeDateAttentions",
    }),
    ...mapMutations({
      updateFilters: "stats/updateFilters",
    }),
    changeDateTo(election) {
      this.rangeDates.start = election.value.start;
      this.rangeDates.end = election.value.end;
    },
    async refreshDataset() {
      this.$store.commit("stats/toggleLoading");
      await this.getRangeDateAttentions({
        sd: dayjs(this.rangeDates.start).format("MM-DD-YYYY"),
        ed: dayjs(this.rangeDates.end).format("MM-DD-YYYY"),
      });
      this.$store.commit("stats/toggleLoading");
    },
  },
};
</script>
