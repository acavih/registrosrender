<template>
  <v-card outlined style="margin: 10px 0px;" >
    <v-card-title>
      {{attention.fechaatencion | dateFilter}}
    </v-card-title>
    <v-card-text>
      {{attention.comentario}}
    </v-card-text>
  </v-card>
</template>

<script>
import globalMixin from '@/mixins/global'
export default {
  mixins: [globalMixin],
  props: {
    attention: {
      type: Object,
      required: true
    }
  }
}
</script>
