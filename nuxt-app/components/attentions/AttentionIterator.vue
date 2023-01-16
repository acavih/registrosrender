<template>
  <v-data-iterator :items="attentions">
    <template v-slot:default="{ items }">
      <attention-card v-for="attention in items" :key="attention._id" :attention="attention" />
    </template>
  </v-data-iterator>
</template>

<script>
import AttentionCard from './AttentionCard.vue'
export default {
  props: {
    attentions: {
      type: Array,
      required: true
    }
  },
  components: { AttentionCard },

}
</script>
