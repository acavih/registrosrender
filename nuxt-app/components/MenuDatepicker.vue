<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Picker in menu'
      }
    },
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false
    }),
    mounted() {
      console.log(this.$attrs.value)
      this.date = this.$attrs.value
    },
    watch: {
      date() {
        this.$emit('input', this.date)
      }
    }
  }
</script>
