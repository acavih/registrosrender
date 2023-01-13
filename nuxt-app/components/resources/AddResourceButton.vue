<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" :disabled="activeType.length === 0" color="primary" dark v-bind="attrs" v-on="on">
        Añadir nuevo recurso
      </v-btn>
    </template>

    <resource-editor v-if="dialog" @submit="doCreateResource" />
  </v-dialog>
</template>

<script>
import ResourceEditor from "./ResourceEditor.vue";
import { mapActions } from "vuex";
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
    ...mapActions('resources', ['createResource']),
    async doCreateResource(resourceInfo) {
      const payload = {
        name: resourceInfo.name,
        type: this.activeType
      }
      await this.createResource(payload)
      this.dialog = false
    }
  }
};
</script>
