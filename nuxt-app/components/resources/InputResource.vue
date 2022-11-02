<template>
  <v-sheet>
    <v-autocomplete
      :loading="loading"
      :disabled="loading"
      :items="items"
      item-value="_id"
      item-text="name"
      :chips="multiple"
      :multiple="multiple"
      :search-input.sync="query"
      :append-icon="'mdi-close'"
      :label="label"
      v-model="value"
      @keydown.enter="createResourceIfNotResults"
      @click:append="clearValue"
    >
      <template #no-data>
        <v-card ref="creatorContainer" class="m-0" elevation="0">
          <v-card-text>
            <v-chip @click="addResource">Crear elemento</v-chip>
          </v-card-text>
        </v-card>
      </template>
    </v-autocomplete>
  </v-sheet>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  props: {
    rType: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: "Input resource",
    },
  },
  data() {
    return {
      value: this.multiple ? [] : "",
      query: "",
    };
  },
  created() {
    this.value = this.$attrs.value;
  },
  computed: {
    ...mapState("resources", ["loading"]),
    ...mapGetters({
      resourceType: "resources/resourceType",
    }),
    items() {
      return this.resourceType(this.rType);
    },
  },
  watch: {
    value() {
      this.$emit("input", this.value);
    },
  },
  methods: {
    ...mapActions({
      createResource: "resources/createResource",
    }),
    clearValue() {
      this.value = this.multiple ? [] : "";
    },
    createResourceIfNotResults() {
      debugger;
      if (!this.$refs.creatorContainer) return;
      this.addResource();
    },
    addResource() {
      this.createResource({
        type: this.rType,
        name: this.query,
      });
    },
  },
};
</script>

<style>
</style>
