<template>
  <v-sheet>
    <v-data-iterator :options.sync="optionsIterator" :items="attentions">
      <template #default="props">
        <attention-card
          :attention="attention"
          v-for="attention in props.items"
          :key="attention._id"
        />
      </template>
    </v-data-iterator>
  </v-sheet>
</template>

<script>
import Vue from "vue";
import AttentionCard from "./AttentionCard.vue";

export default Vue.extend({
  components: { AttentionCard },
  props: {
    attentions: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      optionsIterator: this.options,
    };
  },
});
</script>
