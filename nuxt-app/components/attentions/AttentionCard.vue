<template>
  <v-card outlined style="margin: 10px 0px;" >
    <v-card-text>
      {{attention.comentario}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    attention: {
      type: Object,
      required: true
    }
  }
}
</script>
