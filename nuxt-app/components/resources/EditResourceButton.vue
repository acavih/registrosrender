<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" color="secondary" small dark v-bind="attrs" v-on="on">
        Editar
      </v-btn>
    </template>

    <resource-editor :initialValue="resource" v-if="dialog" @submit="doUpdateResource" />
  </v-dialog>
</template>

<script>
import ResourceEditor from "./ResourceEditor.vue";
import { mapActions } from "vuex";
export default {
  components: { ResourceEditor },
  props: {
    resource: {
      type: Object,
      default: () => ({})
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
    ...mapActions('resources', ['editResource']),
    async doUpdateResource(resourceInfo) {
      const payload = {
        ...this.resource,
        name: resourceInfo.name,
        type: this.activeType
      }
      await this.editResource(payload)
      this.dialog = false
    }
  }
};
</script>
