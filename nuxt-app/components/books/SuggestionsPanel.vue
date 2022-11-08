<template>
  <v-card @keypress.enter="makeTheAction">
    <v-card-title> Sugerencias </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item :class="selectedOption === 0 ? 'grey lighten-3' : ''">
          <v-list-item-content>
            <v-list-item-title>Repositorio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :class="selectedOption === 1 ? 'grey lighten-3' : ''">
          <v-list-item-content>
            <v-list-item-title>Usuario</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    selectedOption: {
      type: Number,
      required: true,
    },
  },
  methods: {
    makeTheAction() {
      console.log("Haciendo la acción", this.selectedOption);
    },
  },
};
</script>

<style>
</style>
