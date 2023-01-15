<template>
  <v-autocomplete v-model="inputValue" :items="resourceItems" item-value="_id" item-text="name" :label="label" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    label: {
      type: String,
      default: 'Input resource'
    },
    resourceType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    inputValue() {
      this.$emit('input', this.inputValue)
    }
  },
  computed: {
    ...mapGetters('resources', ['resourcesOfType']),
    resourceItems() {
      return this.resourcesOfType(this.resourceType)
    }
  }
}
</script>
