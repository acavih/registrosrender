<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" :disabled="activeType.length === 0" color="primary" dark v-bind="attrs" v-on="on">
        Añadir nuevo recurso
      </v-btn>
    </template>

    <resource-editor v-if="dialog" @submit="createResource" />
  </v-dialog>
</template>

<script>
import ResourceEditor from "./ResourceEditor.vue";
export default {
  components: { ResourceEditor },
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    activeType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    createResource(resourceInfo) {
      const payload = {
        name: resourceInfo.name,
        type: this.activeType
      }
      console.log(payload)
      this.dialog = false
    }
  }
};
</script>
