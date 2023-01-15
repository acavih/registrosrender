<template>
  <v-autocomplete :label="label" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Input resource'
    }
  }
}
</script>
