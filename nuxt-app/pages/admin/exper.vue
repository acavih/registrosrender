<template>
  <v-sheet>
    <v-card>
      <v-card-title> Experimentos </v-card-title>
      <v-card-text>
        <book-editor />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import BookEditor from "@/components/books/BookEditor.vue";

export default {
  components: { BookEditor },
  name: "ExperimentsVue",
  layout: "guest",
  head() {
    return {
      title: "Experimentos",
    };
  },
  mounted() {},
};
</script>
