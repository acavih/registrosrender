<template>
  <div>redirigiendo a {{ url }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    url: { type: String, required: true },
  },
  mounted() {
    setTimeout(() => {
      this.$router.push(this.url);
    }, 500);
  },
});
</script>
