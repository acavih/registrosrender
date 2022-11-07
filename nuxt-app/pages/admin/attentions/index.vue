<template>
  <v-card :disabled="loading">
    <v-card-title> Últimas atenciones </v-card-title>
    <v-card-text>
      <v-checkbox
        v-model="query.pendentAttentions"
        label="Ver atenciones pendientes"
      />
      <v-data-table
        :headers="headers"
        :items="lastAttentions"
        :loading="loading"
        :options.sync="query"
        :items-per-page="100"
        :server-items-length="totalAttentions"
      >
        <template #[`item.user`]="{ item }">
          {{ item.user.nombre }}
          {{ item.user.apellidos }}
        </template>
        <template #[`item.fechaatencion`]="{ item }">
          {{ item.fechaatencion | date }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";
export default {
  name: "index.vue",
  data() {
    return {
      loading: false,
      headers: [
        {
          sortable: false,
          filterable: false,
          text: "Fecha de atención",
          value: "fechaatencion",
        },
        { sortable: false, filterable: false, text: "Usuario", value: "user" },
      ],
      query: {
        page: Number(this.$route.query.page || 1),
        pendentAttentions: false,
      },
    };
  },
  filters: {
    date(d) {
      try {
        return dayjs(d).format("DD/MM/YYYY");
      } catch (error) {
        return "n/a";
      }
    },
  },
  head() {
    return {
      title: "Últimas atenciones",
    };
  },
  async mounted() {
    await this.retrieveData();
  },
  watch: {
    query: {
      deep: true,
      async handler() {
        await this.retrieveData();
        this.$router.push({
          query: this.query,
        });
      },
    },
  },
  computed: {
    ...mapState({
      lastAttentions: (s) => s.attentions.lastAttentions,
      totalAttentions: (s) => s.attentions.totalAttentions,
    }),
  },
  methods: {
    ...mapActions({
      retrieveLastAttentions: "attentions/retrieveLastAttentions",
    }),
    async retrieveData(e) {
      try {
        this.loading = true;
        this.retrieveLastAttentions(this.query);
        console.log(this.formData);
        this.loading = false;
      } catch (error) {
        if (error.isAxiosError) {
          console.dir(error);
          return console.log("ERROR DE AXIOS");
        }
        console.log(error);
      }
    },
  },
};
</script>
