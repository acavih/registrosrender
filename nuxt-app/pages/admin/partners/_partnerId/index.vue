<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title> Vista de socio </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="item in data" :key="item._id">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Título</v-list-item-title>
            <v-list-item-subtitle>Subtitulo</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1"> mdi-pencil </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export default {
  name: "PartnerView",
  data() {
    return {
      loading: false,
      data: [],
      headers: [{ text: "Calories", value: "calories" }],
    };
  },
  head() {
    return {
      title: "Vista de socio",
    };
  },
  async mounted() {
    await this.retrieveData();
  },
  computed: {
    ...mapState(["partners/partners"]),
    partner() {
      return this.partners.filter((p) => p._id === this.$route.params.id)[0];
    },
  },
  methods: {
    async retrieveData(e) {
      try {
        this.loading = true;
        await sleep(1000);
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
