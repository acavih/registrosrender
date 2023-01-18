<template>
  <v-autocomplete v-model="inputValue" :multiple="multiple" :chips="multiple" :items="resourceItems" item-value="_id" item-text="name" :label="label" />
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
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inputValue: this.$attrs.value
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
