<template>
  <v-card tag="form" @submit.prevent="$emit('submit', resourceData)">
    <v-card-title>
      Editor de recursos
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="resourceData.name" />
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" elevation="0" color="primary">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      resourceData: {
        name: ''
      }
    }
  }
}
</script>
