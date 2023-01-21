<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        style="margin-left: 10px"
        :disabled="disabled"
        elevation="0"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Usuarios ({{ uniqUsers.length }})
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Ateciones filtradas</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="uniqUsers"
          :items-per-page="20"
          show-expand
          :expanded.sync="expanded"
          item-key="_id"
        >
          <template #[`item.actions`]="{ item }">
            <v-btn
              target="_blank"
              color="primary"
              small
              elevation="0"
              :to="'/admin/partners/' + item._id"
              >Ver detalles</v-btn
            >
          </template>
          <template #[`item.data-table-expand`]="{ item, expand, isExpanded }">
            <v-badge
              :color="item.cosaspendientes ? 'blue' : 'transparent'"
              overlap
              dot
            >
              <v-btn
                @click="expand(!isExpanded)"
                color="primary"
                icon
                small
                elevation="0"
              >
                <v-icon>
                  {{ isExpanded ? "mdi-chevron-up" : "mdi-chevron-down" }}
                </v-icon>
              </v-btn>
            </v-badge>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-alert color="primary" dark v-if="item.observaciones">
                <strong>Observaciones</strong>:
                {{ item.observaciones }}
              </v-alert>
              <v-alert
                color="primary"
                dark
                v-if="item.cosaspendientes"
              >
                <strong>Cosas pendientes</strong>:
                {{ item.cosaspendientes }}
              </v-alert>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AttentionIterator from "@/components/attentions/AttentionIterator.vue";
import { mapGetters } from "vuex";
export default {
  components: { AttentionIterator },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      expanded: [],
      headers: [
        { text: "", value: "data-table-expand" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Email", value: "correoelectronico" },
        { text: "Telefono", value: "telefono" },
        { text: "Acciones", value: "actions" },
      ],
    };
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
