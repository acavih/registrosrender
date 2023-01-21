<template>
  <v-expansion-panels v-model="active">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <span class="text-lg-h4">
          {{ currentPartner.nombre }} {{ currentPartner.apellidos }}
        </span>
        <template v-slot:actions>
          <v-icon class="text-lg-h4" color="primary"> mdi-chevron-down </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card outlined>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>Código</td>
                  <td>{{ currentPartner.codigo }}</td>
                </tr>
                <tr>
                  <td>Tarjeta sip</td>
                  <td>{{ currentPartner.sipcard }}</td>
                </tr>
                <tr>
                  <td>Correo electrónico</td>
                  <td>{{ currentPartner.correoelectronico }}</td>
                </tr>
                <tr>
                  <td>Telefono</td>
                  <td>{{ currentPartner.telefono }}</td>
                </tr>
                <tr>
                  <td>Fecha de nacimiento</td>
                  <td>
                    {{ currentPartner.fechanacimiento | dateFilter }} ({{
                      currentPartner.fechanacimiento | age
                    }}
                    años)
                  </td>
                </tr>
                <tr>
                  <td>Socio o no</td>
                  <td>{{ currentPartner.socioono?.name }}</td>
                </tr>
                <tr>
                  <td>Sexo</td>
                  <td>{{ currentPartner.sexo?.name }}</td>
                </tr>
                <tr>
                  <td>Ciudad residencia</td>
                  <td>{{ currentPartner.ciudadresidencia?.name }}</td>
                </tr>
                <tr>
                  <td>Nacionalidad</td>
                  <td>{{ currentPartner.nacionalidad?.name }}</td>
                </tr>
                <tr>
                  <td>Como nos conocio</td>
                  <td>{{ currentPartner.howDidKnowUs?.name }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-alert color="primary" dark v-if="currentPartner.observaciones">
              <strong>Observaciones</strong>: {{ currentPartner.observaciones }}
            </v-alert>
            <v-alert color="primary" dark v-if="currentPartner.cosaspendientes">
              <strong>Cosas pendientes</strong>:
              {{ currentPartner.cosaspendientes }}
            </v-alert>
          </v-card-text>
          <v-card-actions v-if="!readOnly">
            <edit-partner-button :initialPartnerData="currentPartner" />
            <remove-partner-button />
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import AttentionIterator from "@/components/attentions/AttentionIterator.vue";
import { mapGetters } from "vuex";
import calculateAge from "@/utils/calculateAge";
import globalMixin from "@/mixins/global";
import EditPartnerButton from "@/components/partners/EditPartnerButton.vue";
import RemovePartnerButton from "@/components/partners/RemovePartnerButton.vue";

export default {
  mixins: [globalMixin],
  components: { AttentionIterator, EditPartnerButton, RemovePartnerButton },
  props: {
    currentPartner: {
      type: Object,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 1,
    };
  },
  filters: {
    age(v) {
      if (!v) return "n/a";
      return calculateAge(new Date(v));
    },
  },
  computed: {
    ...mapGetters("stats", ["attentionsFiltered", "uniqUsers"]),
  },
};
</script>

<style>
.v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none !important;
}
</style>
