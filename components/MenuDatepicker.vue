<template>
  <v-menu v-model="menu" offset-y min-width="auto" :close-on-content-click="false" max-width="290px">
    <template #activator="{on, attrs}">
      <v-text-field
        v-model="formattedDate"
        :label="label"
        v-bind="attrs"
        persistent-hint
        hint="DD-MM-YYYY"
        @input="menu=true"
        @change="updateDate"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="date" no-title @change="updateTxt" />
  </v-menu>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    label: {
      type: String,
      default: 'Introduzca una fecha'
    },
    $value: {
      type: Date,
      required: false
    }
  },
  data () {
    return {
      date: null, // string YYYY-MM-DD
      formattedDate: '',
      menu: false
    }
  },
  watch: {
    date (newv) {
      console.log(newv)
    }
  },
  created () {
    const date = this.$attrs.value
    if (date !== null) {
      this.date = dayjs(date).format('YYYY-MM-DD')
      this.updateTxt()
    }
  },
  methods: {
    updateTxt () {
      this.formattedDate = dayjs(new Date(this.date)).format('DD-MM-YYYY')
      this.$emit('input', new Date(this.date))
    },
    updateDate () {
      const [day, month, year] = this.formattedDate.split('-')
      const newDate = new Date([year, month, day].join('/'))
      this.date = dayjs(newDate).format('YYYY-MM-DD')
      this.menu = false
      this.$emit('input', newDate)
    }
  }
}
</script>
