<template>
  <v-card :disabled="loading">
    <v-card-title> Listado de socios </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="data" :loading="loading" />
    </v-card-text>
  </v-card>
</template>

<script>
import InputResource from "../../../components/resources/InputResource.vue";
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export default {
  components: { InputResource },
  name: "PartnerList",
  data() {
    return {
      loading: false,
      data: [],
      nacionalidades: [],
      headers: [{ text: "Calories", value: "calories" }],
    };
  },
  head() {
    return {
      title: "Listado de socios",
    };
  },
  async mounted() {
    await this.retrieveData();
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
