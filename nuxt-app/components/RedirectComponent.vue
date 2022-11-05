<template>
  <v-sheet>
    <span>Redireccionando a </span>
    <v-btn text>{{ url }}</v-btn>
    <span>...</span>
  </v-sheet>
</template>

<script>
export default {
  name: "RedirectComponent",
  props: {
    url: {
      type: String,
      required: true,
    },
    ms: {
      type: Number,
      default: 1500,
    },
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        path: this.url,
      });
    }, this.ms);
  },
};
</script>

<style>
</style>
