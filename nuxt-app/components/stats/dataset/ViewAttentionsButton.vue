<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :disabled="disabled" elevation="0" color="primary" dark v-bind="attrs" v-on="on">
        Atenciones ({{attentionsFiltered.length}})
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Ateciones filtradas</v-card-title>
      <v-card-text>
        <attention-iterator :attentions="attentionsFiltered" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AttentionIterator from '@/components/attentions/AttentionIterator.vue';
import { mapGetters } from "vuex";
export default {
  components: { AttentionIterator },
  props: {
    disabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('stats', ['attentionsFiltered', 'uniqUsers'])
  }
};
</script>
